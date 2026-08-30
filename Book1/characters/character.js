/* =========================
   CHARACTER DATA
========================= */

var characters = {

    noe: {

        name: "Logic Witch",

        displayName: "Logic Witch — Noe",

        role: "The Problem Solver",

        description:
        "Learn C# through logic, reasoning, and problem-solving.",

        image: "images/noe.png"

    },


    raynan: {

        name: "Data Witch",

        displayName: "Data Witch — Raynan",

        role: "The Keeper of Knowledge",

        description:
        "Learn C# through variables, data, and information.",

        image: "images/raynan.png"

    },


    precy: {

        name: "Codeweaver Witch",

        displayName: "Codeweaver Witch — Precy",

        role: "The Master of Syntax",

        description:
        "Learn C# through syntax and programming structure.",

        image: "images/precy.png"

    },


    bea: {

        name: "Ember Witch",

        displayName: "Ember Witch — Bea",

        role: "The Challenge Master",

        description:
        "Learn C# through practice, challenges, and competition.",

        image: "images/bea.png"

    },


    joses: {

        name: "Logicraft Witch",

        displayName: "Logicraft Witch — Joses",

        role: "The Creative Builder",

        description:
        "Learn C# through applications and creative solutions.",

        image: "images/joses.png"

    }

};


/* =========================
   ELEMENTS
========================= */

var introStartScreen =
    document.getElementById(
        "introStartScreen"
    );


var startStoryButton =
    document.getElementById(
        "startStoryButton"
    );


var introVideoScreen =
    document.getElementById(
        "introVideoScreen"
    );


var storyVideo =
    document.getElementById(
        "storyVideo"
    );


var skipStoryButton =
    document.getElementById(
        "skipStoryButton"
    );


var characterScreen =
    document.getElementById(
        "characterScreen"
    );


var characterCards =
    document.querySelectorAll(
        ".character-card"
    );


var selectedName =
    document.getElementById(
        "selectedName"
    );


var selectedDescription =
    document.getElementById(
        "selectedDescription"
    );


var continueButton =
    document.getElementById(
        "continueButton"
    );


/* =========================
   START STORY
========================= */

startStoryButton.addEventListener(
    "click",
    function(){

        introStartScreen.classList.add(
            "fade-out"
        );


        setTimeout(function(){

            introStartScreen.style.display =
                "none";


            introVideoScreen.style.display =
                "flex";


            storyVideo.currentTime = 0;


            storyVideo.muted = false;


            storyVideo.volume = 1;


            storyVideo.play().catch(
                function(error){

                    console.log(
                        "Video could not start:",
                        error
                    );

                }
            );


        },800);

    }
);


/* =========================
   SHOW SKIP AFTER 40 SEC
========================= */

storyVideo.addEventListener(
    "timeupdate",
    function(){

        if(storyVideo.currentTime >= 40){

            skipStoryButton.classList.add(
                "show"
            );

        }

    }
);


/* =========================
   SKIP STORY
========================= */

skipStoryButton.addEventListener(
    "click",
    function(){

        finishStory();

    }
);


/* =========================
   VIDEO FINISHED
========================= */

storyVideo.addEventListener(
    "ended",
    function(){

        finishStory();

    }
);


/* =========================
   FINISH STORY
========================= */

function finishStory(){

    storyVideo.pause();

    introVideoScreen.classList.add(
        "fade-out"
    );


    setTimeout(function(){

        introVideoScreen.style.display =
            "none";


        characterScreen.style.display =
            "block";


        window.scrollTo({
            top:0,
            behavior:"smooth"
        });


    },800);

}


/* =========================
   CHARACTER SELECTION
========================= */

characterCards.forEach(
    function(card){

        card.addEventListener(
            "click",
            function(){

                /* REMOVE OLD SELECTION */

                characterCards.forEach(
                    function(otherCard){

                        otherCard.classList.remove(
                            "selected"
                        );

                    }
                );


                /* SELECT CARD */

                card.classList.add(
                    "selected"
                );


                /* GET CHARACTER */

                var characterID =
                    card.getAttribute(
                        "data-character"
                    );


                var data =
                    characters[characterID];


                if(!data){

                    return;

                }


                /* UPDATE PANEL */

                selectedName.textContent =
                    data.displayName;


                selectedDescription.textContent =
                    data.description;


                /* ENABLE BUTTON */

                continueButton.disabled =
                    false;


                /* =========================
                   SAVE CHARACTER
                ========================= */

                localStorage.setItem(
                    "selectedWitch",
                    data.name
                );


                localStorage.setItem(
                    "selectedCharacter",
                    characterID
                );


                localStorage.setItem(
                    "selectedWitchRole",
                    data.role
                );


                localStorage.setItem(
                    "selectedWitchImage",
                    data.image
                );


                console.log(
                    "Selected Witch:",
                    data.name
                );

            }
        );

    }
);


/* =========================
   CONTINUE TO BOOK 1
========================= */

continueButton.addEventListener(
    "click",
    function(){

        var selectedWitch =
            localStorage.getItem(
                "selectedWitch"
            );


        if(!selectedWitch){

            alert(
                "Please choose a Witch Guide first."
            );

            return;

        }


        console.log(
            "Entering Book I as:",
            selectedWitch
        );


        window.location.href =
            "/Book1/book1.html";

    }
);