function prevPageBtn(){
	window.location.href = prevPage;
}

function nextPageBtn(){
	window.location.href = nextPage;
}

// ***************************************************************
// Font Settings
// ***************************************************************

function getFontSize(){
	return parseInt(localStorage.getItem('paragraph-font-size'));
}

function incrementFontSize(){
	localStorage.setItem('paragraph-font-size', getFontSize() + 1);
}

function decrementFontSize(){
	localStorage.setItem('paragraph-font-size', getFontSize() - 1)
}

function resetFontSize(){
	if(screen.width < 500){
		localStorage.setItem('paragraph-font-size', "14");
	} else {
		localStorage.setItem('paragraph-font-size', "16");
	}
}

function setFontSize(){
	document.getElementById('paragraph-content').style.fontSize = localStorage.getItem('paragraph-font-size') + "px";
}


// ***************************************************************
// Functions
// ***************************************************************

function showSettings(){
	setDisplay('settings-model', 'block');
	document.querySelector('body').classList.remove('is-navPanel-visible');
}


function setDisplay(ID, disp){
	elements = document.querySelectorAll('#'+ID)
	elements.forEach(function(element,index){
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
				setDisplay()
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
	homeStylesheet = document.getElementById('home-stylesheet')
	if(currentTheme == "light"){
		// console.log("Light2Dark");
		changeThemeCSS("dark")
		loadCorrectThemeImages("dark")
		localStorage.setItem("quantmlTheme", "dark");
		if(homeStylesheet != null) homeStylesheet.href = "/style-dark.css"
	}
	else if (currentTheme == "dark"){
		// console.log("Dark2Light");
		changeThemeCSS("light")
		loadCorrectThemeImages("light")
		localStorage.setItem("quantmlTheme", "light");
		if(homeStylesheet != null) homeStylesheet.href = "/style-light.css"
	}
}

function loadCorrectThemeImages(currentTheme){
	images = document.querySelectorAll('img')
	if(currentTheme == "light"){
		for (let index = 0; index < images.length; index++) {
			// console.log(images[index].src,"->", images[index].src.replace("/img-dark/","/img/"))
			if(images[index].src.search("/img-dark/")!=-1) images[index].src = images[index].src.replace("/img-dark/","/img/");
		}
	} else if(currentTheme == "dark"){
		for (let index = 0; index < images.length; index++) {
			// console.log(images[index].src,"->", images[index].src.replace("/img/","/img-dark/"))
			if(images[index].src.search("/img/")!=-1) images[index].src = images[index].src.replace("/img/","/img-dark/");
		}
	}
}

function isInputRequires(){
	loginModal = document.getElementById('login-model')
	models = [document.getElementById('login-model'),
			  document.getElementById('password-model'),
			  document.getElementById('create-password-model')
	]
	for (let index = 0; index < models.length; index++) {
		element = models[index];
		if(typeof(element) !="undefined" && element.style.display=="block"){
			return true
		}
	}
	return false

}

function katexLoaded(){
	setDisplay('pre-loading', 'none')
	setDisplay('pre-initializing', 'none')
	loadCorrectThemeImages(localStorage.getItem("quantmlTheme"));
	if(localStorage.getItem('paragraph-font-size') == null) resetFontSize();
	setFontSize()
	setDisplay('paragraph-content', 'block')
}

function loadKatex(){
	theme = localStorage.getItem("quantmlTheme")
	if(!localStorage.hasOwnProperty('katex')){
		setDisplay('pre-loading', 'none')
		setDisplay('pre-initializing', 'block')
	}
	requireScript('katex-css', '0.6.0', '/data/assets/css/katex.min.css', function(){})
	requireScript('katex-js', '0.6.0','/data/assets/js/katex.min.js', function(){
		requireScript('auto-render-js', '0.6.0','/data/assets/js/auto-render.min.js', function(){
			renderMathInElement(document.body);
			katexLoaded()
		})
	})
}

function isClassNamePresent(node, className){
	while(node.localName!="body"){
		// console.log(node)
		var isClassPresent = false
		className.forEach(function(element, index){
			if(node.classList.contains(element)){
				// console.log(node.classList, "CONTAINS", element)
				isClassPresent = true
				return
			}
		})
		if(isClassPresent) return true;
		node = node.parentElement
	}
	return false

}

function createImageModals(){
	document.addEventListener('click',function(e){
		// console.log(e.target)
		if(e.target.id=="image-modal"){
			setDisplay('image-modal', 'none')
		}
	})
	document.addEventListener("keydown", function(evt) {
		if(evt.code == "Escape") {
			setDisplay('image-modal', 'none')
		}
	})
	document.querySelectorAll('.full-size-img').forEach(function(element,index){
		element.addEventListener('click', function(e) {
			div = document.createElement('div')
			div.id = 'image-modal'
			div.setAttribute('class', 'modal')
			div.innerHTML = `
			<div class="image-content animate" style="width:${element.width}px; height:${element.height}px;">
				<!--<a class="close" style="float: right; padding-top: 0%; padding-bottom: 0%;" onclick="setDisplay('image-modal', 'none')">X</a>-->
				<img class="full-size-img" src="${element.src}" alt="">
			</div>`
			div.style.display="block"
			document.getElementById("paragraph-content").appendChild(div);
			// something forgot--- leave it
		});
	});
}

function paginationButton(){
	btnContainer = document.querySelectorAll('#btn-container')
	if(typeof(nextPage) !="undefined" && typeof(prevPage) !="undefined" ){
		btnContainer.forEach(function(element, index){
			element.innerHTML=`
			<a href="${prevPage}"><button id="prev-btn" class="button">&#x25C0;&nbsp;&nbsp; ${prevPageTitle}</button></a>
			<a href="${nextPage}"><button id="next-btn" class="button"  style="float: right;">${nextPageTitle}&nbsp;&nbsp;&#x25B6;</button></a>
			`
		})
	}
	btnContainer = document.querySelectorAll('#btn-container-top')
	if(typeof(nextPage) !="undefined" && typeof(prevPage) !="undefined" ){
		btnContainer.forEach(function(element, index){
			element.innerHTML=`
			<a href="${prevPage}"><button id="prev-btn" class="button">&#x25C0;&nbsp;&nbsp; ${prevPageTitle}</button></a>
			<a href="${nextPage}"><button id="next-btn" class="button"  style="float: right;">${nextPageTitle}&nbsp;&nbsp;&#x25B6;</button></a>
			`
		})
	}
}

function fullyLoaded(){
	paginationButton()
	createImageModals()
	// Set Next-Prev btn width
	prev = document.querySelectorAll('#prev-btn')
	next = document.querySelectorAll('#next-btn')
	// console.log(prev)
	if(prev.length!=0){
		btnWidth = document.getElementById('btn-container').offsetWidth
		// console.log(prev[0].offsetWidth , next[0].offsetWidth , btnWidth)
		if(prev[0].offsetWidth + next[0].offsetWidth > btnWidth) {
			prev[0].style.display="block";
			// prev[1].style.display="block";
			next[0].style.display="block";
			// next[1].style.display="block";
			prev[0].style.width="100%";
			// prev[1].style.width="100%";
			next[0].style.width="100%";
			// next[1].style.width="100%";
			next[0].style.marginTop="5px"
			// next[1].style.marginTop="5px"
		}
	}

	// Show Content acc. to Device
	let check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	window.notDesktop = check

	document.getElementById('modals-html').innerHTML =`
	<!--=================== MODELS ===================-->

	<!--=============== password-check MODEL[START] ===============-->
	<div id="password-model" class="modal">
		<form class="modal-content animate" id="password-form">

			<a class="close" style="float: right; padding-top: 0%; padding-bottom: 0%;" onclick="setDisplay('password-check', 'none')">X</a>
			<div class="container" style="margin: 1rem; margin-bottom: -1rem">

			<label for="psw"><b>Password</b></label>
			<input id="password" onkeypress="passwordIsValidated();setDisplay('network-request-failed', 'none');" class="loginInput" type="password" placeholder="Enter Password" name="psw" required>
			<div style="display:none" id="password-error-msg" class="error-msg">
				<img style="float: left;" src="/data/auth/error.png" alt="!" width="50px" height="50px">
				<div style="-webkit-transform: translateY(.6rem); transform: translateY(.6rem);">Incorrect Password</div>
			</div>

			<div style="display: none;" id="network-request-failed" class="error-msg">
				<img style="float: left;" src="/data/auth/error.png" alt="!" width="50px" height="50px">
				<div style="-webkit-transform: translateY(.6rem); transform: translateY(.6rem);">Internet Connection Error</div>
			</div>

			<button class="form-buttons login-button" type="submit">
				<span id="password-button-text">Login &nbsp; &rarr;</span>
			</button>

			<button id="forgot-password" class="form-buttons forgot-button">
			<span id="forgot-button-text">Forgot Password &nbsp; &rarr;</span>
			</button>

			</div>
			<br>
		</form>
		</div>
	<!--=============== password-check MODEL[END] ===============-->


	<!--=============== LOGIN MODEL[START] ===============-->
	<div id="login-model" class="modal">
		<form class="modal-content animate" id="email-form">

			<a class="close" style="float: right; padding-top: 0%; padding-bottom: 0%;" onclick="setDisplay('login-model', 'none')">X</a>
			<div class="container" style="margin: 1rem; margin-bottom: -1rem">
			<label for="email"><b>Email Address</b>(<a rel="noreferrer" target="_blank" href="https://www.patreon.com/quantml">patreon</a>)</label>
			<input id="login-email" onkeypress="emailAddressIsValidated();setDisplay('network-request-failed', 'none');" class="loginInput" ref="emailRef"  type="email" placeholder="Enter Email Address" name="email" required>
			<div id="login-error-msg" class="error-msg">
				<img style="float: left;" src="/data/auth/error.png" alt="!" width="50px" height="50px">
				<div style="-webkit-transform: translateY(.6rem); transform: translateY(.6rem);">Invalid Email Address</div>
			</div>
			<div id="login-email-user-not-found" class="warn-msg"></div>

			<div style="display: none;" id="network-request-failed" class="error-msg">
				<img style="float: left;" src="/data/auth/error.png" alt="!" width="50px" height="50px">
				<div style="-webkit-transform: translateY(.6rem); transform: translateY(.6rem);">Internet Connection Error</div>
			</div>

			<button class="form-buttons login-button" type="submit">
				<span id="login-button-text">Next &nbsp; &rarr;</span>
			</button>
			</div>
			<br>
		</form>
		</div>
	<!--=============== LOGIN MODEL[END] ===============-->

	<!--=============== Create Password MODEL[START] ===============-->
	<div id="create-password-model" class="modal">
		<form class="modal-content animate" id="create-password">

			<a class="close" style="float: right; padding-top: 0%; padding-bottom: 0%;" onclick="setDisplay('create-password-model', 'none')">X</a>
			<div class="container" style="margin: 1rem; margin-bottom: -1rem">
			<label for="psw"><b>New Password</b></label>
			<input id="new-password" onkeypress="passwordIsValidated();setDisplay('network-request-failed', 'none');" class="loginInput" type="password" placeholder="Enter Password" name="psw" required>
			<label for="psw"><b>Password</b></label>
			<input id="confirm-password" onkeypress="passwordIsValidated();setDisplay('network-request-failed', 'none');" class="loginInput" type="password" placeholder="Confirm Password" name="psw" required>
			<div style="display: none" id="password-do-not-match" class="error-msg">
				<img style="float: left;" src="/data/auth/error.png" alt="!" width="50px" height="50px">
				<div style="-webkit-transform: translateY(.6rem); transform: translateY(.6rem);">Password does not match</div>
			</div>
			<div style="display: none" id="password-is-weak" class="error-msg">
				<img style="float: left;" src="/data/auth/error.png" alt="!" width="50px" height="50px">
				<div style="-webkit-transform: translateY(.6rem); transform: translateY(.6rem);">Weak Password, password should be at least 8 character long</div>
			</div>
			<div style="display: none;" id="network-request-failed" class="error-msg">
				<img style="float: left;" src="/data/auth/error.png" alt="!" width="50px" height="50px">
				<div style="-webkit-transform: translateY(.6rem); transform: translateY(.6rem);">Internet Connection Error</div>
			</div>

			<button class="form-buttons login-button" type="submit">
				<span id="create-password-text">Create Password &nbsp; &rarr;</span>
			</button>
			</div>
			<br>
		</form>
		</div>
	<!--=============== Create Password MODEL[END] ===============-->

	<!--=============== Password Reset Link Sent MODEL[START] ===============-->

	<div id="password-reset-link-sent-model" class="modal">
		<div class="modal-content animate" id="login-form">
			<a class="close" style="float: right; padding-top: 0%; padding-bottom: 0%;" onclick="setDisplay('password-reset-link-sent-model', 'none')">X</a>
			<div class="container" style="margin: 1rem;">
	<span id='password-reset-link-sent-txt'></span>
			<button onclick="setDisplay('password-reset-link-sent-model', 'none')" class="form-buttons login-button">OK</button>
			</div>
		</div>
	</div>

	<!--=============== Password Reset Link Sent MODEL[END] ===============-->

	<!--=============== SETTINGS[START] ===============-->

	<div id="settings-model" class="modal">
		<div class="modal-content animate">
			<a class="close" style="float: right; padding-top: 0%; padding-bottom: 0%;" onclick="setDisplay('settings-model', 'none')">X</a>
			<div class="container settings" style="margin: 1rem;">
				<!--<h2 style="text-align: center; display:block">Settings</h2>-->
				<b>Font size</b> &nbsp;
				<button class="button" onclick="incrementFontSize();setFontSize()">+</button>
				<button class="button" onclick="decrementFontSize();setFontSize()">-</button>
				<button class="button" onclick="resetFontSize();setFontSize()">Reset</button>
				<br>
				<!--<h2 style="text-align: center; display:block">Navigation</h2>-->
				<!--<span class="bb">Navigation</span>-->
				<div id="desktop-mode">
					<b>Page size</b>
					<button class="button" onclick="changePageWidth('small')">Small</button>
					<button class="button" onclick="changePageWidth('medium')">Medium</button>
					<button class="button" onclick="changePageWidth('large')">Large</button>
				</div>
				<hr>
				<div id="desktop-mode">
					Press <span class="bb">D</span> to change theme. <br>
					Press <span class="bb">&larr;</span> to go to previous page. <br>
					Press <span class="bb">&rarr;</span> to go to next page. <br>
					Press <span class="bb">+</span> to increase font size. <br>
					Press <span class="bb">-</span> to decrease font size. <br>
				</div>
				<div id="mobile-mode">
					<span class="bb">Swipe Right</span> to go to previous page. <br>
					<span class="bb">Swipe Left </span> to go to next page. <br>
				</div>
			</div>
		</div>
	</div>

	<!--=============== SETTINGS[END] ===============-->
	`;

	var modal = [
			document.getElementById("password-model"),
			document.getElementById("login-model"),
			document.getElementById("create-password-model"),
			document.getElementById("password-reset-link-sent-model"),
			document.getElementById("settings-model"),
		];

	clearModelOnBackgroundClick(modal);

	// Menu Button Navbar
	document.getElementById('navPanelToggle').addEventListener('click',function(){
		document.querySelector('body').classList.add('is-navPanel-visible');
	})

	document.addEventListener('scroll', function(e) {
		// console.log("scroll List...", window.scrollY)
		if(window.scrollY > 150){
			// console.log("ALT")
			document.getElementById('navPanelToggle').classList.add('alt')
		} else {
			document.getElementById('navPanelToggle').classList.remove('alt')
		}
	});

	// Email Form
	email_form = document.querySelector('#email-form');
	email_form.addEventListener('submit', function(e) {
		e.preventDefault();
		auth_identify_email()
	});

	// Password Form
	password_form = document.querySelector('#password-form');
	password_form.addEventListener('submit', function(e) {
		e.preventDefault();
		auth_authenticate()
	});

	// Create Password
	cratePasswordForm = document.querySelector('#create-password');
	cratePasswordForm.addEventListener('submit', function(e) {
		e.preventDefault();
		auth_createPassword()
	});

	// Login Button
	loginButton = document.querySelectorAll('#login-button');
	loginButton.forEach(function(element,index){
			element.addEventListener('click', function(e) {
				// console.log("Login Button Clicked")
				e.preventDefault();
				document.querySelector('body').classList.remove('is-navPanel-visible');
				setDisplay('login-model', 'block')
			});
	})

	// LOGOUT
	logout = document.querySelectorAll('#logout-button');
	logout.forEach(function(element,index){
		element.addEventListener('click',function(e) {
			e.preventDefault();
			document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
			fetch('http://127.0.0.1:5000/logout', {
				method: 'POST', // *GET, POST, PUT, DELETE, etc.
				mode: 'cors', // no-cors, *cors, same-origin
				cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
				credentials: 'same-origin', // include, *same-origin, omit
				headers: {
				'Content-Type': 'application/json'
				},
				redirect: 'follow', // manual, *follow, error
				referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
				body: JSON.stringify({token: getCookie("token")}), // body data type must match "Content-Type" header
			})
		});
	});

	// Reset Password
	forgotPassword = document.querySelector('#forgot-password');
	forgotPassword.addEventListener('click',function(e) {
		e.preventDefault();
		auth_resetPassword(email_form)
	});

	setDisplay('login-error-msg', "none")

	window.keydowns = {"ctrl": false, "alt": false}

	document.addEventListener("keyup", function(evt) {
		// console.log(evt.code)
		// console.log("CTRL:",window.keydowns["ctrl"])
		if(isInputRequires()){
			// PASS
		} else if(evt.code == "KeyD"){
			changeTheme()
		} else if(evt.code == "NumpadSubtract" && window.keydowns["ctrl"] != true){
			decrementFontSize();setFontSize()
		} else if(evt.code == "NumpadAdd" && window.keydowns["ctrl"] != true){
			incrementFontSize();setFontSize()
		} else if(evt.code == "ControlLeft" || evt.code == "ControlRight"){
			window.keydowns["ctrl"] = false;
		} else if(evt.code == "AltLeft" || evt.code == "AltRight"){
			window.keydowns["alt"] = false;
		}
	})
	document.addEventListener("keydown", function(evt) {
		evt = evt || window.event;
		// console.log(evt)
		// console.log("DOWN", evt.code)
		if(evt.code == "Escape") {
			for (let idx = 0; idx < modal.length; idx++) {
				modal[idx].style.display = "none";
			}
		} else if(isInputRequires()){
			// PASS
		} else if(evt.code == "ControlLeft" || evt.code == "ControlRight"){
			window.keydowns["ctrl"] = true;
		} else if(evt.code == "AltLeft" || evt.code == "AltRight"){
			window.keydowns["alt"] = true;
		} else if(evt.code == "ArrowRight" && typeof(arrowRightPage) !="undefined" && window.keydowns["alt"] != true){
			window.location.href = arrowRightPage
		} else if(evt.code == "ArrowLeft" && typeof(arrowLeftPage) !="undefined" && window.keydowns["alt"] != true){
			window.location.href = arrowLeftPage
		}
	})

	document.addEventListener('swiped-left', function(e) {
		// console.log(e.target); // element that was swiped
		// console.log(e.detail); // event data { dir: 'left', xStart: 196, xEnd: 230, yStart: 196, yEnd: 4 }
		if(window.innerWidth - e.detail.xStart < 10) document.querySelector('body').classList.add('is-navPanel-visible');
		else if( !e.target.classList.contains("language-python") &&
			!e.target.classList.contains("language-julia") &&
			!e.target.classList.contains("token")  &&
			!isClassNamePresent(e.target, ["math-container", "modal", "code-toolbar"])  ){
				if(typeof(arrowRightPage) !="undefined") window.location.href = arrowRightPage;
				// console.log("GO LEFT")
			}
	});

	document.addEventListener('swiped-right', function(e) {
		// console.log(e.target); // element that was swiped
		// console.log(e.detail); // event data { dir: 'left', xStart: 196, xEnd: 230, yStart: 196, yEnd: 4 }
		if( !e.target.classList.contains("language-python") &&
			!e.target.classList.contains("language-julia") &&
			!e.target.classList.contains("token")  &&
			!isClassNamePresent(e.target,  ["math-container", "modal", "code-toolbar"]) ){
                if(typeof(arrowLeftPage) !="undefined") window.location.href = arrowLeftPage;
				// console.log("GO RIGHT")
			}
	});

	if(notDesktop) {
		setDisplay('desktop-mode', "none")
		setDisplay('mobile-mode', "block")
	} else {
		setDisplay('desktop-mode', "block")
		setDisplay('mobile-mode', "none")
	}

	emailAddressIsValidated()
	passwordIsValidated()
}

function cssLoaded(iskatexImportant = true, callback){
	// console.log("iskatexImportant:", iskatexImportant)
	// d = new Date();end = d.getTime();  // Remove it
	// console.log("CSS Load time:",end-start)  // Remove it
	loadKatex()
	fullyLoaded()
	if(callback) callback();
	// d = new Date();end = d.getTime();  // Remove it
	// console.log("Fully Loaded:",end-start)  // Remove it

}

// ***************************************************************
// AUTH Functions
// ***************************************************************

function networkRequestFailed(){
	setDisplay('login-error-msg', 'none');
	setDisplay('login-email-user-not-found', 'none');
	setDisplay('password-error-msg', 'none');
	setDisplay('network-request-failed', 'block');
}

function invalidEmailAddressError(){
	email = document.getElementById("login-email");
	email.style.border = "1px solid red";
	email.style.boxShadow = "1px 1px 10px red";
	email.classList.add("error-border-bounce");
	setTimeout(function() {
		email.classList.remove("error-border-bounce");
	}, 1000);
	setDisplay('login-error-msg', 'block');
	setDisplay('login-email-user-not-found', 'none');
	passwordIsValidated()
}

function invalidEmailAddressUserNotFound(email) {
	userNotFound = document.getElementById("login-email-user-not-found");
	userNotFound.style.display='block';
	loginEmail = document.getElementById("login-email");
	loginEmail.style.border = "1px solid orange";
	loginEmail.style.boxShadow = "1px 1px 10px orange";
	loginEmail.classList.add("error-border-bounce");
	setTimeout(function() {
		loginEmail.classList.remove("error-border-bounce");
	}, 1000);
	userNotFound.innerHTML = `<b>"${email}"</b> is currently not a <a rel="noreferrer" target="_blank" href="https://www.patreon.com/quantml">patreon supporter</a>.<br>
	<b><a href="https://www.patreon.com/quantml">Join us on patreon</a></b> and get early access to this <b>Guide</b> and <b>Statistics App</b>.`
	setDisplay('login-error-msg', 'none');
}

function emailAddressIsValidated(){
	email = document.getElementById("login-email");
	email.style.boxShadow = "none";
	email.style.border = "2px solid #0073b1";
	setDisplay('login-error-msg', 'none');
	setDisplay('login-email-user-not-found', 'none');
}

function invalidPassword(){
	password = document.querySelectorAll('[type="password"]');
	password.forEach(function(element, index) {
		element.style.border = "1px solid red";
		element.style.boxShadow = "1px 1px 10px red";
		element.classList.add("error-border-bounce");
		setTimeout(function() {
			element.classList.remove("error-border-bounce");
		}, 1000);
	})
	setDisplay('password-error-msg', 'block');
	emailAddressIsValidated()
}

function passwordIsValidated(){
	password = document.querySelectorAll('[type="password"]');
	password.forEach(function(element, index) {
		console.log(element)
		element.style.boxShadow = "none";
		element.style.border = "2px solid #0073b1";
	})
	setDisplay('password-error-msg', 'none');
}

function auth_identify_email(){
	setDisplay('network-request-failed', 'none');
	// if("auth/network-request-failed") {
	// 	networkRequestFailed();
	// 	return;
	// }
	email_form = document.getElementById('email-form')
	// Get User Info
	email = email_form['login-email'].value;
	nextButtonText = document.getElementById('login-button-text');
	if(localStorage.getItem("quantmlTheme")=="light"){
		var src = "/data/img/loading-login.svg";
	} else {
		var src = "/data/img-dark/loading-login.svg";
	}
	nextButtonText.innerHTML = 'Next &nbsp; <img style="-webkit-transform: translateY(.6rem); transform: translateY(.6rem);" src='+ src +' alt="..." width="30px" height="30px"/>'
	fetch('http://127.0.0.1:5000/identify-user', {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
		  'Content-Type': 'application/json'
		  // 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify({email: email}), // body data type must match "Content-Type" header
	  })
	  .then(function(response) {
		// console.log("RESPONSE:", response)
		nextButtonText.innerHTML = "Next &nbsp; &rarr;";
		// window.location.reload();
		response.json().then(function(data) {
			console.log(data);
			if(data["status"] == "Registered") {
				setDisplay('login-model', 'none');
				window.quantml_email = email
				setDisplay('password-model', 'block');
			} else if(data["status"] == "Unregistered") {
				invalidEmailAddressUserNotFound(email);
			} else if(data["status"] == "Invalid Password") {
				invalidPassword();
			} else if(data["status"] == "Create Password") {
				setDisplay('login-model', 'none');
				window.quantml_email = email
				setDisplay('create-password-model', 'block')
			}
		});
	  })
	  .catch(function(error) {
		nextButtonText.innerHTML = "Next &nbsp; &rarr;";
		// console.log("Fetch error: " + error);
	  });
}

function auth_authenticate(){
	setDisplay('network-request-failed', 'none');
	// if("auth/network-request-failed") {
	// 	networkRequestFailed();
	// 	return;
	// }
	email_form = document.getElementById('password-form')
	// Get User Info
	password = email_form['password'].value;
	loginButtonText = document.getElementById('password-button-text');
	if(localStorage.getItem("quantmlTheme")=="light"){
		var src = "/data/img/loading-login.svg";
	} else {
		var src = "/data/img-dark/loading-login.svg";
	}
	loginButtonText.innerHTML = 'Login &nbsp; &rarr; <img style="-webkit-transform: translateY(.6rem); transform: translateY(.6rem);" src='+ src +' alt="..." width="30px" height="30px"/>'
	fetch('http://127.0.0.1:5000/login', {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify({email: window.quantml_email, password: password}), // body data type must match "Content-Type" header
		})
		.then(function(response) {
		// console.log("RESPONSE:", response)
		loginButtonText.innerHTML = "Login";
		response.json().then(function(data) {
			console.log(data);
			// if(data["status"] == "auth/invalid-email") {
			// 	invalidEmailAddressError();
			// }
			if(data["status"] == "Authenticated") {
				document.cookie= `token=${data["token"]}`;
				setDisplay('password-model', 'none');
			} else if(data["status"] == "Unregistered") {
				// invalidEmailAddressUserNotFound(email);
			} else if(data["status"] == "Invalid Password") {
				invalidPassword();
			}
		});
		})
		.catch(function(error) {
		loginButtonText.innerHTML = "Login &nbsp; &rarr;";
		// console.log("Fetch error: " + error);
		});
}

function auth_createPassword(){
	loginForm = document.getElementById('create-password')
	// Get User Info
	newpass = loginForm['new-password'].value;
	confirmpass = loginForm['confirm-password'].value;
	buttonText = document.getElementById('create-password-text');
	if(localStorage.getItem("quantmlTheme")=="light"){
		var src = "/data/img/loading-login.svg";
	} else {
		var src = "/data/img-dark/loading-login.svg";
	}
	buttonText.innerHTML = 'Create Password &nbsp; <img style="-webkit-transform: translateY(.6rem); transform: translateY(.6rem);" src='+ src +' alt="..." width="30px" height="30px"/>'
	// console.log({email: window.quantml_email, new_password: newpass, confirm_password: confirmpass})
	fetch('http://127.0.0.1:5000/create-password', {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
		  'Content-Type': 'application/json'
		  // 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify({email: window.quantml_email, new_password: newpass, confirm_password: confirmpass}), // body data type must match "Content-Type" header
	  })
	  .then(function(response) {
		// console.log("RESPONSE:", response)
		buttonText.innerHTML = "Create Password &nbsp; &rarr;";
		response.json().then(function(data) {
			console.log(data);
			if(data["status"] == "Authenticated") {
				setDisplay('create-password-model', 'none')
				setDisplay('password-do-not-match', 'none')
				setDisplay('password-is-weak', 'none')
				document.cookie= `token=${data["token"]}`;
			} else if(data["status"] == "Dont match") {
				invalidPassword()
				setDisplay('password-do-not-match', 'block')
				setDisplay('password-is-weak', 'none')
			} else if(data["status"] == "Weak") {
				invalidPassword()
				setDisplay('password-do-not-match', 'none')
				setDisplay('password-is-weak', 'block')
			}
		});
	  })
	  .catch(function(error) {
		buttonText.innerHTML = "Create Password &nbsp; &rarr;";
		// console.log("Fetch error: " + error);
	  });
}

function loadContent(chapterID){
	var data = ""
	// retrieve data
	if(!localStorage.hasOwnProperty(chapterID)){
		globalThis.fb_db.collection('Statistics-Guide').doc(chapterID).get().then(function(snapshot) {
			// console.log("retreiving...")
			data = snapshot.data().Content;
			localStorage.setItem(chapterID, data);
			writeData(data);
			renderMathInElement(document.body);
		});
	}
	else {
		// console.log("Already retreved")
		data = localStorage.getItem(chapterID)
		writeData(data)
	}
}

function writeData(data){
	secrets = document.getElementById('secrets');
	secrets.innerHTML = data;
}

// Testing
// document.getElementById('login-model').style.display='block';
// document.getElementById('password-reset-link-sent-model').style.display='block';
// invalidEmailAddressUserNotFound("yuvraj@garg.com")
// invalidEmailAddressError()
// invalidPassword()