// Setting Theme
if(localStorage.getItem("quantmlTheme")==null){
	localStorage.setItem("quantmlTheme", "light");
}

function changeThemeCSS(currentTheme){
	theme = document.getElementById('quantml-theme')
	auththeme = document.getElementById('quantml-auth-style')
	if(currentTheme == "light"){
		theme.href ="/data/assets/css/main-light.css"
		auththeme.href = "/data/assets/css/authStyle-light.css"
	}
	else if(currentTheme == "dark") {
		theme.href = "/data/assets/css/main-dark.css"
		auththeme.href = "/data/assets/css/authStyle-dark.css"
	}	
}

changeThemeCSS(localStorage.getItem("quantmlTheme"));