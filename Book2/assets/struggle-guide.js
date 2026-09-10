/* =========================================================
   STRUGGLE GUIDE
   Detects when the player is idle for 7 seconds on a
   question and offers to send them to the reviewer.
   Same file works in every book — just paste as-is.

   Optional: set window.STRUGGLE_REVIEWER_URL BEFORE this
   script tag if a book's reviewer path is different from
   the default below.
========================================================= */

(function(){

    var IDLE_DELAY = 20000; /* 20 seconds */

    var reviewerURL =
        window.STRUGGLE_REVIEWER_URL ||
        "characters/reading2.html";


    var idleTimer = null;

    var overlay = null;

    var card = null;

    var watchedAnswers = null;



    /* =========================================================
       CREATE OVERLAY
    ========================================================= */

    function createOverlay(){

        var el = document.createElement("div");

        el.id = "struggleOverlay";

        el.className = "struggle-overlay";

        el.innerHTML =
            '<div class="struggle-card" id="struggleCard"></div>';

        document.body.appendChild(el);

        return el;

    }



    /* =========================================================
       STEP 1 — ARE YOU STRUGGLING?
    ========================================================= */

    function showStep1(){

        card.innerHTML =

            '<h2>Are you struggling with the question?</h2>' +

            '<p>We can take you to the reviewer for a quick refresher.</p>' +

            '<div class="struggle-actions">' +
                '<button id="struggleYes" class="struggle-btn yes">YES</button>' +
                '<button id="struggleNo" class="struggle-btn no">NO</button>' +
            '</div>';


        document.getElementById("struggleYes")
            .addEventListener("click", showStep2);


        document.getElementById("struggleNo")
            .addEventListener("click", closeOverlay);

    }



    /* =========================================================
       STEP 2 — CONFIRM GOING TO REVIEWER
    ========================================================= */

    function showStep2(){

        card.innerHTML =

            '<h2>Go to the Reviewer?</h2>' +

            '<p>Are you sure you want to leave the trial and review the lesson?</p>' +

            '<div class="struggle-actions">' +
                '<button id="struggleConfirmYes" class="struggle-btn yes">YES</button>' +
                '<button id="struggleConfirmNo" class="struggle-btn no">NO</button>' +
            '</div>';


        document.getElementById("struggleConfirmYes")
            .addEventListener("click", function(){

                window.location.href = reviewerURL;

            });


        document.getElementById("struggleConfirmNo")
            .addEventListener("click", closeOverlay);

    }



    /* =========================================================
       OPEN / CLOSE
    ========================================================= */

    function openOverlay(){

        if(!hasAnswerableContent()){

            return;

        }


        showStep1();

        overlay.classList.add("show");

    }


    function closeOverlay(){

        overlay.classList.remove("show");

        resetIdleTimer();

    }



    /* =========================================================
       ONLY TRIGGER WHEN THERE'S A QUESTION TO ANSWER
    ========================================================= */

    function hasAnswerableContent(){

        var answers =
            document.getElementById("answers");


        return !!(
            answers &&
            answers.querySelector("button, input")
        );

    }



    /* =========================================================
       IDLE TIMER
    ========================================================= */

    function resetIdleTimer(){

        clearTimeout(idleTimer);

        idleTimer = setTimeout(openOverlay, IDLE_DELAY);

    }


    function onAnyInteraction(){

        if(overlay.classList.contains("show")){

            return;

        }


        resetIdleTimer();

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

                if(overlay.classList.contains("show")){

                    closeOverlay();

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

        overlay = createOverlay();

        card = document.getElementById("struggleCard");


        document.addEventListener("click", onAnyInteraction);

        document.addEventListener("keydown", onAnyInteraction);

        document.addEventListener("input", onAnyInteraction);


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