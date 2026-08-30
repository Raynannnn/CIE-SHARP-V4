function showInfo(feature){

    var title = document.getElementById("infoTitle");

    var text = document.getElementById("infoText");

    var box = document.getElementById("featureBox");


    if(feature == "progressive"){

        title.innerHTML = "Progressive Syntax Challenges";

        text.innerHTML =
        "CIE-Sharp provides progressive C# syntax challenges that begin with Beginner-level activities and gradually increase toward Basic, Intermediate, and Advanced levels. Activities are unlocked progressively to support gradual practice.";

    }


    else if(feature == "guided"){

        title.innerHTML = "Guided Problem-Solving";

        text.innerHTML =
        "CIE-Sharp guides learners through the Understand, Plan, Code, and Test steps. Activities include worked examples, fill-in-the-blank code, partial code, and solve-from-scratch activities.";

    }


    else if(feature == "gamification"){

        title.innerHTML = "Interactive Learning & Gamification";

        text.innerHTML =
        "CIE-Sharp uses interactive microgames such as Arrange the Syntax, Complete the Code, Find the Error, Fix the Code, and Choose the Correct Fix. Points and levels are used to support engaging practice.";

    }


    else if(feature == "progress"){

        title.innerHTML = "Progress Tracking & Self-Learning";

        text.innerHTML =
        "Learners can monitor completed challenges, scores, remaining activities, and their overall progress. Activities can also be retried or replayed for additional practice.";

    }


    else if(feature == "feedback"){

        title.innerHTML = "Immediate Feedback & Error Support";

        text.innerHTML =
        "CIE-Sharp provides immediate feedback through simple error explanations, hints, error categorization, correction attempts, and retry options.";

    }


    box.style.display = "flex";

}




function closeInfo(){

    document.getElementById("featureBox").style.display = "none";

}



/* RESEARCHERS */
function showResearchers(){

    document.getElementById("researcherBox").style.display = "flex";

}

/* CLOSE RESEARCHERS */
function closeResearchers(){

    document.getElementById("researcherBox").style.display = "none";

}

var currentResearcher = 0;

var researchers = document.querySelectorAll(".researcher-slide");


function showResearcher(index){

    researchers.forEach(function(slide){
        slide.classList.remove("active");
    });

    researchers[index].classList.add("active");

    document.getElementById("researcherNumber").innerHTML =
        (index + 1) + " / " + researchers.length;
}



/*RESEARCHER DATA*/

var currentResearcher = 0;

var researchers = [

    {
        name: "Marciales, Raynan A.",
        role: "Main Developer",
        image: "images/marciales.jpg",
        description:
        "Responsible for the development and implementation of the CIE-Sharp web-based microgame learning material."
    },

    {
        name: "Inquig, Precious Gold B.",
        role: "Research Leader",
        image: "images/inquig.jpg",
        description:
        "Serves as the research leader who helps coordinate the research activities and development of the CIE-Sharp instructional material."
    },

    {
        name: "Domingo, Noe D.",
        role: "Researcher & Developer",
        image: "images/domingo.jpg",
        description:
        "Contributed to the research and development activities of the CIE-Sharp learning material."
    },

    {
        name: "Gidayawan, Joses D.",
        role: "Researcher & Developer",
        image: "images/gidayawan.jpg",
        description:
        "Contributed to the research and development activities of the CIE-Sharp learning material."
    },

    {
        name: "Sorinio, Bea A.",
        role: "Researcher & Developer",
        image: "images/sorinio.jpg",
        description:
        "Contributed to the research and development activities of the CIE-Sharp learning material."
    }

];


/* =========================
   OPEN RESEARCHER BOX
========================= */

function showResearchers(){

    currentResearcher = 0;

    document.getElementById("researcherBox").style.display = "flex";

    document.querySelector(".researcher-profile").style.display = "flex";

    document.querySelector(".researcher-navigation").style.display = "flex";

    document.querySelector(".researcher-school").style.display = "block";

    document.getElementById("researchTeamSummary").style.display = "none";

    showResearcher();

}


/* =========================
   SHOW RESEARCHER
========================= */

function showResearcher(){

    var researcher = researchers[currentResearcher];

    document.getElementById("researcherName").innerHTML =
        researcher.name;

    document.getElementById("researcherRole").innerHTML =
        researcher.role;

    document.getElementById("researcherDescription").innerHTML =
        researcher.description;

    document.getElementById("researcherImage").src =
        researcher.image;


    /* COUNTER */

    document.getElementById("researcherNumberBottom").innerHTML =
        (currentResearcher + 1) + " / " + researchers.length;


    /* PREVIOUS BUTTON */

    document.getElementById("prevResearcher").disabled =
        currentResearcher === 0;


    /* NEXT BUTTON */

    if(currentResearcher === researchers.length - 1){

        document.getElementById("nextResearcher").innerHTML =
            "View Research Team →";

    }

    else{

        document.getElementById("nextResearcher").innerHTML =
            "Next →";

    }

}


/* =========================
   NEXT RESEARCHER
========================= */

function nextResearcher(){

    if(currentResearcher < researchers.length - 1){

        currentResearcher++;

        showResearcher();

    }

    else{

        showResearchTeam();

    }

}


/* =========================
   PREVIOUS RESEARCHER
========================= */

function previousResearcher(){

    if(currentResearcher > 0){

        currentResearcher--;

        showResearcher();

    }

}


/* =========================
   SHOW FINAL SUMMARY
========================= */

function showResearchTeam(){

    document.querySelector(".researcher-profile").style.display =
        "none";

    document.querySelector(".researcher-navigation").style.display =
        "none";

    document.querySelector(".researcher-school").style.display =
        "none";

    document.getElementById("researchTeamSummary").style.display =
        "block";

}


/* =========================
   CLOSE RESEARCHER BOX
========================= */

function closeResearchers(){

    document.getElementById("researcherBox").style.display =
        "none";

}





