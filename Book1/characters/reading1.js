/* =========================================================
   BOOK I — STUDY SCROLL
   This page runs BEFORE character selection now, so there
   is no saved witch to load yet. It only needs to send the
   player forward to character.html once they're done
   reading.
========================================================= */

var chooseWitchButton =
    document.getElementById("chooseWitchButton");


if(chooseWitchButton){

    chooseWitchButton.addEventListener(
        "click",
        function(){

            window.location.href =
                "character.html";

        }
    );

}