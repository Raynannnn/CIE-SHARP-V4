/* =========================================================
   PAUSE MENU
   Floating "II" button that opens a small pause menu with
   Volume, Restart, Readings, and Exit. Same file works in
   every book — just paste as-is, no edits needed.

   NEW: TRIAL PROGRESS
   Pressing "Readings" saves where the player is (question
   number, HP, score, essence, power-up counts). When they
   come back to the book page (Readings > Skip All / Continue
   > witch guide > book), the trial resumes from that same
   question instead of restarting at 1.
   The save is cleared on Restart Trial, on victory, and on
   defeat. It is stored per book, using the page file name
   (book1.html -> "cieSharpProgress_book1").

   It reads the book's global game variables (currentQuestion,
   questions, playerHP, enemyHP, score, essence, answered and
   the *Count power-up counters), so those must stay declared
   with "var" at the top level of the book's JS, like book1.js.
   If a book doesn't have them, saving/resuming is skipped and
   nothing breaks.

   Optional overrides — set these BEFORE this script tag
   ONLY if a book's paths are different from the defaults:
     window.PAUSE_MENU_READINGS_URL
     window.PAUSE_MENU_EXIT_URL
     window.PAUSE_MENU_PROGRESS_KEY

   NOTE: if the book already sets window.STRUGGLE_REVIEWER_URL
   for struggle-guide.js, pause-menu.js reuses that same value
   for its "Readings" button automatically.
========================================================= */

(function(){

    var VOLUME_KEY = "cieSharpVolume";

    var readingsURL =
        window.PAUSE_MENU_READINGS_URL ||
        window.STRUGGLE_REVIEWER_URL ||
        "characters/reading1.html";

    var exitURL =
        window.PAUSE_MENU_EXIT_URL ||
        "../MainMenu/lesson.html";


    var storedVolume =
        localStorage.getItem(VOLUME_KEY);

    var currentVolume =
        storedVolume === null ?
            1 :
            parseFloat(storedVolume);

    if(isNaN(currentVolume)){

        currentVolume = 1;

    }


    var lastVolumeBeforeMute =
        currentVolume || 1;


    var pauseButton = null;

    var overlay = null;

    var slider = null;

    var valueLabel = null;

    var muteButton = null;



    /* =========================================================
       PROGRESS SAVE / RESUME
    ========================================================= */

    var COUNT_NAMES = [

        "hint",
        "heal",
        "double",
        "mysticSight",
        "omnidata",
        "syntaxSorcery",
        "flameburst",
        "mindcraft"

    ];

    /* the 5 witch-specific power-ups (only 1 is used per witch) */

    var SPECIAL_NAMES = [

        "mysticSight",
        "omnidata",
        "syntaxSorcery",
        "flameburst",
        "mindcraft"

    ];


    function getBookId(){

        var file =
            (window.location.pathname.split("/").pop()) || "book";

        return file.replace(/\.[^.]+$/, "");

    }


    var PROGRESS_KEY =
        window.PAUSE_MENU_PROGRESS_KEY ||
        ("cieSharpProgress_" + getBookId());


    function isNum(value){

        return typeof value === "number" && isFinite(value);

    }


    function loadProgress(){

        try{

            var raw = localStorage.getItem(PROGRESS_KEY);

            if(!raw){

                return null;

            }

            var data = JSON.parse(raw);

            return (data && typeof data === "object") ? data : null;

        }
        catch(error){

            return null;

        }

    }


    function clearProgress(){

        try{

            localStorage.removeItem(PROGRESS_KEY);

        }
        catch(error){}

    }


    function gameHasStarted(){

        var start = document.getElementById("startScreen");

        if(!start){

            return true;

        }

        return window.getComputedStyle(start).display === "none";

    }


    /* called right before the player leaves for the Readings page */

    function saveProgressForReadings(){

        try{

            if(
                typeof window.currentQuestion !== "number" ||
                !window.questions ||
                !window.questions.length
            ){

                return;

            }


            /* still on the start screen -> nothing new to save */

            if(!gameHasStarted()){

                return;

            }


            var lastIndex = window.questions.length - 1;

            var index = window.currentQuestion;


            /* current question was already answered, so the
               player is really waiting on the next one */

            if(window.answered === true){

                index += 1;

            }


            /* trial is basically over -> nothing to resume */

            if(
                index > lastIndex ||
                (isNum(window.playerHP) && window.playerHP <= 0)
            ){

                clearProgress();

                return;

            }


            var counts = {};

            COUNT_NAMES.forEach(function(name){

                var value = window[name + "Count"];

                if(isNum(value)){

                    counts[name] = value;

                }

            });


            var snapshot = {

                question: index,

                total: window.questions.length,

                playerHP: window.playerHP,

                enemyHP: window.enemyHP,

                score: window.score,

                essence: window.essence,

                counts: counts,

                doubleActive: window.doublePowerActive === true,

                shield: window.mindcraftShield === true,

                character:
                    localStorage.getItem("selectedCharacter") || "",

                savedAt: Date.now()

            };


            localStorage.setItem(
                PROGRESS_KEY,
                JSON.stringify(snapshot)
            );

        }
        catch(error){}

    }


    /* runs once when the book page loads, before the player
       presses ENTER THE TRIAL. Returns info for the start
       screen, or null if there is nothing to resume. */

    function restoreProgress(){

        var saved = loadProgress();

        if(!saved){

            return null;

        }


        if(
            typeof window.currentQuestion !== "number" ||
            !window.questions ||
            !window.questions.length
        ){

            return null;

        }


        /* stale or invalid save -> throw it away */

        if(
            !isNum(saved.question) ||
            saved.question < 0 ||
            saved.question > window.questions.length - 1 ||
            (saved.total && saved.total !== window.questions.length)
        ){

            clearProgress();

            return null;

        }


        window.currentQuestion = saved.question;


        ["playerHP", "enemyHP", "score", "essence"].forEach(function(name){

            if(isNum(saved[name])){

                window[name] = saved[name];

            }

        });


        /* if the player picked a different witch this time, keep the
           fresh witch-specific power-up instead of the old one */

        var sameWitch =
            (saved.character || "") ===
            (localStorage.getItem("selectedCharacter") || "");


        COUNT_NAMES.forEach(function(name){

            if(!sameWitch && SPECIAL_NAMES.indexOf(name) !== -1){

                return;

            }


            var value = saved.counts ? saved.counts[name] : undefined;

            if(!isNum(value)){

                return;

            }


            window[name + "Count"] = value;


            var label = document.getElementById(name + "Count");

            if(label){

                label.textContent = value;

            }


            var button = document.getElementById(name + "Power");

            if(button && value <= 0){

                button.classList.add("used");

            }

        });


        if(saved.doubleActive === true){

            window.doublePowerActive = true;

        }


        var shield = sameWitch && saved.shield === true;

        if(shield){

            window.mindcraftShield = true;

        }


        var scoreEl = document.getElementById("score");

        if(scoreEl && isNum(saved.score)){

            scoreEl.textContent = saved.score;

        }


        var essenceEl = document.getElementById("essence");

        if(essenceEl && isNum(saved.essence)){

            essenceEl.textContent = saved.essence;

        }


        if(typeof window.updateHP === "function"){

            window.updateHP();

        }


        return {

            question: saved.question,

            total: window.questions.length,

            shield: shield

        };

    }


    /* start screen: "RESUME TRIAL 2 / 9" + a small start-over link */

    function setupResumeUI(info){

        var startButton =
            document.getElementById("startBattleButton");

        if(!startButton){

            return;

        }


        startButton.textContent =
            "RESUME TRIAL " + (info.question + 1) + " / " + info.total;


        var startOver = document.createElement("button");

        startOver.type = "button";

        startOver.id = "startOverButton";

        startOver.textContent = "Start over instead";

        startOver.style.cssText =

            "display:block;" +
            "margin:14px auto 0;" +
            "padding:4px 8px;" +
            "background:none;" +
            "border:none;" +
            "color:#94a3b8;" +
            "font-family:'VT323',monospace;" +
            "font-size:16px;" +
            "text-decoration:underline;" +
            "cursor:pointer;";

        startButton.parentNode.insertBefore(
            startOver,
            startButton.nextSibling
        );


        startOver.addEventListener("click", function(){

            clearProgress();

            location.reload();

        });


        /* runs after the book's own start handler has loaded the question */

        startButton.addEventListener("click", function(){

            var questionText =
                document.getElementById("questionText");

            if(info.shield && questionText){

                questionText.classList.add("mindcraft-highlight");

            }


            var message =
                document.getElementById("battleMessage");

            if(message){

                message.textContent =
                    "Progress restored. Back at trial " +
                    (info.question + 1) + ".";

            }

        });

    }


    /* victory or defeat = the trial is finished, so wipe the save */

    function watchEndScreens(){

        ["resultScreen", "loseScreen"].forEach(function(id){

            var el = document.getElementById(id);

            if(!el){

                return;

            }


            new MutationObserver(function(){

                if(el.classList.contains("show")){

                    clearProgress();

                }

            }).observe(el, {

                attributes:true,

                attributeFilter:["class"]

            });

        });

    }



    /* =========================================================
       ICONS (SVG only)
    ========================================================= */

    var ICON_PAUSE =
        '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<rect x="6" y="4" width="4" height="16" rx="1.5" fill="currentColor"/>' +
            '<rect x="14" y="4" width="4" height="16" rx="1.5" fill="currentColor"/>' +
        '</svg>';

    var ICON_CLOSE =
        '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
        '</svg>';

    var ICON_VOLUME =
        '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/>' +
            '<path d="M16.5 8.5a5 5 0 010 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
        '</svg>';

    var ICON_MUTE =
        '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/>' +
            '<path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
        '</svg>';

    var ICON_RESTART =
        '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M4 12a8 8 0 1 1 2.6 5.9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
            '<path d="M4 17v-5h5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
        '</svg>';

    var ICON_READINGS =
        '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M4 5.5C4 4.7 4.7 4 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5v-13z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>' +
            '<path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5v-13z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>' +
        '</svg>';

    var ICON_EXIT =
        '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
            '<path d="M15 16l4-4-4-4M19 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
        '</svg>';



    /* =========================================================
       CREATE PAUSE BUTTON
    ========================================================= */

    function createPauseButton(){

        var el = document.createElement("button");

        el.id = "pauseMenuButtonToggle";

        el.className = "pause-menu-button";

        el.type = "button";

        el.title = "Menu";

        el.innerHTML = ICON_PAUSE;

        document.body.appendChild(el);

        return el;

    }



    /* =========================================================
       CREATE OVERLAY
    ========================================================= */

    function createOverlay(){

        var el = document.createElement("div");

        el.id = "pauseOverlay";

        el.className = "pause-overlay";

        el.innerHTML =

            '<div class="pause-card">' +

                '<button id="pauseCloseButton" class="pause-close" type="button" title="Close">' +
                    ICON_CLOSE +
                '</button>' +

                '<h2>MENU</h2>' +

                '<div class="pause-volume">' +

                    '<div class="pause-volume-top">' +
                        '<span>' + ICON_VOLUME + ' VOLUME</span>' +
                        '<span id="pauseVolumeValue">100%</span>' +
                    '</div>' +

                    '<div class="pause-volume-row">' +

                        '<button id="pauseMuteButton" class="pause-mute-button" type="button" title="Mute">' +
                            ICON_VOLUME +
                        '</button>' +

                        '<input type="range" id="pauseVolumeSlider" min="0" max="100" value="100">' +

                    '</div>' +

                '</div>' +

                '<div class="pause-actions">' +

                    '<button id="pauseRestartButton" class="pause-menu-item" type="button">' +
                        ICON_RESTART + ' Restart Trial' +
                    '</button>' +

                    '<button id="pauseReadingsButton" class="pause-menu-item" type="button">' +
                        ICON_READINGS + ' Readings' +
                    '</button>' +

                    '<button id="pauseExitButton" class="pause-menu-item exit-item" type="button">' +
                        ICON_EXIT + ' Exit to Menu' +
                    '</button>' +

                '</div>' +

            '</div>';

        document.body.appendChild(el);

        return el;

    }



    /* =========================================================
       VOLUME TARGETS
       Applies to every <audio>/<video> EXCEPT the silent
       looping background video (.battle-background).
    ========================================================= */

    function getVolumeTargets(){

        var all =
            document.querySelectorAll("audio, video");

        var targets = [];


        all.forEach(function(el){

            if(!el.classList.contains("battle-background")){

                targets.push(el);

            }

        });


        return targets;

    }


    function applyVolume(){

        getVolumeTargets().forEach(function(el){

            el.volume = currentVolume;

        });

    }


    function updateVolumeUI(){

        var percent =
            Math.round(currentVolume * 100);


        if(slider){

            slider.value = percent;

        }

        if(valueLabel){

            valueLabel.textContent =
                percent + "%";

        }

        if(muteButton){

            muteButton.innerHTML =
                currentVolume <= 0 ?
                    ICON_MUTE :
                    ICON_VOLUME;

        }

    }


    function setVolume(newVolume){

        currentVolume =
            Math.min(1, Math.max(0, newVolume));


        localStorage.setItem(

            VOLUME_KEY,

            String(currentVolume)

        );


        applyVolume();

        updateVolumeUI();

    }



    /* =========================================================
       OPEN / CLOSE
    ========================================================= */

    function openMenu(){

        updateVolumeUI();

        overlay.classList.add("show");

    }


    function closeMenu(){

        overlay.classList.remove("show");

    }



    /* =========================================================
       INIT
    ========================================================= */

    function init(){

        pauseButton = createPauseButton();

        overlay = createOverlay();


        slider =
            document.getElementById("pauseVolumeSlider");

        valueLabel =
            document.getElementById("pauseVolumeValue");

        muteButton =
            document.getElementById("pauseMuteButton");


        applyVolume();

        updateVolumeUI();


        /* re-apply every second to catch audio/video elements
           a book swaps in dynamically (e.g. attack video src
           changes) — no need to touch any book#.js for this */

        setInterval(applyVolume, 1000);


        /* resume a trial the player left through Readings */

        var resumeInfo = restoreProgress();

        if(resumeInfo){

            setupResumeUI(resumeInfo);

        }

        watchEndScreens();


        pauseButton.addEventListener("click", openMenu);


        document.getElementById("pauseCloseButton")
            .addEventListener("click", closeMenu);


        overlay.addEventListener("click", function(event){

            if(event.target === overlay){

                closeMenu();

            }

        });


        document.addEventListener("keydown", function(event){

            if(
                event.key === "Escape" &&
                overlay.classList.contains("show")
            ){

                closeMenu();

            }

        });


        slider.addEventListener("input", function(){

            setVolume(Number(slider.value) / 100);

        });


        muteButton.addEventListener("click", function(){

            if(currentVolume > 0){

                lastVolumeBeforeMute = currentVolume;

                setVolume(0);

            }
            else{

                setVolume(lastVolumeBeforeMute || 1);

            }

        });


        document.getElementById("pauseRestartButton")
            .addEventListener("click", function(){

                /* restart = fresh trial, so drop any saved progress */

                clearProgress();

                location.reload();

            });


        document.getElementById("pauseReadingsButton")
            .addEventListener("click", function(){

                saveProgressForReadings();

                window.location.href = readingsURL;

            });


        document.getElementById("pauseExitButton")
            .addEventListener("click", function(){

                window.location.href = exitURL;

            });

    }


    if(document.readyState === "loading"){

        document.addEventListener("DOMContentLoaded", init);

    }
    else{

        init();

    }

})();