// Setting Theme
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

// Set Theme icon
const changeThemeBtn = document.getElementById('change-theme');
currentTheme = localStorage.getItem("quantmlTheme");
if(currentTheme == "light"){
	changeThemeBtn.src = "/data/img/change-theme.png"
}
if(currentTheme == "dark"){
	changeThemeBtn.src = "/data/img-dark/change-theme.png"
}

// Set icon images according to Theme
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

