const stylesBootstrap = document.querySelector("#stylesBootstrap");
const stylesTheme = document.querySelector("#stylesTheme");
const stylesCommon = document.querySelector("#stylesCommon");
const changeMode = document.querySelector("#changeMode");

var pathPrefix;

document.addEventListener("DOMContentLoaded", () => {
    if(isMobile) pathPrefix = 'mobile';
    else pathPrefix = 'desktop';
    var darkMode = localStorage.getItem("darkMode");
    if(darkMode == undefined) darkMode = "false";
    changeMode.checked = (darkMode == "true");
    setDisplay();
    stylesCommon.setAttribute("href", `/css/${pathPrefix}/styles.css`)
    setTimeout( () => {
        document.querySelector("html").classList.remove("preload");
    }, 1500);
});

function setDisplay(){
    if(changeMode.checked){
        stylesBootstrap.setAttribute("href", `https://cdn.jsdelivr.net/gh/importlogic/bootstrap-custom@master/flatly/bootstrap-dark.min.css`);
        stylesTheme.setAttribute("href", `/css/${pathPrefix}/styles-dark.css`);
    }
    else{
        stylesBootstrap.setAttribute("href", `https://cdn.jsdelivr.net/gh/importlogic/bootstrap-custom@master/flatly/bootstrap-light.min.css`);
        stylesTheme.setAttribute("href", `/css/${pathPrefix}/styles-light.css`);
    }
    localStorage.setItem("darkMode", changeMode.checked);
}

changeMode.addEventListener("click", setDisplay);

