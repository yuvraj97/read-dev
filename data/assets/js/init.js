function setDisplay(ID, disp){
    elements = document.querySelectorAll('#'+ID)
    elements.forEach((element,index)=>{
            element.style.display=disp;
    })
    if(elements.length == 0) { console.log(ID, "is missing!") }
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
        // console.log(event.target)
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


function fullyLoaded(){
    // Set Next-Prev btn width
	prev = document.querySelectorAll('#prev-btn')
	next = document.querySelectorAll('#next-btn')
	// console.log(prev)
	if(prev.length!=0){
		btnWidth = document.getElementById('btn-container').offsetWidth
		// console.log(prev[0].offsetWidth , next[0].offsetWidth , btnWidth)
		if(prev[0].offsetWidth + next[0].offsetWidth > btnWidth) {
			prev[0].style.display="block";
			prev[1].style.display="block";
			next[0].style.display="block";
			next[1].style.display="block";
			prev[0].style.width="100%";
			prev[1].style.width="100%";
			next[0].style.width="100%";
			next[1].style.width="100%";
			next[0].style.marginTop="5px"
			next[1].style.marginTop="5px"
		}
	}
}


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