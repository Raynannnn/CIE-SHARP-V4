/* =====================================================
   BOOK IX — NULL WITCHES TOWER
   FINAL BOSS JAVASCRIPT
===================================================== */

var selectedCharacter =
    localStorage.getItem("selectedCharacter") || "GiTei";


var characters = {


    GiTei: {

        name:
            "Logic Witch",

        role:
            "The Problem Solver",

        image:
            "images/GiTei.png",

        attackVideo:
            "videos/logic-witch-attack.mp4",

        power:
            "mysticSightPower"

    },


    Achi: {

        name:
            "Data Witch",

        role:
            "The Keeper of Knowledge",

        image:
            "images/Achi.png",

        attackVideo:
            "videos/data-witch-attack.mp4",

        power:
            "omnidataPower"

    },


    LeeSerin: {

        name:
            "Codeweaver Witch",

        role:
            "The Master of Syntax",

        image:
            "images/LeeSerin.png",

        attackVideo:
            "videos/codeweaver-witch-attack.mp4",

        power:
            "syntaxSorceryPower"

    },


    Cythera: {

        name:
            "Ember Witch",

        role:
            "The Challenge Master",

        image:
            "images/Cythera.png",

        attackVideo:
            "videos/ember-witch-attack.mp4",

        power:
            "flameburstPower"

    },


    Zari: {

        name:
            "Logicraft Witch",

        role:
            "The Creative Builder",

        image:
            "images/Zari.png",

        attackVideo:
            "videos/logicraft-witch-attack.mp4",

        power:
            "mindcraftPower"

    }

};


/* =====================================================
   GET SELECTED WITCH
===================================================== */


var player =
    characters[selectedCharacter] ||
    characters.GiTei;

/* =====================================================
   GAME VARIABLES
===================================================== */

var currentQuestion = 0;

var playerHP = 100;

var enemyHP = 100;

var score = 0;

var essence = 0;

var answered = false;

var hintCount = 3;

var healCount = 2;

var doubleCount = 2;

var mysticSightCount = 2;

var doublePowerActive = false;

/* =====================================================
   DISPLAY SELECTED WITCH
===================================================== */


var playerCharacter =
    document.getElementById(
        "playerCharacter"
    );


var playerName =
    document.getElementById(
        "playerName"
    );


var playerRole =
    document.getElementById(
        "playerRole"
    );


if(playerCharacter){

    playerCharacter.src =
        player.image;

    playerCharacter.alt =
        player.name;

}


if(playerName){

    playerName.textContent =
        player.name;

}


if(playerRole){

    playerRole.textContent =
        player.role;

}


console.log(
    "BOOK IX SELECTED WITCH:",
    selectedCharacter
);


console.log(
    "BOOK IX PLAYER:",
    player
);

/* =====================================================
   SELECTED WITCH SIGNATURE POWER
===================================================== */


var specialPowerIds = [

    "mysticSightPower",

    "omnidataPower",

    "syntaxSorceryPower",

    "flameburstPower",

    "mindcraftPower"

];


for(
    var i = 0;
    i < specialPowerIds.length;
    i++
){

    var button =
        document.getElementById(
            specialPowerIds[i]
        );


    if(!button){

        continue;

    }


    if(
        specialPowerIds[i] ===
        player.power
    ){

        button.style.display =
            "flex";

    }

    else{

        button.style.display =
            "none";

    }

}



/* =====================================================
   ELEMENTS
===================================================== */

var playerHp =
    document.getElementById("playerHp");

var enemyHp =
    document.getElementById("enemyHp");

var playerHpText =
    document.getElementById("playerHpText");

var enemyHpText =
    document.getElementById("enemyHpText");

var questionNumber =
    document.getElementById("questionNumber");

var questionSection =
    document.getElementById("questionSection");

var questionRound =
    document.getElementById("questionRound");

var questionTitle =
    document.getElementById("questionTitle");

var codeQuestion =
    document.getElementById("codeQuestion");

var answers =
    document.getElementById("answers");

var typedAnswerWrapper =
    document.getElementById("typedAnswerWrapper");

var typedAnswer =
    document.getElementById("typedAnswer");

var submitTyped =
    document.getElementById("submitTyped");

var feedbackBox =
    document.getElementById("feedbackBox");

var nextQuestionButton =
    document.getElementById("nextQuestionButton");

var battleMessage =
    document.getElementById("battleMessage");

var resultScreen =
    document.getElementById("resultScreen");

var loseScreen =
    document.getElementById("loseScreen");

var bossIntroScreen =
    document.getElementById("bossIntroScreen");

var bossDialogue =
    document.getElementById("bossDialogue");

var bossContinueButton =
    document.getElementById("bossContinueButton");

var bgMusic =
    document.getElementById("bgMusic");


/* =====================================================
   QUESTIONS
===================================================== */

var questions = [

    /* =================================================
       CODE DUEL
    ================================================= */

    {
        section:"CODE DUEL",
        round:"ROUND 1",
        title:"Repair the corrupted variable spell.",

        code:
`int health __ 100`,

        type:"typed",

        answer:
        "int health = 100;",

        feedback:
        "You're assigning a value to health, so use the assignment operator =."
    },


    {
        section:"CODE DUEL",
        round:"ROUND 2",
        title:"Repair the corrupted condition.",

        code:
`if (health __ 0)`,

        type:"typed",

        answer:
        "if (health > 0)",

        feedback:
        "The condition needs to check if health is above zero. Use >."
    },


    {
        section:"CODE DUEL",
        round:"ROUND 3",
        title:"Complete the loop condition.",

        code:
`for (int i = 0; i __ 5; i++)`,

        type:"choice",

        choices:[
            "=",
            "<",
            ">",
            "=="
        ],

        answer:"<",

        feedback:
        "The loop should continue while i is less than 5. Use <."
    },


    /* =================================================
       ERROR HUNT
    ================================================= */

    {
        section:"ERROR HUNT",
        round:"CHALLENGE 1",

        title:
        "Find the syntax error.",

        code:
`int score = 100

if (score >= 100)
{
    Console.WriteLine("Win");
}`,

        type:"choice",

        choices:[
            "Missing ; after 100.",
            "Missing ; after if.",
            "score should be a string.",
            "The if condition is invalid."
        ],

        answer:
        "Missing ; after 100.",

        feedback:
        "Look at int score = 100. C# statements need to end with ;."
    },


    {
        section:"ERROR HUNT",
        round:"CHALLENGE 2",

        title:
        "Find the syntax error.",

        code:
`for (int i = 0; i < 5; i++)
{
    Console.WriteLine(i)
}`,

        type:"choice",

        choices:[
            "Missing ; after Console.WriteLine(i).",
            "Missing ; after for.",
            "i should start at 1.",
            "The loop condition is invalid."
        ],

        answer:
        "Missing ; after Console.WriteLine(i).",

        feedback:
        "Check the Console.WriteLine(i) statement. It's missing a semicolon."
    },


    /* =================================================
       SPEED CODING
    ================================================= */

    {
        section:"SPEED CODING",
        round:"ROUND 1",

        title:
        "Create a variable named health and assign it 100.",

        code:
`Create a variable:
int health = 100;`,

        type:"typed",

        answer:
        "int health = 100;",

        feedback:
        "Create an integer variable named health and assign it 100."
    },


    {
        section:"SPEED CODING",
        round:"ROUND 2",

        title:
        "Create a condition that checks whether health is greater than zero.",

        code:
`if (health > 0)
{
    // code
}`,

        type:"typed",

        answer:
        "if (health > 0)",

        feedback:
        "Check whether health is greater than zero using if (health > 0)."
    },


    {
        section:"SPEED CODING",
        round:"ROUND 3",

        title:
        'Create a loop that prints "Spell" three times.',

        code:
`for (int i = 0; i < 3; i++)
{
    Console.WriteLine("Spell");
}`,

        type:"typed",

        answer:
        `for (int i = 0; i < 3; i++)
{
    Console.WriteLine("Spell");
}`,

        feedback:
        "The loop needs to run exactly three times. Start at 0 and continue while i < 3."
    }

];


/* =====================================================
   UPDATE HP
===================================================== */

function updateHP(){

    if(playerHP < 0){

        playerHP = 0;

    }


    if(enemyHP < 0){

        enemyHP = 0;

    }


    playerHp.style.width =
        playerHP + "%";


    enemyHp.style.width =
        enemyHP + "%";


    playerHpText.textContent =
        playerHP + " / 100";


    enemyHpText.textContent =
        enemyHP + " / 100";

}


/* =====================================================
   LOAD QUESTION
===================================================== */

function loadQuestion(){

    if(currentQuestion >= questions.length){

        showVictory();

        return;

    }


    answered = false;

    var q =
        questions[currentQuestion];


    questionNumber.textContent =
        (currentQuestion + 1) +
        " / " +
        questions.length;


    questionSection.textContent =
        q.section;


    questionRound.textContent =
        q.round;


    questionTitle.textContent =
        q.title;


    codeQuestion.textContent =
        q.code;


    feedbackBox.textContent =
        "Choose your answer...";


    feedbackBox.className =
        "feedback-box";


    nextQuestionButton.style.display =
        "none";


    answers.innerHTML =
        "";


    typedAnswer.value =
        "";


    typedAnswerWrapper.style.display =
        "none";


    if(q.type === "typed"){

        typedAnswerWrapper.style.display =
            "flex";

    }


    if(q.type === "choice"){

        for(
            var i = 0;
            i < q.choices.length;
            i++
        ){

            createAnswerButton(
                q.choices[i]
            );

        }

    }


    battleMessage.textContent =
        "The Null Witch is watching...";


    if(q.section === "CODE DUEL"){

        document.getElementById(
            "spellName"
        ).textContent =
            "CODE DUEL SPELL";

    }

    else if(q.section === "ERROR HUNT"){

        document.getElementById(
            "spellName"
        ).textContent =
            "ERROR HUNTER";

    }

    else{

        document.getElementById(
            "spellName"
        ).textContent =
            "SPEED SPELL";

    }

}


/* =====================================================
   CREATE ANSWER BUTTON
===================================================== */

function createAnswerButton(
    text
){

    var button =
        document.createElement("button");


    button.className =
        "answer-button";


    button.textContent =
        text;


    button.onclick =
        function(){

            checkAnswer(
                text,
                button
            );

        };


    answers.appendChild(
        button
    );

}


/* =====================================================
   NORMALIZE ANSWER
===================================================== */

function normalizeAnswer(
    text
){

    return text
        .replace(/\s+/g, " ")
        .trim();

}


/* =====================================================
   CHECK ANSWER
===================================================== */

function checkAnswer(
    answer,
    clickedButton
){

    if(answered){

        return;

    }


    var q =
        questions[currentQuestion];


    var userAnswer =
        normalizeAnswer(answer);


    var correctAnswer =
        normalizeAnswer(q.answer);


    if(userAnswer === correctAnswer){

        correctAnswerAction(
            clickedButton,
            q
        );

    }

    else{

        wrongAnswerAction(
            clickedButton,
            q
        );

    }

}


/* =====================================================
   CORRECT ANSWER
===================================================== */

function correctAnswerAction(
    clickedButton,
    q
){

    answered = true;


    if(clickedButton){

        clickedButton.classList.add(
            "correct"
        );

    }


    var damage = 15;


    if(doublePowerActive){

        damage = 30;

        doublePowerActive =
            false;

    }


    enemyHP -= damage;


    score += 100;

    essence += 10;


    updateHP();


    feedbackBox.textContent =
        "✓ CORRECT — " +
        q.feedback;


    feedbackBox.className =
        "feedback-box success";


    battleMessage.textContent =
        "Your C# spell strikes the Null Witch!";


    animateBossDamage();


    nextQuestionButton.style.display =
        "block";


    if(enemyHP <= 0){

        setTimeout(
            function(){

                showVictory();

            },
            900
        );

    }

}


/* =====================================================
   WRONG ANSWER
===================================================== */

function wrongAnswerAction(
    clickedButton,
    q
){

    answered = true;


    if(clickedButton){

        clickedButton.classList.add(
            "wrong"
        );

    }


    playerHP -= 15;


    updateHP();


    feedbackBox.textContent =
        "✗ WRONG — The Null Witch corrupts your spell.";


    feedbackBox.className =
        "feedback-box error";


    battleMessage.textContent =
        "CORRUPTION STRIKE!";


    animatePlayerDamage();


    nextQuestionButton.style.display =
        "block";


    if(playerHP <= 0){

        setTimeout(
            function(){

                showDefeat();

            },
            800
        );

    }

}


/* =====================================================
   TYPED ANSWER
===================================================== */

submitTyped.onclick =
    function(){

        checkAnswer(
            typedAnswer.value,
            null
        );

    };


typedAnswer.addEventListener(
    "keydown",
    function(event){

        if(event.key === "Enter"){

            checkAnswer(
                typedAnswer.value,
                null
            );

        }

    }
);


/* =====================================================
   NEXT QUESTION
===================================================== */

nextQuestionButton.onclick =
    function(){

        if(!answered){

            return;

        }


        currentQuestion++;

        loadQuestion();

    };


/* =====================================================
   DAMAGE ANIMATION
===================================================== */

function animateBossDamage(){

    var boss =
        document.getElementById(
            "enemyCharacter"
        );


    boss.classList.remove(
        "damage-flash",
        "damage-shake"
    );


    void boss.offsetWidth;


    boss.classList.add(
        "damage-flash",
        "damage-shake"
    );

}


function animatePlayerDamage(){

    var player =
        document.getElementById(
            "playerCharacter"
        );


    player.classList.remove(
        "damage-flash",
        "damage-shake"
    );


    void player.offsetWidth;


    player.classList.add(
        "damage-flash",
        "damage-shake"
    );

}


/* =====================================================
   HINT
===================================================== */

document.getElementById(
    "hintPower"
).onclick =
function(){

    if(
        hintCount <= 0 ||
        answered
    ){

        return;

    }


    hintCount--;


    var q =
        questions[currentQuestion];


    var hintText =
        "Read the C# syntax carefully.";


    if(
        q.section === "CODE DUEL"
    ){

        hintText =
            "Think about the C# symbol or structure that completes the code.";

    }

    else if(
        q.section === "ERROR HUNT"
    ){

        hintText =
            "Look for the missing symbol that ends a C# statement.";

    }

    else if(
        q.section === "SPEED CODING"
    ){

        hintText =
            "Remember the exact C# structure shown in the expected code.";

    }


    feedbackBox.textContent =
        "💡 HINT: " +
        hintText;


    feedbackBox.className =
        "feedback-box";


    battleMessage.textContent =
        "The corruption reveals a small clue...";

};


/* =====================================================
   HEAL
===================================================== */

document.getElementById(
    "healPower"
).onclick =
function(){

    if(
        healCount <= 0 ||
        playerHP >= 100
    ){

        return;

    }


    healCount--;


    playerHP += 25;


    if(playerHP > 100){

        playerHP = 100;

    }


    updateHP();


    battleMessage.textContent =
        "Your magic restores your HP.";

};


/* =====================================================
   DOUBLE DAMAGE
===================================================== */

document.getElementById(
    "doublePower"
).onclick =
function(){

    if(
        doubleCount <= 0 ||
        answered
    ){

        return;

    }


    doubleCount--;


    doublePowerActive =
        true;


    feedbackBox.textContent =
        "🔥 DOUBLE DAMAGE ARMED — Your next correct answer deals 30 damage.";

    feedbackBox.className =
        "feedback-box success";


    battleMessage.textContent =
        "Your spell burns with violet power!";

};


/* MYSTIC SIGHT*/


document.getElementById(
    "mysticSightPower"
).onclick =
function(){

    if(
        mysticSightCount <= 0 ||
        answered
    ){

        return;

    }


    mysticSightCount--;


    var q =
        questions[currentQuestion];


    feedbackBox.textContent =
        "👁 MYSTIC SIGHT — " +
        q.feedback;


    feedbackBox.className =
        "feedback-box success";


    battleMessage.textContent =
        "The corruption becomes visible...";

};


/* =====================================================
   BOSS INTRO
===================================================== */

var dialogueLines = [

    "So... you finally reached the top of the tower.",

    "Every spell you learned... every line you repaired...",

    "I corrupted them all.",

    "I am not a mistake inside the code.",

    "I AM THE CORRUPTION ITSELF.",

    "Restore the Great C# Spellbook... if you can."
];


var dialogueIndex = 0;


function showBossDialogue(){

    if(
        dialogueIndex <
        dialogueLines.length
    ){

        bossDialogue.textContent =
            dialogueLines[
                dialogueIndex
            ];

        dialogueIndex++;

    }

    else{

        bossIntroScreen.style.display =
            "none";


        startMusic();

        loadQuestion();

    }

}


bossContinueButton.onclick =
    showBossDialogue;


/* =====================================================
   START MUSIC
===================================================== */

function startMusic(){

    if(!bgMusic){

        return;

    }


    bgMusic.volume =
        0.35;


    bgMusic.play()
        .catch(
            function(){

                console.log(
                    "Music playback requires user interaction."
                );

            }
        );

}


/* =====================================================
   VICTORY
===================================================== */

function showVictory(){

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


    battleMessage.textContent =
        "THE NULL WITCH HAS FALLEN.";

}


/* =====================================================
   DEFEAT
===================================================== */

function showDefeat(){

    loseScreen.classList.add(
        "show"
    );

}


/* =====================================================
   RETRY
===================================================== */

document.getElementById(
    "retryTrialButton"
).onclick =
function(){

    currentQuestion = 0;

    playerHP = 100;

    enemyHP = 100;

    score = 0;

    essence = 0;

    answered = false;

    resultScreen.classList.remove(
        "show"
    );

    loseScreen.classList.remove(
        "show"
    );

    bossIntroScreen.style.display =
        "none";


    updateHP();

    loadQuestion();

    startMusic();

};


/* =====================================================
   MAIN MENU
===================================================== */

document.getElementById(
    "loseMenuButton"
).onclick =
function(){

    location.href =
        "../../MainMenu/lesson.html";

};


/* =====================================================
   INITIAL HP
===================================================== */

updateHP();


/* =====================================================
   START FINAL BOSS INTRO
===================================================== */

bossIntroScreen.style.display =
    "flex";


bossDialogue.textContent =
    dialogueLines[0];


dialogueIndex = 1;