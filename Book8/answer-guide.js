/* =========================================================
   ANSWER GUIDE
   Points stuck players toward the answer area — or, once a
   question has been answered, toward the Next Challenge
   button instead. Add this script tag AFTER the book's own
   script tag. Same file works in every book, no edits
   needed to book#.js.
========================================================= */

(function(){

    var IDLE_DELAY = 6000; /* how long to wait before showing the hint */

    var idleTimer = null;

    var arrowEl = null;

    var arrowLabel = null;

    var badgeEl = null;

    var highlightTarget = null;

    var watchedAnswers = null;



    /* =========================================================
       CREATE THE FLOATING ARROW
    ========================================================= */

    function createArrow(){

        var el = document.createElement("div");

        el.id = "answerGuideArrow";

        el.innerHTML =

            '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '<path d="M12 3v14" stroke="#facc15" stroke-width="2.5" stroke-linecap="round"/>' +
                '<path d="M6 12l6 6 6-6" stroke="#facc15" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>' +
            '</svg>' +
            '<span id="answerGuideLabel">CHOOSE YOUR ANSWER HERE</span>';

        document.body.appendChild(el);

        return el;

    }



    /* =========================================================
       CREATE THE WITCH BADGE
    ========================================================= */

    function createBadge(){

        var el = document.createElement("div");

        el.className = "witch-guide-badge";

        el.innerHTML =

            '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '<path d="M12 3v14" stroke="#facc15" stroke-width="2.5" stroke-linecap="round"/>' +
                '<path d="M6 12l6 6 6-6" stroke="#facc15" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>' +
            '</svg>';

        return el;

    }



    /* =========================================================
       FIND THE NEXT-CHALLENGE BUTTON, IF ANY
    ========================================================= */

    function findNextButton(){

        return document.getElementById(
            "nextQuestionButton"
        );

    }



    /* =========================================================
       FIND WHERE TO POINT
       If a Next Challenge button is showing, point at that.
       Otherwise, prefer .answer-panel (Book I–VIII). Falls
       back to the closest .question-panel, then to #answers
       itself (covers Book IX, which has no separate
       answer-panel).
    ========================================================= */

    function findAnswerTarget(){

        var nextButton =
            findNextButton();


        if(nextButton){

            return nextButton;

        }


        var answers =
            document.getElementById("answers");


        return (
            document.querySelector(".answer-panel") ||
            (answers && answers.closest(".question-panel")) ||
            answers
        );

    }



    /* =========================================================
       POSITION THE ARROW ABOVE THE TARGET
    ========================================================= */

    function positionArrow(){

        if(!arrowEl){

            return;

        }


        var target =
            findAnswerTarget();


        if(!target){

            return;

        }


        var rect =
            target.getBoundingClientRect();


        arrowEl.style.left =
            (rect.left + rect.width / 2 - 17) + "px";


        arrowEl.style.top =
            (rect.top - 54) + "px";

    }



    /* =========================================================
       ONLY GUIDE WHEN THERE'S SOMETHING ACTIONABLE
       (an actual answer to pick/type, OR a Next Challenge
       button waiting to be pressed) — keeps it from pointing
       at an empty panel during the start screen / enemy
       intro dialogue.
    ========================================================= */

    function hasGuidableContent(){

        if(findNextButton()){

            return true;

        }


        var answers =
            document.getElementById("answers");


        return !!(
            answers &&
            answers.querySelector(
                "button:not(.next-question-button), input"
            )
        );

    }



    /* =========================================================
       SHOW / HIDE
    ========================================================= */

    function showGuide(){

        if(!hasGuidableContent()){

            return;

        }


        var target =
            findAnswerTarget();


        if(!target){

            return;

        }


        highlightTarget = target;

        highlightTarget.classList.add(
            "answer-guide-highlight"
        );


        if(arrowLabel){

            arrowLabel.textContent =
                findNextButton() ?
                    "TAP TO CONTINUE" :
                    "CHOOSE YOUR ANSWER HERE";

        }


        positionArrow();

        arrowEl.classList.add("show");


        if(badgeEl){

            badgeEl.classList.add("show");

        }

    }


    function hideGuide(){

        if(arrowEl){

            arrowEl.classList.remove("show");

        }


        if(badgeEl){

            badgeEl.classList.remove("show");

        }


        if(highlightTarget){

            highlightTarget.classList.remove(
                "answer-guide-highlight"
            );

            highlightTarget = null;

        }

    }



    /* =========================================================
       IDLE TIMER
    ========================================================= */

    function resetIdleTimer(){

        clearTimeout(idleTimer);

        hideGuide();


        idleTimer = setTimeout(
            showGuide,
            IDLE_DELAY
        );

    }


    function onAnyInteraction(){

        resetIdleTimer();

    }



    /* =========================================================
       ATTACH THE WITCH BADGE
    ========================================================= */

    function attachWitchBadge(){

        var witch =
            document.querySelector(".witch-display");


        if(!witch){

            return;

        }


        badgeEl = createBadge();

        witch.appendChild(badgeEl);

    }



    /* =========================================================
       WATCH #answers FOR NEW QUESTIONS / NEXT BUTTON
    ========================================================= */

    function watchAnswers(){

        var answers =
            document.getElementById("answers");


        if(!answers || watchedAnswers === answers){

            return;

        }


        watchedAnswers = answers;


        answers.addEventListener("click", onAnyInteraction);

        answers.addEventListener("input", onAnyInteraction);

        answers.addEventListener("keydown", onAnyInteraction);


        var observer =
            new MutationObserver(function(){

                positionArrow();

                resetIdleTimer();

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

        arrowEl = createArrow();

        arrowLabel =
            document.getElementById("answerGuideLabel");

        attachWitchBadge();

        watchAnswers();

        resetIdleTimer();


        window.addEventListener("resize", positionArrow);

        window.addEventListener("scroll", positionArrow, true);

    }


    if(document.readyState === "loading"){

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    }

    else{

        init();

    }

})();