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
        // For Settings, Login
        for (let idx = 0; idx < modal.length; idx++) {
            if (event.target == modal[idx]) {
                modal[idx].style.display = "none";
            }            
        }

        // For Nav Panel    
        if(event.target.id != "navPanel" && event.target.id != "navPanelToggle" && event.target.nodeName != "NAV") {
            document.querySelector('body').classList.remove('is-navPanel-visible');
        }
    }
}

function changeTheme() {
	currentTheme = localStorage.getItem("quantmlTheme");
	if(currentTheme == "light"){
		// console.log("Light2Dark");
		changeThemeCSS("dark")
		loadCorrectThemeImages("dark")
		localStorage.setItem("quantmlTheme", "dark");
	}
	else if (currentTheme == "dark"){
		// console.log("Dark2Light");
		changeThemeCSS("light")
		loadCorrectThemeImages("light")
		localStorage.setItem("quantmlTheme", "light");
	}
}

function loadCorrectThemeImages(currentTheme){
	images = document.querySelectorAll('img')
	if(currentTheme == "light" && document.getElementById('quantml-cover').src.indexOf("/img-dark/")!=-1){
		for (let index = 0; index < images.length; index++) {
			// console.log(images[index].src,"->", images[index].src.replace("/img-dark/","/img/"))
			if(images[index].id!="pre-loading"){images[index].src = images[index].src.replace("/img-dark/","/img/")}
		}
	} else if(currentTheme == "dark"){
		for (let index = 0; index < images.length; index++) {
			// console.log(images[index].src,"->", images[index].src.replace("/img/","/img-dark/"))
			if(images[index].id!="pre-loading"){images[index].src = images[index].src.replace("/img/","/img-dark/")}
		}
	}	
}

function isInputRequires(){
	loginModal = document.getElementById('login-model')
	if(typeof(loginModal) !="undefined" && loginModal.style.display=="block"){
		return true
	} else {
		return false
	}
}
function loadScript(path, fonload){
    script = document.createElement('script');
    script.src = path;
    if(typeof(fonload)!="undefined"){script.onload = fonload}
    document.body.appendChild(script);
}

function loadCSS(path, fonload, where="head"){
	link = document.createElement('link');
	link.rel="stylesheet"
	link.href = path
	if(typeof(fonload)!="undefined"){link.onload = fonload}
	if(where=="head"){ document.head.appendChild(link); } else {document.body.appendChild(link)}
}

// function katexLoaded(){
//     console.log("Katex Loaded")
// }

function loadKatex(){
    // console.log(typeof(katex))
    if(!localStorage.hasOwnProperty('katex')){
        console.log("katex not cached")
        document.getElementById('pre-initializing').style.display="block";
    } else {
        console.log("katex cached")
    }
    loadCSS('/data/assets/css/katex.min.css')
    loadScript('/data/assets/js/store.js', fonload=()=>{
        requireScript('katex','/data/assets/js/katex.min.js', ()=>{
            requireScript('auto-render','/data/assets/js/auto-render.min.js', ()=>{
                renderMathInElement(document.body);
                document.getElementById('wrapper').style.display="block";
                document.getElementById('pre-initializing').style.display="none";
            })
        })
    })
}

function loadMATHJAX(){
    window.MathJax = {
        tex: {
            inlineMath: [['$', '$'], ['\\(', '\\)']]
        },
        svg: {
            fontCache: 'global'
        }
    };
      
    (function () {
        var script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
        script.async = true;
        script.onload = ()=>{console.log("Mathjax Loaded")}
        document.head.appendChild(script);
    })();
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
    // loadKatex()
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