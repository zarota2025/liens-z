/* ======================================
   LIENS Z
   Main JavaScript
====================================== */

document.addEventListener("DOMContentLoaded", () => {

    initSideMenu();

    initSlider();

    initSearch();

    initCategories();

    initFavorites();

    initCart();

});
/* ======================================
   SIDE MENU
====================================== */

function initSideMenu(){

    const menuBtn = document.getElementById("menu-btn");

    const sideMenu = document.getElementById("side-menu");

    if(!menuBtn || !sideMenu) return;

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
/* ======================================
   SLIDER
====================================== */

function initSlider(){

    const slides=document.querySelectorAll(".slide");

    const dots=document.querySelectorAll(".dot");

    if(slides.length===0) return;

    let current=0;

    function showSlide(index){

        slides.forEach(slide=>slide.classList.remove("active"));

        dots.forEach(dot=>dot.classList.remove("active"));

        slides[index].classList.add("active");

        if(dots[index]){

            dots[index].classList.add("active");

        }

        current=index;

    }

    setInterval(()=>{

        current++;

        if(current>=slides.length){

            current=0;

        }

        showSlide(current);

    },4000);

                       }
