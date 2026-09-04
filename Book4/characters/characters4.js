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
   SHOW THE CHARACTER SCREEN
   Book IV has no intro video screen like Book I's
   character.html, so nothing else removes the
   "display:none" that .character-screen starts with
   in character4.css. Show it immediately on load.
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

                   Saved under "cieSharpCharacter" since that
                   is the shared key book1.js / book2.js /
                   book3.js / book4.js all read from.
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
   CONTINUE TO BOOK 4

   This screen is Book IV's character select, so it
   should send the player into book4.html.
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
            "Entering Book IV as:",
            selectedWitch
        );


        window.location.href =
            "../book4.html";

    }
);