/* =========================================================
   COMPACT VIEW
   On first load, asks the player once whether they're on a
   phone or a tablet/desktop, and sets compact mode based on
   the answer. A floating toggle button stays available after
   that in case they want to switch manually.

   Same file works in every book — just paste as-is.
   The player's answer/choice is remembered across books via
   localStorage.
========================================================= */

(function(){

    var STORAGE_KEY = "cieSharpCompactMode";

    var ASK_KEY = "cieSharpCompactAsked";

    var toggleButton = null;

    var askOverlay = null;

    var isActive =
        localStorage.getItem(STORAGE_KEY) === "on";

    var hasAsked =
        localStorage.getItem(ASK_KEY) === "true";



    /* =========================================================
       CREATE TOGGLE BUTTON
    ========================================================= */

    function createToggleButton(){

        var el = document.createElement("button");

        el.id = "compactViewToggle";

        el.className = "compact-toggle";

        el.type = "button";

        el.innerHTML =

            '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '<rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="2"/>' +
                '<path d="M8 9h8M8 13h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
            '</svg>' +
            '<span id="compactViewLabel">COMPACT VIEW</span>';

        document.body.appendChild(el);

        return el;

    }



    /* =========================================================
       CREATE DEVICE-ASK OVERLAY
    ========================================================= */

    function createAskOverlay(){

        var el = document.createElement("div");

        el.id = "compactAskOverlay";

        el.className = "compact-ask-overlay";

        el.innerHTML =

            '<div class="compact-ask-card">' +

                '<h2>What device are you using?</h2>' +

                '<p>If you are on a phone, we can switch you to a compact view that fits smaller screens better.</p>' +

                '<div class="compact-ask-actions">' +
                    '<button id="compactAskPhone" class="compact-ask-btn phone">PHONE</button>' +
                    '<button id="compactAskOther" class="compact-ask-btn other">TABLET / DESKTOP</button>' +
                '</div>' +

            '</div>';

        document.body.appendChild(el);

        return el;

    }



    /* =========================================================
       ASK THE PLAYER (ONCE)
    ========================================================= */

    function askDevice(){

        askOverlay = createAskOverlay();

        askOverlay.classList.add("show");


        document.getElementById("compactAskPhone")
            .addEventListener("click", function(){

                setActive(true);

                markAsked();

                closeAskOverlay();

            });


        document.getElementById("compactAskOther")
            .addEventListener("click", function(){

                setActive(false);

                markAsked();

                closeAskOverlay();

            });

    }


    function closeAskOverlay(){

        if(askOverlay){

            askOverlay.classList.remove("show");

        }

    }


    function markAsked(){

        hasAsked = true;

        localStorage.setItem(ASK_KEY, "true");

    }



    /* =========================================================
       APPLY / REMOVE COMPACT MODE
    ========================================================= */

    function applyState(){

        var label =
            document.getElementById("compactViewLabel");


        if(isActive){

            document.body.classList.add("cie-compact-mode");

            if(toggleButton){

                toggleButton.classList.add("active");

            }

            if(label){

                label.textContent = "NORMAL VIEW";

            }

        }

        else{

            document.body.classList.remove("cie-compact-mode");

            if(toggleButton){

                toggleButton.classList.remove("active");

            }

            if(label){

                label.textContent = "COMPACT VIEW";

            }

        }

    }


    function setActive(value){

        isActive = value;

        localStorage.setItem(

            STORAGE_KEY,

            isActive ? "on" : "off"

        );

        applyState();

    }



    /* =========================================================
       TOGGLE (MANUAL BUTTON)
    ========================================================= */

    function toggleCompactMode(){

        setActive(!isActive);

    }



    /* =========================================================
       INIT
    ========================================================= */

    function init(){

        toggleButton = createToggleButton();

        toggleButton.addEventListener(

            "click",

            toggleCompactMode

        );

        applyState();


        if(!hasAsked){

            /* small delay so it doesn't collide with the
               page's own load animations */

            setTimeout(askDevice, 400);

        }

    }


    if(document.readyState === "loading"){

        document.addEventListener("DOMContentLoaded", init);

    }

    else{

        init();

    }

})();