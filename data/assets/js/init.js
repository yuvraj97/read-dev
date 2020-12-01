// ***************************************************************
// Font Settings [START]
// ***************************************************************

    // PAGINATION [START]

    function prevPageBtn(){
        window.location.href = prevPage;
    }

    function nextPageBtn(){
        window.location.href = nextPage;
    }

    // PAGINATION [END]


    // Setting Font-Size [START]

    function getFontSize(){
        return parseInt(localStorage.getItem('paragraph-font-size'));
    }

    function incrementFontSize(){
        localStorage.setItem('paragraph-font-size', parseInt(localStorage.getItem('paragraph-font-size')) + 1);
    }

    function decrementFontSize(){
        localStorage.setItem('paragraph-font-size', parseInt(localStorage.getItem('paragraph-font-size')) - 1)
    }

    function resetFontSize(){
        if(screen.width < 500){
            localStorage.setItem('paragraph-font-size', "14");
        } else {
            localStorage.setItem('paragraph-font-size', "16");
        }
    }

    function setFontSize(){
        document.getElementById('paragraph').style.fontSize = localStorage.getItem('paragraph-font-size') + "px";
    }

    function showSettings(){
        document.getElementById('settings-model').style.display='block';
        document.querySelector('body').classList.remove('is-navPanel-visible');
    }

// ***************************************************************
// Font Settings [START]
// ***************************************************************


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

// ***************************************************************
// Load fn [START]
// ***************************************************************
function loadNavBar(){
    navBarIconsHead = document.getElementById('nav-bar-icons-head')
	navBarIconsFoot = document.getElementById('nav-bar-icons-foot')
	if(localStorage.getItem("quantmlTheme")=="light"){
		imgsrc = "/data/img/"
	} else {
		imgsrc = "/data/img-dark/"
	}
	navBarIconsFoot.innerHTML = navBarIconsHead.innerHTML = `<li><a rel="noreferrer" target="_blank" href="https://app.quantml.org/stats/"><img src="${imgsrc}app.png" alt="App"></a></li>
	<li><a rel="noreferrer" target="_blank" href="https://join.slack.com/t/quantml-org/shared_invite/zt-jffw86bo-6M260iyt1q2MgBma9elewg"><img class="whiteback" src="${imgsrc}slack.png" alt="Slack"></a></li>
	<li><a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/yuvraj97/"><img src="${imgsrc}linkedin.png" alt="LinkedIn"></a></li>
	<li><a rel="noreferrer" target="_blank" href="https://github.com/yuvraj97/"><img src="${imgsrc}github.png" alt="GitHub"></a></li>
	<li style="display: none;" id="fb-loading"><img class="fb-loading" src="${imgsrc}fb-loading.gif" alt="Loading..."></li>
	<li style="display: none;" id="login-button"><button id="login-btn-width" class="login-logout-join" >Login <img src="${imgsrc}patreon.png" alt="Patreon"></button></li>
	<li style="display: none;" id="join-button"><button onclick=" window.open('https://www.patreon.com/quantml','_blank','noopener')" id="join-btn-width" class="login-logout-join" >Join <img src="${imgsrc}patreon.png" alt="Patreon"></button></li>
	<li style="display: none;" id="logout-button"><button id="logout-btn-width" class="login-logout-join" >Logout <img src="${imgsrc}patreon.png" alt="Logout"></button></li>
	<li title="Change Theme"><a style="cursor: pointer;"><img id="change-theme" src="${imgsrc}change-theme.png" alt="Change Theme"></a></li>
	<li title="Settings" class="settings jump"><img onclick="showSettings()" src="${imgsrc}setings.png" alt="Settings" width="25px" height="25px"></li>
	`
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

function loadFirebase(){
    document.getElementById('fb-loading').style.display="";
    requireScript('fb-app', '8.0.1', '/data/assets/js/firebase-app.js', 
        ()=> {
            // console.log("firebase-app.js Loaded");
            requireScript('fb-auth', '8.0.1', '/data/assets/js/firebase-auth.js',
                ()=>{
                    // console.log("firebase-auth.js Loaded");
                    requireScript('fb-store', '8.0.1',"/data/assets/js/firebase-firestore.js",
                        ()=>{
                            // console.log("firebase-firestore Loaded");
                            // if(window.innerWidth <= 980){
                            //     document.getElementById('login-btn-width').style.width="100%";
                            //     document.getElementById('join-btn-width').style.width="100%";
                            //     document.getElementById('logout-btn-width').style.width="100%";
                            // }                              

                            // ============================== FIREBASE SETUP [START] ============================== //

                            // Your web app's Firebase configuration
                            var firebaseConfig = {
                                apiKey: "AIzaSyBdgsjeNlaEuDVWVMRXgPOfvm2HEnpRjMQ",
                                authDomain: "statistics-guide.firebaseapp.com",
                                databaseURL: "https://statistics-guide.firebaseio.com",
                                projectId: "statistics-guide",
                            };
                            // Initialize Firebase
                            firebase.initializeApp(firebaseConfig);

                            globalThis.fb_auth = firebase.auth();
                            globalThis.fb_db   = firebase.firestore();

                            globalThis.fb_db.settings({timestampsInSnapshots: true});

                            // Listen For Auth Status Change
                            globalThis.fb_auth.onAuthStateChanged(user=>{
                                if(user) {
                                    // console.log('Logged In :)');
                                    setDisplay('login-button','none');
                                    setDisplay('join-button','none');
                                    setDisplay('logout-button',getDisplay());
                                    setDisplay('secrets',getDisplay());
                                    setDisplay('login-require','none');
                                    setDisplay('fb-loading','none');
                                } else {
                                    // console.log('Logged Out!');
                                    setDisplay('login-button',getDisplay());
                                    setDisplay('join-button',getDisplay());
                                    setDisplay('logout-button','none');
                                    setDisplay('secrets','none');
                                    setDisplay('login-require',getDisplay());
                                    setDisplay('fb-loading','none');
                                }
                            });
                        }
                    )
                }
            )
        }
    )
}

function loadKatex(){
    // console.log(typeof(katex))
    loadNavBar()
    if(!localStorage.hasOwnProperty('katex')){
        document.getElementById('pre-initializing').style.display="block";
    }
    loadCSS('/data/assets/css/katex.min.css')
    loadScript('/data/assets/js/store.js', fonload=()=>{
        requireScript('katex', '0.6.0','/data/assets/js/katex.min.js', ()=>{
            requireScript('auto-render', '0.6.0','/data/assets/js/auto-render.min.js', ()=>{
                renderMathInElement(document.body);
                document.getElementById('wrapper').style.display="block";
                document.getElementById('pre-initializing').style.display="none";
                setTimeout(()=>{loadFirebase()}, 100)
                requireScript('auto-render', '0.1.0','/data/assets/js/index.js', ()=>{})
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
        // script.onload = ()=>{console.log("Mathjax Loaded")}
        document.head.appendChild(script);
    })();
}
// ***************************************************************
// Load fn [END]
// ***************************************************************

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