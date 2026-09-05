// CHARACTER DATA








const characters = {

    gitei: {
        name: "GiTei",
        role: "The Logic Witch",
        specialty: "Programming Logic & Problem-Solving",
        description:
            "A calm and focused witch who helps learners understand programming logic and solve problems step by step.",
        stat: "LOGIC",
        image: "images/GiTei.png",
        video: "videos/gitei.mp4"
    },

    achi: {
        name: "Achi",
        role: "The Data Witch",
        specialty: "C# Fundamentals & Data",
        description:
            "A clever witch who guides learners in understanding C# fundamentals, variables, and different types of data.",
        stat: "DATA",
        image: "images/Achi.png",
        video: "videos/achi.mp4"
    },

    leeserin: {
        name: "LeeSerin",
        role: "The Codeweaver Witch",
        specialty: "C# Syntax & Structure",
        description:
            "A knowledgeable witch who helps learners understand proper C# syntax and organize their code correctly.",
        stat: "SYNTAX",
        image: "images/LeeSerin.png",
        video: "videos/leeserin.mp4"
    },

    cythera: {
        name: "Cythera",
        role: "The Ember Witch",
        specialty: "Practice & Challenges",
        description:
            "A determined witch who challenges learners to apply their knowledge through programming activities and coding challenges.",
        stat: "CHALLENGE",
        image: "images/Cythera.png",
        video: "videos/cythera.mp4"
    },

    zari: {
        name: "Zari",
        role: "The Logiccraft Witch",
        specialty: "Applications & Solutions",
        description:
            "An energetic witch who encourages learners to apply programming concepts and create effective solutions.",
        stat: "APPLICATION",
        image: "images/Zari.png",
        video: "videos/zari.mp4"
    }

};


// ========================================
// PAGE ELEMENTS
// ========================================


// CHARACTER MODAL

const characterModal =
    document.getElementById("characterModal");

const openCharacterSelect =
    document.getElementById("openCharacterSelect");

const changeCharacterButton =
    document.getElementById("changeCharacterButton");

const closeCharacterModalButton =
    document.getElementById("closeCharacterSelect");

const characterOptions =
    document.querySelectorAll(".character-option");


// CHARACTER DETAILS

const characterDetails =
    document.getElementById("characterDetails");

const detailClass =
    document.getElementById("detailClass");

const detailName =
    document.getElementById("detailName");

const detailSpecialty =
    document.getElementById("detailSpecialty");

const detailDescription =
    document.getElementById("detailDescription");

const detailStat =
    document.getElementById("detailStat");


// CHARACTER VIDEO

const characterVideo =
    document.getElementById("characterVideo");

const characterVideoSource =
    document.getElementById("characterVideoSource");

const videoPlaceholder =
    document.getElementById("videoPlaceholder");


// SELECTED CHARACTER CARD

const selectedCharacterCard =
    document.getElementById("selectedCharacterCard");

const selectedCharacterImage =
    document.getElementById("selectedCharacterImage");

const selectedCharacterName =
    document.getElementById("selectedCharacterName");

const selectedCharacterRole =
    document.getElementById("selectedCharacterRole");


// BOOK PANEL

const openBooksButton =
    document.getElementById("openBooks");

const closeBooksButton =
    document.getElementById("closeBooks");

const bookPanel =
    document.getElementById("bookPanel");

const booksUnlockedText =
    document.getElementById("booksUnlocked");

const questProgressText =
    document.getElementById("questProgressText");

const questProgressBar =
    document.querySelector(".quest-progress-bar div");


// ========================================
// CHARACTER MODAL FUNCTIONS
// ========================================

function openCharacterModal() {

    if (!characterModal) {
        return;
    }


    characterModal.classList.add("show");

    document.body.classList.add("modal-open");


    // Hide details when opening
    if (characterDetails) {

        characterDetails.classList.add("hidden");

    }


    // Remove previous selection
    characterOptions.forEach(option => {

        option.classList.remove("selected");

    });

}


// ========================================
// CLOSE CHARACTER MODAL
// ========================================

function closeCharacterModal() {

    if (!characterModal) {
        return;
    }


    characterModal.classList.remove("show");

    document.body.classList.remove("modal-open");


    resetCharacterVideo();

}


// ========================================
// SHOW CHARACTER
// ========================================

function showCharacter(characterKey) {

    const key =
        characterKey.toLowerCase();


    const character =
        characters[key];


    if (!character) {
        return;
    }


    // SHOW DETAILS SECTION

    if (characterDetails) {

        characterDetails.classList.remove("hidden");

    }


    // CHARACTER NAME

    if (detailName) {

        detailName.textContent =
            character.name;

    }


    // CHARACTER ROLE / CLASS

    if (detailClass) {

        detailClass.textContent =
            character.role.toUpperCase();

    }


    // CHARACTER SPECIALTY

    if (detailSpecialty) {

        detailSpecialty.textContent =
            character.specialty;

    }


    // CHARACTER DESCRIPTION

    if (detailDescription) {

        detailDescription.textContent =
            character.description;

    }


    // CHARACTER STAT

    if (detailStat) {

        detailStat.textContent =
            character.stat;

    }


    // ========================================
    // UPDATE SELECTED CHARACTER CARD
    // ========================================

    if (selectedCharacterImage) {

        selectedCharacterImage.src =
            character.image;

        selectedCharacterImage.alt =
            character.name;

    }


    if (selectedCharacterName) {

        selectedCharacterName.textContent =
            character.name;

    }


    if (selectedCharacterRole) {

        selectedCharacterRole.textContent =
            character.role;

    }


    // ========================================
    // CHARACTER SELECTION EFFECT
    // ========================================

    characterOptions.forEach(option => {

        option.classList.remove("selected");


        if (
            option.dataset.character.toLowerCase()
            === key
        ) {

            option.classList.add("selected");

        }

    });


    // ========================================
    // SAVE SELECTED CHARACTER
    // ========================================

    localStorage.setItem(
        "cieSharpCharacter",
        key
    );


    // ========================================
    // PLAY CHARACTER VIDEO
    // ========================================

    playCharacterVideo(
        character.video
    );

    scrollToCharacterDetails();

}


// ========================================
// PLAY CHARACTER VIDEO
// ========================================

function playCharacterVideo(videoSource) {

    if (!characterVideo) {
        return;
    }


    // Set video source

    if (characterVideoSource) {

        characterVideoSource.src =
            videoSource;

    } else {

        characterVideo.src =
            videoSource;

    }


    characterVideo.load();


    // Hide placeholder

    if (videoPlaceholder) {

        videoPlaceholder.style.display =
            "none";

    }


    // Play video

    characterVideo.play().catch(() => {

        // Browser may block autoplay

    });

}


// ========================================
// RESET CHARACTER VIDEO
// ========================================

function resetCharacterVideo() {

    if (!characterVideo) {
        return;
    }


    characterVideo.pause();

    characterVideo.currentTime = 0;


    if (characterVideoSource) {

        characterVideoSource.src = "";

    } else {

        characterVideo.src = "";

    }


    characterVideo.load();


    if (videoPlaceholder) {

        videoPlaceholder.style.display =
            "block";

    }

}


// ========================================
// OPEN CHARACTER BUTTON
// ========================================

if (openCharacterSelect) {

    openCharacterSelect.addEventListener(
        "click",
        function () {

            openCharacterModal();

        }
    );

}


// ========================================
// SECOND VIEW CHARACTER BUTTON
// ========================================

if (changeCharacterButton) {

    changeCharacterButton.addEventListener(
        "click",
        function () {

            openCharacterModal();

        }
    );

}


// ========================================
// CLOSE BUTTON X
// ========================================

if (closeCharacterModalButton) {

    closeCharacterModalButton.addEventListener(
        "click",
        function () {

            closeCharacterModal();

        }
    );

}


// ========================================
// CLICK CHARACTER
// ========================================

characterOptions.forEach(option => {

    option.addEventListener(
        "click",
        function () {

            const characterKey =
                this.dataset.character;


            if (characterKey) {

                showCharacter(
                    characterKey
                );

            }

        }
    );

});


// ========================================
// CLOSE WHEN CLICKING OUTSIDE
// ========================================

if (characterModal) {

    characterModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === characterModal
            ) {

                closeCharacterModal();

            }

        }
    );

}


// ========================================
// CLOSE WITH ESC KEY
// ========================================

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeCharacterModal();

            closeBooks();

        }

    }
);


// ========================================
// BOOK PANEL
// ========================================

function openBooks() {

    if (!bookPanel) {
        return;
    }


    bookPanel.classList.add("show");

    document.body.classList.add(
        "books-open"
    );


    checkBookUnlocks();

}


// ========================================
// CLOSE BOOK PANEL
// ========================================

function closeBooks() {

    if (!bookPanel) {
        return;
    }


    bookPanel.classList.remove("show");

    document.body.classList.remove(
        "books-open"
    );

}


// ========================================
// OPEN BOOK BUTTON
// ========================================

if (openBooksButton) {

    openBooksButton.addEventListener(
        "click",
        function () {

            openBooks();

        }
    );

}


// ========================================
// CLOSE BOOK BUTTON
// ========================================

if (closeBooksButton) {

    closeBooksButton.addEventListener(
        "click",
        function () {

            closeBooks();

        }
    );

}


// ========================================
// OPEN BOOK
// ========================================

function openBook(bookNumber) {

    // BOOK 1

    if (bookNumber === 1) {

        window.location.href =
            "../Book1/characters/reading1.html";

        return;

    }


    // BOOK 2

    if (bookNumber === 2) {

        if (
            localStorage.getItem(
                "book2Unlocked"
            ) === "true"
        ) {

            window.location.href =
                "../Book2/characters/character2.html";

        }

        return;

    }


    // BOOK 3

    if (bookNumber === 3) {

        if (
            localStorage.getItem(
                "book3Unlocked"
            ) === "true"
        ) {

            window.location.href =
                "../Book3/characters/character3.html";

        }

        return;

    }


    // BOOK 4

    if (bookNumber === 4) {

        if (
            localStorage.getItem(
                "book4Unlocked"
            ) === "true"
        ) {

            window.location.href =
                "../Book4/characters/character.html";

        }

        return;

    }


    // BOOK 5

    if (bookNumber === 5) {

        if (
            localStorage.getItem(
                "book5Unlocked"
            ) === "true"
        ) {

            window.location.href =
                "../Book5/characters/characters5.html";

        }

        return;

    }


    // BOOK 6

    if (bookNumber === 6) {

        if (
            localStorage.getItem(
                "book6Unlocked"
            ) === "true"
        ) {

            window.location.href =
                "../Book6/characters/characters6.html";

        }

        return;

    }


    // BOOK 7

    if (bookNumber === 7) {

        if (
            localStorage.getItem(
                "book7Unlocked"
            ) === "true"
        ) {

            window.location.href =
                "../Book7/characters/characters7.html";

        }

        return;

    }


    // BOOK 8

    if (bookNumber === 8) {

        if (
            localStorage.getItem(
                "book8Unlocked"
            ) === "true"
        ) {

            window.location.href =
                "../Book8/characters/characters8.html";

        }

        return;

    }


    // BOOK 9

    if (bookNumber === 9) {

        if (
            localStorage.getItem(
                "book9Unlocked"
            ) === "true"
        ) {

            window.location.href =
                "../Book9/characters/characters9.html";

        }

    }

}


// ========================================
// BOOK CLICK EVENTS
// ========================================

const bookButtons =
    document.querySelectorAll(
        ".story-book"
    );


bookButtons.forEach(book => {

    book.addEventListener(
        "click",
        function () {

            const bookNumber =
                Number(
                    this.dataset.book
                );


            // BOOK 1

            if (
                this.classList.contains(
                    "active-book"
                )
            ) {

                openBook(1);

                return;

            }


            // OTHER BOOKS

            if (!bookNumber) {
                return;
            }


            if (
                this.classList.contains(
                    "locked-book"
                )
            ) {

                return;
            }


            openBook(bookNumber);

        }
    );

});


// ========================================
// CHECK BOOK UNLOCKS
// ========================================

function checkBookUnlocks() {

    const bookCards =
        document.querySelectorAll(
            ".story-book"
        );


    let unlockedBooks = 1;


    bookCards.forEach(card => {

        const bookNumber =
            Number(
                card.dataset.book
            );


        // Skip Book 1

        if (!bookNumber) {
            return;
        }


        const unlocked =
            localStorage.getItem(
                `book${bookNumber}Unlocked`
            ) === "true";


        const lockLabel =
            card.querySelector(
                ".lock-label"
            );


        if (unlocked) {

            card.classList.remove(
                "locked-book"
            );


            card.classList.add(
                "unlocked-book"
            );


            if (lockLabel) {

                lockLabel.textContent =
                    "UNLOCKED";

            }


            unlockedBooks++;

        }

        else {

            card.classList.add(
                "locked-book"
            );


            card.classList.remove(
                "unlocked-book"
            );


            if (lockLabel) {

                if (
                    card.classList.contains(
                        "final-book"
                    )
                ) {

                    lockLabel.textContent =
                        "FINAL BOSS";

                }

                else {

                    lockLabel.textContent =
                        "LOCKED";

                }

            }

        }

    });


    updateBooksCounter(
        unlockedBooks
    );


    updateQuestProgress(
        unlockedBooks
    );

}


// ========================================
// UPDATE BOOK COUNTER
// ========================================

function updateBooksCounter(
    unlockedBooks
) {

    if (!booksUnlockedText) {
        return;
    }


    booksUnlockedText.textContent =
        `${unlockedBooks} / 9`;

}


// ========================================
// UPDATE QUEST PROGRESS
// ========================================

function updateQuestProgress(
    unlockedBooks
) {

    const percentage =
        Math.round(
            (unlockedBooks / 9) * 100
        );


    const safePercentage =
        Math.min(
            percentage,
            100
        );


    if (questProgressText) {

        questProgressText.textContent =
            `${safePercentage}% Complete`;

    }


    if (questProgressBar) {

        questProgressBar.style.width =
            `${safePercentage}%`;

    }

}



// ========================================
// AUTO CHARACTER SHOWCASE
// ========================================

const characterKeys = Object.keys(characters);
let characterCycleIndex = 0;
let characterCycleTimer = null;

function updateSelectedCharacterCard(characterKey) {
    const key = characterKey.toLowerCase();
    const character = characters[key];

    if (!character) {
        return;
    }

    if (selectedCharacterImage) {
        selectedCharacterImage.classList.remove("character-switch");
        void selectedCharacterImage.offsetWidth;
        selectedCharacterImage.classList.add("character-switch");
        selectedCharacterImage.src = character.image;
        selectedCharacterImage.alt = character.name;
    }

    if (selectedCharacterName) {
        selectedCharacterName.textContent = character.name;
    }

    if (selectedCharacterRole) {
        selectedCharacterRole.textContent = character.role;
    }

    if (selectedCharacterCard) {
        selectedCharacterCard.classList.remove(
            "logic", "data", "codeweaver", "ember", "logiccraft"
        );

        const selectedOption = Array.from(characterOptions).find(option =>
            option.dataset.character.toLowerCase() === key
        );

        if (selectedOption) {
            selectedCharacterCard.classList.add(
                ...Array.from(selectedOption.classList).filter(className =>
                    ["logic", "data", "codeweaver", "ember", "logiccraft"].includes(className)
                )
            );
        }
    }
}

function startCharacterShowcase() {
    if (!selectedCharacterCard || characterKeys.length === 0) {
        return;
    }

    if (characterCycleTimer) {
        clearInterval(characterCycleTimer);
    }

    const savedCharacter = localStorage.getItem("cieSharpCharacter");
    const savedIndex = characterKeys.indexOf(savedCharacter);

    characterCycleIndex = savedIndex >= 0 ? savedIndex : 0;
    updateSelectedCharacterCard(characterKeys[characterCycleIndex]);

    characterCycleTimer = setInterval(function () {
        characterCycleIndex =
            (characterCycleIndex + 1) % characterKeys.length;

        updateSelectedCharacterCard(
            characterKeys[characterCycleIndex]
        );
    }, 2000);
}


// ========================================
// AUTO SCROLL TO CHARACTER INFO
// ========================================

function scrollToCharacterDetails() {
    if (!characterDetails) {
        return;
    }

    requestAnimationFrame(function () {
        characterDetails.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        characterDetails.focus({
            preventScroll: true
        });
    });
}


// ========================================
// LOAD SAVED CHARACTER
// ========================================

function loadSavedCharacter() {

    const savedCharacter =
        localStorage.getItem(
            "cieSharpCharacter"
        );


    if (
        !savedCharacter ||
        !characters[savedCharacter]
    ) {
        return;
    }


    const character =
        characters[savedCharacter];


    if (selectedCharacterImage) {

        selectedCharacterImage.src =
            character.image;

        selectedCharacterImage.alt =
            character.name;

    }


    if (selectedCharacterName) {

        selectedCharacterName.textContent =
            character.name;

    }


    if (selectedCharacterRole) {

        selectedCharacterRole.textContent =
            character.role;

    }

}


// ========================================
// MUSIC
// ========================================

const musicButton =
    document.getElementById(
        "musicButton"
    );

const backgroundMusic =
    document.getElementById(
        "bgMusic"
    );


// ========================================
// LOAD MUSIC SETTING
// ========================================

function loadMusicSetting() {

    const musicSetting =
        localStorage.getItem(
            "cieSharpMusic"
        );


    if (
        !musicButton ||
        !backgroundMusic
    ) {
        return;
    }


    if (
        musicSetting === "on"
    ) {

        musicButton.textContent =
            "ON";

    }

    else {

        musicButton.textContent =
            "OFF";

    }

}


// ========================================
// MUSIC BUTTON
// ========================================

if (musicButton) {

    musicButton.addEventListener(
        "click",
        function () {

            if (!backgroundMusic) {
                return;
            }


            if (
                backgroundMusic.paused
            ) {

                backgroundMusic.play()
                    .then(() => {

                        musicButton.textContent =
                            "ON";

                        localStorage.setItem(
                            "cieSharpMusic",
                            "on"
                        );

                    })
                    .catch(() => {

                        console.log(
                            "Music could not play."
                        );

                    });

            }

            else {

                backgroundMusic.pause();

                musicButton.textContent =
                    "OFF";


                localStorage.setItem(
                    "cieSharpMusic",
                    "off"
                );

            }

        }
    );

}


// ========================================
// INITIALIZE
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadSavedCharacter();

        startCharacterShowcase();

        loadMusicSetting();

        checkBookUnlocks();

    }
);
