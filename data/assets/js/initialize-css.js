// Setting Theme
if(localStorage.getItem("quantmlTheme")==null){
	localStorage.setItem("quantmlTheme", "light");
}

function changeThemeCSS(currentTheme){
	e = document.getElementById("quantml-theme")
	if(e!=null) e.remove();
	e = document.getElementById("quantml-auth-theme")
	if(e!=null) e.remove();
	
	if(currentTheme == "dark"){
		requireScript("main-dark-css", "0.1.0", "/data/assets/css/main-dark.css", ()=>{
			cssLoaded();
			setDisplay('wrapper', 'block')
		})
		requireScript("auth-dark-css", "0.1.0", "/data/assets/css/authStyle-dark.css", ()=>{})
	} else {
		requireScript("main-light-css", "0.1.0", "/data/assets/css/main-light.css", ()=>{
			cssLoaded();
			setDisplay('wrapper', 'block')})
		requireScript("auth-light-css", "0.1.0", "/data/assets/css/authStyle-light.css", ()=>{})
	}	
}

// requireScript("main-css", "0.1.0", "/data/assets/css/main.css", ()=>{initializeBody()})
// requireScript("auth-css", "0.1.0", "/data/assets/css/authStyle.css", ()=>{})
changeThemeCSS(localStorage.getItem("quantmlTheme"));