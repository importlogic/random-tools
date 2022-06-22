const stylesBootstrap = document.querySelector("#styles-bootstrap");
const stylesTheme = document.querySelector("#styles-theme");
const stylesCommon = document.querySelector("#styles-common");
const changeMode = document.querySelector("#changeMode");

var pathPrefix;

if(isMobile) pathPrefix = 'mobile';
else pathPrefix = 'desktop';

document.addEventListener("DOMContentLoaded", () => {
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
}

changeMode.addEventListener("click", setDisplay);

