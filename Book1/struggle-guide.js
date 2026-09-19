/* =========================================================
   STRUGGLE GUIDE
   After 20 seconds of no interaction on a question, a small
   popup appears next to the pause (menu) button and points
   at it, suggesting the player open Menu > Readings.

   Step 1: popup points at the menu button.
   Step 2: if the player taps the menu button, the Readings
           item inside the pause menu gets highlighted with
           a "TAP HERE" tag.

   - "No thanks, I got it" hides the popup, and it comes back
     after another 20 seconds of no interaction.
   - Any click / key / input, or a new question, also hides
     it and restarts the timer.
   - Same file works in every book — just paste as-is.

   NOTE: the Readings link itself lives in pause-menu.js.
   If a book needs a different path, keep setting
   window.STRUGGLE_REVIEWER_URL before the scripts — the
   pause menu reuses it automatically.
========================================================= */

(function(){

    var IDLE_DELAY = 10000; /* 10 seconds */

    var MENU_BUTTON_ID = "pauseMenuButtonToggle";

    var READINGS_BUTTON_ID = "pauseReadingsButton";

    var PAUSE_OVERLAY_ID = "pauseOverlay";


    var idleTimer = null;

    var popup = null;

    var watchedAnswers = null;

    var watchedOverlay = null;



    /* =========================================================
       CREATE POPUP
    ========================================================= */

    function createPopup(){

        var el = document.createElement("div");

        el.id = "struggleGuide";

        el.className = "struggle-popup";

        el.innerHTML =

            '<h2>Struggling with the question?</h2>' +

            '<p>Tap the menu button, then hit <strong>Readings</strong> for a quick refresher.</p>' +

            '<button id="struggleDismiss" class="struggle-dismiss" type="button">' +
                'No thanks, I got it' +
            '</button>';

        document.body.appendChild(el);

        el.querySelector("#struggleDismiss")
            .addEventListener("click", hidePopup);

        return el;

    }



    /* =========================================================
       HELPERS
    ========================================================= */

    function isShown(){

        return popup.classList.contains("show");

    }


    function getMenuButton(){

        return document.getElementById(MENU_BUTTON_ID);

    }


    function isVisible(id){

        var el = document.getElementById(id);

        return !!(el && el.classList.contains("show"));

    }


    function isMenuButtonTarget(target){

        return !!(
            target &&
            target.closest &&
            target.closest("#" + MENU_BUTTON_ID)
        );

    }



    /* =========================================================
       POSITION — follows wherever the pause button is
    ========================================================= */

    function positionPopup(){

        var btn = getMenuButton();

        var vw = window.innerWidth;

        var vh = window.innerHeight;

        var margin = 12;

        var gap = 14;

        var w = popup.offsetWidth;

        var h = popup.offsetHeight;


        var rect = btn ? btn.getBoundingClientRect() : null;


        /* fallback if the button isn't there / is hidden */

        if(!rect || (rect.width === 0 && rect.height === 0)){

            rect = {

                left: vw - 58,

                top: 84,

                width: 42,

                height: 42,

                bottom: 126

            };

        }


        var centerX = rect.left + rect.width / 2;


        var left = Math.min(

            Math.max(centerX - w / 2, margin),

            vw - w - margin

        );


        /* button in the top half -> popup goes below it,
           button in the bottom half -> popup goes above it */

        var below = (rect.top + rect.height / 2) < vh / 2;


        var top = below ?
            rect.bottom + gap :
            rect.top - h - gap;


        top = Math.min(

            Math.max(top, margin),

            vh - h - margin

        );


        var arrowX = Math.min(

            Math.max(centerX - left, 20),

            w - 20

        );


        popup.style.left = left + "px";

        popup.style.top = top + "px";

        popup.style.setProperty("--arrow-x", arrowX + "px");


        popup.classList.toggle("below", below);

        popup.classList.toggle("above", !below);

    }



    /* =========================================================
       SHOW / HIDE POPUP
    ========================================================= */

    function showPopup(){

        if(!hasAnswerableContent()){

            return;

        }


        positionPopup();

        popup.classList.add("show");


        var btn = getMenuButton();

        if(btn){

            btn.classList.add("struggle-highlight");

        }

    }


    function hidePopup(){

        popup.classList.remove("show");


        var btn = getMenuButton();

        if(btn){

            btn.classList.remove("struggle-highlight");

        }


        resetIdleTimer();

    }



    /* =========================================================
       STEP 2 — POINT AT "READINGS" INSIDE THE PAUSE MENU
    ========================================================= */

    function pointAtReadings(){

        var overlay =
            document.getElementById(PAUSE_OVERLAY_ID);

        var readings =
            document.getElementById(READINGS_BUTTON_ID);


        if(
            !overlay ||
            !readings ||
            !overlay.classList.contains("show")
        ){

            return;

        }


        readings.classList.add("struggle-highlight");


        if(!readings.querySelector(".struggle-tag")){

            var tag = document.createElement("span");

            tag.className = "struggle-tag";

            tag.textContent = "TAP HERE";

            readings.appendChild(tag);

        }


        watchPauseOverlay(overlay);

    }


    function clearReadingsPointer(){

        var readings =
            document.getElementById(READINGS_BUTTON_ID);


        if(!readings){

            return;

        }


        readings.classList.remove("struggle-highlight");


        var tag = readings.querySelector(".struggle-tag");

        if(tag){

            tag.remove();

        }

    }


    /* remove the pointer as soon as the pause menu closes */

    function watchPauseOverlay(overlay){

        if(watchedOverlay === overlay){

            return;

        }


        watchedOverlay = overlay;


        new MutationObserver(function(){

            if(!overlay.classList.contains("show")){

                clearReadingsPointer();

            }

        }).observe(overlay, {

            attributes:true,

            attributeFilter:["class"]

        });

    }



    /* =========================================================
       ONLY TRIGGER WHEN THERE'S A QUESTION TO ANSWER
    ========================================================= */

    function hasAnswerableContent(){

        var answers =
            document.getElementById("answers");


        if(
            isVisible("nextChallengeOverlay") ||
            isVisible(PAUSE_OVERLAY_ID) ||
            isVisible("resultScreen") ||
            isVisible("loseScreen")
        ){

            return false;

        }


        return !!(
            answers &&
            answers.querySelector("button:not(:disabled), input")
        );

    }



    /* =========================================================
       IDLE TIMER
    ========================================================= */

    function resetIdleTimer(){

        clearTimeout(idleTimer);

        idleTimer = setTimeout(showPopup, IDLE_DELAY);

    }


    function onAnyInteraction(event){

        /* clicks inside the popup are handled by its own button */

        if(popup.contains(event.target)){

            return;

        }


        /* did the player follow the hint and tap the menu button? */

        var followedHint =
            isShown() &&
            isMenuButtonTarget(event.target);


        if(isShown()){

            hidePopup();   /* also restarts the timer */

        }
        else{

            resetIdleTimer();

        }


        if(followedHint){

            pointAtReadings();

        }

    }



    /* =========================================================
       WATCH #answers FOR NEW QUESTIONS
    ========================================================= */

    function watchAnswers(){

        var answers =
            document.getElementById("answers");


        if(!answers || watchedAnswers === answers){

            return;

        }


        watchedAnswers = answers;


        var observer =
            new MutationObserver(function(){

                if(isShown()){

                    hidePopup();

                }
                else{

                    resetIdleTimer();

                }

            });


        observer.observe(answers, {

            childList:true,

            subtree:false

        });

    }



    /* =========================================================
       INIT
    ========================================================= */

    function init(){

        popup = createPopup();


        document.addEventListener("click", onAnyInteraction);

        document.addEventListener("keydown", onAnyInteraction);

        document.addEventListener("input", onAnyInteraction);


        window.addEventListener("resize", function(){

            if(isShown()){

                positionPopup();

            }

        });


        watchAnswers();

        resetIdleTimer();

    }


    if(document.readyState === "loading"){

        document.addEventListener("DOMContentLoaded", init);

    }
    else{

        init();

    }

})();