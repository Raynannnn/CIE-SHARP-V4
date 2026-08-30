var backToTop = document.getElementById("backToTop");


window.addEventListener("scroll", function(){

    if(window.scrollY > 300){

        backToTop.style.display = "block";

    }

    else{

        backToTop.style.display = "none";

    }

});


backToTop.addEventListener("click", function(){

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});