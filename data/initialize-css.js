// Setting Theme
if(localStorage.getItem("quantmlTheme")==null){
	localStorage.setItem("quantmlTheme", "light");
}

function loadCorrectThemeImages(){
	currentTheme = localStorage.getItem("quantmlTheme")
	images = document.querySelectorAll('img')
	if(currentTheme == "light" && document.getElementById('quantml-cover').src.indexOf("/img-dark/")!=-1){
		for (let index = 0; index < images.length; index++) {
			// console.log(images[index].src,"->", images[index].src.replace("/img-dark/","/img/"))
			images[index].src = images[index].src.replace("/img-dark/","/img/")
		}
	} else if(currentTheme == "dark"){
		for (let index = 0; index < images.length; index++) {
			// console.log(images[index].src,"->", images[index].src.replace("/img/","/img-dark/"))
			images[index].src = images[index].src.replace("/img/","/img-dark/")
		}
	}	
}

function changeThemeCSS(currentTheme){
	theme = document.getElementById('quantml-theme')
	auththeme = document.getElementById('quantml-auth-style')
	if(currentTheme == "light"){
		theme.href ="/data/assets/css/main-light.css"
		auththeme.href = "/data/auth/authStyle-light.css"
	}
	else if(currentTheme == "dark") {
		theme.href = "/data/assets/css/main-dark.css"
		auththeme.href = "/data/auth/authStyle-dark.css"
	}	
}

function changeTheme() {
	currentTheme = localStorage.getItem("quantmlTheme");
	if(currentTheme == "light"){
		console.log("Light2Dark");
		changeThemeCSS("dark")
		localStorage.setItem("quantmlTheme", "dark");
	}
	else if (currentTheme == "dark"){
		console.log("Dark2Light");
		changeThemeCSS("light")
		localStorage.setItem("quantmlTheme", "light");
	}
	loadCorrectThemeImages()
}

changeThemeCSS(localStorage.getItem("quantmlTheme"));
loadCorrectThemeImages();