/* =========================================================
   BOOK VI — METHOD HALL
   THE COPY WARLOCK
   (Rewritten to match the real element IDs in book6.html —
   this is why "ENTER THE TRIAL" was not working: the old
   script was looking for elements/ids that don't exist on
   this page, like "startBook6", "gameScreen",
   "warlockIntroScreen", "warlockIntroVideo", etc.)
   ========================================================= */


/* =========================
   CHARACTER DATA
   Same 5 witches used in every other book.
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
   SHOW ONLY THIS WITCH'S SIGNATURE POWER
========================= */

var specialPowerIds = [
    "mysticSightPower",
    "omnidataPower",
    "syntaxSorceryPower",
    "flameburstPower",
    "mindcraftPower"
];


specialPowerIds.forEach(function(id){

    var btn = document.getElementById(id);

    if(!btn){
        return;
    }

    btn.style.display =
        (id === player.power) ? "" : "none";

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


/* =========================================================
   QUESTIONS — BOOK VI: METHOD HALL
   Methods, parameters, return values.

   type: "choice" -> multiple choice buttons
   type: "typed"  -> player types the answer
========================================================= */

var questions = [

    /* ===== CODE ASSEMBLY ===== */

    {
        type: "choice",
        microgame: "CODE ASSEMBLY",
        title: "Challenge 1",
        question: "Arrange the blocks in the correct order.",
        code:
`{
    ReturnSpell();
}

static void CastSpell()`,
        answers: [
            "static void CastSpell()\n{\n    ReturnSpell();\n}",
            "{\n    ReturnSpell();\n}\n\nstatic void CastSpell()",
            "ReturnSpell();\n\nstatic void CastSpell()\n{\n}",
            "static void CastSpell()\nReturnSpell();\n{\n}"
        ],
        correct: 0,
        rationale:
            "Start with the method declaration, then open the body with {."
    },

    {
        type: "choice",
        microgame: "CODE ASSEMBLY",
        title: "Challenge 2",
        question: "Arrange the blocks in the correct order.",
        code:
`}
Console.WriteLine("Attack!");
{
static void Attack()`,
        answers: [
            "static void Attack()\n{\n    Console.WriteLine(\"Attack!\");\n}",
            "{\n    Console.WriteLine(\"Attack!\");\n}\nstatic void Attack()",
            "static void Attack()\nConsole.WriteLine(\"Attack!\");\n{\n}",
            "Console.WriteLine(\"Attack!\");\nstatic void Attack()\n{\n}"
        ],
        correct: 0,
        rationale:
            "The method needs to be declared before its code statements."
    },

    {
        type: "choice",
        microgame: "CODE ASSEMBLY",
        title: "Challenge 3",
        question: "Arrange the blocks in the correct order.",
        code:
`}
return damage;
{
static int GetDamage()
int damage = 50;`,
        answers: [
            "static int GetDamage()\n{\n    int damage = 50;\n    return damage;\n}",
            "static int GetDamage()\n{\n    return damage;\n    int damage = 50;\n}",
            "{\n    int damage = 50;\n}\nstatic int GetDamage()\nreturn damage;",
            "static int GetDamage()\nint damage = 50;\n{\n    return damage;\n}"
        ],
        correct: 0,
        rationale:
            "A method can only return damage after the variable has been created."
    },


    /* ===== ERROR HUNT ===== */

    {
        type: "typed",
        microgame: "ERROR HUNT",
        title: "Challenge 1",
        question: "What symbol is missing at the end of the WriteLine statement?",
        code:
`static void Attack()
{
    Console.WriteLine("Attack!")
}`,
        expectedAnswer: ";",
        placeholder: "Type the missing symbol...",
        rationale:
            "Look at the Console.WriteLine() statement. It's missing ;."
    },

    {
        type: "typed",
        microgame: "ERROR HUNT",
        title: "Challenge 2",
        question: "What statement is missing from this method?",
        code:
`static int GetHealth()
{
    int health = 100;
}`,
        expectedAnswer: "return health;",
        placeholder: "Type the missing statement...",
        rationale:
            "The method says it returns an int, so it needs a return statement."
    },

    {
        type: "typed",
        microgame: "ERROR HUNT",
        title: "Challenge 3",
        question: "Complete the method call below with a valid argument.",
        code:
`static void Heal(int amount)
{
    health += amount;
}

Heal();`,
        expectedAnswer: "Heal(20);",
        placeholder: "Complete the method call...",
        rationale:
            "The method requires one integer parameter. Try passing a number such as 20."
    },


    /* ===== SPEED CODING ===== */

    {
        type: "choice",
        microgame: "SPEED CODING",
        title: "Round 1",
        question: "Which method correctly creates one named Attack?",
        code:
`static void Attack()
{
    Console.WriteLine("Attack!");
}`,
        answers: [
            "Correct method structure",
            "Use static int instead",
            "Remove the method name",
            "Place Console.WriteLine() outside the method"
        ],
        correct: 0,
        rationale:
            "Check the method name and structure. It should be named Attack."
    },

    {
        type: "choice",
        microgame: "SPEED CODING",
        title: "Round 2",
        question: "Which version correctly creates a Heal method that accepts an integer parameter?",
        code:
`static void Heal(int amount)
{
    Console.WriteLine("Healed: " + amount);
}`,
        answers: [
            "Heal with int amount",
            "Heal with string amount",
            "Heal without a parameter",
            "Heal with double amount"
        ],
        correct: 0,
        rationale:
            "Heal needs one integer parameter. Check int amount."
    },

    {
        type: "choice",
        microgame: "SPEED CODING",
        title: "Round 3",
        question: "Which version correctly creates a GetScore method that returns an integer?",
        code:
`static int GetScore()
{
    return 100;
}`,
        answers: [
            "Use int as the return type",
            "Use void as the return type",
            "Use string as the return type",
            "Remove the return statement"
        ],
        correct: 0,
        rationale:
            "Because the method returns a score, its return type should be int."
    }

];


/* =========================
   ELEMENTS (matching the real book6.html ids)
========================= */

var questionNumber = document.getElementById("questionNumber");
var questionType = document.getElementById("questionType");
var questionText = document.getElementById("questionText");
var codeDisplay = document.getElementById("codeDisplay");
var answers = document.getElementById("answers");
var feedback = document.getElementById("feedback");

var playerHp = document.getElementById("playerHp");
var enemyHp = document.getElementById("enemyHp");
var playerHpText = document.getElementById("playerHpText");
var enemyHpText = document.getElementById("enemyHpText");

var scoreDisplay = document.getElementById("score");
var essenceDisplay = document.getElementById("essence");
var trialStatus = document.getElementById("trialStatus");

var battleMessage = document.getElementById("battleMessage");

var attackAnimation = document.getElementById("attackAnimation");
var attackVideo = document.getElementById("attackVideo");
var attackVideoSource = document.getElementById("attackVideoSource");

var enemyAttackAnimation = document.getElementById("enemyAttackAnimation");
var enemyAttackVideo = document.getElementById("enemyAttackVideo");
var enemyAttackVideoSource = document.getElementById("enemyAttackVideoSource");

var damageSound = document.getElementById("damageSound");
var healSound = document.getElementById("healSound");

var playerFighterEl = document.querySelector(".player-fighter");
var enemyFighterEl = document.querySelector(".enemy-fighter");

var rationaleBox = document.getElementById("rationaleBox");
var rationaleText = document.getElementById("rationaleText");
var rationaleClose = document.getElementById("rationaleClose");
var rationaleTimer = null;

var hintPowerBtn = document.getElementById("hintPower");
var flameburstPowerBtn = document.getElementById("flameburstPower");

var bgMusic = document.getElementById("bgMusic");


/* =========================================================
   COPY WARLOCK INTRO DIALOGUE
   Uses the REAL modal on the page: #mimicIntroScreen,
   #mimicDialogueText, #mimicContinueButton.
========================================================= */

var mimicLines = [

    "You should not have entered the Method Hall...",
    "Every spell you cast... I can copy.",
    "Every method you create... I can duplicate.",
    "Why write it once... when I can make it endless?",
    "Your code will become mine.",
    "Your methods will repeat.",
    "And your logic will collapse."

];


var mimicLineIndex = 0;

var mimicIntroScreen = document.getElementById("mimicIntroScreen");
var mimicDialogueText = document.getElementById("mimicDialogueText");
var mimicContinueButton = document.getElementById("mimicContinueButton");


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


/* =========================================================
   START BATTLE
   THIS is the fix: the real button in book6.html is
   id="startBattleButton" (not "startBook6" / "startButton").
========================================================= */

var startBattleButton =
    document.getElementById("startBattleButton");


if(startBattleButton){

    startBattleButton.addEventListener(
        "click",
        function(){

            var startScreen =
                document.getElementById("startScreen");

            if(startScreen){

                startScreen.style.display =
                    "none";

            }

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

}


/* =========================================================
   POWER AVAILABILITY PER QUESTION
   Hint & Flameburst only work on multiple-choice trials.
========================================================= */

function updatePowerAvailability(type){

    var isTyped = (type === "typed");

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

    var q = questions[currentQuestion];

    questionNumber.textContent =
        (currentQuestion + 1) + " / " + questions.length;

    questionType.textContent =
        q.microgame + " — " + q.title;

    questionText.textContent =
        q.question;

    codeDisplay.textContent =
        q.code || "";

    codeDisplay.className =
        "code-display";

    questionText.classList.remove(
        "mindcraft-highlight"
    );

    hideRationale();

    feedback.textContent = "";
    feedback.className = "feedback";

    answers.innerHTML = "";

    if(q.type === "typed"){

        renderTypedInput(q);

    }
    else{

        renderChoiceButtons(q);

    }

    updatePowerAvailability(q.type);

    trialStatus.textContent =
        currentQuestion + " / " + questions.length;

    battleMessage.textContent =
        "Choose your answer...";

}


/* =========================
   RENDER: MULTIPLE CHOICE
========================= */

function renderChoiceButtons(q){

    for(var i = 0; i < q.answers.length; i++){

        var button = document.createElement("button");

        button.className = "answer-button";
        button.textContent = q.answers[i];
        button.dataset.index = i;

        button.addEventListener("click", checkAnswer);

        answers.appendChild(button);

    }

}


/* =========================
   RENDER: TYPED INPUT
========================= */

function renderTypedInput(q){

    var row = document.createElement("div");
    row.className = "type-answer-row";

    var input = document.createElement("input");
    input.type = "text";
    input.className = "type-answer-input";
    input.id = "typedAnswerInput";
    input.placeholder =
        q.placeholder ? ("e.g. " + q.placeholder) : "Type your answer...";
    input.autocomplete = "off";
    input.spellcheck = false;

    var submitBtn = document.createElement("button");
    submitBtn.type = "button";
    submitBtn.className = "submit-answer-button";
    submitBtn.id = "submitTypedAnswer";
    submitBtn.textContent = "CAST ⚡";

    row.appendChild(input);
    row.appendChild(submitBtn);

    answers.appendChild(row);

    submitBtn.addEventListener("click", submitTypedAnswer);

    input.addEventListener("keydown", function(event){

        if(event.key === "Enter"){

            submitTypedAnswer();

        }

    });

    setTimeout(function(){

        input.focus();

    }, 60);

}


/* =========================
   ANSWER NORMALIZATION
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

    var input = document.getElementById("typedAnswerInput");
    var submitBtn = document.getElementById("submitTypedAnswer");

    if(!input || input.value.trim() === ""){

        if(input){
            input.focus();
        }

        return;

    }

    answered = true;

    var q = questions[currentQuestion];

    var isCorrect =
        isTypedAnswerCorrect(input.value, q.expectedAnswer);

    input.disabled = true;
    submitBtn.disabled = true;

    if(isCorrect){

        input.classList.add("correct");

    }
    else{

        input.classList.add("wrong");
        input.value = q.expectedAnswer;

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

    var selected = Number(event.target.dataset.index);
    var correct = questions[currentQuestion].correct;

    var buttons = document.querySelectorAll(".answer-button");

    var isCorrect = (selected === correct);

    if(isCorrect){

        event.target.classList.add("correct");

    }
    else{

        event.target.classList.add("wrong");
        buttons[correct].classList.add("correct");

    }

    disableAnswers();

    resolveAnswer(isCorrect);

}


/* =========================
   RESOLVE ANSWER
========================= */

function resolveAnswer(isCorrect){

    if(isCorrect){

        feedback.textContent =
            "✓ Correct! Your spell strikes the Copy Warlock!";

        feedback.classList.add("correct");

        battleMessage.textContent =
            player.name + " casts a spell!";

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

        playWitchAttack(function(){

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
            "✗ Incorrect! The Copy Warlock attacks!";

        feedback.classList.add("wrong");

        if(mindcraftShield){

            battleMessage.textContent =
                "🧠 Mindcraft absorbed the attack! No damage taken.";

            mindcraftShield = false;

            questionText.classList.remove("mindcraft-highlight");

            finishWrongAnswer();

        }
        else{

            battleMessage.textContent =
                "The Copy Warlock attacks!";

            playEnemyAttack(function(){

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

                finishWrongAnswer();

            });

        }

    }

    scoreDisplay.textContent = score;
    essenceDisplay.textContent = essence;

}


function finishWrongAnswer(){

    showRationale(
        questions[currentQuestion].rationale ||
        "Review the method rules and try again next time."
    );

    proceedAfterAnswer();

}


function proceedAfterAnswer(){

    setTimeout(function(){

        if(playerHP <= 0){

            gameOver();
            return;

        }

        if(currentQuestion >= questions.length - 1){

            finishGame();
            return;

        }

        currentQuestion++;

        loadQuestion();

    }, 1400);

}


/* correct-answer path also needs to proceed */

var _originalResolveAnswer = resolveAnswer;

resolveAnswer = function(isCorrect){

    _originalResolveAnswer(isCorrect);

    if(isCorrect){

        proceedAfterAnswer();

    }

};


/* =========================
   DISABLE ANSWERS
========================= */

function disableAnswers(){

    var buttons = document.querySelectorAll(".answer-button");

    buttons.forEach(function(button){

        button.disabled = true;

    });

}


/* =========================
   WITCH ATTACK VIDEO (correct answer)
========================= */

function playWitchAttack(onComplete){

    if(!attackAnimation || !attackVideo || !attackVideoSource){

        if(typeof onComplete === "function"){
            onComplete();
        }

        return;

    }

    attackVideoSource.src = player.attackVideo;
    attackVideo.load();

    attackAnimation.classList.remove("fade-out");
    attackAnimation.classList.add("show");

    attackVideo.currentTime = 0;

    attackVideo.play().catch(function(){

        console.log("Attack video could not start.");

    });

    attackVideo.onended = function(){

        attackAnimation.classList.add("fade-out");

        setTimeout(function(){

            attackAnimation.classList.remove("show");
            attackAnimation.classList.remove("fade-out");

            attackVideo.pause();
            attackVideo.currentTime = 0;

            if(typeof onComplete === "function"){
                onComplete();
            }

        }, 700);

    };

}


/* =========================
   COPY WARLOCK ATTACK VIDEO (wrong answer)
========================= */

function playEnemyAttack(onComplete){

    if(!enemyAttackAnimation || !enemyAttackVideo){

        if(typeof onComplete === "function"){
            onComplete();
        }

        return;

    }

    enemyAttackAnimation.classList.remove("fade-out");
    enemyAttackAnimation.classList.add("show");

    enemyAttackVideo.currentTime = 0;

    enemyAttackVideo.play().catch(function(){

        console.log("Enemy attack video could not start.");

    });

    enemyAttackVideo.onended = function(){

        enemyAttackAnimation.classList.add("fade-out");

        setTimeout(function(){

            enemyAttackAnimation.classList.remove("show");
            enemyAttackAnimation.classList.remove("fade-out");

            enemyAttackVideo.pause();
            enemyAttackVideo.currentTime = 0;

            if(typeof onComplete === "function"){
                onComplete();
            }

        }, 700);

    };

    /* safety fallback in case the video file is missing */
    setTimeout(function(){

        if(typeof onComplete === "function"){
            onComplete();
        }

    }, 2500);

}


/* =========================
   UPDATE HP
========================= */

function updateHP(){

    playerHp.style.width = playerHP + "%";
    enemyHp.style.width = enemyHP + "%";

    playerHpText.textContent = Math.round(playerHP) + " / 100";
    enemyHpText.textContent = Math.round(enemyHP) + " / 100";

}


/* =========================
   HINT POWER
========================= */

document.getElementById("hintPower").addEventListener(
    "click",
    function(){

        if(answered){
            return;
        }

        if(questions[currentQuestion].type === "typed"){

            battleMessage.textContent =
                "⚠ HINT only works on multiple-choice trials!";

            return;

        }

        if(hintCount <= 0){
            return;
        }

        var correct = questions[currentQuestion].correct;
        var buttons = document.querySelectorAll(".answer-button");
        var wrongButtons = [];

        for(var i = 0; i < buttons.length; i++){

            if(i !== correct && !buttons[i].disabled){

                wrongButtons.push(buttons[i]);

            }

        }

        if(wrongButtons.length > 0){

            var randomIndex =
                Math.floor(Math.random() * wrongButtons.length);

            wrongButtons[randomIndex].style.opacity = ".35";
            wrongButtons[randomIndex].disabled = true;

        }

        hintCount--;

        document.getElementById("hintCount").textContent = hintCount;

        if(hintCount === 0){

            this.classList.add("used");

        }

    }
);


/* =========================
   HEAL POWER
========================= */

document.getElementById("healPower").addEventListener(
    "click",
    function(){

        if(healCount <= 0 || playerHP >= 100){
            return;
        }

        playerHP += 25;

        if(playerHP > 100){
            playerHP = 100;
        }

        healCount--;

        updateHP();

        document.getElementById("healCount").textContent = healCount;

        if(healCount === 0){

            this.classList.add("used");

        }

        battleMessage.textContent = player.name + " restores HP!";

        playerFighterEl.classList.remove("heal-flash");
        void playerFighterEl.offsetWidth;
        playerFighterEl.classList.add("heal-flash");

        showFloatingNumber(playerFighterEl, "+25", "heal");

        if(healSound){

            healSound.currentTime = 0;

            healSound.play().catch(function(){

                console.log("Heal sound could not play.");

            });

        }

        setTimeout(function(){

            playerFighterEl.classList.remove("heal-flash");

        }, 550);

    }
);


/* =========================
   DOUBLE POWER
========================= */

document.getElementById("doublePower").addEventListener(
    "click",
    function(){

        if(doubleCount <= 0 || answered){
            return;
        }

        doublePowerActive = true;
        doubleCount--;

        document.getElementById("doubleCount").textContent = doubleCount;

        battleMessage.textContent =
            "⚡ Your next spell will deal DOUBLE POWER!";

        if(doubleCount === 0){

            this.classList.add("used");

        }

    }
);


/* =========================
   MYSTIC SIGHT
========================= */

document.getElementById("mysticSightPower").addEventListener(
    "click",
    function(){

        if(mysticSightCount <= 0 || answered){
            return;
        }

        var q = questions[currentQuestion];

        codeDisplay.classList.add("mystic-highlight-box");

        battleMessage.textContent =
            "🔍 Mystic Sight reveals where the trouble lies...";

        mysticSightCount--;

        document.getElementById("mysticSightCount").textContent =
            mysticSightCount;

        if(mysticSightCount === 0){

            this.classList.add("used");

        }

    }
);


/* =========================
   OMNIDATA
========================= */

document.getElementById("omnidataPower").addEventListener(
    "click",
    function(){

        if(omnidataCount <= 0 || answered){
            return;
        }

        var q = questions[currentQuestion];

        battleMessage.textContent =
            "📊 Omnidata: " +
            (q.rationale || "No hidden data found for this trial.");

        omnidataCount--;

        document.getElementById("omnidataCount").textContent =
            omnidataCount;

        if(omnidataCount === 0){

            this.classList.add("used");

        }

    }
);


/* =========================
   SYNTAX SORCERY
========================= */

document.getElementById("syntaxSorceryPower").addEventListener(
    "click",
    function(){

        if(syntaxSorceryCount <= 0 || answered){
            return;
        }

        var q = questions[currentQuestion];

        battleMessage.textContent =
            "✨ Syntax Sorcery: " +
            (q.expectedAnswer ||
                (q.answers ? q.answers[q.correct] : ""));

        syntaxSorceryCount--;

        document.getElementById("syntaxSorceryCount").textContent =
            syntaxSorceryCount;

        if(syntaxSorceryCount === 0){

            this.classList.add("used");

        }

    }
);


/* =========================
   FLAMEBURST
========================= */

document.getElementById("flameburstPower").addEventListener(
    "click",
    function(){

        if(answered){
            return;
        }

        if(questions[currentQuestion].type === "typed"){

            battleMessage.textContent =
                "⚠ FLAMEBURST only works on multiple-choice trials!";

            return;

        }

        if(flameburstCount <= 0){
            return;
        }

        var correct = questions[currentQuestion].correct;
        var buttons = document.querySelectorAll(".answer-button");

        buttons.forEach(function(button, i){

            if(i !== correct){

                button.style.opacity = ".35";
                button.disabled = true;

            }

        });

        battleMessage.textContent =
            "🔥 Flameburst clears away every wrong option!";

        flameburstCount--;

        document.getElementById("flameburstCount").textContent =
            flameburstCount;

        if(flameburstCount === 0){

            this.classList.add("used");

        }

    }
);


/* =========================
   MINDCRAFT
========================= */

document.getElementById("mindcraftPower").addEventListener(
    "click",
    function(){

        if(mindcraftCount <= 0 || answered){
            return;
        }

        mindcraftShield = true;

        questionText.classList.add("mindcraft-highlight");

        battleMessage.textContent =
            "🧠 Mindcraft sharpens your focus — your next wrong answer will be forgiven!";

        mindcraftCount--;

        document.getElementById("mindcraftCount").textContent =
            mindcraftCount;

        if(mindcraftCount === 0){

            this.classList.add("used");

        }

    }
);


/* =========================
   GAME OVER
========================= */

function gameOver(){

    battleMessage.textContent =
        "The Copy Warlock has overwhelmed you.";

    feedback.textContent = "The trial has ended.";
    feedback.className = "feedback wrong";

    document.getElementById("loseScreen").classList.add("show");

}


/* =========================
   DEFEAT SCREEN BUTTONS
========================= */

document.getElementById("retryTrialButton").addEventListener(
    "click",
    function(){

        location.reload();

    }
);


document.getElementById("loseMenuButton").addEventListener(
    "click",
    function(){

        location.href = '/Main Menu/lesson.html';

    }
);


/* =========================
   FINISH GAME
========================= */

function finishGame(){

    trialStatus.textContent =
        questions.length + " / " + questions.length;

    document.getElementById("finalScore").textContent = score;
    document.getElementById("finalEssence").textContent = essence;

    document.getElementById("resultScreen").classList.add("show");

    saveBookProgress();

}


/* =========================
   SAVE PROGRESS
========================= */

function saveBookProgress(){

    localStorage.setItem("book6Completed", "true");
    localStorage.setItem("book6Score", score);
    localStorage.setItem("book6Essence", essence);

    /* UNLOCK BOOK VII */

    localStorage.setItem("book7Unlocked", "true");

}


/* =========================
   INITIALIZE
========================= */

updateHP();


function showDamageEffect(target){

    if(!target){
        return;
    }

    target.classList.remove("damage-flash");
    target.classList.remove("damage-shake");

    void target.offsetWidth;

    target.classList.add("damage-flash");
    target.classList.add("damage-shake");

    if(damageSound){

        damageSound.currentTime = 0;

        damageSound.play().catch(function(){

            console.log("Damage sound could not play.");

        });

    }

    setTimeout(function(){

        target.classList.remove("damage-flash");
        target.classList.remove("damage-shake");

    }, 450);

}


/* =========================
   FLOATING DAMAGE / HEAL NUMBER
========================= */

function showFloatingNumber(target, text, type){

    if(!target){
        return;
    }

    var num = document.createElement("div");

    num.className = "floating-number " + type;
    num.textContent = text;

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

    rationaleText.textContent = text;

    rationaleBox.classList.add("show");

    clearTimeout(rationaleTimer);

    rationaleTimer = setTimeout(hideRationale, 10000);

}


function hideRationale(){

    rationaleBox.classList.remove("show");

    clearTimeout(rationaleTimer);

}


rationaleClose.addEventListener("click", hideRationale);