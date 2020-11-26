function getFontSize(){
    return parseInt(localStorage.getItem('paragraph-font-size'))
}

function incrementFontSize(){
    localStorage.setItem('paragraph-font-size', parseInt(localStorage.getItem('paragraph-font-size')) + 1)
}

function decrementFontSize(){
    localStorage.setItem('paragraph-font-size', parseInt(localStorage.getItem('paragraph-font-size')) - 1)
}

function setFontSize(){
    document.getElementById('paragraph').style.fontSize = localStorage.getItem('paragraph-font-size') + "px"
}

function showSettings(){
    console.log("AAAA")
    document.getElementById('settings-model').style.display='block';
    document.querySelector('body').classList.remove('is-navPanel-visible');
}

if(localStorage.getItem('paragraph-font-size') == null){
    if(screen.width < 500){
        localStorage.setItem('paragraph-font-size', "14")
    } else {
        localStorage.setItem('paragraph-font-size', "16")
    }
}
setFontSize()