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
    setTimeout(() => {
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
    setTimeout(() => {
        loginEmail.classList.remove("error-border-bounce");
    }, 1000); 
    userNotFound.innerHTML = `<b>"${email}"</b> is currently not a <a href="https://www.patreon.com/quantml">patreon supporter</a>.<br>
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
    password = document.getElementById("login-password");
    password.style.border = "1px solid red";
    password.style.boxShadow = "1px 1px 10px red";
    password.classList.add("error-border-bounce");
    setTimeout(() => {
        password.classList.remove("error-border-bounce");
    }, 1000); 
    loginErrMsg = document.getElementById("password-error-msg");
    loginErrMsg.style.display='block';
}

function passwordIsValidated(){
    password = document.getElementById("login-password");
    password.style.boxShadow = "none";
    password.style.border = "2px solid #0073b1";
    setDisplay('password-error-msg', 'none');
}

function auth_submitLoginForm(loginForm){
    setDisplay('network-request-failed', 'none');

    // Get User Info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    const loginButtonText = document.getElementById('login-button-text');
    if(localStorage.getItem("quantmlTheme")=="light"){
        var src = "/data/img/loading-login.gif";
    } else {
        var src = "/data/img-dark/loading-login.gif";
    }
    loginButtonText.innerHTML = 'Login &nbsp; <img style="-webkit-transform: translateY(.6rem); transform: translateY(.6rem);" src='+ src +' alt="..." width="30px" height="30px"/>'
    globalThis.fb_auth.signInWithEmailAndPassword(email, password).then(cred => {
        // console.log(cred.user);
        setDisplay('login-model', 'none');
        loginButtonText.innerHTML = "Login";
        window.location.reload();
    })
    .catch((e) => {
        loginButtonText.innerHTML = "Login";
        loginError = e;
        if(loginError.code == "auth/invalid-email") {
            invalidEmailAddressError();
        }
        if(loginError.code == "auth/user-not-found") {
            invalidEmailAddressUserNotFound(email);
        }
        if(loginError.code == "auth/wrong-password") {
            invalidPassword();
        }
        if(loginError.code == "auth/network-request-failed") {
            networkRequestFailed();
        }
        
        
    });
}

function auth_resetPassword(loginForm){
    setDisplay('network-request-failed', 'none');
    const email = loginForm['login-email'].value;
    // console.log("Forgot Password")
    const forgotButtonText = document.getElementById('forgot-button-text');
    if(localStorage.getItem("quantmlTheme")=="light"){
        var src = "/data/img/loading-forgot.gif";
    } else {
        var src = "/data/img-dark/loading-forgot.gif";
    }
    forgotButtonText.innerHTML = 'Forgot Password &nbsp; <img style="-webkit-transform: translateY(.6rem); transform: translateY(.6rem);" src='+ src +' alt="..." width="30px" height="30px"/>'
    globalThis.fb_auth.sendPasswordResetEmail(email).then(() => {
        // console.log("Sending Reset Password Link");
        forgotButtonText.innerHTML = 'Forgot Password'
        // alert("A password reset link is sent over: " + email)
        setDisplay('login-model', 'none')
        setDisplay('password-reset-link-sent-model', 'block')
        document.getElementById('password-reset-link-sent-txt').innerHTML = 'A Password Reset link is sent to "<b>' + email + '</b>"';
    })
    .catch((e) =>{
        forgotButtonText.innerHTML = 'Forgot Password'
        forgotError = e;
        if(forgotError.code == "auth/invalid-email") {
            invalidEmailAddressError();
        }
        if(forgotError.code == "auth/user-not-found") {
            invalidEmailAddressUserNotFound(email);
        }
        if(forgotError.code == "auth/network-request-failed") {
            networkRequestFailed();
        }
    });
}

function loadContent(chapterID){
    var data = ""
    // retrieve data
    if(!localStorage.hasOwnProperty(chapterID)){
        globalThis.fb_db.collection('Statistics-Guide').doc(chapterID).get().then(snapshot => {
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

// ============================== FIREBASE SETUP [END] ============================== //

// Testing
// document.getElementById('login-model').style.display='block';
// document.getElementById('password-reset-link-sent-model').style.display='block';
// invalidEmailAddressUserNotFound("yuvraj@garg.com")
// invalidEmailAddressError()
// invalidPassword()