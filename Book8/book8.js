/* =========================================================
   CIE-SHARP
   BOOK V: LOOP DUNGEON
   THE ENDLESS WRAITH
   ========================================================= */


/* =========================================================
   CHARACTER DATA
   Same player system as Book III
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
   SIGNATURE POWER
   Only the selected witch's special power appears.
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
   BOOK V GAME VARIABLES
   ========================================================= */

var playerHP = 100;

var enemyHP = 100;

var score = 0;

var essence = 0;

var currentQuestion = 0;

var answered = false;


/* =========================================================
   SURVIVAL TRIAL
   Three mistakes = defeat
   ========================================================= */

var survivalMistakes = 0;

var survivalMaxMistakes = 3;


/* =========================================================
   TIME ATTACK
   ========================================================= */

var timeAttackSeconds = 20;

var timeAttackTimer = null;

var timeAttackActive = false;


/* =========================================================
   POWER-UPS
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

var mindcraftShield = false;


/* =========================================================
   BOOK V QUESTIONS
   ========================================================= */

var questions = [

    /* =====================================================
       MICROGAME 1
       DETERMINE WHAT HAPPENS NEXT
       ===================================================== */

    {
        section: "DETERMINE WHAT HAPPENS NEXT",

        mode: "choice",

        question:
            "What will this loop print?",

        code:
`for (int i = 0; i < 3; i++)
{
    Console.WriteLine(i);
}`,

        answers: [

            "0, 1, 2",

            "1, 2, 3",

            "0, 1, 2, 3",

            "3, 2, 1"

        ],

        correct: 0,

        feedback:
            "Remember: i < 3 means the loop runs for 0, 1, and 2.",

        rationale:
            "The loop starts at 0 and stops before 3, so it prints 0, 1, and 2."

    },


    {
        section: "DETERMINE WHAT HAPPENS NEXT",

        mode: "choice",

        question:
            "How many times does the word Spell appear?",

        code:
`for (int i = 1; i <= 3; i++)
{
    Console.WriteLine("Spell");
}`,

        answers: [

            "1 time",

            "2 times",

            "3 times",

            "4 times"

        ],

        correct: 2,

        feedback:
            "Count the values: 1, 2, and 3. That's 3 repetitions.",

        rationale:
            "The loop includes 1, 2, and 3 because the condition is i <= 3. Therefore, Spell appears 3 times."

    },


    {
        section: "DETERMINE WHAT HAPPENS NEXT",

        mode: "choice",

        question:
            "How many times does the loop run?",

        code:
`for (int i = 0; i < 8; i++)
{
    Attack();
}`,

        answers: [

            "4 times",

            "8 times",

            "6 times",

            "3 times"

        ],

        correct: 1,

        feedback:
            "The loop starts at 0 and stops before 8. That's 8 repetitions.",

        rationale:
            "The loop executes when i is 0, 1, 2, 3, and 4. That gives 8 total repetitions."

    },


    /* =====================================================
       MICROGAME 2
       TIME ATTACK
       ===================================================== */

    {
        section: "TIME ATTACK",

        mode: "type",

        question:
            "Round 1 — How many times does this loop run?",

        code:
`for (int i = 0; i < 4; i++)`,

        expectedAnswer:
            "4",

        placeholder:
            "Type your answer...",

        feedback:
            "i < 4 means the loop runs for 0, 1, 2, and 3.",

        rationale:
            "There are four iterations: i = 0, 1, 2, and 3."

    },


    {
        section: "TIME ATTACK",

        mode: "type",

        question:
            "Round 2 — What is the final value of i?",

        code:
`for (int i = 0; i <= 3; i++)`,

        expectedAnswer:
            "4",

        placeholder:
            "Type your answer...",

        feedback:
            "The loop stops when i <= 3 becomes false. The final value is 4.",

        rationale:
            "After the iteration where i is 3, i++ makes i equal to 4. Then 4 <= 3 is false."

    },


    {
        section: "TIME ATTACK",

        mode: "choice",

        question:
            "Complete the loop.",

        code:
`for (int i = 0; i ___ 8; i++)`,

        answers: [

            ">",

            "<",

            "==",

            "="

        ],

        correct: 1,

        feedback:
            "To repeat while i is below 8, use <.",

        rationale:
            "The less-than operator < means i must remain below 8."

    },


    {
        section: "TIME ATTACK",

        mode: "choice",

        question:
            "Which keyword repeats a block of code while a condition is true?",

        code:
`__________ (health > 0)
{
    Attack();
}`,

        answers: [

            "if",

            "for",

            "while",

            "switch"

        ],

        correct: 2,

        feedback:
            "The while keyword is used when a block repeats while a condition is true.",

        rationale:
            "A while loop continues executing its block as long as its condition remains true."

    },


    {
        section: "TIME ATTACK",

        mode: "type",

        question:
            "Round 8 — Complete the condition.",

        code:
`while (health ___ 0)`,

        expectedAnswer:
            ">",

        placeholder:
            "Type the operator...",

        feedback:
            "The loop should continue only while health is above zero. Use >.",

        rationale:
            "The greater-than operator checks whether health is still above zero."

    },


    /* =====================================================
       MICROGAME 3
       SURVIVAL TRIAL
       ===================================================== */

    {
        section: "SURVIVAL TRIAL",

        mode: "choice",

        question:
            "Challenge 1 — What values are printed?",

        code:
`for (int i = 0; i < 2; i++)
{
    Console.WriteLine(i);
}`,

        answers: [

            "0, 1",

            "1, 2",

            "0, 1, 2",

            "2 only"

        ],

        correct: 0,

        feedback:
            "i < 2 means the loop stops before 2.",

        rationale:
            "The loop executes for i = 0 and i = 1. It stops before i reaches 2."

    },


    {
        section: "SURVIVAL TRIAL",

        mode: "type",

        question:
            "Challenge 2 — Fix the loop.",

        code:
`for (int i = 0; i < 8; ____)`,

        expectedAnswer:
            "i++",

        placeholder:
            "Type the update expression...",

        feedback:
            "The loop needs to increase so it can eventually reach 8. Use i++.",

        rationale:
            "The update expression must increase i after every repetition. i++ increases i by one."

    },


    {
        section: "SURVIVAL TRIAL",

        mode: "type",

        question:
            "Challenge 3 — Complete the loop.",

        code:
`while (_____ > 0)
{
    Attack();
}`,

        expectedAnswer:
            "health",

        placeholder:
            "Type the variable...",

        feedback:
            "The condition should check whether health is greater than zero.",

        rationale:
            "The variable being checked is health, so the condition is while (health > 0)."

    },


    {
        section: "SURVIVAL TRIAL",

        mode: "choice",

        question:
            "Challenge 4 — How many times does this loop run?",

        code:
`for (int i = 1; i <= 8; i++)`,

        answers: [

            "4 times",

            "8 times",

            "6 times",

            "3 times"

        ],

        correct: 1,

        feedback:
            "Because the condition uses <= 8, the loop includes 8.",

        rationale:
            "The values are 1, 2, 3, 4, and 8. That makes 8 iterations."

    },


    {
        section: "SURVIVAL TRIAL",

        mode: "type",

        question:
            "Challenge 8 — Is this loop already correct? Type YES or NO.",

        code:
`while (energy > 0)
{
    Attack();
    energy--;
}`,

        expectedAnswer:
            "yes",

        placeholder:
            "YES or NO",

        feedback:
            "Check both parts: energy > 0 controls the loop, and energy-- reduces the value.",

        rationale:
            "The loop is already correct. It continues while energy is above zero and energy-- reduces energy after each attack."

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

var trialStatus =
    document.getElementById("trialStatus");

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

var enemyCharacter =
    document.getElementById("enemyCharacter");

var startScreen =
    document.getElementById("startScreen");

var startBattleButton =
    document.getElementById("startBattleButton");

var wraithIntroScreen =
    document.getElementById("mimicIntroScreen");

var wraithDialogueText =
    document.getElementById("mimicDialogueText");

var wraithContinueButton =
    document.getElementById("mimicContinueButton");

var resultScreen =
    document.getElementById("resultScreen");

var loseScreen =
    document.getElementById("loseScreen");


/* =========================================================
   WRAITH INTRO DATA
   ========================================================= */

var wraithLines = [

    "You should not have entered this dungeon...",

    "Every step here repeats.",

    "Every mistake returns.",

    "Every loop closes its jaws around you.",

    "FOR counts your every move.",

    "WHILE watches until your condition fails.",

    "And DO-WHILE...",

    "DO-WHILE makes sure the nightmare happens at least once.",

    "You will repeat.",

    "You will fail.",

    "You will repeat again.",

    "I am the Endless Wraith.",

    "Traps everything in repetition.",

    "Escape my Loop Dungeon...",

    "if you can."

];


var wraithLineIndex = 0;


/* =========================================================
   WRAITH INTRO GLITCH
   ========================================================= */

function wraithGlitch(){

    if(!wraithIntroScreen){
        return;
    }


    wraithIntroScreen.classList.remove(
        "wraith-glitch"
    );


    void wraithIntroScreen.offsetWidth;


    wraithIntroScreen.classList.add(
        "wraith-glitch"
    );


    setTimeout(function(){

        wraithIntroScreen.classList.remove(
            "wraith-glitch"
        );

    }, 700);

}


/* =========================================================
   WRAITH IMAGE GLITCH
   ========================================================= */

function wraithImageGlitch(){

    if(!wraithIntroScreen){
        return;
    }


    var image =
        wraithIntroScreen.querySelector("img");


    if(!image){
        return;
    }


    image.classList.remove(
        "wraith-image-glitch"
    );


    void image.offsetWidth;


    image.classList.add(
        "wraith-image-glitch"
    );


    setTimeout(function(){

        image.classList.remove(
            "wraith-image-glitch"
        );

    }, 600);

}


/* =========================================================
   GLITCH TEXT EFFECT
   ========================================================= */

function glitchText(
    element,
    text
){

    if(!element){
        return;
    }


    var chars =
        "01#@$%&<>[]{}\\/";


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

        }, 28);

}


/* =========================================================
   SHOW WRAITH DIALOGUE
   ========================================================= */

function showWraithLine(){

    if(
        wraithLineIndex >=
        wraithLines.length
    ){

        endWraithIntro();

        return;

    }


    wraithGlitch();

    wraithImageGlitch();


    glitchText(
        wraithDialogueText,
        wraithLines[wraithLineIndex]
    );


    if(wraithContinueButton){

        if(
            wraithLineIndex ===
            wraithLines.length - 1
        ){

            wraithContinueButton.textContent =
                "ENTER THE LOOP DUNGEON";

        }

        else{

            wraithContinueButton.textContent =
                "CONTINUE";

        }

    }

}


/* =========================================================
   START WRAITH INTRO
   ========================================================= */

function startWraithIntro(){

    if(!wraithIntroScreen){

        loadQuestion();

        return;

    }


    wraithLineIndex = 0;


    wraithIntroScreen.classList.add(
        "show"
    );


    showWraithLine();

}


/* =========================================================
   WRAITH CONTINUE
   ========================================================= */

if(wraithContinueButton){

    wraithContinueButton.addEventListener(
        "click",
        function(){

            if(
                wraithLineIndex >=
                wraithLines.length - 1
            ){

                endWraithIntro();

                return;

            }


            wraithLineIndex++;

            showWraithLine();

        }
    );

}


/* =========================================================
   END WRAITH INTRO
   ========================================================= */

function endWraithIntro(){

    if(wraithIntroScreen){

        wraithIntroScreen.classList.remove(
            "show"
        );

    }


    setTimeout(function(){

        loadQuestion();

    }, 800);

}


/* =========================================================
   ENTER TRIAL
   ========================================================= */

if(startBattleButton){

    startBattleButton.addEventListener(
        "click",
        function(){

            if(startScreen){

                startScreen.style.display =
                    "none";

            }


            if(bgMusic){

                bgMusic.volume =
                    0.38;

                bgMusic.play()
                    .catch(function(){});

            }


            startWraithIntro();

        }
    );

}

/* =========================================================
   BOOK V — PART 2
   GAMEPLAY ENGINE
   ========================================================= */


/* =========================================================
   LOAD QUESTION
   ========================================================= */

function loadQuestion(){

    if(currentQuestion >= questions.length){

        finishBook();

        return;

    }


    answered = false;


    var q =
        questions[currentQuestion];


    /* -----------------------------------------
       QUESTION NUMBER
    ----------------------------------------- */

    if(questionNumber){

        questionNumber.textContent =
            "CHALLENGE " +
            (currentQuestion + 1);

    }


    /* -----------------------------------------
       QUESTION TYPE
    ----------------------------------------- */

    if(questionType){

        questionType.textContent =
            q.section;

    }


    /* -----------------------------------------
       QUESTION TEXT
    ----------------------------------------- */

    if(questionText){

        questionText.textContent =
            q.question;

    }


    /* -----------------------------------------
       CODE
    ----------------------------------------- */

    if(codeDisplay){

        if(q.code){

            codeDisplay.textContent =
                q.code;

            codeDisplay.style.display =
                "block";

        }

        else{

            codeDisplay.textContent =
                "";

            codeDisplay.style.display =
                "none";

        }

    }


    /* -----------------------------------------
       CLEAR OLD ANSWERS
    ----------------------------------------- */

    if(answers){

        answers.innerHTML = "";

    }


    /* -----------------------------------------
       CLEAR FEEDBACK
    ----------------------------------------- */

    if(feedback){

        feedback.textContent =
            "";

        feedback.classList.remove(
            "show",
            "correct",
            "wrong"
        );

    }


    /* -----------------------------------------
       CLEAR RATIONALE
    ----------------------------------------- */

    if(rationaleBox){

        rationaleBox.classList.remove(
            "show"
        );

    }


    /* -----------------------------------------
       STOP PREVIOUS TIMER
    ----------------------------------------- */

    stopTimeAttack();


    /* -----------------------------------------
       CHOICE QUESTION
    ----------------------------------------- */

    if(q.mode === "choice"){

        createChoiceAnswers(q);

    }


    /* -----------------------------------------
       TYPED QUESTION
    ----------------------------------------- */

    else if(q.mode === "type"){

        createTypedAnswer(q);

    }


    /* -----------------------------------------
       TIME ATTACK
    ----------------------------------------- */

    if(q.section === "TIME ATTACK"){

        startTimeAttack();

    }


    /* -----------------------------------------
       SURVIVAL STATUS
    ----------------------------------------- */

    updateTrialStatus();


    updateHP();

    updateScore();


    /* -----------------------------------------
       SAVE PROGRESS
    ----------------------------------------- */

    saveBook8Progress();

}


/* =========================================================
   CREATE MULTIPLE CHOICE ANSWERS
   ========================================================= */

function createChoiceAnswers(q){

    if(!answers){
        return;
    }


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

    if(!answers){
        return;
    }


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


    input.placeholder =
        q.placeholder ||
        "Type your answer...";


    input.id =
        "book8AnswerInput";


    var submit =
        document.createElement("button");


    submit.className =
        "submit-answer-button";


    submit.textContent =
        "SUBMIT";


    submit.addEventListener(
        "click",
        function(){

            if(answered){
                return;
            }


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


    wrapper.appendChild(
        input
    );


    wrapper.appendChild(
        submit
    );


    answers.appendChild(
        wrapper
    );


    setTimeout(
        function(){

            input.focus();

        },
        100
    );

}


/* =========================================================
   NORMALIZE ANSWER
   ========================================================= */

function normalizeAnswer(value){

    return String(value)
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");

}


/* =========================================================
   CHECK MULTIPLE CHOICE
   ========================================================= */

function checkChoiceAnswer(
    selected
){

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

        handleCorrectAnswer(
            q
        );

    }

    else{

        handleWrongAnswer(
            q
        );

    }

}


/* =========================================================
   CHECK TYPED ANSWER
   ========================================================= */

function checkTypedAnswer(){

    if(answered){
        return;
    }


    var q =
        questions[currentQuestion];


    var input =
        document.getElementById(
            "book8AnswerInput"
        );


    if(!input){
        return;
    }


    var userAnswer =
        normalizeAnswer(
            input.value
        );


    if(userAnswer === ""){

        showFeedback(
            "Please enter an answer first.",
            false
        );

        return;

    }


    input.disabled =
        true;


    var expected =
        normalizeAnswer(
            q.expectedAnswer
        );


    if(
        userAnswer ===
        expected
    ){

        handleCorrectAnswer(
            q
        );

    }

    else{

        handleWrongAnswer(
            q
        );

    }

}


/* =========================================================
   CORRECT ANSWER
   ========================================================= */

function handleCorrectAnswer(q){

    answered = true;


    stopTimeAttack();


    var damage =
        doublePowerActive
            ? 30
            : 20;


    enemyHP -=
        damage;


    if(enemyHP < 0){

        enemyHP = 0;

    }


    doublePowerActive =
        false;


    score +=
        100;


    essence +=
        10;


    updateHP();

    updateScore();


    showFeedback(
        "✓ CORRECT — " +
        q.feedback,
        true
    );


    showRationale(
        q.rationale
    );


    showFloatingNumber(
        enemyCharacter,
        "-" + damage,
        "damage"
    );


    playSound(
        damageSound
    );


    enemyHitEffect();


    playerAttack();


    if(
        enemyHP <= 0
    ){

        setTimeout(
            function(){

                finishBook();

            },
            1200
        );

        return;

    }


    if(
        currentQuestion ===
        questions.length - 1
    ){

        setTimeout(
            function(){

                finishBook();

            },
            1200
        );

        return;

    }


    showNextButton();

}


/* =========================================================
   WRONG ANSWER
   ========================================================= */

function handleWrongAnswer(q){

    answered = true;


    stopTimeAttack();


    playerHP -=
        18;


    if(playerHP < 0){

        playerHP = 0;

    }


    score -=
        28;


    if(score < 0){

        score = 0;

    }


    /* -----------------------------------------
       SURVIVAL TRIAL MISTAKE
    ----------------------------------------- */

    if(
        q.section ===
        "SURVIVAL TRIAL"
    ){

        survivalMistakes++;

        updateTrialStatus();

    }


    updateHP();

    updateScore();


    showFeedback(
        "✕ WRONG — " +
        q.feedback,
        false
    );


    showRationale(
        q.rationale
    );


    showFloatingNumber(
        document.getElementById(
            "playerCharacter"
        ),
        "-18",
        "damage"
    );


    playerDamageEffect();


    if(
        playerHP <= 0
    ){

        setTimeout(
            loseGame,
            1000
        );

        return;

    }


    if(
        q.section ===
        "SURVIVAL TRIAL" &&
        survivalMistakes >=
        survivalMaxMistakes
    ){

        setTimeout(
            loseGame,
            1000
        );

        return;

    }


    showNextButton();

}


/* =========================================================
   FEEDBACK
   ========================================================= */

function showFeedback(
    message,
    correct
){

    if(!feedback){
        return;
    }


    feedback.textContent =
        message;


    feedback.classList.remove(
        "show",
        "correct",
        "wrong"
    );


    if(correct){

        feedback.classList.add(
            "correct"
        );

    }

    else{

        feedback.classList.add(
            "wrong"
        );

    }


    void feedback.offsetWidth;


    feedback.classList.add(
        "show"
    );

}


/* =========================================================
   RATIONALE
   ========================================================= */

function showRationale(
    text
){

    if(!rationaleBox){
        return;
    }


    if(rationaleText){

        rationaleText.textContent =
            text;

    }


    rationaleBox.classList.add(
        "show"
    );

}


/* =========================================================
   CLOSE RATIONALE
   ========================================================= */

if(rationaleClose){

    rationaleClose.addEventListener(
        "click",
        function(){

            hideRationale();

        }
    );

}


function hideRationale(){

    if(rationaleBox){

        rationaleBox.classList.remove(
            "show"
        );

    }

}


/* =========================================================
   NEXT BUTTON
   ========================================================= */

function showNextButton(){

    var oldButton =
        document.getElementById(
            "nextQuestionButton"
        );


    if(oldButton){

        oldButton.remove();

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


    if(answers){

        answers.appendChild(
            button
        );

    }

}


/* =========================================================
   HP UPDATE
   ========================================================= */

function updateHP(){

    if(playerHp){

        playerHp.style.width =
            playerHP + "%";

    }


    if(enemyHp){

        enemyHp.style.width =
            enemyHP + "%";

    }


    if(playerHpText){

        playerHpText.textContent =
            playerHP + " / 100";

    }


    if(enemyHpText){

        enemyHpText.textContent =
            enemyHP + " / 100";

    }

}


/* =========================================================
   SCORE UPDATE
   ========================================================= */

function updateScore(){

    if(scoreDisplay){

        scoreDisplay.textContent =
            score;

    }


    if(essenceDisplay){

        essenceDisplay.textContent =
            essence;

    }

}


/* =========================================================
   SURVIVAL TRIAL STATUS
   ========================================================= */

function updateTrialStatus(){

    if(!trialStatus){
        return;
    }


    if(
        questions[currentQuestion] &&
        questions[currentQuestion].section ===
        "SURVIVAL TRIAL"
    ){

        var remaining =
            survivalMaxMistakes -
            survivalMistakes;


        trialStatus.textContent =
            "☠ SURVIVAL TRIAL — " +
            remaining +
            " mistake" +
            (
                remaining === 1
                    ? ""
                    : "s"
            ) +
            " remaining";


        trialStatus.classList.add(
            "danger"
        );

    }

    else{

        trialStatus.textContent =
            "";

        trialStatus.classList.remove(
            "danger"
        );

    }

}


/* =========================================================
   TIME ATTACK START
   ========================================================= */

function startTimeAttack(){

    stopTimeAttack();


    timeAttackSeconds =
        20;


    timeAttackActive =
        true;


    updateTimerDisplay();


    timeAttackTimer =
        setInterval(
            function(){

                timeAttackSeconds--;


                updateTimerDisplay();


                if(
                    timeAttackSeconds <=
                    0
                ){

                    timeAttackExpired();

                }

            },
            1000
        );

}


/* =========================================================
   TIMER DISPLAY
   ========================================================= */

function updateTimerDisplay(){

    var timer =
        document.getElementById(
            "timeAttackTimer"
        );


    if(!timer){
        return;
    }


    timer.textContent =
        "TIME: " +
        timeAttackSeconds;


    timer.classList.remove(
        "warning",
        "critical"
    );


    if(
        timeAttackSeconds <= 8
    ){

        timer.classList.add(
            "critical"
        );

    }

    else if(
        timeAttackSeconds <= 10
    ){

        timer.classList.add(
            "warning"
        );

    }

}


/* =========================================================
   TIMER EXPIRED
   ========================================================= */

function timeAttackExpired(){

    stopTimeAttack();


    if(answered){
        return;
    }


    answered = true;


    playerHP -=
        10;


    score -=
        10;


    if(playerHP < 0){

        playerHP = 0;

    }


    if(score < 0){

        score = 0;

    }


    updateHP();

    updateScore();


    showFeedback(
        "⌛ TIME'S UP — The loop consumed your time.",
        false
    );


    showRationale(
        questions[currentQuestion].rationale
    );


    playerDamageEffect();


    if(playerHP <= 0){

        setTimeout(
            loseGame,
            1000
        );

        return;

    }


    showNextButton();

}


/* =========================================================
   STOP TIMER
   ========================================================= */

function stopTimeAttack(){

    if(timeAttackTimer){

        clearInterval(
            timeAttackTimer
        );

        timeAttackTimer =
            null;

    }


    timeAttackActive =
        false;

}


/* =========================================================
   PLAYER ATTACK
   ========================================================= */

function playerAttack(){

    if(!attackAnimation){
        return;
    }


    attackAnimation.classList.remove(
        "active"
    );


    void attackAnimation.offsetWidth;


    attackAnimation.classList.add(
        "active"
    );


    if(
        attackVideo &&
        attackVideoSource
    ){

        var attackData =
            characters[
                selectedCharacter
            ];


        if(
            attackData &&
            attackData.attackVideo
        ){

            attackVideoSource.src =
                attackData.attackVideo;


            attackVideo.load();


            attackVideo.play()
                .catch(function(){});

        }

    }


    setTimeout(
        function(){

            attackAnimation.classList.remove(
                "active"
            );

        },
        1000
    );

}


/* =========================================================
   ENEMY HIT EFFECT
   ========================================================= */

function enemyHitEffect(){

    if(!enemyCharacter){
        return;
    }


    enemyCharacter.classList.remove(
        "enemy-hit"
    );


    void enemyCharacter.offsetWidth;


    enemyCharacter.classList.add(
        "enemy-hit"
    );


    setTimeout(
        function(){

            enemyCharacter.classList.remove(
                "enemy-hit"
            );

        },
        800
    );

}


/* =========================================================
   PLAYER DAMAGE EFFECT
   ========================================================= */

function playerDamageEffect(){

    var playerImage =
        document.getElementById(
            "playerCharacter"
        );


    if(!playerImage){
        return;
    }


    playerImage.classList.remove(
        "player-hit"
    );


    void playerImage.offsetWidth;


    playerImage.classList.add(
        "player-hit"
    );


    document.body.classList.add(
        "damage-flash"
    );


    setTimeout(
        function(){

            playerImage.classList.remove(
                "player-hit"
            );

            document.body.classList.remove(
                "damage-flash"
            );

        },
        800
    );


    playSound(
        damageSound
    );

}


/* =========================================================
   FLOATING DAMAGE NUMBER
   ========================================================= */

function showFloatingNumber(
    target,
    text,
    type
){

    if(!target){
        return;
    }


    var number =
        document.createElement("div");


    number.className =
        "floating-number " +
        (
            type ||
            "damage"
        );


    number.textContent =
        text;


    var rect =
        target.getBoundingClientRect();


    number.style.left =
        (
            rect.left +
            rect.width / 2
        ) +
        "px";


    number.style.top =
        (
            rect.top +
            rect.height / 3
        ) +
        "px";


    document.body.appendChild(
        number
    );


    setTimeout(
        function(){

            number.remove();

        },
        1000
    );

}


/* =========================================================
   SOUND PLAYER
   ========================================================= */

function playSound(
    sound
){

    if(!sound){
        return;
    }


    try{

        sound.currentTime =
            0;

        sound.play()
            .catch(function(){});

    }

    catch(error){

        console.log(
            "Sound playback failed."
        );

    }

}


/* =========================================================
   HINT
   ========================================================= */

function useHint(){

    if(
        hintCount <= 0 ||
        answered
    ){

        return;

    }


    hintCount--;


    var q =
        questions[currentQuestion];


    var hintText = "";


    if(
        q.section ===
        "DETERMINE WHAT HAPPENS NEXT"
    ){

        hintText =
            "Think about the starting value, condition, and update.";

    }

    else if(
        q.section ===
        "TIME ATTACK"
    ){

        hintText =
            "Check how the loop condition changes during each iteration.";

    }

    else{

        hintText =
            "Look carefully at what controls when the loop starts and stops.";

    }


    showFeedback(
        "💡 HINT: " +
        hintText,
        true
    );


    var hintButton =
        document.getElementById(
            "hintButton"
        );


    if(hintButton){

        hintButton.textContent =
            "HINT (" +
            hintCount +
            ")";

    }

}


/* =========================================================
   HEAL
   ========================================================= */

function useHeal(){

    if(
        healCount <= 0 ||
        playerHP >= 100
    ){

        return;

    }


    healCount--;


    playerHP +=
        28;


    if(playerHP > 100){

        playerHP =
            100;

    }


    updateHP();


    showFloatingNumber(
        document.getElementById(
            "playerCharacter"
        ),
        "+28",
        "heal"
    );


    playSound(
        healSound
    );


    var healButton =
        document.getElementById(
            "healButton"
        );


    if(healButton){

        healButton.textContent =
            "HEAL (" +
            healCount +
            ")";

    }

}


/* =========================================================
   DOUBLE DAMAGE
   ========================================================= */

function useDoubleDamage(){

    if(
        doubleCount <= 0 ||
        answered
    ){

        return;

    }


    doubleCount--;

    doublePowerActive =
        true;


    showFeedback(
        "⚡ DOUBLE DAMAGE ARMED — Your next correct answer deals extra damage.",
        true
    );


    var doubleButton =
        document.getElementById(
            "doubleButton"
        );


    if(doubleButton){

        doubleButton.textContent =
            "DOUBLE (" +
            doubleCount +
            ")";

    }

}


/* =========================================================
   MYSTIC SIGHT
   ========================================================= */

function useMysticSight(){

    if(
        mysticSightCount <= 0 ||
        answered
    ){

        return;

    }


    mysticSightCount--;


    showFeedback(
        "👁 MYSTIC SIGHT — The Wraith's pattern becomes visible.",
        true
    );


    if(
        rationaleBox &&
        rationaleText
    ){

        rationaleText.textContent =
            questions[
                currentQuestion
            ].rationale;


        rationaleBox.classList.add(
            "show"
        );

    }


    var button =
        document.getElementById(
            "mysticSightPower"
        );


    if(button){

        button.textContent =
            "MYSTIC SIGHT (" +
            mysticSightCount +
            ")";

    }

}


/* =========================================================
   OMNIDATA
   ========================================================= */

function useOmnidata(){

    if(
        omnidataCount <= 0 ||
        answered
    ){

        return;

    }


    omnidataCount--;


    showFeedback(
        "◈ OMNIDATA — Analyze the loop from every angle.",
        true
    );


    var q =
        questions[
            currentQuestion
        ];


    showRationale(
        q.rationale
    );


    var button =
        document.getElementById(
            "omnidataPower"
        );


    if(button){

        button.textContent =
            "OMNIDATA (" +
            omnidataCount +
            ")";

    }

}


/* =========================================================
   SYNTAX SORCERY
   ========================================================= */

function useSyntaxSorcery(){

    if(
        syntaxSorceryCount <= 0 ||
        answered
    ){

        return;

    }


    syntaxSorceryCount--;


    var q =
        questions[
            currentQuestion
        ];


    if(
        q.mode ===
        "choice"
    ){

        var buttons =
            document.querySelectorAll(
                ".answer-button"
            );


        var wrongRemoved =
            0;


        for(
            var i = 0;
            i < buttons.length;
            i++
        ){

            if(
                i !== q.correct &&
                wrongRemoved < 2
            ){

                buttons[i].style.opacity =
                    "0.28";

                buttons[i].disabled =
                    true;

                wrongRemoved++;

            }

        }

    }


    showFeedback(
        "✦ SYNTAX SORCERY — Two false paths have been erased.",
        true
    );


    var button =
        document.getElementById(
            "syntaxSorceryPower"
        );


    if(button){

        button.textContent =
            "SYNTAX SORCERY (" +
            syntaxSorceryCount +
            ")";

    }

}


/* =========================================================
   FLAMEBURST
   ========================================================= */

function useFlameburst(){

    if(
        flameburstCount <= 0 ||
        answered
    ){

        return;

    }


    flameburstCount--;


    enemyHP -=
        18;


    if(enemyHP < 0){

        enemyHP = 0;

    }


    score +=
        28;


    updateHP();

    updateScore();


    showFloatingNumber(
        enemyCharacter,
        "-18",
        "damage"
    );


    enemyHitEffect();


    showFeedback(
        "🔥 FLAMEBURST — The Wraith's loop burns for 18 damage.",
        true
    );


    var button =
        document.getElementById(
            "flameburstPower"
        );


    if(button){

        button.textContent =
            "FLAMEBURST (" +
            flameburstCount +
            ")";

    }


    if(enemyHP <= 0){

        setTimeout(
            finishBook,
            800
        );

    }

}


/* =========================================================
   MINDCRAFT
   ========================================================= */

function useMindcraft(){

    if(
        mindcraftCount <= 0 ||
        answered
    ){

        return;

    }


    mindcraftCount--;

    mindcraftShield =
        true;


    showFeedback(
        "🧠 MINDCRAFT — The next mistake will be blocked.",
        true
    );


    var button =
        document.getElementById(
            "mindcraftPower"
        );


    if(button){

        button.textContent =
            "MINDCRAFT (" +
            mindcraftCount +
            ")";

    }

}

/* =========================================================
   BOOK V — PART 3
   SURVIVAL, HORROR EFFECTS, VICTORY, SAVE SYSTEM
   ========================================================= */


/* =========================================================
   MINDCRAFT SHIELD FIX
   ========================================================= */

function checkMindcraftShield(){

    if(!mindcraftShield){
        return false;
    }


    mindcraftShield =
        false;


    showFeedback(
        "🧠 MINDCRAFT BLOCKED THE ATTACK!",
        true
    );


    var playerImage =
        document.getElementById(
            "playerCharacter"
        );


    if(playerImage){

        playerImage.classList.add(
            "mindcraft-shield"
        );


        setTimeout(
            function(){

                playerImage.classList.remove(
                    "mindcraft-shield"
                );

            },
            700
        );

    }


    return true;

}


/* =========================================================
   OVERRIDE WRONG ANSWER
   Mindcraft protects from the next mistake.
   ========================================================= */

var originalHandleWrongAnswer =
    handleWrongAnswer;


handleWrongAnswer =
    function(q){

        if(answered){
            return;
        }


        /*
           If Mindcraft is active,
           the player takes no damage.
        */

        if(checkMindcraftShield()){

            answered = true;


            stopTimeAttack();


            showRationale(
                q.rationale
            );


            showNextButton();


            return;

        }


        originalHandleWrongAnswer(q);

    };


/* =========================================================
   WRAITH HORROR SYSTEM
   ========================================================= */

var horrorInterval =
    null;


var horrorActive =
    false;


/* =========================================================
   GREEN WRAITH SCREEN EFFECT
   ========================================================= */

function greenWraithPulse(){

    if(
        !wraithIntroScreen ||
        !wraithIntroScreen.classList.contains(
            "show"
        )
    ){

        return;

    }


    wraithIntroScreen.classList.add(
        "wraith-green-pulse"
    );


    setTimeout(
        function(){

            wraithIntroScreen.classList.remove(
                "wraith-green-pulse"
            );

        },
        900
    );

}


/* =========================================================
   SCREEN CORRUPTION
   ========================================================= */

function screenCorruption(){

    document.body.classList.add(
        "screen-corruption"
    );


    setTimeout(
        function(){

            document.body.classList.remove(
                "screen-corruption"
            );

        },
        480
    );

}


/* =========================================================
   SCREEN SHAKE
   ========================================================= */

function horrorShake(){

    document.body.classList.add(
        "horror-shake"
    );


    setTimeout(
        function(){

            document.body.classList.remove(
                "horror-shake"
            );

        },
        800
    );

}


/* =========================================================
   GREEN FLASH
   ========================================================= */

function greenFlash(){

    var flash =
        document.createElement("div");


    flash.className =
        "wraith-green-flash";


    document.body.appendChild(
        flash
    );


    setTimeout(
        function(){

            flash.remove();

        },
        280
    );

}


/* =========================================================
   HORROR WHISPER
   ========================================================= */

function wraithWhisper(){

    if(
        !wraithDialogueText ||
        !wraithIntroScreen ||
        !wraithIntroScreen.classList.contains(
            "show"
        )
    ){

        return;

    }


    var whispers = [

        "...again...",

        "...repeat...",

        "...you cannot escape...",

        "...again...",

        "...loop...",

        "...while...",

        "...for...",

        "...do it again..."

    ];


    var whisper =
        whispers[
            Math.floor(
                Math.random() *
                whispers.length
            )
        ];


    var oldText =
        wraithDialogueText.textContent;


    wraithDialogueText.classList.add(
        "whisper-text"
    );


    wraithDialogueText.textContent =
        whisper;


    setTimeout(
        function(){

            wraithDialogueText.classList.remove(
                "whisper-text"
            );


            wraithDialogueText.textContent =
                oldText;

        },
        700
    );

}


/* =========================================================
   WRAITH HORROR EVENT
   ========================================================= */

function randomWraithHorror(){

    if(
        !wraithIntroScreen ||
        !wraithIntroScreen.classList.contains(
            "show"
        )
    ){

        return;

    }


    var event =
        Math.floor(
            Math.random() * 6
        );


    switch(event){

        case 0:

            wraithGlitch();

            break;


        case 1:

            wraithImageGlitch();

            break;


        case 2:

            screenCorruption();

            break;


        case 3:

            horrorShake();

            break;


        case 4:

            greenFlash();

            break;


        case 8:

            wraithWhisper();

            break;

    }

}


/* =========================================================
   START HORROR EVENTS
   ========================================================= */

function startHorrorEvents(){

    stopHorrorEvents();


    horrorActive =
        true;


    horrorInterval =
        setInterval(
            function(){

                if(!horrorActive){
                    return;
                }


                randomWraithHorror();

            },
            1800
        );

}


/* =========================================================
   STOP HORROR EVENTS
   ========================================================= */

function stopHorrorEvents(){

    horrorActive =
        false;


    if(horrorInterval){

        clearInterval(
            horrorInterval
        );


        horrorInterval =
            null;

    }

}


/* =========================================================
   OVERRIDE START WRAITH INTRO
   ========================================================= */

var oldStartWraithIntro =
    startWraithIntro;


startWraithIntro =
    function(){

        startHorrorEvents();


        oldStartWraithIntro();

    };


/* =========================================================
   OVERRIDE END WRAITH INTRO
   ========================================================= */

var oldEndWraithIntro =
    endWraithIntro;


endWraithIntro =
    function(){

        stopHorrorEvents();


        oldEndWraithIntro();

    };


/* =========================================================
   WRAITH NAME
   ========================================================= */

if(enemyCharacter){

    enemyCharacter.alt =
        "The Endless Wraith";

}


var enemyName =
    document.getElementById(
        "enemyName"
    );


if(enemyName){

    enemyName.textContent =
        "THE ENDLESS WRAITH";

}


var enemyRole =
    document.getElementById(
        "enemyRole"
    );


if(enemyRole){

    enemyRole.textContent =
        "Traps Everything in Repetition";

}


/* =========================================================
   WRAITH INTRO IMAGE
   ========================================================= */

function setupWraithImage(){

    if(!wraithIntroScreen){
        return;
    }


    var image =
        wraithIntroScreen.querySelector(
            "img"
        );


    if(!image){
        return;
    }


    image.src =
        "images/endless-wraith.png";


    image.alt =
        "The Endless Wraith";


    image.classList.add(
        "endless-wraith"
    );

}


setupWraithImage();


/* =========================================================
   RANDOM WRAITH FLICKER
   ========================================================= */

setInterval(
    function(){

        if(
            !wraithIntroScreen ||
            !wraithIntroScreen.classList.contains(
                "show"
            )
        ){

            return;

        }


        var image =
            wraithIntroScreen.querySelector(
                "img"
            );


        if(!image){
            return;
        }


        image.style.opacity =
            "0.18";


        setTimeout(
            function(){

                image.style.opacity =
                    "1";

            },
            80
        );


    },
    4300
);


/* =========================================================
   WRAITH EYE EFFECT
   ========================================================= */

function wraithEyeFlash(){

    if(!wraithIntroScreen){
        return;
    }


    var eyes =
        document.createElement("div");


    eyes.className =
        "wraith-eye-flash";


    eyes.innerHTML =
        "●       ●";


    wraithIntroScreen.appendChild(
        eyes
    );


    setTimeout(
        function(){

            eyes.remove();

        },
        800
    );

}


setInterval(
    function(){

        if(
            wraithIntroScreen &&
            wraithIntroScreen.classList.contains(
                "show"
            )
        ){

            if(
                Math.random() <
                0.38
            ){

                wraithEyeFlash();

            }

        }

    },
    3000
);


/* =========================================================
   FINISH BOOK
   ========================================================= */

function finishBook(){

    stopTimeAttack();

    stopHorrorEvents();


    answered =
        true;


    enemyHP =
        0;


    score +=
        800;


    essence +=
        80;


    updateHP();

    updateScore();


    localStorage.setItem(
        "book8Completed",
        "true"
    );


    localStorage.setItem(
        "book8Score",
        String(score)
    );


    localStorage.setItem(
        "book8Essence",
        String(essence)
    );


    /*
       Victory visual
    */

    document.body.classList.add(
        "book8-victory"
    );


    if(enemyCharacter){

        enemyCharacter.classList.add(
            "wraith-defeated"
        );

    }


    if(battleMessage){

        battleMessage.textContent =
            "THE LOOP HAS BEEN BROKEN.";

    }


    setTimeout(
        showVictory,
        1200
    );

}


/* =========================================================
   VICTORY SCREEN
   ========================================================= */

function showVictory(){

    if(resultScreen){

        resultScreen.classList.add(
            "show"
        );


        var resultTitle =
            resultScreen.querySelector(
                ".result-title"
            );


        if(resultTitle){

            resultTitle.textContent =
                "LOOP TERMINATED";

        }


        var resultMessage =
            resultScreen.querySelector(
                ".result-message"
            );


        if(resultMessage){

            resultMessage.textContent =
                "The Endless Wraith has been defeated. You escaped the Loop Dungeon.";

        }


        var resultScore =
            resultScreen.querySelector(
                ".result-score"
            );


        if(resultScore){

            resultScore.textContent =
                score;

        }


        return;

    }


    /*
       Fallback victory screen
    */

    var victory =
        document.createElement("div");


    victory.className =
        "book8-victory-overlay";


    victory.innerHTML =

        '<div class="book8-victory-content">' +

            '<div class="victory-glitch">' +
                'LOOP TERMINATED' +
            '</div>' +

            '<h1>' +
                'THE WRAITH IS DEFEATED' +
            '</h1>' +

            '<p>' +
                'You escaped the Loop Dungeon.'
            '</p>' +

            '<div class="victory-score">' +
                'SCORE: ' +
                score +
            '</div>' +

            '<button id="book8Continue">' +
                'CONTINUE'
            '</button>' +

        '</div>';


    document.body.appendChild(
        victory
    );


    var continueButton =
        document.getElementById(
            "book8Continue"
        );


    if(continueButton){

        continueButton.addEventListener(
            "click",
            function(){

                localStorage.setItem(
                    "book8Completed",
                    "true"
                );


                window.location.reload();

            }
        );

    }

}


/* =========================================================
   LOSE GAME
   ========================================================= */

function loseGame(){

    stopTimeAttack();

    stopHorrorEvents();


    answered =
        true;


    document.body.classList.add(
        "book8-defeat"
    );


    if(battleMessage){

        battleMessage.textContent =
            "THE LOOP HAS CONSUMED YOU.";

    }


    if(loseScreen){

        loseScreen.classList.add(
            "show"
        );


        return;

    }


    /*
       Fallback defeat screen
    */

    var defeat =
        document.createElement("div");


    defeat.className =
        "book8-defeat-overlay";


    defeat.innerHTML =

        '<div class="book8-defeat-content">' +

            '<div class="defeat-glitch">' +
                'LOOP ERROR'
            '</div>' +

            '<h1>' +
                'YOU ARE TRAPPED'
            '</h1>' +

            '<p>' +
                'The Endless Wraith has forced you into eternal repetition.'
            '</p>' +

            '<button id="book8Retry">' +
                'BREAK THE LOOP'
            '</button>' +

        '</div>';


    document.body.appendChild(
        defeat
    );


    var retry =
        document.getElementById(
            "book8Retry"
        );


    if(retry){

        retry.addEventListener(
            "click",
            restartBook8
        );

    }

}


/* =========================================================
   RESTART BOOK V
   ========================================================= */

function restartBook8(){

    stopTimeAttack();

    stopHorrorEvents();


    playerHP =
        100;


    enemyHP =
        100;


    score =
        0;


    essence =
        0;


    currentQuestion =
        0;


    answered =
        false;


    survivalMistakes =
        0;


    timeAttackSeconds =
        20;


    doublePowerActive =
        false;


    mindcraftShield =
        false;


    localStorage.removeItem(
        "book8CurrentQuestion"
    );


    localStorage.removeItem(
        "book8Score"
    );


    localStorage.removeItem(
        "book8Essence"
    );


    localStorage.removeItem(
        "book8PlayerHP"
    );


    localStorage.removeItem(
        "book8EnemyHP"
    );


    document.body.classList.remove(
        "book8-victory",
        "book8-defeat",
        "screen-corruption",
        "horror-shake",
        "damage-flash"
    );


    if(resultScreen){

        resultScreen.classList.remove(
            "show"
        );

    }


    if(loseScreen){

        loseScreen.classList.remove(
            "show"
        );

    }


    var fallbackVictory =
        document.querySelector(
            ".book8-victory-overlay"
        );


    if(fallbackVictory){

        fallbackVictory.remove();

    }


    var fallbackDefeat =
        document.querySelector(
            ".book8-defeat-overlay"
        );


    if(fallbackDefeat){

        fallbackDefeat.remove();

    }


    updateHP();

    updateScore();

    updateTrialStatus();


    if(startScreen){

        startScreen.style.display =
            "";

    }


    if(wraithIntroScreen){

        wraithIntroScreen.classList.remove(
            "show"
        );

    }

}


/* =========================================================
   RETRY BUTTON
   ========================================================= */

var retryButton =
    document.getElementById(
        "retryButton"
    );


if(retryButton){

    retryButton.addEventListener(
        "click",
        restartBook8
    );

}


/* =========================================================
   KEYBOARD SUPPORT
   ========================================================= */

document.addEventListener(
    "keydown",
    function(event){

        if(answered){
            return;
        }


        /*
           Number keys for multiple choice.
        */

        if(
            event.key >= "1" &&
            event.key <= "4"
        ){

            var choiceButtons =
                document.querySelectorAll(
                    ".answer-button"
                );


            var index =
                Number(
                    event.key
                ) - 1;


            if(choiceButtons[index]){

                choiceButtons[index].click();

            }

        }


        /*
           Enter submits typed answers.
        */

        if(
            event.key ===
            "Enter"
        ){

            var input =
                document.getElementById(
                    "book8AnswerInput"
                );


            if(input){

                checkTypedAnswer();

            }

        }


        /*
           H = Hint
        */

        if(
            event.key.toLowerCase() ===
            "h"
        ){

            useHint();

        }

    }
);


/* =========================================================
   SAVE PROGRESS
   ========================================================= */

function saveBook8Progress(){

    localStorage.setItem(
        "book8CurrentQuestion",
        String(currentQuestion)
    );


    localStorage.setItem(
        "book8Score",
        String(score)
    );


    localStorage.setItem(
        "book8Essence",
        String(essence)
    );


    localStorage.setItem(
        "book8PlayerHP",
        String(playerHP)
    );


    localStorage.setItem(
        "book8EnemyHP",
        String(enemyHP)
    );


    localStorage.setItem(
        "book8SurvivalMistakes",
        String(survivalMistakes)
    );

}


/* =========================================================
   AUTO SAVE
   ========================================================= */

setInterval(
    function(){

        saveBook8Progress();

    },
    3000
);


/* =========================================================
   LOAD SAVED PROGRESS
   ========================================================= */

function loadBook8Progress(){

    var savedQuestion =
        localStorage.getItem(
            "book8CurrentQuestion"
        );


    var savedScore =
        localStorage.getItem(
            "book8Score"
        );


    var savedEssence =
        localStorage.getItem(
            "book8Essence"
        );


    var savedPlayerHP =
        localStorage.getItem(
            "book8PlayerHP"
        );


    var savedEnemyHP =
        localStorage.getItem(
            "book8EnemyHP"
        );


    var savedMistakes =
        localStorage.getItem(
            "book8SurvivalMistakes"
        );


    if(savedQuestion !== null){

        currentQuestion =
            Number(
                savedQuestion
            );

    }


    if(savedScore !== null){

        score =
            Number(
                savedScore
            );

    }


    if(savedEssence !== null){

        essence =
            Number(
                savedEssence
            );

    }


    if(savedPlayerHP !== null){

        playerHP =
            Number(
                savedPlayerHP
            );

    }


    if(savedEnemyHP !== null){

        enemyHP =
            Number(
                savedEnemyHP
            );

    }


    if(savedMistakes !== null){

        survivalMistakes =
            Number(
                savedMistakes
            );

    }


    updateHP();

    updateScore();

    updateTrialStatus();

}


/* =========================================================
   CLEAR BOOK V SAVE
   ========================================================= */

function clearBook8Save(){

    localStorage.removeItem(
        "book8CurrentQuestion"
    );

    localStorage.removeItem(
        "book8Score"
    );

    localStorage.removeItem(
        "book8Essence"
    );

    localStorage.removeItem(
        "book8PlayerHP"
    );

    localStorage.removeItem(
        "book8EnemyHP"
    );

    localStorage.removeItem(
        "book8SurvivalMistakes"
    );

}


/* =========================================================
   INITIALIZE BOOK V
   ========================================================= */

function initializeBook8(){

    setupWraithImage();


    updateHP();

    updateScore();

    updateTrialStatus();


    /*
       Do NOT automatically load the questions.
       Player must enter the dungeon first.
    */

    console.log(
        "BOOK V: LOOP DUNGEON INITIALIZED"
    );


    console.log(
        "THE ENDLESS WRAITH IS WAITING..."
    );

}


/* =========================================================
   DOM READY
   ========================================================= */

if(
    document.readyState ===
    "loading"
){

    document.addEventListener(
        "DOMContentLoaded",
        initializeBook8
    );

}

else{

    initializeBook8();

}


/* =========================================================
   BOOK V DEBUG INFO
   ========================================================= */

console.log(
    "%cBOOK V: LOOP DUNGEON",
    "font-size:20px;font-weight:bold;"
);

console.log(
    "%cFOR • WHILE • DO-WHILE",
    "font-size:14px;"
);

console.log(
    "%cTHE ENDLESS WRAITH",
    "font-size:16px;"
);

console.log(
    "Current Question:",
    currentQuestion
);

console.log(
    "Player HP:",
    playerHP
);

console.log(
    "Enemy HP:",
    enemyHP
);


/* =========================================================
   BOOK V — BUTTON CONNECTION FIX
   ========================================================= */


/* =========================
   POWER BUTTONS
========================= */

var hintButton =
    document.getElementById("hintPower");

var healButton =
    document.getElementById("healPower");

var doubleButton =
    document.getElementById("doublePower");

var mysticButton =
    document.getElementById("mysticSightPower");

var omnidataButton =
    document.getElementById("omnidataPower");

var syntaxButton =
    document.getElementById("syntaxSorceryPower");

var flameburstButton =
    document.getElementById("flameburstPower");

var mindcraftButton =
    document.getElementById("mindcraftPower");


if(hintButton){

    hintButton.addEventListener(
        "click",
        function(){

            useHint();

        }
    );

}


if(healButton){

    healButton.addEventListener(
        "click",
        function(){

            useHeal();

        }
    );

}


if(doubleButton){

    doubleButton.addEventListener(
        "click",
        function(){

            useDoubleDamage();

        }
    );

}


if(mysticButton){

    mysticButton.addEventListener(
        "click",
        function(){

            useMysticSight();

        }
    );

}


if(omnidataButton){

    omnidataButton.addEventListener(
        "click",
        function(){

            useOmnidata();

        }
    );

}


if(syntaxButton){

    syntaxButton.addEventListener(
        "click",
        function(){

            useSyntaxSorcery();

        }
    );

}


if(flameburstButton){

    flameburstButton.addEventListener(
        "click",
        function(){

            useFlameburst();

        }
    );

}


if(mindcraftButton){

    mindcraftButton.addEventListener(
        "click",
        function(){

            useMindcraft();

        }
    );

}


/* =========================================================
   RETRY TRIAL
========================================================= */

var retryButton =
    document.getElementById(
        "retryTrialButton"
    );


if(retryButton){

    retryButton.onclick =
        function(){

            restartBook8();

        };

}


/* =========================================================
   RETURN TO MAIN MENU
========================================================= */

var loseMenuButton =
    document.getElementById(
        "loseMenuButton"
    );


if(loseMenuButton){

    loseMenuButton.onclick =
        function(){

            window.location.href =
                "/MainMenu/lesson.html";

        };

}


/* =========================================================
   RESULT / VICTORY RETURN BUTTON
========================================================= */

var resultMenuButton =
    document.getElementById(
        "resultMenuButton"
    );


if(resultMenuButton){

    resultMenuButton.onclick =
        function(){

            window.location.href =
                "/MainMenu/lesson.html";

        };

}


/* =========================================================
   RESULT / NEXT BOOK BUTTON
========================================================= */

var nextBookButton =
    document.getElementById(
        "nextBookButton"
    );


if(nextBookButton){

    nextBookButton.onclick =
        function(){

            window.location.href =
                "book6.html";

        };

}


/* =========================================================
   RETRY FALLBACK
========================================================= */

var retryBookButton =
    document.getElementById(
        "retryBookButton"
    );


if(retryBookButton){

    retryBookButton.onclick =
        function(){

            restartBook8();

        };

}


/* =========================================================
   RETURN HOME FALLBACK
========================================================= */

var returnHomeButton =
    document.getElementById(
        "returnHomeButton"
    );


if(returnHomeButton){

    returnHomeButton.onclick =
        function(){

            window.location.href =
                "/MainMenu/lesson.html";

        };

}


/* =========================================================
   NEXT CHALLENGE FALLBACK
========================================================= */

document.addEventListener(
    "click",
    function(event){

        if(
            event.target &&
            event.target.id ===
            "nextQuestionButton"
        ){

            currentQuestion++;

            loadQuestion();

        }

    }
);


/* =========================================================
   TYPED ANSWER ENTER SUPPORT
========================================================= */

document.addEventListener(
    "keydown",
    function(event){

        if(
            event.key === "Enter"
        ){

            var input =
                document.getElementById(
                    "book8AnswerInput"
                );


            if(
                input &&
                document.activeElement ===
                input
            ){

                checkTypedAnswer();

            }

        }

    }
);


/* ==============
   POWER COUNT DISPLAY
======= */

function updatePowerCounts(){

    var hintCountElement 
        document.getElementById(
            "hintCount"
        );

    var healCountElement 
        document.getElementById(
            "healCount"
        );

    var doubleCountElement 
        document.getElementById(
            "doubleCount"
        );

    var mysticCountElement 
        document.getElementById(
            "mysticSightCount"
        );

    var omnidataCountElement 
        document.getElementById(
            "omnidataCount"
        );

    var syntaxCountElement 
        document.getElementById(
            "syntaxSorceryCount"
        );

    var flameburstCountElement 
        document.getElementById(
            "flameburstCount"
        );

    var mindcraftCountElement 
        document.getElementById(
            "mindcraftCount"
        );


    if(hintCountElement){

        hintCountElement.textContent 
            hintCount;

    }


    if(healCountElement){

        healCountElement.textContent 
            healCount;

    }


    if(doubleCountElement){

        doubleCountElement.textContent 
            doubleCount;

    }


    if(mysticCountElement){

        mysticCountElement.textContent 
            mysticSightCount;

    }


    if(omnidataCountElement){

        omnidataCountElement.textContent 
            omnidataCount;

    }


    if(syntaxCountElement){

        syntaxCountElement.textContent 
            syntaxSorceryCount;

    }


    if(flameburstCountElement){

        flameburstCountElement.textContent 
            flameburstCount;

    }


    if(mindcraftCountElement){

        mindcraftCountElement.textContent 
            mindcraftCount;

    }

}


/* 
   UPDATE POWER BUTTON STATE
 */

function updatePowerButtons(){

    if(
        hintButton &&
        hintCount < 0
    ){

        hintButton.classList.add(
            "used"
        );

        hintButton.disabled 
            true;

    }


    if(
        healButton &&
        healCount < 0
    ){

        healButton.classList.add(
            "used"
        );

        healButton.disabled 
            true;

    }


    if(
        doubleButton &&
        doubleCount < 0
    ){

        doubleButton.classList.add(
            "used"
        );

        doubleButton.disabled 
            true;

    }


    if(
        mysticButton &&
        mysticSightCount < 0
    ){

        mysticButton.classList.add(
            "used"
        );

        mysticButton.disabled 
            true;

    }


    if(
        omnidataButton &&
        omnidataCount < 0
    ){

        omnidataButton.classList.add(
            "used"
        );

        omnidataButton.disabled 
            true;

    }


    if(
        syntaxButton &&
        syntaxSorceryCount < 0
    ){

        syntaxButton.classList.add(
            "used"
        );

        syntaxButton.disabled 
            true;

    }


    if(
        flameburstButton &&
        flameburstCount < 0
    ){

        flameburstButton.classList.add(
            "used"
        );

        flameburstButton.disabled 
            true;

    }


    if(
        mindcraftButton &&
        mindcraftCount < 0
    ){

        mindcraftButton.classList.add(
            "used"
        );

        mindcraftButton.disabled 
            true;

    }

}


/* 
   REFRESH POWER UI
 */

function refreshPowerUI(){

    updatePowerCounts();

    updatePowerButtons();

}


/* 
   PATCH POWER FUNCTIONS
   Updates UI after every use.
======================= */

var oldUseHint =
    useHint;

useHint =
    function(){

        oldUseHint();

        refreshPowerUI();

    };


var oldUseHeal =
    useHeal;

useHeal =
    function(){

        oldUseHeal();

        refreshPowerUI();

    };


var oldUseDoubleDamage =
    useDoubleDamage;

useDoubleDamage =
    function(){

        oldUseDoubleDamage();

        refreshPowerUI();

    };


var oldUseMysticSight =
    useMysticSight;

useMysticSight =
    function(){

        oldUseMysticSight();

        refreshPowerUI();

    };


var oldUseOmnidata =
    useOmnidata;

useOmnidata =
    function(){

        oldUseOmnidata();

        refreshPowerUI();

    };


var oldUseSyntaxSorcery =
    useSyntaxSorcery;

useSyntaxSorcery =
    function(){

        oldUseSyntaxSorcery();

        refreshPowerUI();

    };


var oldUseFlameburst =
    useFlameburst;

useFlameburst =
    function(){

        oldUseFlameburst();

        refreshPowerUI();

    };


var oldUseMindcraft =
    useMindcraft;

useMindcraft =
    function(){

        oldUseMindcraft();

        refreshPowerUI();

    };


/* =========================================================
   INITIAL POWER UI
========================================================= */

refreshPowerUI();


console.log(
    "BOOK V BUTTON SYSTEM READY"
);