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
