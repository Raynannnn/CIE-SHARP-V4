/* =========================================================
   COMPACT VIEW
   Adds a floating "Compact View" toggle button on phone
   screens. When pressed, applies body.cie-compact-mode,
   which shrinks the power-up row, witch/enemy art, HP bars,
   code display, and answer buttons (see compact-view.css).

   Same file works in every book — just paste as-is.
   Optional and OFF by default. The player's choice is
   remembered across books via localStorage.
========================================================= */

(function(){

    var STORAGE_KEY = "cieSharpCompactMode";

    var toggleButton = null;

    var isActive =
        localStorage.getItem(STORAGE_KEY) === "on";



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



    /* =========================================================
       TOGGLE
    ========================================================= */

    function toggleCompactMode(){

        isActive = !isActive;

        localStorage.setItem(

            STORAGE_KEY,

            isActive ? "on" : "off"

        );

        applyState();

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

    }


    if(document.readyState === "loading"){

        document.addEventListener("DOMContentLoaded", init);

    }

    else{

        init();

    }

})();