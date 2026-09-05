/* =========================================================
   CIE-SHARP LEARNING MODULE
========================================================= */

var sections = document.querySelectorAll(".module-section");
var topicButtons = document.querySelectorAll(".topic-button");
var nextButtons = document.querySelectorAll(".next-button");

var progressBar = document.getElementById("progressBar");
var progressText = document.getElementById("progressText");

var formatExample = document.getElementById("formatExample");
var formattedExample = document.getElementById("formattedExample");


/* =========================================================
   MODULE NAVIGATION
========================================================= */

var sectionOrder = [
    "overview",
    "structure",
    "syntax",
    "formatting",
    "examples",
    "check"
];

var completedSections = new Set();


function showSection(sectionName) {

    sections.forEach(function(section) {

        if (section.getAttribute("data-section") === sectionName) {

            section.classList.add("active-section");

        } else {

            section.classList.remove("active-section");

        }

    });


    topicButtons.forEach(function(button) {

        if (button.getAttribute("data-topic") === sectionName) {

            button.classList.add("active");

        } else {

            button.classList.remove("active");

        }

    });


    completedSections.add(sectionName);

    updateProgress();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


function updateProgress() {

    var progress = Math.round(
        (completedSections.size / sectionOrder.length) * 100
    );


    if (progressBar) {

        progressBar.style.width = progress + "%";

    }


    if (progressText) {

        progressText.innerText = progress + "%";

    }

}


/* =========================================================
   TOPIC BUTTONS
========================================================= */

topicButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        var topic =
            button.getAttribute("data-topic");

        showSection(topic);

    });

});


/* =========================================================
   CONTINUE BUTTONS
========================================================= */

nextButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        var nextSection =
            button.getAttribute("data-next");

        if (nextSection) {

            showSection(nextSection);

        }

    });

});


/* =========================================================
   FORMATTED CODE EXAMPLE
========================================================= */

if (formatExample) {

    formatExample.addEventListener("click", function() {

        if (formattedExample) {

            formattedExample.classList.remove("hidden");

        }


        formatExample.innerText =
            "FORMATTED VERSION SHOWN";

    });

}


/* =========================================================
   KNOWLEDGE CHECK
========================================================= */

var questions = [

    {
        question:
            "Which symbol commonly ends a C# statement?",

        choices: [
            ";",
            ":",
            "#",
            "/"
        ],

        answer: 0,

        explanation:
            "A semicolon is commonly used to end a C# statement."
    },


    {
        question:
            "Which symbol is used to group statements inside a block?",

        choices: [
            "( )",
            "[ ]",
            "{ }",
            "< >"
        ],

        answer: 2,

        explanation:
            "Curly braces { } group statements that belong to a class, method, or control block."
    },


    {
        question:
            "Which version follows readable indentation?",

        choices: [
            'if (score >= 75) { Console.WriteLine("Passed"); }',

            'if (score >= 75)\n{\n    Console.WriteLine("Passed");\n}',

            'if(score>=75){Console.WriteLine("Passed");}',

            'if score >= 75\nConsole.WriteLine("Passed");'
        ],

        answer: 1,

        explanation:
            "Indentation and line breaks make the structure of the code easier to read."
    },


    {
        question:
            "Why does capitalization matter in C#?",

        choices: [
            "C# ignores capitalization.",

            "C# is case-sensitive.",

            "Capitalization only changes the color.",

            "Capitalization is only needed in comments."
        ],

        answer: 1,

        explanation:
            "C# is case-sensitive, so uppercase and lowercase letters can identify different names."
    },


    {
        question:
            "What is the main purpose of syntax formatting?",

        choices: [
            "To make the program longer.",

            "To remove all braces.",

            "To make code structure clearer and easier to read.",

            "To replace C# with another language."
        ],

        answer: 2,

        explanation:
            "Good formatting makes code structure clearer and helps readers locate syntax problems."
    }

];


var currentQuestion = 0;

var score = 0;

var answered = false;


var questionNumber =
    document.getElementById("questionNumber");

var questionText =
    document.getElementById("questionText");

var answerChoices =
    document.getElementById("answerChoices");

var quizFeedback =
    document.getElementById("quizFeedback");

var nextQuestion =
    document.getElementById("nextQuestion");

var quizArea =
    document.getElementById("quizArea");

var quizResult =
    document.getElementById("quizResult");

var finalScore =
    document.getElementById("finalScore");

var resultText =
    document.getElementById("resultText");

var restartQuiz =
    document.getElementById("restartQuiz");


/* =========================================================
   LOAD QUESTION
========================================================= */

function loadQuestion() {

    answered = false;


    var question =
        questions[currentQuestion];


    if (questionNumber) {

        questionNumber.innerText =
            "QUESTION " +
            (currentQuestion + 1) +
            " OF " +
            questions.length;

    }


    if (questionText) {

        questionText.innerText =
            question.question;

    }


    if (answerChoices) {

        answerChoices.innerHTML = "";

    }


    if (quizFeedback) {

        quizFeedback.innerText = "";

    }


    if (nextQuestion) {

        nextQuestion.classList.add("hidden");

    }


    question.choices.forEach(function(choice, index) {

        var button =
            document.createElement("button");


        button.type = "button";

        button.className =
            "answer-button";

        button.innerText =
            choice;


        button.addEventListener(
            "click",
            function() {

                answerQuestion(
                    index,
                    button
                );

            }
        );


        if (answerChoices) {

            answerChoices.appendChild(button);

        }

    });

}


/* =========================================================
   ANSWER QUESTION
========================================================= */

function answerQuestion(
    selectedIndex,
    selectedButton
) {

    if (answered) {

        return;

    }


    answered = true;


    var question =
        questions[currentQuestion];


    var allButtons =
        document.querySelectorAll(
            ".answer-button"
        );


    allButtons.forEach(function(button) {

        button.disabled = true;

    });


    if (selectedIndex === question.answer) {

        score++;


        selectedButton.classList.add(
            "correct"
        );


        if (quizFeedback) {

            quizFeedback.innerText =
                "Correct. " +
                question.explanation;

        }

    } else {

        selectedButton.classList.add(
            "incorrect"
        );


        if (allButtons[question.answer]) {

            allButtons[
                question.answer
            ].classList.add("correct");

        }


        if (quizFeedback) {

            quizFeedback.innerText =
                "Not quite. " +
                question.explanation;

        }

    }


    if (nextQuestion) {

        nextQuestion.classList.remove(
            "hidden"
        );

    }

}


/* =========================================================
   NEXT QUESTION
========================================================= */

if (nextQuestion) {

    nextQuestion.addEventListener(
        "click",
        function() {

            currentQuestion++;


            if (
                currentQuestion <
                questions.length
            ) {

                loadQuestion();

            } else {

                finishQuiz();

            }

        }
    );

}


/* =========================================================
   FINISH QUIZ
========================================================= */

function finishQuiz() {

    if (quizArea) {

        quizArea.classList.add("hidden");

    }


    if (quizResult) {

        quizResult.classList.remove(
            "hidden"
        );

    }


    if (finalScore) {

        finalScore.innerText =
            score +
            " / " +
            questions.length;

    }


    var percentage =
        Math.round(
            (score / questions.length) * 100
        );


    if (resultText) {

        if (percentage >= 80) {

            resultText.innerText =
                "Excellent work. You are ready to enter the syntax trials.";

        } else if (percentage >= 60) {

            resultText.innerText =
                "Good work. Review the lessons you found difficult, then try again.";

        } else {

            resultText.innerText =
                "Review the module again and practice the syntax examples before entering the trials.";

        }

    }


    completedSections.add("check");

    updateProgress();

}


/* =========================================================
   RETAKE QUIZ
========================================================= */

if (restartQuiz) {

    restartQuiz.addEventListener(
        "click",
        function() {

            currentQuestion = 0;

            score = 0;

            answered = false;


            if (quizArea) {

                quizArea.classList.remove(
                    "hidden"
                );

            }


            if (quizResult) {

                quizResult.classList.add(
                    "hidden"
                );

            }


            loadQuestion();

        }
    );

}


/* =========================================================
   MUSIC
========================================================= */

var bgMusic =
    document.getElementById("bgMusic");

var musicButton =
    document.getElementById("musicButton");


var savedMusic =
    localStorage.getItem(
        "cieSharpMusic"
    );


if (bgMusic && musicButton) {

    if (savedMusic === "on") {

        bgMusic
            .play()
            .catch(function() {});


        musicButton.innerText =
            "MUSIC ON";

    } else {

        musicButton.innerText =
            "MUSIC";

    }


    musicButton.addEventListener(
        "click",
        function() {

            if (bgMusic.paused) {

                bgMusic
                    .play()
                    .then(function() {

                        musicButton.innerText =
                            "MUSIC ON";


                        localStorage.setItem(
                            "cieSharpMusic",
                            "on"
                        );

                    })
                    .catch(function() {

                        musicButton.innerText =
                            "MUSIC";

                    });

            } else {

                bgMusic.pause();


                musicButton.innerText =
                    "MUSIC";


                localStorage.setItem(
                    "cieSharpMusic",
                    "off"
                );

            }

        }
    );

}


/* =========================================================
   INITIALIZE
========================================================= */

loadQuestion();

updateProgress();