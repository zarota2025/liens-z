/* =====================================
   LIENS Z
   SCRIPT.JS
   PART 1
=====================================*/

/* ========= SIDE MENU ========= */

const menuBtn = document.getElementById("menu-btn");
const sideMenu = document.getElementById("side-menu");

if(menuBtn && sideMenu){

    menuBtn.addEventListener("click",()=>{

        sideMenu.classList.toggle("active");

    });

    document.addEventListener("click",(e)=>{

        if(
            !sideMenu.contains(e.target) &&
            !menuBtn.contains(e.target)
        ){
            sideMenu.classList.remove("active");
        }

    });

}

/* ========= SLIDER ========= */

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let currentSlide = 0;

function showSlide(index){

    slides.forEach(slide=>{
        slide.classList.remove("active");
    });

    dots.forEach(dot=>{
        dot.classList.remove("active");
    });

    slides[index].classList.add("active");
    dots[index].classList.add("active");

    currentSlide=index;

}

if(slides.length>0){

    setInterval(()=>{

        currentSlide++;

        if(currentSlide>=slides.length){

            currentSlide=0;

        }

        showSlide(currentSlide);

    },4000);

}

dots.forEach((dot,index)=>{

    dot.addEventListener("click",()=>{

        showSlide(index);

    });

});
