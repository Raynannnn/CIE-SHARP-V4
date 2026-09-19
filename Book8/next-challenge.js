/* =========================================================
   NEXT CHALLENGE OVERLAY (SHARED)
   Same file works in every book — just paste as-is, no
   edits needed to book#.js.

   Usage from any book#.js, instead of setTimeout-auto-advance
   or appending a button into #answers:

       showNextChallenge(function(){
           currentQuestion++;
           loadQuestion();
       });

   Optional 2nd arg overrides the button label:

       showNextChallenge(callback, "FINAL CHALLENGE ▶");
========================================================= */

(function(){

    function findBlurTarget(){

        return (
            document.querySelector(".battle-bottom") ||
            (document.getElementById("answers") &&
                document.getElementById("answers").closest(".question-panel")) ||
            document.getElementById("answers")
        );

    }


    function removeExistingOverlay(){

        var old =
            document.getElementById("nextChallengeOverlay");

        if(old){

            old.remove();

        }

    }


    window.showNextChallenge = function(onNext, label){

        var target =
            findBlurTarget();


        if(!target){

            /* no panel found — just proceed, don't block gameplay */

            if(typeof onNext === "function"){

                onNext();

            }

            return;

        }


              removeExistingOverlay();


        target.classList.add(
            "next-challenge-blur"
        );


        /* force-hide the answer-guide arrow/badge and the
           struggle-guide popup if they happen to be open */

        var guideArrow =
            document.getElementById("answerGuideArrow");

        if(guideArrow){

            guideArrow.classList.remove("show");

        }


        var guideBadge =
            document.querySelector(".witch-guide-badge");

        if(guideBadge){

            guideBadge.classList.remove("show");

        }


        var struggleOverlay =
            document.getElementById("struggleOverlay");

        if(struggleOverlay){

            struggleOverlay.classList.remove("show");

        }


              var overlay =
            document.createElement("div");

        overlay.id =
            "nextChallengeOverlay";

        overlay.className =
            "next-challenge-overlay";


        var ring =
            document.createElement("div");

        ring.className =
            "portal-ring";

        overlay.appendChild(ring);


        var labelEl =
            document.createElement("div");

        labelEl.className =
            "next-challenge-label";

        labelEl.textContent =
            "✦ CHALLENGE CLEARED ✦";

        overlay.appendChild(labelEl);

        var button =
            document.createElement("button");

        button.type =
            "button";

        button.className =
            "next-challenge-button";

        button.textContent =
            label || "NEXT CHALLENGE ▶";


        button.addEventListener(
            "click",
            function(){

                hideNextChallenge();


                if(typeof onNext === "function"){

                    onNext();

                }

            }
        );


        overlay.appendChild(button);

        target.appendChild(overlay);


        requestAnimationFrame(function(){

            overlay.classList.add("show");

        });

    };


    window.hideNextChallenge = function(){

        var target =
            findBlurTarget();


        if(target){

            target.classList.remove(
                "next-challenge-blur"
            );

        }


        removeExistingOverlay();

    };

})();