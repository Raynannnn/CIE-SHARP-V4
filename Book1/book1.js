/* =========================
   CHARACTER DATA
========================= */

var selectedCharacter =
    localStorage.getItem("selectedCharacter") || "GiTei";


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


    bea: {

        name: "Ember Witch",

        role: "The Challenge Master",

        image: "images/bea.png",

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
   SHOW ONLY THIS WITCH'S OWN POWER (added)
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


/* NEW POWER UPS (added) */

var mysticSightCount = 1;

var omnidataCount = 1;

var syntaxSorceryCount = 1;

var flameburstCount = 1;

var mindcraftCount = 1;

var mindcraftShield = false;



/* =========================
   QUESTIONS
========================= */

var questions = [

    {
        type: "SYNTAX REPAIR",

        question: "What symbol is missing?",

        code: "int age = 20__",

        answers: [
            ";",
            ":",
            ",",
            "."
        ],

        correct: 0,

        mistakeSpot: "20__",

        clue: "Look at what's used to properly end almost every line of C# code.",

        syntaxTip: "int age = 20;",

        rationale: "Every C# statement must end with a semicolon (;) — it tells the compiler that one instruction is complete. Without it, \"int age = 20\" wouldn't be a valid statement."
    },


    {
        type: "SYNTAX REPAIR",

        question: "What symbol is missing?",

        code: 'Console.WriteLine("Hello World"__);',

        answers: [
            ";",
            ":",
            ",",
            "."
        ],

        correct: 0,

        mistakeSpot: '"Hello World"__',

        clue: "Even calls to methods like Console.WriteLine() need to be closed off the same way every other statement is.",

        syntaxTip: 'Console.WriteLine("Hello World");',

        rationale: "Just like any other statement, a method call such as Console.WriteLine(\"Hello World\") still needs a semicolon (;) at the end to properly close the line."
    },


    {
        type: "SYNTAX REPAIR",

        question: "Which symbol ends a C# statement?",

        code: "int score = 100__",

        answers: [
            ";",
            ":",
            "{",
            "}"
        ],

        correct: 0,

        mistakeSpot: "100__",

        clue: "Variable declarations follow the same ending rule as any other C# statement.",

        syntaxTip: "int score = 100;",

        rationale: "Variable declarations are statements too, so \"int score = 100\" needs a semicolon (;) to mark where it ends."
    },


    {
        type: "CODE ASSEMBLY",

        question:
        "Arrange the code blocks in the correct order.",

        code:
`Console.WriteLine("Welcome!");
{
static void Main()
}`,

        answers: [

            "static void Main() → { → Console.WriteLine(\"Welcome!\"); → }",

            "{ → static void Main() → Console.WriteLine(\"Welcome!\"); → }",

            "Console.WriteLine(\"Welcome!\"); → static void Main() → { → }",

            "static void Main() → Console.WriteLine(\"Welcome!\"); → { → }"

        ],

        correct: 0,

        clue: "A method needs to be declared before its body can begin, and every opening brace needs a matching closing brace.",

        syntaxTip: "static void Main()\n{\n    Console.WriteLine(\"Welcome!\");\n}",

        rationale: "A method is written in this order: its declaration (static void Main()), then an opening brace { to start its body, the statements inside, and a closing brace } to end it."
    },


    {
        type: "CODE ASSEMBLY",

        question:
        "Arrange the code blocks in the correct order.",

        code:
`int score = 100;
{
static void Main()
}`,

        answers: [

            "static void Main() → { → int score = 100; → }",

            "int score = 100; → static void Main() → { → }",

            "{ → static void Main() → int score = 100; → }",

            "static void Main() → int score = 100; → { → }"

        ],

        correct: 0,

        clue: "Structure comes first: declare the method, open the body, then place the statement inside.",

        syntaxTip: "static void Main()\n{\n    int score = 100;\n}",

        rationale: "Just like any method, you declare it first, open its body with {, place the statement inside, then close it with }."
    },


    {
        type: "CODE ASSEMBLY",

        question:
        "Which line should come first?",

        code:
`Console.WriteLine(score);
int score = 50;
}`,

        answers: [

            "int score = 50; → Console.WriteLine(score); → }",

            "Console.WriteLine(score); → int score = 50; → }",

            "} → int score = 50; → Console.WriteLine(score);",

            "int score = 50; → } → Console.WriteLine(score);"

        ],

        correct: 0,

        clue: "A variable has to exist and hold a value before you can print it.",

        syntaxTip: "int score = 50;\nConsole.WriteLine(score);\n}",

        rationale: "A variable must be declared and assigned a value before you can use it. \"int score = 50;\" has to come before \"Console.WriteLine(score);\" or the compiler won't know what score is yet."
    },


    {
        type: "SPELL FORMATTING",

        question:
        "Which code is properly formatted?",

        code:
`A.

if (score > 50)
{
Console.WriteLine("Win");
}

B.

if (score > 50)
{
    Console.WriteLine("Win");
}`,

        answers: [

            "A",

            "B",

            "Both are incorrect",

            "Both are correct"

        ],

        correct: 1,

        clue: "Compare how each option treats the space inside the curly braces.",

        syntaxTip: "if (score > 50)\n{\n    Console.WriteLine(\"Win\");\n}",

        rationale: "Option B is correct because the statement inside the curly braces is indented, which clearly shows it belongs inside that block. Indentation isn't required to run the code, but it's essential for readability."
    },


    {
        type: "SPELL FORMATTING",

        question:
        "Which code is properly formatted?",

        code:
`A.

{
int score = 10;
}

B.

{
    int score = 10;
}`,

        answers: [

            "A",

            "B",

            "Both are incorrect",

            "Both are correct"

        ],

        correct: 1,

        clue: "The properly formatted version indents everything inside the braces.",

        syntaxTip: "{\n    int score = 10;\n}",

        rationale: "Option B properly indents \"int score = 10;\" inside the braces, showing it's part of that block — this is the standard way to format C# code."
    },


    {
        type: "SPELL FORMATTING",

        question:
        "Which code is properly formatted?",

        code:
`A.

if (age >= 18)
{
    Console.WriteLine("Adult");
}

B.

if age >= 18
{
Console.WriteLine("Adult")
}`,

        answers: [

            "A",

            "B",

            "Both are incorrect",

            "Both are correct"

        ],

        correct: 0,

        clue: "Check both the parentheses around the condition and the semicolon after the statement.",

        syntaxTip: "if (age >= 18)\n{\n    Console.WriteLine(\"Adult\");\n}",

        rationale: "Option B is missing the parentheses around the condition (age >= 18) and the semicolon after Console.WriteLine(\"Adult\"). Both are required in C# — parentheses always wrap an if-condition, and statements always end in a semicolon."
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


/* NEW ELEMENT REFS (added) */

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

    

document
    .getElementById("startBattleButton")
    .addEventListener(
        "click",
        function(){

            document
                .getElementById("startScreen")
                .style.display = "none";


            loadQuestion();

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


    /* RESET ANY MYSTIC SIGHT / MINDCRAFT VISUALS (added) */

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


    trialStatus.textContent =
        currentQuestion +
        " / " +
        questions.length;


    battleMessage.textContent =
        "Choose your answer...";

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


    if(selected === correct){

        event.target.classList.add(
            "correct"
        );


        feedback.textContent =
            "✓ Correct! Your spell strikes the Syntax Imp!";


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


        /* DAMAGE EFFECT NOW HAPPENS AFTER THE ATTACK VIDEO ENDS (changed) */

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

        event.target.classList.add(
            "wrong"
        );


        buttons[correct].classList.add(
            "correct"
        );


        feedback.textContent =
            "✗ Incorrect! The Syntax Imp attacks!";


        feedback.classList.add(
            "wrong"
        );


        if(mindcraftShield){

            /* MINDCRAFT ABSORBS THE HIT (added) */

            battleMessage.textContent =
                "🧠 Mindcraft absorbed the attack! No damage taken.";


            mindcraftShield = false;


            questionText.classList.remove(
                "mindcraft-highlight"
            );

        }

        else{

            battleMessage.textContent =
                "The Syntax Imp attacks!";


            playerHP -= 20;


            if(playerHP < 0){

                playerHP = 0;

            }


            updateHP();


            /* DAMAGE EFFECT ON THE PLAYER (added) */

            showDamageEffect(playerFighterEl);

            showFloatingNumber(
                playerFighterEl,
                "-20",
                "dmg"
            );

        }


        /* SHOW WHY THE ANSWER WAS WRONG (added) */

        showRationale(
            questions[currentQuestion].rationale ||
            "Review the syntax rules and try again next time."
        );

    }


    scoreDisplay.textContent =
        score;


    essenceDisplay.textContent =
        essence;


    disableAnswers();


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


    /* SHOW VIDEO */

    attackAnimation.classList.remove("fade-out");

    attackAnimation.classList.add("show");


    attackVideo.currentTime = 0;


    attackVideo.play().catch(function(){

        console.log(
            "Attack video could not start."
        );

    });


    /* =========================
       VIDEO FINISHED
    ========================= */

    attackVideo.onended = function(){

        /* START FADE OUT */

        attackAnimation.classList.add(
            "fade-out"
        );


        /* WAIT FOR FADE OUT */

        setTimeout(function(){

            attackAnimation.classList.remove(
                "show"
            );

            attackAnimation.classList.remove(
                "fade-out"
            );

            attackVideo.pause();

            attackVideo.currentTime = 0;


            /* RUN THE DAMAGE EFFECT / HP UPDATE AFTER THE VIDEO (added) */

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
========================= */

document
    .getElementById("hintPower")
    .addEventListener(
        "click",
        function(){

            if(hintCount <= 0 || answered){

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

                if(i !== correct){

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


            /* GREEN HEAL FLASH + FLOATING NUMBER + SOUND (added) */

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



/* =========================================================
   NEW POWER UPS BELOW (added, nothing above was removed)
========================================================= */


/* =========================
   MYSTIC SIGHT
   Detects the mistake hidden in the code.
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
   Reveals a major clue about the challenge.
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
   Shows the correct syntax needed.
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
                (q.syntaxTip || q.answers[q.correct]);


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
   Clears all wrong options at once.
========================= */

document
    .getElementById("flameburstPower")
    .addEventListener(
        "click",
        function(){

            if(
                flameburstCount <= 0 ||
                answered
            ){

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
   Highlights the key problem in the question and
   shields you from your next wrong answer.
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
        "The Syntax Imp has overwhelmed you.";


    feedback.textContent =
        "The trial has ended.";


    feedback.className =
        "feedback wrong";


    /* SHOW DEFEAT SCREEN WITH A CHOICE INSTEAD OF AUTO-RELOAD (changed) */

    document.getElementById(
        "loseScreen"
    ).classList.add(
        "show"
    );

}



/* =========================
   DEFEAT SCREEN BUTTONS (added)
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
                '/MainMenu/lesson.html';

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
        "book1Completed",
        "true"
    );


    localStorage.setItem(
        "book1Score",
        score
    );


    localStorage.setItem(
        "book1Essence",
        essence
    );


    /* UNLOCK BOOK II (added) */

    localStorage.setItem(
        "book2Unlocked",
        "true"
    );

}



/* =========================
   INITIALIZE
========================= */

updateHP();

/*DAMAGE EFFECT */

function showDamageEffect(target){

    if(!target){

        return;

    }


    /* REMOVE OLD EFFECT */

    target.classList.remove(
        "damage-flash"
    );

    target.classList.remove(
        "damage-shake"
    );


    /* FORCE RESTART ANIMATION */

    void target.offsetWidth;


    /* ADD EFFECT */

    target.classList.add(
        "damage-flash"
    );

    target.classList.add(
        "damage-shake"
    );


    /* PLAY SOUND */

    if(damageSound){

        damageSound.currentTime = 0;

        damageSound.play().catch(function(){

            console.log(
                "Damage sound could not play."
            );

        });

    }


    /* REMOVE AFTER ANIMATION */

    setTimeout(function(){

        target.classList.remove(
            "damage-flash"
        );

        target.classList.remove(
            "damage-shake"
        );

    }, 450);

}



/* =========================================================
   NEW HELPER FUNCTIONS BELOW (added, nothing removed)
========================================================= */


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
   Shows for 10 seconds, can be closed early with the ✕.
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