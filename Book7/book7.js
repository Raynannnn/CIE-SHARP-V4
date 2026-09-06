/* =========================================================
   CIE-SHARP
   BOOK VII: ARRAY CHAMBER
   THE INDEX GOLEM
   ========================================================= */


/* =========================================================
   CHARACTER DATA
========================================================= */

var selectedCharacter =
    localStorage.getItem("cieSharpCharacter") || "GiTei";


var characters = {

    GiTei: {
        name: "Logic Witch",
        role: "The Problem Solver",
        image: "images/GiTei.png",
        attackVideo: "videos/logic-witch-attack.mp4",
        power: "mysticSightPower"
    },

    Achi: {
        name: "Data Witch",
        role: "The Keeper of Knowledge",
        image: "images/Achi.png",
        attackVideo: "videos/data-witch-attack.mp4",
        power: "omnidataPower"
    },

    LeeSerin: {
        name: "Codeweaver Witch",
        role: "The Master of Syntax",
        image: "images/LeeSerin.png",
        attackVideo: "videos/codeweaver-witch-attack.mp4",
        power: "syntaxSorceryPower"
    },

    Cythera: {
        name: "Ember Witch",
        role: "The Challenge Master",
        image: "images/Cythera.png",
        attackVideo: "videos/ember-witch-attack.mp4",
        power: "flameburstPower"
    },

    Zari: {
        name: "Logicraft Witch",
        role: "The Creative Builder",
        image: "images/Zari.png",
        attackVideo: "videos/logicraft-witch-attack.mp4",
        power: "mindcraftPower"
    }

};


var player =
    characters[selectedCharacter] ||
    characters.GiTei;



/* =========================================================
   PLAYER DISPLAY
========================================================= */

document.getElementById("playerName").textContent =
    player.name;

document.getElementById("playerRole").textContent =
    player.role;

document.getElementById("playerCharacter").src =
    player.image;

document.getElementById("playerCharacter").alt =
    player.name;

document.getElementById("startWitchImage").src =
    player.image;

document.getElementById("startWitchName").textContent =
    player.name;



/* =========================================================
   ONLY SELECTED WITCH POWER
========================================================= */

var specialPowerIds = [

    "mysticSightPower",
    "omnidataPower",
    "syntaxSorceryPower",
    "flameburstPower",
    "mindcraftPower"

];


specialPowerIds.forEach(function(id){

    var button =
        document.getElementById(id);

    if(!button){
        return;
    }

    if(id === player.power){
        button.style.display = "";
    }

    else{
        button.style.display = "none";
    }

});



/* =========================================================
   GAME VARIABLES
========================================================= */

var playerHP = 100;

var enemyHP = 100;

var score = 0;

var essence = 0;

var currentQuestion = 0;

var answered = false;



/* =========================================================
   POWER UPS
========================================================= */

var hintCount = 2;

var healCount = 1;

var doubleCount = 1;

var doublePowerActive = false;

var mysticSightCount = 1;

var omnidataCount = 1;

var syntaxSorceryCount = 1;

var flameburstCount = 1;

var mindcraftCount = 1;



/* =========================================================
   BOOK VII QUESTIONS
========================================================= */

var questions = [

    /* =====================================================
       MICROGAME 1 — DATA MATCH
    ===================================================== */

    {
        section: "DATA MATCH",

        mode: "choice",

        question:
            "Challenge 1 — What is stored at index 0?",

        code:
`string[] spells = {"Fire", "Ice", "Wind"};`,

        answers: [

            '"Fire"',

            '"Ice"',

            '"Wind"',

            '0'

        ],

        correct: 0,

        feedback:
            "Arrays start counting from index 0. Fire is the first item.",

        rationale:
            'The first element of the array is "Fire", and the first element is stored at index 0.'

    },


    {
        section: "DATA MATCH",

        mode: "choice",

        question:
            "Challenge 2 — What is stored at index 2?",

        code:
`string[] spells = {"Fire", "Ice", "Wind"};`,

        answers: [

            '"Fire"',

            '"Ice"',

            '"Wind"',

            '2'

        ],

        correct: 2,

        feedback:
            "Count from zero: Fire = 0, Ice = 1, Wind = 2.",

        rationale:
            'The third element is "Wind". Because C# arrays start at index 0, Wind is stored at index 2.'

    },


    {
        section: "DATA MATCH",

        mode: "type",

        question:
            'Challenge 3 — Complete the index to display "Ice".',

        code:
`string[] spells = {"Fire", "Ice", "Wind"};

Console.WriteLine(spells[___]);`,

        expectedAnswer:
            "1",

        placeholder:
            "Type the index...",

        feedback:
            "Fire = 0, Ice = 1, Wind = 2.",

        rationale:
            'Ice is the second element, but arrays start counting at 0. Therefore, Ice is at index 1.'

    },


    /* =====================================================
       MICROGAME 2 — MEMORY VAULT
    ===================================================== */

    {
        section: "MEMORY VAULT",

        mode: "choice",

        question:
            "Challenge 1 — What is scores[3]?",

        code:
`int[] scores = {10, 20, 30, 40};

Console.WriteLine(scores[3]);`,

        answers: [

            "10",

            "20",

            "30",

            "40"

        ],

        correct: 3,

        feedback:
            "Count from index 0: 10 = 0, 20 = 1, 30 = 2, 40 = 3.",

        rationale:
            "The fourth element is 40. Since the first element uses index 0, the fourth element uses index 3."

    },


    {
        section: "MEMORY VAULT",

        mode: "choice",

        question:
            "Challenge 2 — What is the first index of an array?",

        code:
`int[] levels = {1, 2, 3};`,

        answers: [

            "0",

            "1",

            "2",

            "3"

        ],

        correct: 0,

        feedback:
            "C# starts array indexes at 0, not 1.",

        rationale:
            "The first element of a C# array is always accessed using index 0."

    },


    {
        section: "MEMORY VAULT",

        mode: "choice",

        question:
            "Challenge 3 — How many elements are in the array?",

        code:
`int[] levels = {1, 2, 3, 4, 5};`,

        answers: [

            "3",

            "4",

            "5",

            "6"

        ],

        correct: 2,

        feedback:
            "Count the elements: 1, 2, 3, 4, 5.",

        rationale:
            "The array contains five values, so it has 5 elements."

    },


    /* =====================================================
       MICROGAME 3 — FIND THE LOGICAL ERROR
    ===================================================== */

    {
        section: "FIND THE LOGICAL ERROR",

        mode: "choice",

        question:
            "Challenge 1 — What is wrong with this code?",

        code:
`int[] scores = {10, 20, 30};

Console.WriteLine(scores[3]);`,

        answers: [

            "Index 3 does not exist. Valid indexes are 0–2.",

            "The array has four elements.",

            "Index 0 does not exist.",

            "The code should use scores[4]."

        ],

        correct: 0,

        feedback:
            "The array has three elements, so the valid indexes are 0, 1, and 2.",

        rationale:
            "There are only three elements. Their indexes are 0, 1, and 2. Index 3 is outside the array."

    },


    {
        section: "FIND THE LOGICAL ERROR",

        mode: "choice",

        question:
            "Challenge 2 — What is wrong with this code?",

        code:
`string[] items = {"Sword", "Shield"};

Console.WriteLine(items[2]);`,

        answers: [

            "Index 2 is outside the array.",

            "Index 0 is outside the array.",

            "The array contains three items.",

            "String arrays cannot use indexes."

        ],

        correct: 0,

        feedback:
            "There are only two items. Their indexes are 0 and 1.",

        rationale:
            "The array contains two elements, so its valid indexes are only 0 and 1. Index 2 is outside the array."

    },


    {
        section: "FIND THE LOGICAL ERROR",

        mode: "choice",

        question:
            "Challenge 3 — Fix the array index.",

        code:
`int[] numbers = {1, 2, 3};

Console.WriteLine(numbers[3]);`,

        answers: [

            "Console.WriteLine(numbers[0]);",

            "Console.WriteLine(numbers[1]);",

            "Console.WriteLine(numbers[2]);",

            "Console.WriteLine(numbers[4]);"

        ],

        correct: 2,

        feedback:
            "The array has three elements, so the last valid index is 2.",

        rationale:
            "The values are stored at indexes 0, 1, and 2. Therefore, the last valid index is numbers[2]."

    }

];



/* =========================================================
   DOM ELEMENTS
========================================================= */

var questionNumber =
    document.getElementById("questionNumber");

var questionType =
    document.getElementById("questionType");

var questionText =
    document.getElementById("questionText");

var codeDisplay =
    document.getElementById("codeDisplay");

var answers =
    document.getElementById("answers");

var feedback =
    document.getElementById("feedback");

var battleMessage =
    document.getElementById("battleMessage");

var playerHp =
    document.getElementById("playerHp");

var enemyHp =
    document.getElementById("enemyHp");

var playerHpText =
    document.getElementById("playerHpText");

var enemyHpText =
    document.getElementById("enemyHpText");

var scoreDisplay =
    document.getElementById("score");

var essenceDisplay =
    document.getElementById("essence");

var trialStatus =
    document.getElementById("trialStatus");

var rationaleBox =
    document.getElementById("rationaleBox");

var rationaleText =
    document.getElementById("rationaleText");

var rationaleClose =
    document.getElementById("rationaleClose");

var attackAnimation =
    document.getElementById("attackAnimation");

var attackVideo =
    document.getElementById("attackVideo");

var attackVideoSource =
    document.getElementById("attackVideoSource");

var damageSound =
    document.getElementById("damageSound");

var healSound =
    document.getElementById("healSound");

var bgMusic =
    document.getElementById("bgMusic");

var golemSound =
    document.getElementById("golemSound");

var enemyCharacter =
    document.getElementById("enemyCharacter");

var startScreen =
    document.getElementById("startScreen");

var startBattleButton =
    document.getElementById("startBattleButton");

var introScreen =
    document.getElementById("mimicIntroScreen");

var introDialogue =
    document.getElementById("mimicDialogueText");

var introContinue =
    document.getElementById("mimicContinueButton");

var resultScreen =
    document.getElementById("resultScreen");

var loseScreen =
    document.getElementById("loseScreen");



/* =========================================================
   GOLEM INTRO
========================================================= */

var golemLines = [

    "HALT.",

    "These chambers do not welcome careless spellcasters.",

    "Every value has a place.",

    "Every place has an index.",

    "And every index begins with ZERO.",

    "You think you can rearrange my collection?",

    "Then prove you understand the Array Chamber.",

    "Find the values.",

    "Remember their positions.",

    "And never reach beyond the final index.",

    "I am the Index Golem.",

    "Guardian of every stored value.",

    "Enter the chamber...",

    "IF YOU DARE."

];


var introIndex = 0;



/* =========================================================
   GLITCH TEXT
========================================================= */

function glitchText(element, text){

    if(!element){
        return;
    }


    var chars =
        "01#@$%&<>[]{}";


    var progress = 0;


    var timer =
        setInterval(function(){

            var output = "";


            for(
                var i = 0;
                i < text.length;
                i++
            ){

                if(i < progress){

                    output += text[i];

                }

                else{

                    output +=
                        chars[
                            Math.floor(
                                Math.random() *
                                chars.length
                            )
                        ];

                }

            }


            element.textContent =
                output;


            progress++;


            if(progress > text.length){

                clearInterval(timer);

                element.textContent =
                    text;

            }

        }, 25);

}



/* =========================================================
   SHOW INTRO LINE
========================================================= */

function showIntroLine(){

    if(
        introIndex >=
        golemLines.length
    ){

        endIntro();

        return;

    }


    glitchText(
        introDialogue,
        golemLines[introIndex]
    );


    if(
        introIndex ===
        golemLines.length - 1
    ){

        introContinue.textContent =
            "ENTER THE ARRAY CHAMBER";

    }

    else{

        introContinue.textContent =
            "CONTINUE ▶";

    }

}



/* =========================================================
   START INTRO
========================================================= */

function startIntro(){

    introIndex = 0;

    introScreen.classList.add("show");

    if(golemSound){

        golemSound.currentTime = 0;

        golemSound.volume = .4;

        golemSound.play()
            .catch(function(){});

    }

    showIntroLine();

}



/* =========================================================
   CONTINUE INTRO
========================================================= */

introContinue.addEventListener(
    "click",
    function(){

        if(
            introIndex >=
            golemLines.length - 1
        ){

            endIntro();

            return;

        }


        introIndex++;

        showIntroLine();

    }
);



/* =========================================================
   END INTRO
========================================================= */

function endIntro(){

    introScreen.classList.remove("show");

    setTimeout(function(){

        loadQuestion();

    }, 400);

}



/* =========================================================
   START BUTTON
========================================================= */

startBattleButton.addEventListener(
    "click",
    function(){

        startScreen.style.display =
            "none";


        if(bgMusic){

            bgMusic.volume =
                .28;

            bgMusic.play()
                .catch(function(){});

        }


        startIntro();

    }
);



/* =========================================================
   LOAD QUESTION
========================================================= */

function loadQuestion(){

    if(
        currentQuestion >=
        questions.length
    ){

        finishBook();

        return;

    }


    answered = false;


    var q =
        questions[currentQuestion];


    questionNumber.textContent =
        "CHALLENGE " +
        (currentQuestion + 1) +
        " / " +
        questions.length;


    questionType.textContent =
        q.section;


    questionText.textContent =
        q.question;


    codeDisplay.textContent =
        q.code;


    answers.innerHTML = "";


    feedback.textContent =
        "";


    feedback.classList.remove(
        "correct",
        "wrong"
    );


    rationaleBox.classList.remove(
        "show"
    );


    battleMessage.textContent =
        "Choose your answer...";


    updateHP();

    updateScore();

    updateProgress();


    if(q.mode === "choice"){

        createChoiceAnswers(q);

    }

    else{

        createTypedAnswer(q);

    }

}



/* =========================================================
   CREATE CHOICE ANSWERS
========================================================= */

function createChoiceAnswers(q){

    for(
        var i = 0;
        i < q.answers.length;
        i++
    ){

        var button =
            document.createElement("button");


        button.className =
            "answer-button";


        button.textContent =
            (i + 1) +
            ". " +
            q.answers[i];


        button.setAttribute(
            "data-answer",
            i
        );


        button.addEventListener(
            "click",
            function(){

                if(answered){
                    return;
                }


                var selected =
                    Number(
                        this.getAttribute(
                            "data-answer"
                        )
                    );


                checkChoiceAnswer(
                    selected
                );

            }
        );


        answers.appendChild(
            button
        );

    }

}



/* =========================================================
   CREATE TYPED ANSWER
========================================================= */

function createTypedAnswer(q){

    var wrapper =
        document.createElement("div");


    wrapper.className =
        "typed-answer-wrapper";


    var input =
        document.createElement("input");


    input.type =
        "text";

    input.className =
        "typed-answer";

    input.id =
        "book7AnswerInput";

    input.placeholder =
        q.placeholder ||
        "Type your answer...";


    var submit =
        document.createElement("button");


    submit.className =
        "submit-answer-button";


    submit.textContent =
        "SUBMIT";


    submit.addEventListener(
        "click",
        function(){

            checkTypedAnswer();

        }
    );


    input.addEventListener(
        "keydown",
        function(event){

            if(event.key === "Enter"){

                event.preventDefault();

                checkTypedAnswer();

            }

        }
    );


    wrapper.appendChild(input);

    wrapper.appendChild(submit);

    answers.appendChild(wrapper);


    setTimeout(function(){

        input.focus();

    },100);

}



/* =========================================================
   NORMALIZE
========================================================= */

function normalizeAnswer(value){

    return String(value)
        .trim()
        .toLowerCase()
        .replace(/\s+/g," ");

}



/* =========================================================
   CHOICE CHECK
========================================================= */

function checkChoiceAnswer(selected){

    if(answered){
        return;
    }


    var q =
        questions[currentQuestion];


    var buttons =
        document.querySelectorAll(
            ".answer-button"
        );


    for(
        var i = 0;
        i < buttons.length;
        i++
    ){

        buttons[i].disabled =
            true;

    }


    if(
        selected ===
        q.correct
    ){

        handleCorrectAnswer(q);

    }

    else{

        handleWrongAnswer(q);

    }

}



/* =========================================================
   TYPED CHECK
========================================================= */

function checkTypedAnswer(){

    if(answered){
        return;
    }


    var q =
        questions[currentQuestion];


    var input =
        document.getElementById(
            "book7AnswerInput"
        );


    if(!input){
        return;
    }


    var value =
        normalizeAnswer(
            input.value
        );


    if(value === ""){

        feedback.textContent =
            "Please enter an answer first.";

        feedback.classList.add("wrong");

        return;

    }


    input.disabled =
        true;


    if(
        value ===
        normalizeAnswer(
            q.expectedAnswer
        )
    ){

        handleCorrectAnswer(q);

    }

    else{

        handleWrongAnswer(q);

    }

}



/* =========================================================
   CORRECT
========================================================= */

function handleCorrectAnswer(q){

    answered = true;


    var damage =
        doublePowerActive
            ? 30
            : 20;


    enemyHP -= damage;


    if(enemyHP < 0){
        enemyHP = 0;
    }


    doublePowerActive =
        false;


    score += 100;

    essence += 10;


    updateHP();

    updateScore();


    feedback.textContent =
        "✓ CORRECT — " +
        q.feedback;


    feedback.classList.remove("wrong");

    feedback.classList.add("correct");


    battleMessage.textContent =
        "The array aligns with your spell.";


    showRationale(
        q.rationale
    );


    showFloatingNumber(
        enemyCharacter,
        "-" + damage
    );


    enemyHitEffect();

    playAttackVideo();


    if(enemyHP <= 0){

        setTimeout(
            finishBook,
            1300
        );

        return;

    }


    if(
        currentQuestion >=
        questions.length - 1
    ){

        setTimeout(
            finishBook,
            1300
        );

        return;

    }


    showNextButton();

}



/* =========================================================
   WRONG
========================================================= */

function handleWrongAnswer(q){

    answered = true;


    playerHP -= 15;


    if(playerHP < 0){
        playerHP = 0;
    }


    if(score >= 25){
        score -= 25;
    }

    else{
        score = 0;
    }


    updateHP();

    updateScore();


    feedback.textContent =
        "✕ WRONG — " +
        q.feedback;


    feedback.classList.remove("correct");

    feedback.classList.add("wrong");


    battleMessage.textContent =
        "The Golem rearranges the values.";


    showRationale(
        q.rationale
    );


    showFloatingNumber(
        document.getElementById(
            "playerCharacter"
        ),
        "-15"
    );


    playerDamageEffect();


    if(playerHP <= 0){

        setTimeout(
            loseGame,
            900
        );

        return;

    }


    showNextButton();

}



/* =========================================================
   RATIONALE
========================================================= */

function showRationale(text){

    rationaleText.textContent =
        text;


    rationaleBox.classList.add(
        "show"
    );

}


rationaleClose.addEventListener(
    "click",
    function(){

        rationaleBox.classList.remove(
            "show"
        );

    }
);



/* =========================================================
   NEXT QUESTION
========================================================= */

function showNextButton(){

    var old =
        document.getElementById(
            "nextQuestionButton"
        );


    if(old){
        old.remove();
    }


    var button =
        document.createElement("button");


    button.id =
        "nextQuestionButton";


    button.className =
        "next-question-button";


    button.textContent =
        "NEXT CHALLENGE ▶";


    button.addEventListener(
        "click",
        function(){

            currentQuestion++;

            loadQuestion();

        }
    );


    answers.appendChild(button);

}



/* =========================================================
   HP
========================================================= */

function updateHP(){

    playerHp.style.width =
        playerHP + "%";


    enemyHp.style.width =
        enemyHP + "%";


    playerHpText.textContent =
        playerHP +
        " / 100";


    enemyHpText.textContent =
        enemyHP +
        " / 100";

}



/* =========================================================
   SCORE
========================================================= */

function updateScore(){

    scoreDisplay.textContent =
        score;


    essenceDisplay.textContent =
        essence;

}



/* =========================================================
   PROGRESS
========================================================= */

function updateProgress(){

    trialStatus.textContent =
        currentQuestion +
        " / " +
        questions.length;

}



/* =========================================================
   ATTACK VIDEO
========================================================= */

function playAttackVideo(){

    if(!attackAnimation){
        return;
    }


    attackVideoSource.src =
        player.attackVideo;


    attackVideo.load();


    attackAnimation.classList.remove(
        "fade-out"
    );


    attackAnimation.classList.add(
        "show"
    );


    attackVideo.currentTime = 0;


    attackVideo.play()
        .catch(function(){});


    attackVideo.onended =
        function(){

            attackAnimation.classList.add(
                "fade-out"
            );


            setTimeout(
                function(){

                    attackAnimation.classList.remove(
                        "show",
                        "fade-out"
                    );

                },
                700
            );

        };

}



/* =========================================================
   DAMAGE EFFECT
========================================================= */

function enemyHitEffect(){

    if(!enemyCharacter){
        return;
    }


    enemyCharacter.classList.remove(
        "damage-flash",
        "damage-shake"
    );


    void enemyCharacter.offsetWidth;


    enemyCharacter.classList.add(
        "damage-flash",
        "damage-shake"
    );


    if(damageSound){

        damageSound.currentTime = 0;

        damageSound.play()
            .catch(function(){});

    }

}



/* =========================================================
   PLAYER DAMAGE
========================================================= */

function playerDamageEffect(){

    var image =
        document.getElementById(
            "playerCharacter"
        );


    if(!image){
        return;
    }


    image.classList.remove(
        "damage-flash",
        "damage-shake"
    );


    void image.offsetWidth;


    image.classList.add(
        "damage-flash",
        "damage-shake"
    );


    if(golemSound){

        golemSound.currentTime = 0;

        golemSound.volume = .25;

        golemSound.play()
            .catch(function(){});

    }

}



/* =========================================================
   FLOATING DAMAGE
========================================================= */

function showFloatingNumber(
    target,
    text
){

    if(!target){
        return;
    }


    var parent =
        target.parentElement;


    if(!parent){
        return;
    }


    parent.style.position =
        "relative";


    var number =
        document.createElement("div");


    number.className =
        "floating-number dmg";


    number.textContent =
        text;


    parent.appendChild(number);


    setTimeout(
        function(){

            number.remove();

        },
        1000
    );

}



/* =========================================================
   FINISH BOOK
========================================================= */

function finishBook(){

    if(bgMusic){

        bgMusic.pause();

    }


    document.getElementById(
        "finalScore"
    ).textContent =
        score;


    document.getElementById(
        "finalEssence"
    ).textContent =
        essence;


    resultScreen.classList.add(
        "show"
    );


    saveProgress();

}



/* =========================================================
   LOSE
========================================================= */

function loseGame(){

    if(bgMusic){

        bgMusic.pause();

    }


    loseScreen.classList.add(
        "show"
    );

}



/* =========================================================
   RETRY
========================================================= */

document.getElementById(
    "retryTrialButton"
).addEventListener(
    "click",
    function(){

        location.reload();

    }
);



/* =========================================================
   RETURN MENU
========================================================= */

document.getElementById(
    "loseMenuButton"
).addEventListener(
    "click",
    function(){

        location.href =
            "/Main Menu/lesson.html";

    }
);



/* =========================================================
   SAVE BOOK VII PROGRESS
========================================================= */

function saveProgress(){

    localStorage.setItem(
        "book7Completed",
        "true"
    );


    localStorage.setItem(
        "book7Score",
        score
    );


    localStorage.setItem(
        "book7Essence",
        essence
    );

    localStorage.setItem("book8Unlocked", "true");

}



/* =========================================================
   POWER UP — HINT
========================================================= */

document.getElementById(
    "hintPower"
).addEventListener(
    "click",
    function(){

        if(
            hintCount <= 0 ||
            answered
        ){
            return;
        }


        var buttons =
            document.querySelectorAll(
                ".answer-button"
            );


        var q =
            questions[currentQuestion];


        for(
            var i = 0;
            i < buttons.length;
            i++
        ){

            var index =
                Number(
                    buttons[i].getAttribute(
                        "data-answer"
                    )
                );


            if(
                index !== q.correct &&
                !buttons[i].disabled
            ){

                buttons[i].disabled =
                    true;

                buttons[i].style.opacity =
                    ".3";

                hintCount--;

                document.getElementById(
                    "hintCount"
                ).textContent =
                    hintCount;

                break;

            }

        }

    }
);



/* =========================================================
   POWER UP — HEAL
========================================================= */

document.getElementById(
    "healPower"
).addEventListener(
    "click",
    function(){

        if(
            healCount <= 0 ||
            playerHP >= 100
        ){
            return;
        }


        playerHP += 25;


        if(playerHP > 100){
            playerHP = 100;
        }


        healCount--;


        document.getElementById(
            "healCount"
        ).textContent =
            healCount;


        updateHP();


        if(healSound){

            healSound.currentTime = 0;

            healSound.play()
                .catch(function(){});

        }

    }
);



/* =========================================================
   POWER UP — DOUBLE POWER
========================================================= */

document.getElementById(
    "doublePower"
).addEventListener(
    "click",
    function(){

        if(
            doubleCount <= 0 ||
            answered
        ){
            return;
        }


        doublePowerActive =
            true;


        doubleCount--;


        document.getElementById(
            "doubleCount"
        ).textContent =
            doubleCount;


        battleMessage.textContent =
            "Your next correct answer deals DOUBLE DAMAGE.";

    }
);



/* =========================================================
   MYSTIC SIGHT
========================================================= */

document.getElementById(
    "mysticSightPower"
).addEventListener(
    "click",
    function(){

        if(
            mysticSightCount <= 0 ||
            answered
        ){
            return;
        }


        var q =
            questions[currentQuestion];


        codeDisplay.style.boxShadow =
            "0 0 20px rgba(213,168,93,.7)";


        battleMessage.textContent =
            q.section === "FIND THE LOGICAL ERROR"
                ? "MYSTIC SIGHT: Check the ARRAY INDEX."
                : "MYSTIC SIGHT: COUNT FROM ZERO.";


        mysticSightCount--;


        document.getElementById(
            "mysticSightCount"
        ).textContent =
            mysticSightCount;


        setTimeout(
            function(){

                codeDisplay.style.boxShadow =
                    "";

            },
            3000
        );

    }
);



/* =========================================================
   OMNIDATA
========================================================= */

document.getElementById(
    "omnidataPower"
).addEventListener(
    "click",
    function(){

        if(
            omnidataCount <= 0 ||
            answered
        ){
            return;
        }


        battleMessage.textContent =
            "OMNIDATA: The first array index is 0.";


        omnidataCount--;


        document.getElementById(
            "omnidataCount"
        ).textContent =
            omnidataCount;

    }
);



/* =========================================================
   SYNTAX SORCERY
========================================================= */

document.getElementById(
    "syntaxSorceryPower"
).addEventListener(
    "click",
    function(){

        if(
            syntaxSorceryCount <= 0 ||
            answered
        ){
            return;
        }


        battleMessage.textContent =
            "SYNTAX SORCERY: Array access uses arrayName[index].";


        syntaxSorceryCount--;


        document.getElementById(
            "syntaxSorceryCount"
        ).textContent =
            syntaxSorceryCount;

    }
);



/* =========================================================
   FLAMEBURST
========================================================= */

document.getElementById(
    "flameburstPower"
).addEventListener(
    "click",
    function(){

        if(
            flameburstCount <= 0 ||
            answered
        ){
            return;
        }


        var q =
            questions[currentQuestion];


        var buttons =
            document.querySelectorAll(
                ".answer-button"
            );


        for(
            var i = 0;
            i < buttons.length;
            i++
        ){

            var index =
                Number(
                    buttons[i].getAttribute(
                        "data-answer"
                    )
                );


            if(index !== q.correct){

                buttons[i].disabled =
                    true;

                buttons[i].style.opacity =
                    ".25";

            }

        }


        flameburstCount--;


        document.getElementById(
            "flameburstCount"
        ).textContent =
            flameburstCount;


        battleMessage.textContent =
            "FLAMEBURST removed the false paths.";

    }
);



/* =========================================================
   MINDCRAFT
========================================================= */

document.getElementById(
    "mindcraftPower"
).addEventListener(
    "click",
    function(){

        if(
            mindcraftCount <= 0 ||
            answered
        ){
            return;
        }


        questionText.style.textShadow =
            "0 0 10px rgba(213,168,93,.8)";


        battleMessage.textContent =
            "MINDCRAFT: Focus on the array position.";


        mindcraftCount--;


        document.getElementById(
            "mindcraftCount"
        ).textContent =
            mindcraftCount;


        setTimeout(
            function(){

                questionText.style.textShadow =
                    "";

            },
            3000
        );

    }
);



/* =========================================================
   INITIAL STATE
========================================================= */

updateHP();

updateScore();

updateProgress();