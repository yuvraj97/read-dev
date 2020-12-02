loadCorrectThemeImages(localStorage.getItem("quantmlTheme"));

if(localStorage.getItem('paragraph-font-size') == null){
	resetFontSize()
}
setFontSize()

// ***************************************************************
// ***************************************************************
// Index
// ***************************************************************
// ***************************************************************

	// Show Content acc. to Device
	let check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	const notDesktop = check

	if(notDesktop) {
		setDisplay('desktop-mode', "none")
		setDisplay('mobile-mode', "block")
	} else {
		setDisplay('desktop-mode', "block")
		setDisplay('mobile-mode', "none")
	}
	
	// Change Theme Button
	changeThemeBtn = document.getElementById('change-theme');
	changeThemeBtn.addEventListener('click',(e) => {    
		e.preventDefault();
		changeTheme()
	});


// ***************************************************************
// ***************************************************************
// Add Modals HTML [800ms]
// ***************************************************************
// ***************************************************************

	document.getElementById('modals-html').innerHTML =`
	<!--=================== MODELS ===================-->

	<!--=============== LOGIN MODEL[START] ===============-->
	<div id="login-model" class="modal">
		<form class="modal-content animate" id="login-form">
		
			<a class="close" style="float: right; padding-top: 0%; padding-bottom: 0%;" onclick="setDisplay('login-model', 'none')">X</a>
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

	// LOGIN Form
	const loginForm = document.querySelector('#login-form');
	loginForm.addEventListener('submit', (e) => {
		e.preventDefault();
		auth_submitLoginForm(loginForm)    
	});

	// Login Button
    const loginButton = document.querySelectorAll('#login-button');
    loginButton.forEach((element,index)=>{
            element.addEventListener('click', (e) => {
				console.log("Login Button Clicked")
                e.preventDefault();
                document.querySelector('body').classList.remove('is-navPanel-visible');
				setDisplay('login-model', 'block')
            });        
    })
	
	// LOGOUT
	const logout = document.querySelectorAll('#logout-button');
	logout.forEach((element,index)=>{
		element.addEventListener('click',(e) => {    
			e.preventDefault();
			localStorage.clear();
			globalThis.fb_auth.signOut().then(() => {
				// console.log("Logging Out...")
			});
		});
	});

	// Reset Password
	const forgotPassword = document.querySelector('#forgot-password');
	forgotPassword.addEventListener('click',(e) => {    
		e.preventDefault();
		auth_resetPassword(loginForm)
	});

	setDisplay('login-error-msg', "none")

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


	emailAddressIsValidated()
    passwordIsValidated()