/* =========================
   ELEMENTS
========================= */

var certLockedScreen =
    document.getElementById("certLockedScreen");

var certNameScreen =
    document.getElementById("certNameScreen");

var certificateWrapper =
    document.getElementById("certificateWrapper");

var certNameInput =
    document.getElementById("certNameInput");

var certNameSubmit =
    document.getElementById("certNameSubmit");

var editNameButton =
    document.getElementById("editNameButton");

var printCertificateButton =
    document.getElementById("printCertificateButton");

/* =========================
   ELEMENTS (updated)
========================= */

var downloadPdfButton =
    document.getElementById("downloadPdfButton");

var printCertificateButton =
    document.getElementById("printCertificateButton");



/* =========================
   DOWNLOAD AS PDF
========================= */

downloadPdfButton.addEventListener(
    "click",
    function(){

        var certificateElement =
            document.querySelector(
                ".certificate-page"
            );


        if(!certificateElement){

            return;

        }


        var studentName =
            localStorage.getItem(
                "cieSharpStudentName"
            ) ||
            "Student";


        var fileName =
            "CIE-Sharp Certificate - " +
            studentName +
            ".pdf";


        downloadPdfButton.disabled =
            true;


        downloadPdfButton.textContent =
            "GENERATING PDF...";


        var options = {

            margin: 0.3,

            filename: fileName,

            image: {

                type: "jpeg",

                quality: 0.98

            },

            html2canvas: {

                scale: 2,

                useCORS: true,

                backgroundColor: "#fdfaf1"

            },

            jsPDF: {

                unit: "in",

                format: "letter",

                orientation: "landscape"

            }

        };


        html2pdf()
            .set(options)
            .from(certificateElement)
            .save()
            .then(function(){

                downloadPdfButton.disabled =
                    false;


                downloadPdfButton.textContent =
                    "DOWNLOAD AS PDF";

            })
            .catch(function(error){

                console.log(
                    "PDF generation failed:",
                    error
                );


                downloadPdfButton.disabled =
                    false;


                downloadPdfButton.textContent =
                    "DOWNLOAD AS PDF";


                alert(
                    "Something went wrong generating the PDF. Please try again."
                );

            });

    }
);



/* =========================
   PRINT BUTTON (kept as backup)
========================= */

printCertificateButton.addEventListener(
    "click",
    function(){

        window.print();

    }
);

/* =========================
   WITCH DATA (names only, for display)
========================= */

var witchNames = {

    GiTei: "Logic Witch (GiTei)",
    Achi: "Data Witch (Achi)",
    LeeSerin: "Codeweaver Witch (LeeSerin)",
    Cythera: "Ember Witch (Cythera)",
    Zari: "Logicraft Witch (Zari)"

};



/* =========================
   SUM ALL BOOK SCORES
========================= */

function getTotalStats(){

    var totalScore = 0;

    var totalEssence = 0;


    for(
        var i = 1;
        i <= 9;
        i++
    ){

        var bookScore =
            Number(
                localStorage.getItem(
                    "book" + i + "Score"
                )
            ) || 0;


        var bookEssence =
            Number(
                localStorage.getItem(
                    "book" + i + "Essence"
                )
            ) || 0;


        totalScore += bookScore;

        totalEssence += bookEssence;

    }


    return {

        score: totalScore,

        essence: totalEssence

    };

}



/* =========================
   RENDER CERTIFICATE
========================= */

function renderCertificate(){

    var name =
        localStorage.getItem(
            "cieSharpStudentName"
        );


    if(!name){

        showNameScreen();

        return;

    }


    document.getElementById(
        "certStudentName"
    ).textContent =
        name;


    var stats =
        getTotalStats();


    document.getElementById(
        "certTotalScore"
    ).textContent =
        stats.score;


    document.getElementById(
        "certTotalEssence"
    ).textContent =
        stats.essence;


    var selectedCharacter =
        localStorage.getItem(
            "cieSharpCharacter"
        );


    document.getElementById(
        "certWitchGuide"
    ).textContent =
        witchNames[selectedCharacter] ||
        "Logic Witch (GiTei)";


    document.getElementById(
        "certDate"
    ).textContent =
        localStorage.getItem(
            "cieSharpCompletionDate"
        ) ||
        new Date().toLocaleDateString();


    certNameScreen.classList.remove("show");

    certLockedScreen.classList.remove("show");

    certificateWrapper.classList.add("show");

}



/* =========================
   SHOW NAME ENTRY SCREEN
========================= */

function showNameScreen(){

    certificateWrapper.classList.remove("show");

    certLockedScreen.classList.remove("show");

    certNameScreen.classList.add("show");


    var existingName =
        localStorage.getItem(
            "cieSharpStudentName"
        );


    if(existingName){

        certNameInput.value =
            existingName;

    }


    certNameInput.focus();

}



/* =========================
   SUBMIT NAME
========================= */

certNameSubmit.addEventListener(
    "click",
    function(){

        var value =
            certNameInput.value.trim();


        if(value === ""){

            certNameInput.focus();

            return;

        }


        localStorage.setItem(
            "cieSharpStudentName",
            value
        );


        renderCertificate();

    }
);


certNameInput.addEventListener(
    "keydown",
    function(event){

        if(event.key === "Enter"){

            certNameSubmit.click();

        }

    }
);



/* =========================
   EDIT NAME BUTTON
========================= */

editNameButton.addEventListener(
    "click",
    function(){

        showNameScreen();

    }
);



/* =========================
   PRINT BUTTON
========================= */

printCertificateButton.addEventListener(
    "click",
    function(){

        window.print();

    }
);



/* =========================
   INITIALIZE
========================= */

function initCertificatePage(){

    var completed =
        localStorage.getItem(
            "book9Completed"
        ) === "true";


    if(!completed){

        certLockedScreen.classList.add(
            "show"
        );

        return;

    }


    renderCertificate();

}


initCertificatePage();