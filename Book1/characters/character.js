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

var changeCharacterIndicator =
    document.getElementById(
        "changeCharacterIndicator"
    );


var charactersContainer =
    document.querySelector(
        ".characters-container"
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
   SHOW THE CHARACTER SCREEN IMMEDIATELY
   (No more intro video / story screens — the player already
   went through reading1.html's Study Scroll before landing
   here, so we go straight into character picking.)
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

                /* =========================
                   AUTO SCROLL TO CONTINUE BUTTON
                ========================= */

                var selectedPanel =
                    document.getElementById(
                        "selectedPanel"
                    );


                if(selectedPanel){

                    selectedPanel.scrollIntoView({

                        behavior: "smooth",

                        block: "center"

                    });

                }


                /* SHOW CHANGE CHARACTER INDICATOR*/

                if(changeCharacterIndicator){

                    changeCharacterIndicator.classList.add(
                        "show"
                    );

                }

            }
        );

    }
);


/* =========================
   CONTINUE TO BOOK 1
   Readings already happened on reading1.html, so this
   button now goes straight into the Book I trial.
========================= */


if(changeCharacterIndicator){

    changeCharacterIndicator.addEventListener(
        "click",
        function(){

            if(charactersContainer){

                charactersContainer.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            }


            changeCharacterIndicator.classList.remove(
                "show"
            );

        }
    );

}

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


        location.href =
            "../book1.html";

    }
);