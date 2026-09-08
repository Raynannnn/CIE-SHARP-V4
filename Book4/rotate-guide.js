/* =========================================================
   ROTATE GUIDE
   Suggests landscape mode once per session on narrow /
   portrait phone screens. Same file works in every book —
   just paste as-is, no edits needed.

   Behavior:
   - Shows once per browser session (sessionStorage), only
     when the screen is portrait AND narrow (phone-sized).
   - "Continue Anyway" dismisses it for the rest of the
     session and reveals a small corner icon.
   - Clicking the corner icon brings the tip back up.
   - Auto-hides itself the moment the phone is rotated to
     landscape, and re-checks on resize.
========================================================= */

(function(){

    var PORTRAIT_MAX_WIDTH = 700; /* phone-sized screens only */

    var SESSION_KEY = "cieSharpRotateDismissed";


    var overlay = null;

    var reopenButton = null;

    var dismissedThisSession =
        sessionStorage.getItem(SESSION_KEY) === "true";



    /* =========================================================
       IS THIS A NARROW PORTRAIT PHONE SCREEN?
    ========================================================= */

    function isNarrowPortrait(){

        return (
            window.innerWidth <= PORTRAIT_MAX_WIDTH &&
            window.innerHeight > window.innerWidth
        );

    }



    /* =========================================================
       CREATE OVERLAY
    ========================================================= */

    function createOverlay(){

        var el = document.createElement("div");

        el.id = "rotateOverlay";

        el.className = "rotate-overlay";

        el.innerHTML =

            '<div class="rotate-card">' +

                '<div class="rotate-icon">' +
                    '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                        '<rect x="7" y="2" width="10" height="16" rx="2" stroke="#facc15" stroke-width="2"/>' +
                        '<circle cx="12" cy="15.2" r=".6" fill="#facc15"/>' +
                    '</svg>' +
                '</div>' +

                '<h2>Rotate Your Phone</h2>' +

                '<p>This trial looks and plays best in landscape mode. Turn your device sideways for the full battle view.</p>' +

                '<div class="rotate-actions">' +
                    '<button id="rotateDismissBtn" class="rotate-btn primary">GOT IT</button>' +
                    '<button id="rotateContinueBtn" class="rotate-btn secondary">Continue Anyway</button>' +
                '</div>' +

            '</div>';

        document.body.appendChild(el);

        return el;

    }



    /* =========================================================
       CREATE CORNER REOPEN ICON
    ========================================================= */

    function createReopenButton(){

        var el = document.createElement("button");

        el.id = "rotateReopenButton";

        el.className = "rotate-reopen";

        el.type = "button";

        el.title = "Rotation tip";

        el.innerHTML =

            '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '<rect x="7" y="2" width="10" height="16" rx="2" stroke="currentColor" stroke-width="2"/>' +
                '<circle cx="12" cy="15.2" r=".6" fill="currentColor"/>' +
            '</svg>';

        document.body.appendChild(el);

        return el;

    }



    /* =========================================================
       SHOW / HIDE OVERLAY
    ========================================================= */

    function showOverlay(){

        if(!isNarrowPortrait()){

            return;

        }

        overlay.classList.add("show");

        if(reopenButton){

            reopenButton.classList.remove("show");

        }

    }


    function hideOverlay(dismissForSession){

        overlay.classList.remove("show");

        if(dismissForSession){

            sessionStorage.setItem(SESSION_KEY, "true");

            dismissedThisSession = true;

        }

        updateReopenVisibility();

    }



    /* =========================================================
       REOPEN ICON VISIBILITY
    ========================================================= */

    function updateReopenVisibility(){

        if(!reopenButton){

            return;

        }


        if(dismissedThisSession && isNarrowPortrait()){

            reopenButton.classList.add("show");

        }

        else{

            reopenButton.classList.remove("show");

        }

    }



    /* =========================================================
       ORIENTATION / RESIZE WATCHER
    ========================================================= */

    function handleViewportChange(){

        if(!isNarrowPortrait()){

            /* rotated to landscape, or resized to a bigger
               screen — hide everything */

            overlay.classList.remove("show");

            if(reopenButton){

                reopenButton.classList.remove("show");

            }

            return;

        }


        /* back in narrow portrait */

        if(!dismissedThisSession){

            showOverlay();

        }

        else{

            updateReopenVisibility();

        }

    }



    /* =========================================================
       INIT
    ========================================================= */

    function init(){

        overlay = createOverlay();

        reopenButton = createReopenButton();


        document.getElementById("rotateDismissBtn")
            .addEventListener("click", function(){

                hideOverlay(true);

            });


        document.getElementById("rotateContinueBtn")
            .addEventListener("click", function(){

                hideOverlay(true);

            });


        reopenButton.addEventListener("click", function(){

            overlay.classList.add("show");

            reopenButton.classList.remove("show");

        });


        window.addEventListener("resize", handleViewportChange);

        window.addEventListener("orientationchange", handleViewportChange);


        if(!dismissedThisSession && isNarrowPortrait()){

            /* small delay so it doesn't fight with the page's
               own load animations */

            setTimeout(showOverlay, 400);

        }

        else{

            updateReopenVisibility();

        }

    }


    if(document.readyState === "loading"){

        document.addEventListener("DOMContentLoaded", init);

    }

    else{

        init();

    }

})();