// Setting Theme
if(localStorage.getItem("quantmlTheme")==null){
	localStorage.setItem("quantmlTheme", "light");
}

function changeThemeCSS(currentTheme){
	if(currentTheme == "dark"){
		e = document.getElementById("main-light-css")
		if(e!=null) e.remove();
		e = document.getElementById("auth-light-css")
		if(e!=null) e.remove();
		
		requireScript("main-dark-css", "0.1.0", "/data/assets/css/main-dark.css", ()=>{
			cssLoaded();
			setDisplay('wrapper', 'block')
		})
		requireScript("auth-dark-css", "0.1.0", "/data/assets/css/authStyle-dark.css", ()=>{})
	} else {
		e = document.getElementById("main-dark-css")
		if(e!=null) e.remove();
		e = document.getElementById("auth-dark-css")
		if(e!=null) e.remove();
		
		requireScript("main-light-css", "0.1.0", "/data/assets/css/main-light.css", ()=>{
			cssLoaded();
			setDisplay('wrapper', 'block')})
		requireScript("auth-light-css", "0.1.0", "/data/assets/css/authStyle-light.css", ()=>{})
	}	
}

// requireScript("main-css", "0.1.0", "/data/assets/css/main.css", ()=>{initializeBody()})
// requireScript("auth-css", "0.1.0", "/data/assets/css/authStyle.css", ()=>{})
changeThemeCSS(localStorage.getItem("quantmlTheme"));