/* =========================
   CHARACTER DATA
========================= */

var characters = {

    GiTei: {

        name: "Logic Witch",

        displayName: "Logic Witch — GiTei",

        role: "The Problem Solver",

        description:
        "Learn C# through logic, reasoning, and problem-solving.",

        image: "images/GiTei.png"

    },


    Achi: {

        name: "Data Witch",

        displayName: "Data Witch — Achi",

        role: "The Keeper of Knowledge",

        description:
        "Learn C# through variables, data, and information.",

        image: "images/Achi.png"

    },


    LeeSerin: {

        name: "Codeweaver Witch",

        displayName: "Codeweaver Witch — LeeSerin",

        role: "The Master of Syntax",

        description:
        "Learn C# through syntax and programming structure.",

        image: "images/LeeSerin.png"

    },


    Cythera: {

        name: "Ember Witch",

        displayName: "Ember Witch — Cythera",

        role: "The Challenge Master",

        description:
        "Learn C# through practice, challenges, and competition.",

        image: "images/Cythera.png"

    },


    /* FIXED: key changed from "joses" to "Zari" so it matches
       the data-character="Zari" attribute used in character2.html */

    Zari: {

        name: "Logicraft Witch",

        displayName: "Logicraft Witch — Zari",

        role: "The Creative Builder",

        description:
        "Learn C# through applications and creative solutions.",

        image: "images/Zari.png"

    }

};


/* =========================
   ELEMENTS
========================= */


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
   FIXED: SHOW THE CHARACTER SCREEN
   Book II has no intro video screen like Book I's
   character.html, so nothing was ever removing the
   "display:none" that .character-screen starts with
   in character2.css. Show it immediately on load.
========================= */

if(characterScreen){

    characterScreen.style.display =
        "block";

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

                   FIXED: also save under "cieSharpCharacter",
                   since that is the key book2.js actually
                   reads from. The old code only saved
                   "selectedCharacter", which book2.js never
                   looks at, so the witch chosen here never
                   carried over into Book II.
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
                    "cieSharpCharacter",
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
   CONTINUE TO BOOK 2

   FIXED: this screen is Book II's character select, so it
   should send the player into book2.html, not book1.html.
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
            "Entering Book II as:",
            selectedWitch
        );


        window.location.href =
            "../book2.html";

    }
);