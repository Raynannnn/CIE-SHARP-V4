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


        var overlay =
            document.createElement("div");

        overlay.id =
            "nextChallengeOverlay";

        overlay.className =
            "next-challenge-overlay";


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