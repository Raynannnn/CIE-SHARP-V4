/* =========================
   CHARACTER DATA
   (same 5 witches as every other book — copy the same
   images/ and videos/ assets used in Book I / Book II into
   this book's own "images" and "videos" folders)
========================= */

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



/* =========================
   PLAYER DISPLAY
========================= */

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


/* =========================
   SHOW ONLY THIS WITCH'S OWN POWER
   Each witch has ONE signature power-up. The other four
   special power-up buttons are hidden for this run.
========================= */

var specialPowerIds = [

    "mysticSightPower",
    "omnidataPower",
    "syntaxSorceryPower",
    "flameburstPower",
    "mindcraftPower"

];


specialPowerIds.forEach(function(id){

    var btn =
        document.getElementById(id);


    if(!btn){

        return;

    }


    if(id === player.power){

        btn.style.display = "";

    }

    else{

        btn.style.display = "none";

    }

});



/* =========================
   GAME VARIABLES
========================= */

var playerHP = 100;

var enemyHP = 100;

var score = 0;

var essence = 0;

var currentQuestion = 0;

var answered = false;


/* =========================
   POWER UPS
========================= */

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



/* =========================
   QUESTIONS — BOOK III: OPERATOR FORGE
   Arithmetic operators, compound assignment operators,
   and choosing the correct operator for a scenario.

   mode:"choice" -> multiple choice buttons.
   (mode:"type" is kept supported below, same as Book II,
   in case a future trial needs a typed answer.)
========================= */

var questions = [

    /* ===== PREDICT OUTPUT ===== */

    {
        type: "PREDICT OUTPUT",

        mode: "choice",

        question: "What will this code output?",

        code:
`int power = 10;
int bonus = 5;
Console.WriteLine(power + bonus);`,

        answers: [
            "15",
            "5",
            "50",
            "105"
        ],

        correct: 0,

        clue: "Addition combines both values — add power and bonus together.",

        syntaxTip: "power + bonus adds the two values: 10 + 5 = 15.",

        rationale: "The + operator adds the two values together. Since power is 10 and bonus is 5, the result is 15."
    },


    {
        type: "PREDICT OUTPUT",

        mode: "choice",

        question: "What will this code output?",

        code:
`int health = 100;
health = health - 30;
Console.WriteLine(health);`,

        answers: [
            "70",
            "130",
            "30",
            "100"
        ],

        correct: 0,

        clue: "Subtraction reduces the value — take away 30 from 100.",

        syntaxTip: "health - 30 subtracts 30 from the current value: 100 - 30 = 70.",

        rationale: "The - operator subtracts one value from another. 100 - 30 leaves health at 70."
    },


    {
        type: "PREDICT OUTPUT",

        mode: "choice",

        question: "What will this code output?",

        code:
`int x = 10;
int y = 3;
Console.WriteLine(x * y);`,

        answers: [
            "30",
            "13",
            "7",
            "3"
        ],

        correct: 0,

        clue: "Multiplication combines both values by repeated addition.",

        syntaxTip: "x * y multiplies the two values: 10 × 3 = 30.",

        rationale: "The * operator multiplies two values. 10 × 3 equals 30."
    },


    /* ===== MEMORY VAULT ===== */

    {
        type: "MEMORY VAULT",

        mode: "choice",

        question: "What value is now stored in mana?",

        code:
`int mana = 50;
mana += 20;`,

        answers: [
            "70",
            "30",
            "1050",
            "20"
        ],

        correct: 0,

        mistakeSpot: "+= 20",

        clue: "+= adds the given amount to the current value.",

        syntaxTip: "mana += 20 is the same as mana = mana + 20.",

        rationale: "mana += 20 means 50 + 20. The new value is 70."
    },


    {
        type: "MEMORY VAULT",

        mode: "choice",

        question: "What value is now stored in score?",

        code:
`int score = 100;
score -= 25;`,

        answers: [
            "75",
            "125",
            "25",
            "100"
        ],

        correct: 0,

        mistakeSpot: "-= 25",

        clue: "-= subtracts the given amount from the current value.",

        syntaxTip: "score -= 25 is the same as score = score - 25.",

        rationale: "-= subtracts the given amount. 100 - 25 = 75."
    },


    {
        type: "MEMORY VAULT",

        mode: "choice",

        question: "What value is now stored in damage?",

        code:
`int damage = 10;
damage *= 3;`,

        answers: [
            "30",
            "13",
            "7",
            "10"
        ],

        correct: 0,

        mistakeSpot: "*= 3",

        clue: "*= multiplies the current value by the given amount.",

        syntaxTip: "damage *= 3 is the same as damage = damage * 3.",

        rationale: "*= means multiplication. Try 10 × 3."
    },


    /* ===== POTION CALCULATOR ===== */

    {
        type: "POTION CALCULATOR",

        mode: "choice",

        question: "A potion requires 3 herbs and 2 crystals. Complete the code.",

        code: "int ingredients = 3 ___ 2;",

        answers: [
            "+",
            "-",
            "*",
            "/"
        ],

        correct: 0,

        mistakeSpot: "___",

        clue: "You need to combine the quantities.",

        syntaxTip: "int ingredients = 3 + 2;",

        rationale: "The addition operator is + — it combines the herbs and crystals into a total."
    },


    {
        type: "POTION CALCULATOR",

        mode: "choice",

        question: "A player has 100 health and loses 35. Complete the code.",

        code: "int remainingHealth = 100 ___ 35;",

        answers: [
            "+",
            "-",
            "*",
            "/"
        ],

        correct: 1,

        mistakeSpot: "___",

        clue: "Health is being reduced.",

        syntaxTip: "int remainingHealth = 100 - 35;",

        rationale: "Health is being reduced, so use the subtraction operator -."
    },


    {
        type: "POTION CALCULATOR",

        mode: "choice",

        question: "A spell deals 15 damage three times. Complete the code.",

        code: "int totalDamage = 15 ___ 3;",

        answers: [
            "+",
            "-",
            "*",
            "/"
        ],

        correct: 2,

        mistakeSpot: "___",

        clue: "The damage happens three times.",

        syntaxTip: "int totalDamage = 15 * 3;",

        rationale: "The damage happens three times, so use * for multiplication."
    }

];



/* =========================
   ELEMENTS
========================= */

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


var battleMessage =
    document.getElementById("battleMessage");


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


var playerFighterEl =
    document.querySelector(".player-fighter");


var enemyFighterEl =
    document.querySelector(".enemy-fighter");


var rationaleBox =
    document.getElementById("rationaleBox");


var rationaleText =
    document.getElementById("rationaleText");


var rationaleClose =
    document.getElementById("rationaleClose");


var rationaleTimer = null;


var hintPowerBtn =
    document.getElementById("hintPower");


var flameburstPowerBtn =
    document.getElementById("flameburstPower");



/* =========================
   IRON ALCHEMIST INTRO DIALOGUE
   Shown once, right after "ENTER THE TRIAL" and before
   the first question — instead of jumping straight into
   the questions.
========================= */

var mimicLines = [

    "Ah... another apprentice wanders into MY Forge.",

    "I have rewritten every symbol here — turned + into -, twisted every comparison, tangled every condition.",

    "Every gear, every spell, every calculation you see may be lying to you.",

    "Let's see if you understand how these symbols truly command value... or if you'll become another broken calculation."

];


var mimicLineIndex = 0;


var mimicIntroScreen =
    document.getElementById("mimicIntroScreen");


var mimicDialogueText =
    document.getElementById("mimicDialogueText");


var mimicContinueButton =
    document.getElementById("mimicContinueButton");


function startMimicIntro(){

    if(!mimicIntroScreen){

        loadQuestion();

        return;

    }


    mimicLineIndex = 0;


    mimicIntroScreen.classList.add("show");


    showMimicLine();

}


function showMimicLine(){

    mimicDialogueText.textContent =
        mimicLines[mimicLineIndex];


    mimicContinueButton.textContent =
        (mimicLineIndex === mimicLines.length - 1) ?
            "⚔ BEGIN TRIAL" :
            "CONTINUE ▶";

}


if(mimicContinueButton){

    mimicContinueButton.addEventListener(
        "click",
        function(){

            mimicLineIndex++;


            if(mimicLineIndex >= mimicLines.length){

                mimicIntroScreen.classList.remove("show");

                loadQuestion();

            }

            else{

                showMimicLine();

            }

        }
    );

}



/* =========================
   START BATTLE
========================= */

var bgMusic =
    document.getElementById("bgMusic");


document
    .getElementById("startBattleButton")
    .addEventListener(
        "click",
        function(){

            document
                .getElementById("startScreen")
                .style.display = "none";


            /* START BACKGROUND MUSIC
               (tied to this click so the browser's
               autoplay-with-sound policy allows it) */

            if(bgMusic){

                bgMusic.currentTime = 0;

                bgMusic.play().catch(function(){

                    console.log(
                        "Background music could not start."
                    );

                });

            }


            startMimicIntro();

        }
    );



/* =========================
   POWER AVAILABILITY PER QUESTION
   Hint & Flameburst only make sense on multiple-choice
   trials, since they work by removing answer buttons.
   They stay OFF (visually + functionally) during typed
   trials, without losing a charge.
========================= */

function updatePowerAvailability(mode){

    var isTyped =
        (mode === "type");


    if(hintPowerBtn){

        hintPowerBtn.classList.toggle(
            "power-disabled",
            isTyped
        );

    }


    if(flameburstPowerBtn){

        flameburstPowerBtn.classList.toggle(
            "power-disabled",
            isTyped
        );

    }

}



/* =========================
   LOAD QUESTION
========================= */

function loadQuestion(){

    answered = false;


    var q =
        questions[currentQuestion];


    questionNumber.textContent =
        (currentQuestion + 1) +
        " / " +
        questions.length;


    questionType.textContent =
        q.type;


    questionText.textContent =
        q.question;


    codeDisplay.textContent =
        q.code;


    codeDisplay.className =
        "code-display";


    questionText.classList.remove(
        "mindcraft-highlight"
    );


    hideRationale();


    feedback.textContent =
        "";


    feedback.className =
        "feedback";


    answers.innerHTML =
        "";


    if(q.mode === "type"){

        renderTypedInput(q);

    }

    else{

        renderChoiceButtons(q);

    }


    updatePowerAvailability(q.mode);


    trialStatus.textContent =
        currentQuestion +
        " / " +
        questions.length;


    battleMessage.textContent =
        "Choose your answer...";

}



/* =========================
   RENDER: MULTIPLE CHOICE
========================= */

function renderChoiceButtons(q){

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
            q.answers[i];


        button.dataset.index =
            i;


        button.addEventListener(
            "click",
            checkAnswer
        );


        answers.appendChild(button);

    }

}



/* =========================
   RENDER: TYPED INPUT
========================= */

function renderTypedInput(q){

    var row =
        document.createElement("div");


    row.className =
        "type-answer-row";


    var input =
        document.createElement("input");


    input.type =
        "text";


    input.className =
        "type-answer-input";


    input.id =
        "typedAnswerInput";


    input.placeholder =
        q.placeholder ?
            ("e.g. " + q.placeholder) :
            "Type your answer...";


    input.autocomplete =
        "off";


    input.spellcheck =
        false;


    var submitBtn =
        document.createElement("button");


    submitBtn.type =
        "button";


    submitBtn.className =
        "submit-answer-button";


    submitBtn.id =
        "submitTypedAnswer";


    submitBtn.textContent =
        "CAST ⚡";


    row.appendChild(input);

    row.appendChild(submitBtn);


    answers.appendChild(row);


    submitBtn.addEventListener(
        "click",
        submitTypedAnswer
    );


    input.addEventListener(
        "keydown",
        function(event){

            if(event.key === "Enter"){

                submitTypedAnswer();

            }

        }
    );


    setTimeout(
        function(){

            input.focus();

        },
        60
    );

}



/* =========================
   ANSWER NORMALIZATION
   (so extra spaces / curly quotes don't unfairly fail
   an otherwise-correct typed answer)
========================= */

function normalizeAnswer(str){

    return String(str)
        .replace(/[\u201C\u201D]/g, '"')
        .replace(/[\u2018\u2019]/g, "'")
        .trim()
        .replace(/\s+/g, " ");

}


function isTypedAnswerCorrect(input, expected){

    return (
        normalizeAnswer(input) ===
        normalizeAnswer(expected)
    );

}



/* =========================
   SUBMIT: TYPED ANSWER
========================= */

function submitTypedAnswer(){

    if(answered){

        return;

    }


    var input =
        document.getElementById("typedAnswerInput");


    var submitBtn =
        document.getElementById("submitTypedAnswer");


    if(!input || input.value.trim() === ""){

        if(input){

            input.focus();

        }

        return;

    }


    answered = true;


    var q =
        questions[currentQuestion];


    var isCorrect =
        isTypedAnswerCorrect(
            input.value,
            q.expectedAnswer
        );


    input.disabled = true;

    submitBtn.disabled = true;


    if(isCorrect){

        input.classList.add("correct");

    }

    else{

        input.classList.add("wrong");


        input.value =
            q.expectedAnswer;

    }


    resolveAnswer(isCorrect);

}



/* =========================
   CHECK ANSWER (MULTIPLE CHOICE)
========================= */

function checkAnswer(event){

    if(answered){

        return;

    }


    answered = true;


    var selected =
        Number(
            event.target.dataset.index
        );


    var correct =
        questions[currentQuestion].correct;


    var buttons =
        document.querySelectorAll(
            ".answer-button"
        );


    var isCorrect =
        (selected === correct);


    if(isCorrect){

        event.target.classList.add(
            "correct"
        );

    }

    else{

        event.target.classList.add(
            "wrong"
        );


        buttons[correct].classList.add(
            "correct"
        );

    }


    disableAnswers();


    resolveAnswer(isCorrect);

}



/* =========================
   RESOLVE ANSWER
   Shared battle logic for BOTH multiple-choice and
   typed-answer questions.
========================= */

function resolveAnswer(isCorrect){

    if(isCorrect){

        feedback.textContent =
            "✓ Correct! Your spell strikes the Iron Alchemist!";


        feedback.classList.add(
            "correct"
        );


        battleMessage.textContent =
            player.name +
            " casts a spell!";


        var damage = 100 / questions.length;


        var points = 100;


        if(doublePowerActive){

            damage *= 2;

            points *= 2;

            doublePowerActive = false;

        }


        score += points;

        essence += 10;


        enemyHP -= damage;


        if(enemyHP < 0){

            enemyHP = 0;

        }


        /* DAMAGE EFFECT HAPPENS AFTER THE ATTACK VIDEO ENDS */

        playAttack(function(){

            showDamageEffect(enemyFighterEl);

            showFloatingNumber(
                enemyFighterEl,
                "-" + Math.round(damage),
                "dmg"
            );

            updateHP();

        });

    }

    else{

        feedback.textContent =
            "✗ Incorrect! The Iron Alchemist attacks!";


        feedback.classList.add(
            "wrong"
        );


        if(mindcraftShield){

            battleMessage.textContent =
                "🧠 Mindcraft absorbed the attack! No damage taken.";


            mindcraftShield = false;


            questionText.classList.remove(
                "mindcraft-highlight"
            );

        }

        else{

            battleMessage.textContent =
                "The Iron Alchemist attacks!";


            playerHP -= 20;


            if(playerHP < 0){

                playerHP = 0;

            }


            updateHP();


            showDamageEffect(playerFighterEl);

            showFloatingNumber(
                playerFighterEl,
                "-20",
                "dmg"
            );

        }


        showRationale(
            questions[currentQuestion].rationale ||
            "Review the operator rules and try again next time."
        );

    }


    scoreDisplay.textContent =
        score;


    essenceDisplay.textContent =
        essence;


    setTimeout(

        function(){

            if(playerHP <= 0){

                gameOver();

                return;

            }


            if(
                currentQuestion >=
                questions.length - 1
            ){

                finishGame();

                return;

            }


            currentQuestion++;

            loadQuestion();

        },

        1800

    );

}



/* =========================
   DISABLE ANSWERS
========================= */

function disableAnswers(){

    var buttons =
        document.querySelectorAll(
            ".answer-button"
        );


    buttons.forEach(
        function(button){

            button.disabled = true;

        }
    );

}



/* =========================
   FULLSCREEN ATTACK VIDEO
========================= */

function playAttack(onComplete){

    attackVideoSource.src =
        player.attackVideo;


    attackVideo.load();


    attackAnimation.classList.remove("fade-out");

    attackAnimation.classList.add("show");


    attackVideo.currentTime = 0;


    attackVideo.play().catch(function(){

        console.log(
            "Attack video could not start."
        );

    });


    attackVideo.onended = function(){

        attackAnimation.classList.add(
            "fade-out"
        );


        setTimeout(function(){

            attackAnimation.classList.remove(
                "show"
            );

            attackAnimation.classList.remove(
                "fade-out"
            );

            attackVideo.pause();

            attackVideo.currentTime = 0;


            if(typeof onComplete === "function"){

                onComplete();

            }

        }, 700);

    };

}



/* =========================
   UPDATE HP
========================= */

function updateHP(){

    playerHp.style.width =
        playerHP + "%";


    enemyHp.style.width =
        enemyHP + "%";


    playerHpText.textContent =
        Math.round(playerHP) +
        " / 100";


    enemyHpText.textContent =
        Math.round(enemyHP) +
        " / 100";

}



/* =========================
   HINT POWER
   (multiple-choice trials only)
========================= */

document
    .getElementById("hintPower")
    .addEventListener(
        "click",
        function(){

            if(answered){

                return;

            }


            if(
                questions[currentQuestion].mode === "type"
            ){

                battleMessage.textContent =
                    "⚠ HINT only works on multiple-choice trials!";

                return;

            }


            if(hintCount <= 0){

                return;

            }


            var correct =
                questions[currentQuestion].correct;


            var buttons =
                document.querySelectorAll(
                    ".answer-button"
                );


            var wrongButtons = [];


            for(
                var i = 0;
                i < buttons.length;
                i++
            ){

                if(
                    i !== correct &&
                    !buttons[i].disabled
                ){

                    wrongButtons.push(
                        buttons[i]
                    );

                }

            }


            if(wrongButtons.length > 0){

                var randomIndex =
                    Math.floor(
                        Math.random() *
                        wrongButtons.length
                    );


                wrongButtons[
                    randomIndex
                ].style.opacity = ".35";


                wrongButtons[
                    randomIndex
                ].disabled = true;

            }


            hintCount--;


            document.getElementById(
                "hintCount"
            ).textContent =
                hintCount;


            if(hintCount === 0){

                this.classList.add(
                    "used"
                );

            }

        }
    );



/* =========================
   HEAL POWER
========================= */

document
    .getElementById("healPower")
    .addEventListener(
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


            updateHP();


            document.getElementById(
                "healCount"
            ).textContent =
                healCount;


            if(healCount === 0){

                this.classList.add(
                    "used"
                );

            }


            battleMessage.textContent =
                player.name +
                " restores HP!";


            playerFighterEl.classList.remove(
                "heal-flash"
            );


            void playerFighterEl.offsetWidth;


            playerFighterEl.classList.add(
                "heal-flash"
            );


            showFloatingNumber(
                playerFighterEl,
                "+25",
                "heal"
            );


            if(healSound){

                healSound.currentTime = 0;

                healSound.play().catch(function(){

                    console.log(
                        "Heal sound could not play."
                    );

                });

            }


            setTimeout(function(){

                playerFighterEl.classList.remove(
                    "heal-flash"
                );

            }, 550);

        }
    );



/* =========================
   DOUBLE POWER
========================= */

document
    .getElementById("doublePower")
    .addEventListener(
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
                "⚡ Your next spell will deal DOUBLE POWER!";


            if(doubleCount === 0){

                this.classList.add(
                    "used"
                );

            }

        }
    );



/* =========================
   MYSTIC SIGHT
   (works for both choice and typed trials — it just
   highlights where the trouble is in the code display)
========================= */

document
    .getElementById("mysticSightPower")
    .addEventListener(
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


            if(
                q.mistakeSpot &&
                q.code.indexOf(q.mistakeSpot) !== -1
            ){

                var highlighted =
                    q.code.split(q.mistakeSpot).join(
                        '<span class="mystic-highlight">' +
                        q.mistakeSpot +
                        '</span>'
                    );


                codeDisplay.innerHTML =
                    highlighted;

            }

            else{

                codeDisplay.classList.add(
                    "mystic-highlight-box"
                );

            }


            battleMessage.textContent =
                "🔍 Mystic Sight reveals where the trouble lies...";


            mysticSightCount--;


            document.getElementById(
                "mysticSightCount"
            ).textContent =
                mysticSightCount;


            if(mysticSightCount === 0){

                this.classList.add(
                    "used"
                );

            }

        }
    );



/* =========================
   OMNIDATA
========================= */

document
    .getElementById("omnidataPower")
    .addEventListener(
        "click",
        function(){

            if(
                omnidataCount <= 0 ||
                answered
            ){

                return;

            }


            var q =
                questions[currentQuestion];


            battleMessage.textContent =
                "📊 Omnidata: " +
                (q.clue || "No hidden data found for this trial.");


            omnidataCount--;


            document.getElementById(
                "omnidataCount"
            ).textContent =
                omnidataCount;


            if(omnidataCount === 0){

                this.classList.add(
                    "used"
                );

            }

        }
    );



/* =========================
   SYNTAX SORCERY
========================= */

document
    .getElementById("syntaxSorceryPower")
    .addEventListener(
        "click",
        function(){

            if(
                syntaxSorceryCount <= 0 ||
                answered
            ){

                return;

            }


            var q =
                questions[currentQuestion];


            battleMessage.textContent =
                "✨ Syntax Sorcery: " +
                (q.syntaxTip || (q.answers ? q.answers[q.correct] : q.expectedAnswer));


            syntaxSorceryCount--;


            document.getElementById(
                "syntaxSorceryCount"
            ).textContent =
                syntaxSorceryCount;


            if(syntaxSorceryCount === 0){

                this.classList.add(
                    "used"
                );

            }

        }
    );



/* =========================
   FLAMEBURST
   (multiple-choice trials only)
========================= */

document
    .getElementById("flameburstPower")
    .addEventListener(
        "click",
        function(){

            if(answered){

                return;

            }


            if(
                questions[currentQuestion].mode === "type"
            ){

                battleMessage.textContent =
                    "⚠ FLAMEBURST only works on multiple-choice trials!";

                return;

            }


            if(flameburstCount <= 0){

                return;

            }


            var correct =
                questions[currentQuestion].correct;


            var buttons =
                document.querySelectorAll(
                    ".answer-button"
                );


            buttons.forEach(function(button, i){

                if(i !== correct){

                    button.style.opacity = ".35";

                    button.disabled = true;

                }

            });


            battleMessage.textContent =
                "🔥 Flameburst clears away every wrong option!";


            flameburstCount--;


            document.getElementById(
                "flameburstCount"
            ).textContent =
                flameburstCount;


            if(flameburstCount === 0){

                this.classList.add(
                    "used"
                );

            }

        }
    );



/* =========================
   MINDCRAFT
========================= */

document
    .getElementById("mindcraftPower")
    .addEventListener(
        "click",
        function(){

            if(
                mindcraftCount <= 0 ||
                answered
            ){

                return;

            }


            mindcraftShield = true;


            questionText.classList.add(
                "mindcraft-highlight"
            );


            battleMessage.textContent =
                "🧠 Mindcraft sharpens your focus — your next wrong answer will be forgiven!";


            mindcraftCount--;


            document.getElementById(
                "mindcraftCount"
            ).textContent =
                mindcraftCount;


            if(mindcraftCount === 0){

                this.classList.add(
                    "used"
                );

            }

        }
    );



/* =========================
   GAME OVER
========================= */

function gameOver(){

    battleMessage.textContent =
        "The Iron Alchemist has overwhelmed you.";


    feedback.textContent =
        "The trial has ended.";


    feedback.className =
        "feedback wrong";


    document.getElementById(
        "loseScreen"
    ).classList.add(
        "show"
    );

}



/* =========================
   DEFEAT SCREEN BUTTONS
========================= */

document
    .getElementById("retryTrialButton")
    .addEventListener(
        "click",
        function(){

            location.reload();

        }
    );


document
    .getElementById("loseMenuButton")
    .addEventListener(
        "click",
        function(){

            location.href =
                '/Main Menu/lesson.html';

        }
    );



/* =========================
   FINISH GAME
========================= */

function finishGame(){

    trialStatus.textContent =
        questions.length +
        " / " +
        questions.length;


    document.getElementById(
        "finalScore"
    ).textContent =
        score;


    document.getElementById(
        "finalEssence"
    ).textContent =
        essence;


    document.getElementById(
        "resultScreen"
    ).classList.add(
        "show"
    );


    saveBookProgress();

}



/* =========================
   SAVE PROGRESS
========================= */

function saveBookProgress(){

    localStorage.setItem(
        "book3Completed",
        "true"
    );


    localStorage.setItem(
        "book3Score",
        score
    );


    localStorage.setItem(
        "book3Essence",
        essence
    );


    /* UNLOCK BOOK IV */

    localStorage.setItem(
        "book4Unlocked",
        "true"
    );

}



/* =========================
   INITIALIZE
========================= */

updateHP();


function showDamageEffect(target){

    if(!target){

        return;

    }


    target.classList.remove(
        "damage-flash"
    );

    target.classList.remove(
        "damage-shake"
    );


    void target.offsetWidth;


    target.classList.add(
        "damage-flash"
    );

    target.classList.add(
        "damage-shake"
    );


    if(damageSound){

        damageSound.currentTime = 0;

        damageSound.play().catch(function(){

            console.log(
                "Damage sound could not play."
            );

        });

    }


    setTimeout(function(){

        target.classList.remove(
            "damage-flash"
        );

        target.classList.remove(
            "damage-shake"
        );

    }, 450);

}



/* =========================
   FLOATING DAMAGE / HEAL NUMBER
========================= */

function showFloatingNumber(target, text, type){

    if(!target){

        return;

    }


    var num =
        document.createElement("div");


    num.className =
        "floating-number " + type;


    num.textContent =
        text;


    target.appendChild(num);


    setTimeout(function(){

        if(num.parentNode){

            num.parentNode.removeChild(num);

        }

    }, 1000);

}



/* =========================
   WRONG-ANSWER RATIONALE POPUP
========================= */

function showRationale(text){

    rationaleText.textContent =
        text;


    rationaleBox.classList.add(
        "show"
    );


    clearTimeout(rationaleTimer);


    rationaleTimer = setTimeout(
        hideRationale,
        10000
    );

}


function hideRationale(){

    rationaleBox.classList.remove(
        "show"
    );


    clearTimeout(rationaleTimer);

}


rationaleClose.addEventListener(
    "click",
    hideRationale
);

/* =========================
   BACKGROUND MUSIC TOGGLE
   (only wires up if a music-control button with
   id="musicButton" is present on the page)
========================= */

var musicButton =
    document.getElementById("musicButton");


if(bgMusic && musicButton){

    /* VOLUME */

    bgMusic.volume = 1.00;


    /* REMEMBER MUSIC SETTING (separate key from other pages) */

    var book3MusicEnabled =
        localStorage.getItem(
            "cieSharpBook3Music"
        );


    /* MUSIC BUTTON */

    musicButton.addEventListener(
        "click",
        function(){

            if(bgMusic.paused){

                bgMusic.play()
                    .then(function(){

                        musicButton.innerText =
                            "🔊";

                        localStorage.setItem(
                            "cieSharpBook3Music",
                            "on"
                        );

                    })
                    .catch(function(){

                        alert(
                            "Click the music button again to start the music."
                        );

                    });

            }

            else{

                bgMusic.pause();

                musicButton.innerText =
                    "🔇";

                localStorage.setItem(
                    "cieSharpBook3Music",
                    "off"
                );

            }

        }
    );


    /* START MUSIC IF PREVIOUSLY ENABLED */

    if(book3MusicEnabled === "on"){

        bgMusic.play()
            .then(function(){

                musicButton.innerText =
                    "🔊";

            })
            .catch(function(){

                musicButton.innerText =
                    "🔇";

            });

    }

}