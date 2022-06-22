const stylesBootstrap = document.querySelector("#stylesBootstrap");
const stylesTheme = document.querySelector("#stylesTheme");
const stylesCommon = document.querySelector("#stylesCommon");
const changeMode = document.querySelector("#changeMode");

var pathPrefix;

if(isMobile) pathPrefix = 'mobile';
else pathPrefix = 'desktop';

document.addEventListener("DOMContentLoaded", () => {
    var darkMode = localStorage.getItem("darkMode");
    if(darkMode == undefined) darkMode = "false";
    changeMode.checked = (darkMode == "true");
    setDisplay();
    stylesCommon.setAttribute("href", `/css/${pathPrefix}/styles.css`)
});

function setDisplay(){
    if(changeMode.checked){
        stylesBootstrap.setAttribute("href", `/css/${pathPrefix}/bootstrap-dark.min.css`);
        stylesTheme.setAttribute("href", `/css/${pathPrefix}/styles-dark.css`);
    }
    else{
        stylesBootstrap.setAttribute("href", `/css/${pathPrefix}/bootstrap-light.min.css`);
        stylesTheme.setAttribute("href", `/css/${pathPrefix}/styles-light.css`);
    }
    localStorage.setItem("darkMode", changeMode.checked);
}

changeMode.addEventListener("click", setDisplay);

