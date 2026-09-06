/* =========================================================
   SPELLCRAFT VII — ARRAY CHAMBER
   PAGE-BY-PAGE READING SYSTEM
   (Same logic as reading1.js / reading2.js / reading3.js /
   reading4.js / reading6.js — only the destination for the
   "Continue to Witch Guide" / Skip buttons changed to
   character7.html, since this reading precedes Book VII.)
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


/* SKIP ALL ELEMENTS */

var skipAllButton =
    document.getElementById("skipAllButton");

var skipConfirmModal =
    document.getElementById("skipConfirmModal");

var skipConfirmYes =
    document.getElementById("skipConfirmYes");

var skipConfirmNo =
    document.getElementById("skipConfirmNo");


var currentPage = 0;

var totalPages = pages.length;

var isNextLocked = false;

var countdown = 5;

var timerInterval;

var scrollHintTimer;


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

    updateScrollHint();

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
   LOCK NEXT BUTTON FOR 5 SECONDS
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
   CONTINUE TO WITCH GUIDE (BOOK VII)
========================================================= */

if(chooseWitchButton){

    chooseWitchButton.addEventListener(
        "click",
        function(){

            window.location.href =
                "characters7.html";

        }
    );

}


/* =========================================================
   SKIP ALL
   Opens a confirm popup instead of jumping right away.
   YES  -> goes straight to the Witch Guide / Book VII entry
   NO   -> closes the popup, learner stays on the current page
========================================================= */

if(skipAllButton){

    skipAllButton.addEventListener(
        "click",
        function(){

            skipConfirmModal.classList.add("show");

        }
    );

}


if(skipConfirmYes){

    skipConfirmYes.addEventListener(
        "click",
        function(){

            window.location.href =
                "character7.html";

        }
    );

}


if(skipConfirmNo){

    skipConfirmNo.addEventListener(
        "click",
        function(){

            skipConfirmModal.classList.remove(
                "show"
            );

        }
    );

}


if(skipConfirmModal){

    skipConfirmModal.addEventListener(
        "click",
        function(event){

            if(event.target === skipConfirmModal){

                skipConfirmModal.classList.remove(
                    "show"
                );

            }

        }
    );

}


/* =========================================================
   SCROLL HINT (center-screen arrow)
========================================================= */

function updateScrollHint(){

    clearTimeout(scrollHintTimer);

    scrollReminder.classList.remove("show");

    scrollReminder.style.opacity = "";


    scrollHintTimer = setTimeout(function(){

        if(
            document.documentElement.scrollHeight >
            window.innerHeight + 40
        ){

            scrollReminder.classList.add("show");

        }

    }, 1800);

}


window.addEventListener(
    "scroll",
    function(){

        if(
            !scrollReminder.classList.contains("show")
        ){

            return;

        }


        var fadeDistance = 260;


        var progress =
            Math.min(
                window.scrollY / fadeDistance,
                1
            );


        scrollReminder.style.opacity =
            1 - progress;


        if(progress >= 1){

            scrollReminder.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================================
   HIDE SCROLL HINT ON CLICK
========================================================= */

function hideScrollHint(){

    if(
        !scrollReminder.classList.contains("show")
    ){

        return;

    }


    scrollReminder.style.opacity = 0;


    setTimeout(function(){

        scrollReminder.classList.remove(
            "show"
        );

    }, 400);

}


document.addEventListener(
    "click",
    function(){

        hideScrollHint();

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

showPage();