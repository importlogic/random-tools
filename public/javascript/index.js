const stylesBootstrap = document.querySelector("#stylesBootstrap");
const stylesTheme = document.querySelector("#stylesTheme");
const stylesCommon = document.querySelector("#stylesCommon");
const changeMode = document.querySelector("#changeMode");

var pathPrefix;
if(isMobile) pathPrefix = 'mobile';
else pathPrefix = 'desktop';
var darkMode = localStorage.getItem("darkMode");
if(darkMode == undefined) darkMode = "false";
changeMode.checked = (darkMode == "true");
setDisplay();
stylesCommon.setAttribute("href", `/css/${pathPrefix}/styles.css`)

document.addEventListener("DOMContentLoaded", () => {
    setTimeout( () => {
        document.querySelector("html").classList.remove("preload");
    }, 1500);
    
    switch(title){
        case "Home":
            document.querySelector(".home-link").classList.add("active");
            break;
        case "About":
            document.querySelector(".about-link").classList.add("active");
            break;
        case "Contact":
            document.querySelector(".contact-link").classList.add("active");
            break;
        default:
            document.querySelector(".tools-link").classList.add("active");
            break;
    }
});

function setDisplay(){
    if(changeMode.checked){
        stylesBootstrap.setAttribute("href", `https://cdn.jsdelivr.net/gh/importlogic/jsdelivr@main/random-tools/public/css/bootstrap-dark.min.css`);
        stylesTheme.setAttribute("href", `/css/${pathPrefix}/styles-dark.css`);
    }
    else{
        stylesBootstrap.setAttribute("href", `https://cdn.jsdelivr.net/gh/importlogic/jsdelivr@main/random-tools/public/css/bootstrap-light.min.css`);
        stylesTheme.setAttribute("href", `/css/${pathPrefix}/styles-light.css`);
    }
    localStorage.setItem("darkMode", changeMode.checked);
}

changeMode.addEventListener("click", setDisplay);

