/* =========================================================
   SPELLCRAFT I — C# BEGINNINGS
   PAGE-BY-PAGE READING SYSTEM
========================================================= */

var scrollReminder =
document.getElementById("scrollReminder");

var pages =
    document.querySelectorAll(".reading-page");

var nextButton =
    document.getElementById("nextButton");

var prevButton =
    document.getElementById("prevButton");

var pageCounter =
    document.getElementById("pageCounter");

var progressFill =
    document.getElementById("progressFill");

var unlockTimer =
    document.getElementById("unlockTimer");

var reviewMessage =
    document.getElementById("reviewMessage");

var messageClose =
    document.getElementById("messageClose");

var chooseWitchButton =
    document.getElementById("chooseWitchButton");


var currentPage = 0;

var totalPages = pages.length;

var isNextLocked = false;

var countdown = 5;

var timerInterval;


/* =========================================================
   SHOW CURRENT PAGE
========================================================= */

function showPage(){

    pages.forEach(function(page, index){

        page.classList.remove("active");

        if(index === currentPage){

            page.classList.add("active");

        }

    });

setTimeout(function(){

    if(
        document.documentElement.scrollHeight >
        window.innerHeight
    ){

        scrollReminder.style.display="block";

    }

},2000);

    pageCounter.textContent =
        "PAGE " +
        (currentPage + 1) +
        " / " +
        totalPages;


    var progress =
        ((currentPage + 1) / totalPages) * 100;


    progressFill.style.width =
        progress + "%";


    if(currentPage === 0){

        prevButton.disabled = true;

        prevButton.style.opacity = ".35";

    }
    else{

        prevButton.disabled = false;

        prevButton.style.opacity = "1";

    }


    if(currentPage === totalPages - 1){

        nextButton.style.visibility =
            "hidden";

    }
    else{

        nextButton.style.visibility =
            "visible";

        lockNextButton();

    }


    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}


/* =========================================================
   LOCK NEXT BUTTON FOR 3 SECONDS
========================================================= */

function lockNextButton(){

    clearInterval(timerInterval);


    isNextLocked = true;

    countdown = 5;


    nextButton.classList.add("locked");

    unlockTimer.textContent =
        countdown;


    timerInterval =
        setInterval(function(){

            countdown--;


            unlockTimer.textContent =
                countdown;


            if(countdown <= 0){

                clearInterval(timerInterval);

                isNextLocked = false;

                nextButton.classList.remove(
                    "locked"
                );

                unlockTimer.textContent = "";

            }

        }, 1000);

}


/* =========================================================
   NEXT PAGE
========================================================= */

nextButton.addEventListener(
    "click",
    function(){

        if(isNextLocked){

            showReviewMessage();

            return;

        }


        if(currentPage < totalPages - 1){

            currentPage++;

            showPage();

        }

    }
);


/* =========================================================
   PREVIOUS PAGE
========================================================= */

prevButton.addEventListener(
    "click",
    function(){

        if(currentPage > 0){

            currentPage--;

            showPage();

        }

    }
);


/* =========================================================
   REVIEW MESSAGE
========================================================= */

function showReviewMessage(){

    reviewMessage.classList.add("show");

}


function closeReviewMessage(){

    reviewMessage.classList.remove("show");

}


messageClose.addEventListener(
    "click",
    function(){

        closeReviewMessage();

    }
);


reviewMessage.addEventListener(
    "click",
    function(event){

        if(event.target === reviewMessage){

            closeReviewMessage();

        }

    }
);


/* =========================================================
   CONTINUE TO WITCH GUIDE
========================================================= */

if(chooseWitchButton){

    chooseWitchButton.addEventListener(
        "click",
        function(){

            window.location.href =
                "character.html";

        }
    );

}


/* =========================================================
   INITIALIZE
========================================================= */

showPage();

window.addEventListener(
"scroll",
function(){

    if(window.scrollY > 200){

        scrollReminder.style.display="none";

    }

});