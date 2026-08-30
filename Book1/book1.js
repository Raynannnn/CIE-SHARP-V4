/* =========================
   CHARACTER DATA
========================= */

var selectedCharacter =
    localStorage.getItem("selectedCharacter") || "noe";


var characters = {

    noe: {

        name: "Logic Witch",

        role: "The Problem Solver",

        image: "images/noe.png",

        attackVideo: "videos/logic-witch-attack.mp4"

    },


    raynan: {

        name: "Data Witch",

        role: "The Keeper of Knowledge",

        image: "images/raynan.png",

        attackVideo: "videos/data-witch-attack.mp4"

    },


    precy: {

        name: "Codeweaver Witch",

        role: "The Master of Syntax",

        image: "images/precy.png",

        attackVideo: "videos/codeweaver-witch-attack.mp4"

    },


    bea: {

        name: "Ember Witch",

        role: "The Challenge Master",

        image: "images/bea.png",

        attackVideo: "videos/ember-witch-attack.mp4"

    },


    joses: {

        name: "Logicraft Witch",

        role: "The Creative Builder",

        image: "images/joses.png",

        attackVideo: "videos/logicraft-witch-attack.mp4"

    }

};


var player =
    characters[selectedCharacter] ||
    characters.noe;



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

        correct: 0
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

        correct: 0
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

        correct: 0
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

        correct: 0
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

        correct: 0
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

        correct: 0
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

        correct: 1
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

        correct: 1
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

        correct: 0
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



/* =========================
   START BATTLE
========================= */

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


        playAttack();

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


        battleMessage.textContent =
            "The Syntax Imp attacks!";


        playerHP -= 20;


        if(playerHP < 0){

            playerHP = 0;

        }


        updateHP();

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
   ATTACK
========================= */

function playAttack(){

    attackVideoSource.src =
        player.attackVideo;


    attackVideo.load();


    attackAnimation.classList.add(
        "show"
    );


    attackVideo.currentTime = 0;


    attackVideo.play().catch(
        function(){

            console.log(
                "Attack video unavailable."
            );

        }
    );


    updateHP();


    setTimeout(
        function(){

            attackAnimation.classList.remove(
                "show"
            );


            attackVideo.pause();

        },

        1500
    );

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
   GAME OVER
========================= */

function gameOver(){

    battleMessage.textContent =
        "The Syntax Imp has overwhelmed you.";


    feedback.textContent =
        "The trial has ended. Try again.";


    feedback.className =
        "feedback wrong";


    setTimeout(
        function(){

            location.reload();

        },

        2000
    );

}



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

}



/* =========================
   INITIALIZE
========================= */

updateHP();