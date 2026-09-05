/* =========================================================
BOOK IV — LOGIC GATE
Conditional Statements
if / else / else if / switch
========================================================= */

/* =========================
CHARACTER DATA
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
SIGNATURE POWER
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

/* =========================================================
QUESTIONS
========================================================= */

var questions = [


/* =====================================================
   MICROGAME 1 — FIND THE CORRECT CONDITION
===================================================== */

{

    type: "FIND THE CORRECT CONDITION",

    mode: "choice",

    question:
        "The door opens when keyFound is true. Complete the condition.",

    code:


`if (__________)
{
    OpenDoor();
}`,


    answers: [

        "keyFound",

        "keyFound = false",

        "keyFound > 0",

        "keyFound == false"

    ],

    correct: 0,

    mistakeSpot: "__________",

    clue:
        "The door opens when the keyFound condition is true.",

    syntaxTip:
        "Use keyFound directly because it is already a Boolean condition.",

    rationale:
        "The requirement says the door opens when keyFound is true. Therefore, the condition should be keyFound."

},


{

    type: "FIND THE CORRECT CONDITION",

    mode: "choice",

    question:
        "The spell can be cast when mana is at least 50.",

    code:


`if (__________)
{
    CastSpell();
}`,


    answers: [

        "mana >= 50",

        "mana > 50",

        "mana == 25",

        "mana < 50"

    ],

    correct: 0,

    mistakeSpot: "__________",

    clue:
        "At least 50 means 50 or any value greater than 50.",

    syntaxTip:
        "Use >= when the requirement includes the given value.",

    rationale:
        "At least 50 includes exactly 50, so >= is required. The correct condition is mana >= 50."

},


{

    type: "FIND THE CORRECT CONDITION",

    mode: "choice",

    question:
        "The player wins when the score is greater than 100.",

    code:


`if (__________)
{
    Win();
}`,


    answers: [

        "score > 100",

        "score >= 100",

        "score < 100",

        "score == 100"

    ],

    correct: 0,

    mistakeSpot: "__________",

    clue:
        "Greater than 100 means the value must be above 100.",

    syntaxTip:
        "Use > when the condition must be strictly greater.",

    rationale:
        "The requirement says greater than 100, not equal to 100. Therefore, use score > 100."

},


/* =====================================================
   MICROGAME 2 — SOLVE IF/ELSE PUZZLES
===================================================== */

{

    type: "SOLVE IF/ELSE PUZZLES",

    mode: "choice",

    question:
        "What will this program display?",

    code:


`int health = 20;

if (health > 0)
{
Console.WriteLine("Alive");
}
else
{
Console.WriteLine("Defeated");
}`,


    answers: [

        "Alive",

        "Defeated",

        "20",

        "Nothing"

    ],

    correct: 0,

    mistakeSpot: "health > 0",

    clue:
        "Health is 20, which is greater than 0.",

    syntaxTip:
        "Because health > 0 is true, the if branch executes.",

    rationale:
        "health is 20. Since 20 > 0 is true, the program follows the if branch and displays Alive."

},


{

    type: "SOLVE IF/ELSE PUZZLES",

    mode: "choice",

    question:
        "What will this program display?",

    code:


`int level = 5;

if (level >= 10)
{
Console.WriteLine("Boss Area");
}
else
{
Console.WriteLine("Training Area");
}`,


    answers: [

        "Training Area",

        "Boss Area",

        "5",

        "Nothing"

    ],

    correct: 0,

    mistakeSpot: "level >= 10",

    clue:
        "Level 5 does not reach 10.",

    syntaxTip:
        "Because 5 >= 10 is false, the else branch executes.",

    rationale:
        "The player's level is 5, which is less than 10. The if condition is false, so the else branch displays Training Area."

},


{

    type: "SOLVE IF/ELSE PUZZLES",

    mode: "choice",

    question:
        "Complete the code so the player gets the reward when the score reaches 100.",

    code:


`if (score _____ 100)
{
    GiveReward();
}`,


    answers: [

        ">=",

        ">",

        "<",

        "== 50"

    ],

    correct: 0,

    mistakeSpot: "_____",

    clue:
        "Reaches 100 means 100 should also satisfy the condition.",

    syntaxTip:
        "Use >= because 100 itself must count.",

    rationale:
        "The phrase reaches 100 means the player should get the reward at exactly 100 and above. Therefore, use >=."

},


/* =====================================================
   MICROGAME 3 — MAGIC DOOR
===================================================== */

{

    type: "MAGIC DOOR",

    mode: "choice",

    question:
        "Which condition correctly opens the door only when hasKey is true?",

    code:


`if (____________)
{
    OpenDoor();
}`,


    answers: [

        "hasKey == true",

        "hasKey == false",

        "hasKey = false",

        "hasKey < true"

    ],

    correct: 0,

    mistakeSpot: "____________",

    clue:
        "The door should open only when hasKey is true.",

    syntaxTip:
        "Use == when checking whether a value is equal to true.",

    rationale:
        "The expected condition checks whether hasKey is equal to true. The correct condition is hasKey == true."

},


/* =====================================================
   REINFORCEMENT — ELSE IF
===================================================== */

{

    type: "LOGIC GATE",

    mode: "choice",

    question:
        "Which condition correctly checks whether the player has enough mana before checking another condition?",

    code:


`if (health <= 0)
{
    Defeated();
}
else if (__________)
{
    CastSpell();
}`,


    answers: [

        "mana >= 50",

        "mana < 50",

        "mana == 0",

        "mana = 50"

    ],

    correct: 0,

    mistakeSpot: "__________",

    clue:
        "The spell requires at least 50 mana.",

    syntaxTip:
        "else if allows another condition to be checked when the first condition is false.",

    rationale:
        "The spell requires at least 50 mana, so the correct condition is mana >= 50."

},


/* =====================================================
   REINFORCEMENT — SWITCH
===================================================== */

{

    type: "LOGIC GATE",

    mode: "choice",

    question:
        "Which keyword is used to provide different cases for one value?",

    code:


`switch (choice)
{
case 1:
OpenGate();
break;


case 2:
    OpenChest();
    break;


}`,


    answers: [

        "switch",

        "if",

        "else",

        "for"

    ],

    correct: 0,

    mistakeSpot: "switch",

    clue:
        "The code is selecting between different cases of one value.",

    syntaxTip:
        "switch is used to evaluate one value against different case options.",

    rationale:
        "The switch statement checks one value against multiple case options. Therefore, the correct answer is switch."

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

/* =========================================================
FALSE ORACLE INTRO
========================================================= */

var mimicLines = [


"Hehehe... another traveler enters the Logic Gate.",

"You believe conditions tell the truth? How amusing.",

"I can turn TRUE into FALSE, FALSE into TRUE, and every path into a lie.",

"Choose carefully, little spellcaster. One false condition is enough to send your program down the wrong path.",

"Now... prove that you can see through my conditions."


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
    (mimicLineIndex === mimicLines.length - 1)
        ? "⚔ BEGIN TRIAL"
        : "CONTINUE ▶";


}

if(mimicContinueButton){


mimicContinueButton.addEventListener(
    "click",
    function(){

        mimicLineIndex++;


        if(
            mimicLineIndex >=
            mimicLines.length
        ){

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


renderChoiceButtons(q);


trialStatus.textContent =
    currentQuestion +
    " / " +
    questions.length;


battleMessage.textContent =
    "Choose your answer...";


}

/* =========================
RENDER MULTIPLE CHOICE
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
CHECK ANSWER
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
    selected === correct;


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
========================= */

function resolveAnswer(isCorrect){


if(isCorrect){

    feedback.textContent =
        "✓ Correct! Your spell strikes the False Oracle!";


    feedback.classList.add(
        "correct"
    );


    battleMessage.textContent =
        player.name +
        " breaks the false condition!";


    var damage =
        100 / questions.length;


    var points =
        100;


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


    playAttack(function(){

        showDamageEffect(
            enemyFighterEl
        );


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
        "✗ Incorrect! The False Oracle attacks!";


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
            "The False Oracle attacks!";


        playerHP -= 20;


        if(playerHP < 0){

            playerHP = 0;

        }


        updateHP();


        showDamageEffect(
            playerFighterEl
        );


        showFloatingNumber(
            playerFighterEl,
            "-20",
            "dmg"
        );

    }


    showRationale(
        questions[currentQuestion].rationale ||
        "Review the condition and try again."
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
ATTACK VIDEO
========================= */

function playAttack(onComplete){


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
HINT
========================= */

document
.getElementById("hintPower")
.addEventListener(
"click",
function(){


        if(answered){

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
HEAL
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
                q.code.split(
                    q.mistakeSpot
                ).join(
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
            "🔍 Mystic Sight reveals the condition...";


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
            q.clue;


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
            q.syntaxTip;


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
========================= */

document
.getElementById("flameburstPower")
.addEventListener(
"click",
function(){


        if(answered){

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
            "🔥 Flameburst clears every false condition!";


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


        var q =
            questions[currentQuestion];


        questionText.classList.add(
            "mindcraft-highlight"
        );


        battleMessage.textContent =
            "🧠 Mindcraft identifies the key logic of the condition.";


        mindcraftShield = true;


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
DAMAGE EFFECT
========================= */

function showDamageEffect(target){


if(!target){

    return;

}


target.classList.remove(
    "damage-flash",
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
        "damage-flash",
        "damage-shake"
    );

}, 500);


}

/* =========================
FLOATING NUMBERS
========================= */

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
    "floating-number " + type;


number.textContent =
    text;


target.appendChild(
    number
);


setTimeout(function(){

    number.remove();

}, 1100);


}

/* =========================
RATIONALE
========================= */

function showRationale(text){


if(!rationaleBox){

    return;

}


rationaleText.textContent =
    text;


rationaleBox.classList.add(
    "show"
);


if(rationaleTimer){

    clearTimeout(
        rationaleTimer
    );

}


rationaleTimer =
    setTimeout(function(){

        hideRationale();

    }, 3000);


}

function hideRationale(){


if(!rationaleBox){

    return;

}


rationaleBox.classList.remove(
    "show"
);


}

/* =========================
RATIONALE CLOSE
========================= */

if(rationaleClose){


rationaleClose.addEventListener(
    "click",
    function(){

        hideRationale();

    }
);


}

/* =========================
FINISH GAME
========================= */

function finishGame(){


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


}

/* =========================
GAME OVER
========================= */

function gameOver(){


document.getElementById(
    "loseScreen"
).classList.add(
    "show"
);


}

/* =========================
RETRY
========================= */

document
.getElementById("retryTrialButton")
.addEventListener(
"click",
function(){


        location.reload();

    }
);


/* =========================
RETURN TO MENU
========================= */

document
.getElementById("loseMenuButton")
.addEventListener(
"click",
function(){


        location.href =
            "/MainMenu/lesson.html";

    }
);


/* =========================
INITIAL HP
========================= */

updateHP();
