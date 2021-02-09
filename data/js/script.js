if("chapterID" in quantml) requireScript('chapter-js', '0.1.0', '/data/js/chapter.js', function(){});


// Functions

async function encryptMessage(message) {
	msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
	hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
	hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
	hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
	return hashHex;
}
// const encrypted_msg = await encryptMessage("text");
// console.log(encrypted_msg);

function changePageWidth(size){
	if(size=="large"){
		document.getElementById('nav').style.maxWidth="100%"
		document.getElementById('main').style.maxWidth="100%"
		localStorage.setItem("page-width", "100%")
	} else if(size=="medium"){
		document.getElementById('nav').style.maxWidth="82rem"
		document.getElementById('main').style.maxWidth="82rem"
		localStorage.setItem("page-width", "82rem")
	} else if(size=="small"){
		document.getElementById('nav').style.maxWidth="72rem"
		document.getElementById('main').style.maxWidth="72rem"
		localStorage.setItem("page-width", "72rem")
	}

}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function get_loader_img_str(which = "login"){
	if(quantml["theme"]=="light"){
		var src = `/data/img/loading-${which}.svg`;
	} else {
		var src = `/data/img-dark/loading-${which}.svg`;
	}
	return `<img style="-webkit-transform: translateY(.6rem); transform: translateY(.6rem);" src="${src}" alt="..." width="30px" height="30px"/>`
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
	// if(elements.length == 0) { console.log(ID, "is missing!") }
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
	document.addEventListener('mousedown',function(event){
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
	})
}

function changeTheme() {
	currentTheme = quantml["theme"];
	if(currentTheme == "light"){
		// console.log("Light2Dark");
		changeThemeCSS("dark")
		loadCorrectThemeImages("dark")
		localStorage.setItem("quantmlTheme", "dark");
		quantml["theme"] = "dark";
	}
	else if (currentTheme == "dark"){
		// console.log("Dark2Light");
		changeThemeCSS("light")
		loadCorrectThemeImages("light")
		localStorage.setItem("quantmlTheme", "light");
		quantml["theme"] = "light";
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
	loginModal = document.getElementById('email-model')
	models = [document.getElementById('email-model'),
			  document.getElementById('password-model'),
			  document.getElementById('create-password-model'),
			  document.getElementById('otp-model')
	]
	for (let index = 0; index < models.length; index++) {
		element = models[index];
		if(typeof(element) !="undefined" && element.style.display=="block"){
			return true
		}
	}
	isactive = [
		document.getElementById('patreon-suggestion')
	]
	for (let index = 0; index < isactive.length; index++) {
		element = isactive[index];
		if(typeof(element) !="undefined" && document.activeElement===element){
			return true
		}
	}
	
	return false

}

function katexLoaded(){
	setDisplay('pre-loading', 'none')
	setDisplay('pre-initializing', 'none')
	loadCorrectThemeImages(quantml["theme"]);
	if(localStorage.getItem('paragraph-font-size') == null) resetFontSize();
	setFontSize()
	setDisplay('paragraph-content', 'block')
}

function isInViewport(element) {
	const rect = element.getBoundingClientRect();
	if(rect.top == 0 && rect.left == 0 && rect.bottom == 0 && rect.right == 0) return false;
    return (
        rect.top + 200 >= 0 &&
        rect.left + 60 >= 0 &&
        rect.bottom - 200 <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right - 60 <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function loadQuantmlKatexDisplay(){

	elements = document.querySelectorAll('.quantml-katex-display')
	quantml["katex"] = {
		"elements": [],
		"status": []
	}
	for (let index = 0; index < elements.length; index++) {
		quantml["katex"]["elements"].push(elements[index])
		quantml["katex"]["status"].push(false)
	}

	handler = function(){
		// console.log("Running handler")
		for (let index = 0; index < quantml["katex"]["elements"].length; index++) {
			if(quantml["katex"]["status"][index]==false && isInViewport(quantml["katex"]["elements"][index])){
				// console.log(quantml["katex"]["elements"][index])
				// console.log(quantml["katex"]["elements"][index].getBoundingClientRect())
				quantml["katex"]["status"][index] = true
				renderMathInElement(quantml["katex"]["elements"][index])
			}
		}
	}

	if (window.addEventListener) {
		addEventListener('DOMContentLoaded', handler, false);
		addEventListener('load', handler, false);
		addEventListener('scroll', handler, false);
		addEventListener('resize', handler, false);
	} else if (window.attachEvent)  {
		attachEvent('onDOMContentLoaded', handler); // Internet Explorer 9+ :(
		attachEvent('onload', handler);
		attachEvent('onscroll', handler);
		attachEvent('onresize', handler);
	}

	document.querySelectorAll('details').forEach(function(element, index_){
		element.addEventListener('click', function(){
			elements = element.querySelectorAll('.quantml-katex-display')
			// console.log(elements)
			for (let index = 0; index < elements.length; index++) {
				idx = quantml["katex"]["elements"].indexOf(elements[index])
				// console.log("idx", idx)
				// console.log("element", elements[index])

				if(idx != -1 && quantml["katex"]["status"][idx] == false){
					quantml["katex"]["status"][idx] = true
					renderMathInElement(elements[index])
				}
			}
		})
	});

}

function loadKatex(isKatexImportant, callback){
	theme = quantml["theme"]
	if(localStorage.hasOwnProperty('katex-js') == false && isKatexImportant == true){
		setDisplay('pre-loading', 'none')
		setDisplay('pre-initializing', 'block')
	}
	requireScript('katex-css', '0.6.0', '/data/katex/katex.min.css', function(){})
	requireScript('katex-js', '0.6.0','/data/katex/katex.min.js', function(){
		requireScript('auto-render-js', '0.6.0','/data/katex/auto-render.min.js', function(){
			loadQuantmlKatexDisplay();
			if(isKatexImportant) katexLoaded();
			if(callback) callback();
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
	if(btnContainer.length !=0 && btnContainer[0].innerHTML == '') {
		btnContainerHTML = ''
		if("prev" in  quantml["pagination"]) btnContainerHTML += `<a href="${quantml["pagination"]["prev"]["path"]}"><button id="prev-btn" class="button">&#x25C0;&nbsp;&nbsp; ${quantml["pagination"]["prev"]["title"]}</button></a>`;
		if("next" in  quantml["pagination"]) btnContainerHTML += `<a href="${quantml["pagination"]["next"]["path"]}"><button id="next-btn" class="button"  style="float: right;">${quantml["pagination"]["next"]["title"]}&nbsp;&nbsp;&#x25B6;</button></a>`;
		
		btnContainer.forEach(function(element, index){
			element.innerHTML=btnContainerHTML
		})

		btnContainer = document.querySelectorAll('#btn-container-top')
		if("next" in  quantml["pagination"] && "prev" in  quantml["pagination"]){
			btnContainer.forEach(function(element, index){
				element.innerHTML=`
				<a href="${quantml["pagination"]["prev"]["path"]}"><button id="prev-btn" class="button">&#x25C0;&nbsp;&nbsp; ${quantml["pagination"]["prev"]["title"]}</button></a>
				<a href="${quantml["pagination"]["next"]["path"]}"><button id="next-btn" class="button"  style="float: right;">${quantml["pagination"]["next"]["title"]}&nbsp;&nbsp;&#x25B6;</button></a>
				`
			})
		}
	}
}

function fullyLoaded(){
	paginationButton()
	createImageModals()
	
	// Set Next-Prev btn width
	btnContainer = document.querySelectorAll('#btn-container')
	if(btnContainer.length != 0) {
		const nextPrevBtnWidthInterval = setInterval(function(){
			btnContainer = document.querySelectorAll('#btn-container')
			// console.log(btnContainer)
			// console.log("nextPrevBtnWidthInterval", btnContainer[1].offsetWidth)
			if(btnContainer[1].offsetWidth != 0) {
				prev = document.querySelectorAll('#prev-btn')
				next = document.querySelectorAll('#next-btn')
				// console.log(prev)
				if(prev.length!=0 && next.length!=0){
					// console.log(prev[1].offsetWidth , next[1].offsetWidth , btnContainer[1].offsetWidth)
					if(prev[1].offsetWidth + next[1].offsetWidth > btnContainer[1].offsetWidth) {
						prev[0].style.display="block";
						next[0].style.display="block";
						prev[0].style.width="100%";
						next[0].style.width="100%";
						next[0].style.marginTop="5px"

						prev[1].style.display="block";
						next[1].style.display="block";
						prev[1].style.width="100%";
						next[1].style.width="100%";
						next[1].style.marginTop="5px"
						next[1].style.marginBottom="15px"
					}
				} else if(prev.length!=0) {
					if(prev[1].offsetWidth > btnContainer[1].offsetWidth * 0.75){
						prev[0].style.display="block";
						prev[0].style.width="100%";
						prev[1].style.display="block";
						prev[1].style.width="100%";
					}
				}
				clearInterval(nextPrevBtnWidthInterval)
			}
			// clearInterval(nextPrevBtnWidthInterval);	
		}, 50)
	}


	imgsrc = "img"
	if(quantml["theme"] == "dark") imgsrc = "img-dark";
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
				<img style="float: left;" src="/data/${imgsrc}/error.webp" alt="!" width="50px" height="50px">
				<div style="-webkit-transform: translateY(.6rem); transform: translateY(.6rem);">Incorrect Password</div>
			</div>

			<div style="display: none;" id="network-request-failed" class="error-msg">
				<img style="float: left;" src="/data/${imgsrc}/error.webp" alt="!" width="50px" height="50px">
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
	<div id="email-model" class="modal">
		<form class="modal-content animate" id="email-form">

			<a class="close" style="float: right; padding-top: 0%; padding-bottom: 0%;" onclick="setDisplay('email-model', 'none')">X</a>
			<div class="container" style="margin: 1rem; margin-bottom: -1rem">
			<label for="email"><b>Email Address</b>(<a rel="noreferrer" target="_blank" href="https://www.patreon.com/quantml">patreon</a>)</label>
			<input id="login-email" onkeypress="emailAddressIsValidated();setDisplay('network-request-failed', 'none');" class="loginInput" ref="emailRef"  type="email" placeholder="Enter Email Address" name="email" required>
			<div id="login-error-msg" class="error-msg">
				<img style="float: left;" src="/data/${imgsrc}/error.webp" alt="!" width="50px" height="50px">
				<div style="-webkit-transform: translateY(.6rem); transform: translateY(.6rem);">Invalid Email Address</div>
			</div>
			<div id="login-email-user-not-found" class="warn-msg"></div>

			<div style="display: none;" id="network-request-failed" class="error-msg">
				<img style="float: left;" src="/data/${imgsrc}/error.webp" alt="!" width="50px" height="50px">
				<div style="-webkit-transform: translateY(.6rem); transform: translateY(.6rem);">Internet Connection Error</div>
			</div>

			<button class="form-buttons login-button" type="submit">
				<span id="login-button-text">Next &nbsp; &rarr;</span>
			</button>

			<div style="display: none; margin-top: 10px" id="first-login-enter-email" class="success-msg">
			</div>

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
				<img style="float: left;" src="/data/${imgsrc}/error.webp" alt="!" width="50px" height="50px">
				<div style="-webkit-transform: translateY(.6rem); transform: translateY(.6rem);">Password does not match</div>
			</div>
			<div style="display: none" id="password-is-weak" class="error-msg">
				<img style="float: left;" src="/data/${imgsrc}/error.webp" alt="!" width="50px" height="50px">
				<div style="-webkit-transform: translateY(.6rem); transform: translateY(.6rem);">Weak Password, password should be at least 8 character long</div>
			</div>
			<div style="display: none;" id="network-request-failed" class="error-msg">
				<img style="float: left;" src="/data/${imgsrc}/error.webp" alt="!" width="50px" height="50px">
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

	<!--=============== OTP MODEL[START] ===============-->

	<div id="otp-model" class="modal">
		<form class="modal-content animate" id="otp-form">
			<a class="close" style="float: right; padding-top: 0%; padding-bottom: 0%;" onclick="setDisplay('otp-model', 'none')">X</a>
			<div class="container" style="margin: 1rem;">

			<div style="display: none;" id='first-login-otp-model' class="success-msg">
			</div>

			<span id='otp-email-sent-text'></span>
			<label for="otp"><b>OTP</b></label>
			<input id="otp" onkeypress="otpValidated();setDisplay('network-request-failed', 'none');" class="loginInput" placeholder="Enter OTP" name="otp" required>

			<div style="display: none;" id="invalid-otp" class="error-msg">
				<img style="float: left;" src="/data/${imgsrc}/error.webp" alt="!" width="50px" height="50px">
				<div style="-webkit-transform: translateY(.6rem); transform: translateY(.6rem);">Invalid OTP</div>
			</div>

			<button class="form-buttons login-button" type="submit">
				<span id="otp-btn-text">Verify &nbsp; &rarr;</span>
			</button>

			<button style="display: none;" class="form-buttons forgot-button" id="resend-otp">
				<span id="resend-otp-text">Resend OTP &nbsp; &rarr;</span>
			</button>

			</div>
		</form>
	</div>

	<!--=============== Forgot Password MODEL[END] ===============-->

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
			document.getElementById("email-model"),
			document.getElementById("create-password-model"),
			document.getElementById("settings-model"),
			document.getElementById('otp-model')
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

	// OTP Form
	otp_form = document.querySelector('#otp-form');
	otp_form.addEventListener('submit', function(e) {
		e.preventDefault();
		otp_success()
	})
	// Login Button
	loginButton = document.querySelectorAll('#login-button');
	loginButton.forEach(function(element,index){
			element.addEventListener('click', function(e) {
				// console.log("Login Button Clicked")
				e.preventDefault();
				open_email_model();
			});
	})

	btn = document.getElementById("resend-otp")
	btn.addEventListener('click',function(e) {
		e.preventDefault();
		otp_not_verified()
	});

	// LOGOUT
	logout = document.querySelectorAll('#logout-button');
	logout.forEach(function(element,index){
		element.addEventListener('click',function(e) {
			e.preventDefault();
			document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;SameSite=Lax";
			fetching({token: getCookie("token")}, "logout", 
				callbacks = {
					"then": function(){auth_state_change()},
					"catch": function(){auth_state_change()}
				}
			)
		});
	});

	// Reset Password
	forgotPassword = document.querySelector('#forgot-password');
	forgotPassword.addEventListener('click',function(e) {
		e.preventDefault();
		auth_forgotPassword()
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
		} else if(evt.code == "ArrowRight" && "right" in quantml["pagination"] && window.keydowns["alt"] != true){
			window.location.href = quantml["pagination"]["right"]
		} else if(evt.code == "ArrowLeft" && "left" in quantml["pagination"] && window.keydowns["alt"] != true){
			window.location.href = quantml["pagination"]["left"]
		}
	})

	document.addEventListener('swiped-left', function(e) {
		// console.log(e.target); // element that was swiped
		// console.log(e.detail); // event data { dir: 'left', xStart: 196, xEnd: 230, yStart: 196, yEnd: 4 }
		if(window.innerWidth - e.detail.xStart < 10) document.querySelector('body').classList.add('is-navPanel-visible');
		else if( !e.target.classList.contains("language-python") &&
			!e.target.classList.contains("language-julia") &&
			!e.target.classList.contains("token")  &&
			!isClassNamePresent(e.target, ["math-container", "modal", "code-toolbar", "table-wrapper"])  ){
				if("right" in quantml["pagination"]) window.location.href = quantml["pagination"]["right"];
				// console.log("GO LEFT")
			}
	});

	document.addEventListener('swiped-right', function(e) {
		// console.log(e.target); // element that was swiped
		// console.log(e.detail); // event data { dir: 'left', xStart: 196, xEnd: 230, yStart: 196, yEnd: 4 }
		if( !e.target.classList.contains("language-python") &&
			!e.target.classList.contains("language-julia") &&
			!e.target.classList.contains("token")  &&
			!isClassNamePresent(e.target,  ["math-container", "modal", "code-toolbar", "table-wrapper"]) ){
                if("left" in quantml["pagination"]) window.location.href = quantml["pagination"]["left"];
				// console.log("GO RIGHT")
			}
	});

	// Show Content acc. to Device
	if(quantml["notDesktop"]) {
		setDisplay('desktop-mode', "none")
		setDisplay('mobile-mode', "block")
	} else {
		setDisplay('desktop-mode', "block")
		setDisplay('mobile-mode', "none")
	}

	emailAddressIsValidated()
	passwordIsValidated()
	auth_state_change()
}

function cssLoaded(isKatexImportant = true, callback){
	// d = new Date();end = d.getTime();  // Remove it
	// console.log("CSS Load time:",end-start)  // Remove it
	setTimeout(function(){
		requireScript('swiped-events-js', '0.1.0', '/data/js/swiped-events.js', function(){})				
		if(typeof(importPrism) != "undefined" && importPrism == true) requireScript('prism-js', '0.1.0', '/data/prism/prism.js', function(){})
	}, 500)
	if(isKatexImportant == true){
		loadKatex(isKatexImportant)
	} else {
		katexLoaded()
		setTimeout(function(){loadKatex()}, 1500)
	}
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

function invalidOTP(){
	otp = document.getElementById('otp');
	otp.style.border = "1px solid red";
	otp.style.boxShadow = "1px 1px 10px red";
	otp.classList.add("error-border-bounce");
	setTimeout(function() {
		otp.classList.remove("error-border-bounce");
	}, 1000);
	setDisplay('invalid-otp', 'block');
	setDisplay('resend-otp','block')
}

function otpValidated(){
	otp = document.getElementById('otp');
	otp.style.border = "2px solid #0073b1";
	otp.style.boxShadow = "none";
	setDisplay('invalid-otp', 'none');
}

function passwordIsValidated(){
	password = document.querySelectorAll('[type="password"]');
	password.forEach(function(element, index) {
		// console.log(element)
		element.style.boxShadow = "none";
		element.style.border = "2px solid #0073b1";
	})
	setDisplay('password-error-msg', 'none');
}

function close_all_auth_models(){
	setDisplay('create-password-model','none')
		setDisplay('password-do-not-match', 'none')
		setDisplay('password-is-weak', 'none')

	setDisplay('password-model','none')
		passwordIsValidated()

	setDisplay('email-model','none')
		emailAddressIsValidated()
		setDisplay('first-login-enter-email', 'none')

	setDisplay('otp-model','none')
		setDisplay('invalid-otp','none')
		setDisplay('resend-otp','none')
		setDisplay('first-login-otp-model', 'none')
		otpValidated()
	
	setDisplay('network-request-failed','none')
}

function open_email_model(){
	document.querySelector('body').classList.remove('is-navPanel-visible');
	close_all_auth_models()
	setDisplay('email-model', 'block')
}

function open_otp_model(){
	close_all_auth_models()
	setDisplay('otp-model', 'block')
}

function auth_identify_email(){
	setDisplay('network-request-failed', 'none');
	
	if(!navigator.onLine) {
		networkRequestFailed();
		return;
	}
	email_form = document.getElementById('email-form')
	// Get User Info
	email = email_form['login-email'].value;
	nextButtonText = document.getElementById('login-button-text');
	if(quantml["theme"]=="light"){
		var src = "/data/img/loading-login.svg";
	} else {
		var src = "/data/img-dark/loading-login.svg";
	}
	nextButtonText.innerHTML = 'Next &nbsp; <img style="-webkit-transform: translateY(.6rem); transform: translateY(.6rem);" src='+ src +' alt="..." width="30px" height="30px"/>'
	quantml["email"] = email.toLowerCase()
	fetching({email: email.toLowerCase()}, "identify-user",
		callbacks = {
			"then": function() {nextButtonText.innerHTML = "Next &nbsp; &rarr;";},
			"response": function(data) {
				// console.log(data);
				if(data["status"] == "Registered") {
					setDisplay('email-model', 'none');
					setDisplay('password-model', 'block');
				} else if(data["status"] == "Unregistered") {
					invalidEmailAddressUserNotFound(email);
				} else if(data["status"] == "Invalid Password") {
					invalidPassword();
				} else if(data["status"] == "Create Password") {
					// TODO 
					// OTP Model <id='first-login-otp-model'>
					nextButtonText.innerHTML = `Next &nbsp; ${get_loader_img_str()}`
					firstLoginEnterEmailText = document.getElementById('first-login-enter-email')
					firstLoginEnterEmailText.innerHTML=`It's your <b>First</b> time logging in.<br>
					Sending an OTP to ${email}`
					setDisplay('first-login-enter-email', 'block')
					fetching({email: quantml["email"]}, "send-otp", 
						callbacks = {
							"then": function() {nextButtonText.innerHTML = "Next &nbsp; &rarr;";},
							"response": function (data) {
								// console.log(data)
								if(data["status"] == "Success") {
									document.getElementById('otp-email-sent-text').innerHTML = `<h4>An OTP is sent over to ${quantml["email"]}</h4>`
									open_otp_model()
									firstLoginText = document.getElementById('first-login-otp-model')
									firstLoginText.innerHTML=`It's your <b>First</b> time logging in, so let's set a password<br>
									First verify that it's you.<br>`
									setDisplay('first-login-otp-model', "block")
								} else if (data["status"] == "Sending OTP"){
									// PASS
								} else {
									otp_failed(data["status"])
								}
							},
							"catch": function(){nextButtonText.innerHTML = "Next &nbsp; &rarr;";}
						}
					)
				}
			},
			"catch": function() {
				nextButtonText.innerHTML = "Next &nbsp; &rarr;";
			}
		})
		
}

async function auth_authenticate(){
	setDisplay('network-request-failed', 'none');
	if(!navigator.onLine) {
		networkRequestFailed();
		return;
	}
	email_form = document.getElementById('password-form')
	// Get User Info
	password = await encryptMessage(email_form['password'].value);
	loginButtonText = document.getElementById('password-button-text');
	loginButtonText.innerHTML = `Login &nbsp; ${get_loader_img_str()}`
	fetching({email: quantml["email"], password: password}, "login", 
		callbacks = {
			"then": function() {loginButtonText.innerHTML = "Login &nbsp; &rarr;";},
			"response": function (data){
				// console.log(data);
				if(data["status"] == "Authenticated") {
					document.cookie= `token=${data["token"]}` + "; path=/;SameSite=Lax";
					setDisplay('password-model', 'none');
					auth_state_change()
				} else if(data["status"] == "Unregistered") {
					// invalidEmailAddressUserNotFound(email);
				} else if(data["status"] == "Invalid Password") {
					invalidPassword();
				}
			},
			"catch": function(){
				loginButtonText.innerHTML = "Login &nbsp; &rarr;";
				// console.log("Fetch error: " + error);
			}
		})		
}

async function auth_createPassword(){
	setDisplay('network-request-failed', 'none');
	if(!navigator.onLine) {
		networkRequestFailed();
		return;
	}
	loginForm = document.getElementById('create-password')
	// Get User Info
	if(loginForm['new-password'].value != loginForm['confirm-password'].value){
		invalidPassword()
		setDisplay('password-do-not-match', 'block')
		setDisplay('password-is-weak', 'none')
		return
	}
	if(loginForm['new-password'].value.length < 8){
		invalidPassword()
		setDisplay('password-do-not-match', 'none')
		setDisplay('password-is-weak', 'block')
		return
	}
	newpass = await encryptMessage(loginForm['new-password'].value);
	confirmpass = await encryptMessage(loginForm['confirm-password'].value);
	buttonText = document.getElementById('create-password-text');
	if(quantml["theme"]=="light"){
		var src = "/data/img/loading-login.svg";
	} else {
		var src = "/data/img-dark/loading-login.svg";
	}
	buttonText.innerHTML = 'Create Password &nbsp; <img style="-webkit-transform: translateY(.6rem); transform: translateY(.6rem);" src='+ src +' alt="..." width="30px" height="30px"/>'
	
	fetching({email: quantml["email"], new_password: newpass, confirm_password: confirmpass, otp: quantml["otp"]}, 
			endpoint="create-password",
			callbacks={
				"then": function(){buttonText.innerHTML = "Create Password &nbsp; &rarr;";},
				"response": function(data) {
					// console.log(data);
					if(data["status"] == "Authenticated") {
						setDisplay('create-password-model', 'none')
						setDisplay('password-do-not-match', 'none')
						setDisplay('password-is-weak', 'none')
						document.cookie= `token=${data["token"]}` + "; path=/;SameSite=Lax";
						auth_state_change()
					} else if(data["status"] == "Dont match") {
						invalidPassword()
						setDisplay('password-do-not-match', 'block')
						setDisplay('password-is-weak', 'none')
					} else if(data["status"] == "Weak") {
						invalidPassword()
						setDisplay('password-do-not-match', 'none')
						setDisplay('password-is-weak', 'block')
					}
				},
				"catch": function(){
					buttonText.innerHTML = "Create Password &nbsp; &rarr;";
				}
			});
}

function auth_forgotPassword(){
	forgotButtonText = document.getElementById('forgot-button-text')
	if(quantml["theme"]=="light"){
		var src = "/data/img/loading-forgot.svg";
	} else {
		var src = "/data/img-dark/loading-forgot.svg";
	}
	forgotButtonText.innerHTML = 'Forgot Password <img style="-webkit-transform: translateY(.6rem); transform: translateY(.6rem);" src='+ src +' alt="..." width="30px" height="30px"/>'
	fetching({email: quantml["email"]}, "send-otp", 
		callbacks = {
			"then": function() {forgotButtonText.innerHTML = "Forgot Password &nbsp; &rarr;";},
			"response": function (data){
				// console.log(data)
				if(data["status"] == "Success") {
					document.getElementById('otp-email-sent-text').innerHTML = `<h4>An OTP is sent over to ${quantml["email"]}</h4>`
					open_otp_model()
				} else if (data["status"] == "Sending OTP"){
					// PASS
				} else {
					otp_failed(data["status"])
				}
			},
			"catch": function(){
				forgotButtonText.innerHTML = "Forgot Password &nbsp; &rarr;";
				// console.log("Fetch error: " + error);
			}
	})
}

// OTP successfully sent, Now verify the OTP
function otp_success(email) {
	setDisplay('invalid-otp', 'none')
	setDisplay('resend-otp', 'none')
	otp_form = document.querySelector('#otp-form');
	otp = otp_form['otp'].value;
	quantml["otp"] = otp
	verifyButtonText = document.getElementById('otp-btn-text')
	verifyButtonText.innerHTML = `Verify ${get_loader_img_str()}`
	fetching({email: quantml["email"], otp: otp}, "verify-otp", 
		callbacks = {
			"then": function() {verifyButtonText.innerHTML = "Verify &nbsp; &rarr;";},
			"response": function(data){
				// console.log(data)
				if(data["status"] == "OTP Verified") {
					setDisplay('otp-model', 'none')
					setDisplay('create-password-model', 'block')
					// otp_verified(email)
				} else {
					invalidOTP()
					setDisplay('invalid-otp', 'block')
					setDisplay('resend-otp', 'block')
				}	
			},
			"catch": function() {verifyButtonText.innerHTML = "Verify &nbsp; &rarr;";},
		})
}

function otp_not_verified(){
	resendButtonText = document.getElementById('resend-otp-text')
	resendButtonText.innerHTML = `Sending OTP &nbsp; ${get_loader_img_str("forgot")}`
	// console.log("RESENDING OTP")
	fetching({email: quantml["email"]}, "send-otp", 
		callbacks = {
			"then": function(){resendButtonText.innerHTML = "Resend OTP &nbsp; &rarr;";},
			"response": function (data) {
				// console.log(data)
				if(data["status"] == "Success") {
					setDisplay('resend-otp', 'none')
					setDisplay('invalid-otp','none')
				} else if (data["status"] == "Sending OTP"){
					// PASS
				} else {
					resendButtonText.innerHTML = "Failed [try again] &nbsp; &rarr;";
				}
			},
			"catch": function(){resendButtonText.innerHTML = "Resend OTP &nbsp; &rarr;";}
	});
}

function otp_failed(status) {
	// Fill it
}

function fetching(data, endpoint, callbacks = {}){
	fetch(`http://127.0.0.1:5000/${endpoint}`, {
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
		body: JSON.stringify(data), // body data type must match "Content-Type" header
	  })
	  .then(function(response) {
		if("then" in callbacks) callbacks["then"](response)
		response.json().then(function(data) {
			if("response" in callbacks) callbacks["response"](data)
		});
	  })
	  .catch(function(error) {
		if("catch" in callbacks) callbacks["catch"](error)
	  });
}

function auth_state_change(){
	token = getCookie("token")
	// console.log("token", token)
	if(token == null) {
		setDisplay('login-button',getDisplay());
		setDisplay('join-button',getDisplay());
		setDisplay('logout-button','none');
		setDisplay('secrets','none');
		setDisplay('login-require',getDisplay());
		setDisplay('btn-loading','none');
		return
	}
	if(!navigator.onLine){
		secrets = document.getElementById('secrets');
		if(secrets != null) {
			secrets.innerHTML = ''
			setDisplay("no-internet", "block")
		}
	}
	callbacks = {
		"response": function(data) {
			// console.log(data);
			if(data["status"] == "Authorized") {
				setDisplay('login-button','none');
				setDisplay('join-button','none');
				setDisplay('logout-button',getDisplay());
				setDisplay('secrets',getDisplay());
				setDisplay('login-require','none');
				setDisplay('btn-loading','none');
				loadContent()
			} else {
				setDisplay('login-button',getDisplay());
				setDisplay('join-button',getDisplay());
				setDisplay('logout-button','none');
				setDisplay('secrets','none');
				setDisplay('login-require',getDisplay());
				setDisplay('btn-loading','none');
			}
		},
	}
	fetching({token:token}, "is-authorized", callbacks)
}

function auth_patreon_suggestion(){
	setDisplay("success-patreon-suggestion","none")
	setDisplay("empty-patreon-suggestion","none")
	setDisplay("unknown-error-patreon-suggestion","none")
	
	suggestion = document.getElementById('patreon-suggestion')
	if(suggestion.value == "") {
		setDisplay("empty-patreon-suggestion","block")
		return
	}
	suggestionButtonText = document.getElementById('submit-patreon-suggestion')
	suggestionButtonText.innerHTML = `Submit ${get_loader_img_str()}`
	fetching({token: getCookie("token") ,content: suggestion.value, chapterID: quantml["chapterID"]}, "send-suggestion", 
		callbacks = {
			"then": function() {suggestionButtonText.innerHTML = "Submit &nbsp; &rarr;";},
			"response": function(data){
				// console.log(data)
				if(data["status"] == "Success") {
					setDisplay("success-patreon-suggestion","block")
				} else {
					setDisplay("unknown-error-patreon-suggestion","block")
				}	
			},
			"catch": function() {suggestionButtonText.innerHTML = "Submit &nbsp; &rarr;";},
		})
}

function loadContent(){
	if(!("fetch-chapter" in quantml) || quantml["fetch-chapter"] == false) return;
	chapterID = quantml["chapterID"]
	fetching({chapter: chapterID, token: getCookie('token')}, 'get-chapter',
		callbacks={
			"response": function(data){
				// console.log(data)
				if(data["status"] == "Success"){
					if("chapter" in data) {
						writeData(data["chapter"]);
						// Submit Patreon Suggestion
						submitPatreonSuggestion = document.getElementById('submit-patreon-suggestion')
						if(submitPatreonSuggestion != null) {
							submitPatreonSuggestion.addEventListener("click", function(){
								auth_patreon_suggestion()
							})
						}
					}
				}
			}
		}
	)
}

function writeData(data){
	secrets = document.getElementById('secrets');
	if(secrets != null) secrets.innerHTML = data;
}