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

function loadCSS(path, fonload){
	link = document.createElement('link');
	link.rel="stylesheet"
	link.href = path
	if(typeof(fonload)!="undefined"){script.onload = fonload}
	document.head.appendChild(link);
}

loadCorrectThemeImages(localStorage.getItem("quantmlTheme"));

// ***************************************************************
// Load Navbar icons
// ***************************************************************

setTimeout(() => {
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
	<li style="display: none;" id="login-button"><button id="login-btn-width" class="login-logout-join" >Login <img src="${imgsrc}patreon.png" alt="Patreon"></button></li>
	<li style="display: none;" id="join-button"><button onclick=" window.open('https://www.patreon.com/quantml','_blank','noopener')" id="join-btn-width" class="login-logout-join" >Join <img src="${imgsrc}patreon.png" alt="Patreon"></button></li>
	<li style="display: none;" id="logout-button"><button id="logout-btn-width" class="login-logout-join" >Logout <img src="${imgsrc}patreon.png" alt="Logout"></button></li>
	<li title="Change Theme"><a style="cursor: pointer;"><img id="change-theme" src="${imgsrc}change-theme.png" alt="Change Theme"></a></li>
	<li title="Settings" class="settings jump"><img onclick="showSettings()" src="${imgsrc}setings.png" alt="Settings" width="25px" height="25px">
	`
}, 50)

// ***************************************************************
// ***************************************************************
// Index
// ***************************************************************
// ***************************************************************
setTimeout(() => {

	// Show Content acc. to Device
	let check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	const notDesktop = check

	if(notDesktop) {
		document.querySelectorAll('#desktop-mode').forEach((element,index)=>{element.style.display="none"})
		document.querySelectorAll('#mobile-mode').forEach((element,index)=>{element.style.display="block"})
	} else {
		document.querySelectorAll('#desktop-mode').forEach((element,index)=>{element.style.display="block"})
		document.querySelectorAll('#mobile-mode').forEach((element,index)=>{element.style.display="none"})
	}
	
	// Change Theme Button
	changeThemeBtn = document.getElementById('change-theme');
	changeThemeBtn.addEventListener('click',(e) => {    
		e.preventDefault();
		changeTheme()
	});

}, 500)

// ***************************************************************
// ***************************************************************
// Font Settings
// ***************************************************************
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

setTimeout(()=>{
	if(localStorage.getItem('paragraph-font-size') == null){
		resetFontSize()
	}
	setFontSize()
}, 100);


// ***************************************************************
// ***************************************************************
// Add Modals HTML [800ms]
// ***************************************************************
// ***************************************************************

setTimeout(()=>{
document.getElementById('modals-html').innerHTML =`
<!--=================== MODELS ===================-->

<!--=============== LOGIN MODEL[START] ===============-->
<div id="login-model" class="modal">
    <form class="modal-content animate" id="login-form">
    
        <a class="close" style="float: right; padding-top: 0%; padding-bottom: 0%;" onclick="document.getElementById('login-model').style.display='none'">X</a>
        <div class="container" style="margin: 1rem; margin-bottom: -1rem">
        <label for="email"><b>Email Address</b></label>
        <input id="login-email" onkeypress="emailAddressIsValidated();setDisplay('network-request-failed', 'none');" class="loginInput" ref="emailRef"  type="email" placeholder="Enter Email Address" name="email" required>
        <div id="login-error-msg" class="error-msg">
            <img style="float: left;" src="/data/auth/error.png" alt="!" width="50px" height="50px">
            <div style="-webkit-transform: translateY(.6rem); transform: translateY(.6rem);">Invalid Email Address</div>
        </div>
        <div id="login-email-user-not-found" class="warn-msg"></div>
        <label for="psw"><b>Password</b></label>
        <input id="login-password" onkeypress="passwordIsValidated();setDisplay('network-request-failed', 'none');" class="loginInput" type="password" placeholder="Enter Password" name="psw" required>
        <div id="password-error-msg" class="error-msg">
            <img style="float: left;" src="/data/auth/error.png" alt="!" width="50px" height="50px">
            <div style="-webkit-transform: translateY(.6rem); transform: translateY(.6rem);">Incorrect Password</div>
        </div>

        <div style="display: none;" id="network-request-failed" class="error-msg">
            <img style="float: left;" src="/data/auth/error.png" alt="!" width="50px" height="50px">
            <div style="-webkit-transform: translateY(.6rem); transform: translateY(.6rem);">Internet Connection Error</div>
        </div>
            
        <button class="form-buttons login-button" type="submit">
            <span id="login-button-text">Login</span>
        </button>
        <button id="forgot-password" class="form-buttons forgot-button">
            <span id="forgot-button-text">Forgot Password</span>
        </button>
        </div>
        <br>
    </form>
    </div>
<!--=============== LOGIN MODEL[END] ===============-->

<!--=============== Password Reset Link Sent MODEL[START] ===============-->

<div id="password-reset-link-sent-model" class="modal">
    <div class="modal-content animate" id="login-form">    
        <a class="close" style="float: right; padding-top: 0%; padding-bottom: 0%;" onclick="document.getElementById('password-reset-link-sent-model').style.display='none'">X</a>
        <div class="container" style="margin: 1rem;">
<span id='password-reset-link-sent-txt'></span>
        <button onclick="document.getElementById('password-reset-link-sent-model').style.display='none'" class="form-buttons login-button">OK</button>
        </div>
    </div>
</div>
        
<!--=============== Password Reset Link Sent MODEL[END] ===============-->

<!--=============== SETTINGS[START] ===============-->

<div id="settings-model" class="modal">
    <div class="modal-content animate">
        <a class="close" style="float: right; padding-top: 0%; padding-bottom: 0%;" onclick="document.getElementById('settings-model').style.display='none'">X</a>
        <div class="container settings" style="margin: 1rem;">
            Font size &nbsp; 
            <button style="height: 30px;" class="button" onclick="incrementFontSize();setFontSize()">+</button> 
            <button style="height: 30px;" class="button" onclick="decrementFontSize();setFontSize()">-</button>
            <button style="height: 30px; font-weight: 400;" class="button" onclick="resetFontSize();setFontSize()">Reset</button>
            <DIV id="desktop-mode">
                <br><br>
                <hr>
                Press <span class="bb">D</span> to change theme. <br>
                Press <span class="bb">&larr;</span> to go to previous page. <br>
                Press <span class="bb">&rarr;</span> to go to next page. <br>
                Press <span class="bb">+</span> to increase font size. <br>
                Press <span class="bb">-</span> to decrease font size. <br>
            </DIV>
        </div>
    </div>
</div>
        
<!--=============== SETTINGS[END] ===============-->
`;
	var modal = [
		document.getElementById("login-model"),
		document.getElementById("password-reset-link-sent-model"),
		document.getElementById("settings-model")
	];

	clearModelOnBackgroundClick(modal);

	document.onkeydown = function(evt) {
		evt = evt || window.event;
		// console.log(evt.code, modal)
		if(evt.code == "Escape") {
			for (let idx = 0; idx < modal.length; idx++) {
				modal[idx].style.display = "none";
			}
		}
		if(isInputRequires()){
			// PASS
		} else if(evt.code == "KeyD"){
			changeTheme()
		} else if(evt.code == "ArrowRight" && typeof(arrowRightPage) !="undefined" ){
			window.location.href = arrowRightPage
		} else if(evt.code == "ArrowLeft" && typeof(arrowLeftPage) !="undefined" ){
			window.location.href = arrowLeftPage
		} else if(evt.code == "NumpadAdd"){
			incrementFontSize();setFontSize()
		} else if(evt.code == "NumpadSubtract"){
			decrementFontSize();setFontSize()
		}
	}

}, 500)

