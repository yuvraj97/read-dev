function setDisplay(ID, disp){
    element = document.getElementById(ID)
    if(element != null){
        element.style.display=disp;
    } else {
        console.log(ID, "is missing!")
    }
}

function getDisplay(){
    if(screen.width <= 980){
        return "block";
    } else {
        return "";
    }
}

function clearModelOnBackgroundClick(modal){
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        console.log(event.target)
        for (let idx = 0; idx < modal.length; idx++) {
            if (event.target == modal[idx]) {
                modal[idx].style.display = "none";
            }            
        }
        if(event.target.id != "navPanel" && event.target.id != "navPanelToggle" && event.target.nodeName != "NAV") {
            document.querySelector('body').classList.remove('is-navPanel-visible');
        }
    }
}

// Set Navbar Login-Logout-Join width
setTimeout(()=>{
      // if(screen.width <= 980){
        if(window.innerWidth <= 980){
            document.getElementById('login-btn-width').style.width="100%";
            document.getElementById('join-btn-width').style.width="100%";
            document.getElementById('logout-btn-width').style.width="100%";
        }      
}, 200)


var modal = [
    document.getElementById("login-model"),
    document.getElementById("password-reset-link-sent-model"),
    document.getElementById("settings-model")
]

clearModelOnBackgroundClick(modal)

// Close Navbar
document.getElementById('close-navbar').addEventListener('click',()=>{
    document.querySelector('body').classList.remove('is-navPanel-visible');
})

// Menu Button Navbar
document.getElementById('navPanelToggle').addEventListener('click',()=>{
    document.querySelector('body').classList.add('is-navPanel-visible');
})

document.addEventListener('scroll', (e) => {
    // console.log("scroll List...", window.scrollY)
    if(window.scrollY > 150){
        // console.log("ALT")
        document.getElementById('navPanelToggle').classList.add('alt')
    } else {
        document.getElementById('navPanelToggle').classList.remove('alt')
    }
});