/*CHARACTER DATA*/

var characters = {

    GiTei: {

        name: "GiTei",

        fullName: "Logic Witch",

        className: "LOGIC WITCH",

        specialty: "Programming Logic & Problem-Solving",

        description:
            "The Logic Witch is a clever problem-solver who helps learners understand programming logic, patterns, and step-by-step problem solving.",

        stat: "LOGIC",

        colorClass: "logic",

        image: "images/GiTei.png",

        video: "videos/GiTei.mp4"

    },


    Achi: {

        name: "Achi",

        fullName: "Data Witch",

        className: "DATA WITCH",

        specialty: "C# Fundamentals & Data",

        description:
            "The Data Witch specializes in C# fundamentals and understanding how information is represented, stored, and managed inside a program.",

        stat: "DATA",

        colorClass: "data",

        image: "images/Achi.png",

        video: "videos/Achi.mp4"

    },


    LeeSerin: {

        name: "LeeSerin",

        fullName: "Codeweaver Witch",

        className: "CODEWEAVER WITCH",

        specialty: "C# Syntax & Programming Structure",

        description:
            "The Codeweaver Witch focuses on C# syntax and programming structure, helping learners understand how different parts of a program fit together.",

        stat: "SYNTAX",

        colorClass: "codeweaver",

        image: "images/LeeSerin.png",

        video: "videos/LeeSerin.mp4"

    },


    Cythera: {

        name: "Cythera",

        fullName: "Ember Witch",

        className: "EMBER WITCH",

        specialty: "C# Practice & Challenges",

        description:
            "The Ember Witch is eager to take on challenges and encourages learners to practice, retry, and improve their programming skills.",

        stat: "PRACTICE",

        colorClass: "ember",

        image: "images/Cythera.png",

        video: "videos/Cythera.mp4"

    },


    Zari: {

        name: "Zari",

        fullName: "Logiccraft Witch",

        className: "LOGICCRAFT WITCH",

        specialty: "C# Applications & Creative Solutions",

        description:
            "The Logiccraft Witch focuses on creative problem-solving and applying programming concepts to practical programming situations.",

        stat: "APPLICATION",

        colorClass: "logiccraft",

        image: "images/Zari.png",

        video: "videos/Zari.mp4"

    }

};


/* ELEMENTS */

var characterModal =
    document.getElementById("characterModal");

var openCharacterSelect =
    document.getElementById("openCharacterSelect");

var closeCharacterSelect =
    document.getElementById("closeCharacterSelect");

var changeCharacterButton =
    document.getElementById("changeCharacterButton");

var characterOptions =
    document.querySelectorAll(".character-option");

var characterDetails =
    document.getElementById("characterDetails");

var detailClass =
    document.getElementById("detailClass");

var detailName =
    document.getElementById("detailName");

var detailSpecialty =
    document.getElementById("detailSpecialty");

var detailDescription =
    document.getElementById("detailDescription");

var detailStat =
    document.getElementById("detailStat");

var confirmCharacter =
    document.getElementById("confirmCharacter");

var characterVideo =
    document.getElementById("characterVideo");

var characterVideoSource =
    document.getElementById("characterVideoSource");

var selectedCharacterImage =
    document.getElementById("selectedCharacterImage");

var selectedCharacterName =
    document.getElementById("selectedCharacterName");

var selectedCharacterRole =
    document.getElementById("selectedCharacterRole");

var selectedCharacterCard =
    document.getElementById("selectedCharacterCard");

var videoPlaceholder =
    document.getElementById("videoPlaceholder");


/* TEMPORARY SELECTED CHARACTER */

var currentSelectedCharacter = null;


/* VIDEO RESET */

function resetCharacterVideo(){

    if(!characterVideo){

        return;

    }

    characterVideo.pause();

    characterVideo.currentTime = 0;

    characterVideoSource.src = "";

    characterVideo.load();

}


/* PLAY CHARACTER VIDEO */

function playCharacterVideo(){

    if(!characterVideo){

        return;

    }

    characterVideo.loop = true;

    characterVideo.muted = false;

    var playPromise =
        characterVideo.play();

    if(playPromise !== undefined){

        playPromise.catch(function(){

            /*
            Browser autoplay protection may prevent
            the video from starting automatically.
            */

            console.log(
                "Video autoplay was blocked by the browser."
            );

        });

    }

}


/* OPEN CHARACTER MODAL */

function openCharacterModal(){

    characterModal.classList.add("show");

}


/* CLOSE CHARACTER MODAL*/

function closeCharacterModal(){

    resetCharacterVideo();

    characterModal.classList.remove("show");

}


/* OPEN EVENTS */

openCharacterSelect.addEventListener(
    "click",
    function(){

        openCharacterModal();

    }
);


closeCharacterSelect.addEventListener(
    "click",
    function(){

        closeCharacterModal();

    }
);


changeCharacterButton.addEventListener(
    "click",
    function(){

        openCharacterModal();

    }
);


/* CHARACTER SELECTION */

characterOptions.forEach(function(option){

    option.addEventListener(
        "click",
        function(){

            var characterId =
                option.getAttribute(
                    "data-character"
                );

            var character =
                characters[characterId];


            currentSelectedCharacter =
                characterId;


            /* REMOVE PREVIOUS SELECTION */

            characterOptions.forEach(
                function(item){

                    item.classList.remove(
                        "selected"
                    );

                }
            );


            /* SELECT CURRENT CHARACTER */

            option.classList.add(
                "selected"
            );


            /* CHARACTER DETAILS */

            detailClass.innerText =
                character.className;

            detailName.innerText =
                character.name;

            detailSpecialty.innerText =
                character.specialty;

            detailDescription.innerText =
                character.description;

            detailStat.innerText =
                character.stat;


            /* RESET OLD VIDEO */

            resetCharacterVideo();


            /* LOAD NEW VIDEO */

            characterVideoSource.src =
                character.video;

            characterVideo.loop = true;

            characterVideo.load();


            videoPlaceholder.innerText =
                "Character animation preview: " +
                character.name;


            /* SHOW DETAILS */

            characterDetails.classList.remove(
                "hidden"
            );


            /* PLAY VIDEO */

            characterVideo.addEventListener(
                "loadeddata",
                function(){

                    playCharacterVideo();

                },
                {
                    once: true
                }
            );


            /* SCROLL TO DETAILS */

            setTimeout(
                function(){

                    characterDetails.scrollIntoView({

                        behavior: "smooth",

                        block: "nearest"

                    });

                },
                100
            );

        }
    );

});


/* 
   CONFIRM CHARACTER */

confirmCharacter.addEventListener(
    "click",
    function(){

        if(!currentSelectedCharacter){

            alert(
                "Please choose a character first."
            );

            return;

        }


        var character =
            characters[
                currentSelectedCharacter
            ];


        /* SAVE CHARACTER */

        localStorage.setItem(
            "cieSharpCharacter",
            currentSelectedCharacter
        );


        /* UPDATE MAIN CHARACTER CARD */

        updateSelectedCharacter(
            character
        );


        /* STOP VIDEO */

        resetCharacterVideo();


        /* CLOSE MODAL */

        closeCharacterModal();

    }
);


/* UPDATE SELECTED CHARACTER */

function updateSelectedCharacter(character){

    selectedCharacterImage.src =
        character.image;

    selectedCharacterImage.alt =
        character.fullName;

    selectedCharacterName.innerText =
        character.name;

    selectedCharacterRole.innerText =
        character.fullName;


    /* REMOVE OLD COLOR */

    selectedCharacterCard.classList.remove(

        "logic",

        "data",

        "codeweaver",

        "ember",

        "logiccraft"

    );


    /* ADD NEW COLOR */

    selectedCharacterCard.classList.add(
        character.colorClass
    );

}


/* LOAD SAVED CHARACTER */

function loadSavedCharacter(){

    var savedCharacter =
        localStorage.getItem(
            "cieSharpCharacter"
        );


    if(!savedCharacter){

        selectedCharacterName.innerText =
            "NO CHARACTER";

        selectedCharacterRole.innerText =
            "Choose your witch";

        return;

    }


    if(!characters[savedCharacter]){

        return;

    }


    var character =
        characters[savedCharacter];


    currentSelectedCharacter =
        savedCharacter;


    updateSelectedCharacter(
        character
    );

}


/* BOOK 1 */

function openBook1(){

    var savedCharacter =
        localStorage.getItem(
            "cieSharpCharacter"
        );


    if(!savedCharacter){

        openCharacterModal();

        alert(
            "Choose your character before entering Book I."
        );

        return;

    }


    window.location.href =
        "../Book1/characters/character.html";

}


/* =========================================================
   BOOK UNLOCKING (added)
   Reads the progress flags saved by each book (e.g.
   "book2Unlocked" saved by Book I once it's completed) and
   turns the matching locked-book card into a clickable one.
========================================================= */

function unlockBook(bookNumber, path){

    var bookEl =
        document.querySelector(
            '[data-book="' + bookNumber + '"]'
        );


    if(!bookEl){

        return;

    }


    if(!bookEl.classList.contains("locked-book")){

        /* ALREADY UNLOCKED */

        return;

    }


    bookEl.classList.remove(
        "locked-book"
    );

    bookEl.classList.add(
        "active-book"
    );


    var lockLabel =
        bookEl.querySelector(".lock-label");


    if(lockLabel){

        lockLabel.outerHTML =
            '<span class="play-label">▶ START CHAPTER</span>';

    }


    bookEl.addEventListener(
        "click",
        function(){

            window.location.href = path;

        }
    );

}


function checkBookUnlocks(){

    if(localStorage.getItem("book2Unlocked") === "true"){

        unlockBook(
            2,
            "../Book2/characters/character2.html"
        );

    }


    /*
    When Book II starts saving its own "book3Unlocked" flag,
    add the same pattern here, e.g.:

    if(localStorage.getItem("book3Unlocked") === "true"){

        unlockBook(3, "/Book3/characters/character.html");

    }
    */

}


/* CLICK OUTSIDE MODAL */

characterModal.addEventListener(
    "click",
    function(event){

        if(
            event.target === characterModal
        ){

            closeCharacterModal();

        }

    }
);


/* LOAD ON START */

loadSavedCharacter();

checkBookUnlocks();


/* BACKGROUND MUSIC */

var bgMusic =
    document.getElementById("bgMusic");

var musicButton =
    document.getElementById("musicButton");


/* VOLUME */

bgMusic.volume = 1.00;


/* REMEMBER MUSIC SETTING */

var musicEnabled =
    localStorage.getItem(
        "cieSharpMusic"
    );


/* MUSIC BUTTON */

musicButton.addEventListener(
    "click",
    function(){

        if(bgMusic.paused){

            bgMusic.play()
                .then(
                    function(){

                        musicButton.innerText =
                            "🔊";

                        localStorage.setItem(
                            "cieSharpMusic",
                            "on"
                        );

                    }
                )
                .catch(
                    function(){

                        alert(
                            "Click the music button again to start the music."
                        );

                    }
                );

        }

        else{

            bgMusic.pause();

            musicButton.innerText =
                "🔇";

            localStorage.setItem(
                "cieSharpMusic",
                "off"
            );

        }

    }
);


/* START MUSIC IF PREVIOUSLY ENABLED */

if(
    musicEnabled === "on"
){

    bgMusic.play()
        .then(
            function(){

                musicButton.innerText =
                    "🔊";

            }
        )
        .catch(
            function(){

                musicButton.innerText =
                    "🔇";

            }
        );

}