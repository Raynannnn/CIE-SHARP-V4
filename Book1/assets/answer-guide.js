/* =========================================================
   ANSWER GUIDE
   Points stuck players toward the answer area.
   Add this script tag AFTER the book's own script tag
   (e.g. after book1.js, book2.js, etc.) — same file works
   in every book, no edits needed to book#.js.
========================================================= */

(function(){

    var IDLE_DELAY = 3000; /* how long to wait before showing the hint */

    var idleTimer = null;

    var arrowEl = null;

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
            '<span>CHOOSE YOUR ANSWER HERE</span>';

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
       FIND WHERE TO POINT
       Prefers .answer-panel (Book I–VIII). Falls back to the
       closest .question-panel, then to #answers itself
       (covers Book IX, which has no separate answer-panel).
    ========================================================= */

    function findAnswerTarget(){

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
       ONLY GUIDE WHEN THERE'S SOMETHING TO ANSWER
       (keeps it from pointing at an empty panel during the
       start screen / enemy intro dialogue)
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
       SHOW / HIDE
    ========================================================= */

    function showGuide(){

        if(!hasAnswerableContent()){

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
       WATCH #answers FOR NEW QUESTIONS
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