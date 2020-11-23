if(localStorage.getItem("quantmlTheme")==null){
	localStorage.setItem("quantmlTheme", "light");
}
currTheme = localStorage.getItem("quantmlTheme")
theme = document.getElementById('quantml-theme')
auththeme = document.getElementById('quantml-auth-style')
if(currTheme == "light"){
	theme.href ="/data/assets/css/main-light.css"
	auththeme.href = "/data/auth/authStyle-light.css"
}
else if(currTheme == "dark") {
	theme.href = "/data/assets/css/main-dark.css"
	auththeme.href = "/data/auth/authStyle-dark.css"
}
