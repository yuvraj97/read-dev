// Change Theme
const changeTheme = document.getElementById('change-theme');
changeTheme.addEventListener('click',(e) => {    
	e.preventDefault();
	window.location.reload();
	var cssFiles = document.getElementsByTagName("link");
	main_css = "";
    for (var i=0; i<cssFiles	.length; i++){
		if(cssFiles[i].getAttribute("href").search("main")!=-1){
			main_css = cssFiles[i];
		}
	}
	href = main_css.href;
	
	currTheme = localStorage.getItem("quantmlTheme");
	if(currTheme == "light"){
		console.log("Light2Dark");
		localStorage.setItem("quantmlTheme", "dark");
		href = href.replace("main.css", "main-dark.css");
		changeTheme.src = changeTheme.src.replace("/img/","/img-dark/");
	}
	else if (currTheme == "dark"){
		console.log("Dark2Light");
		localStorage.setItem("quantmlTheme", "light");
		href = href.replace("main-dark.css", "main.css");
		changeTheme.src = changeTheme.src.replace("/img-dark/","/img/");
	}
	main_css.href = href;
	
});

// Set Theme icon
currentTheme = localStorage.getItem("quantmlTheme");
if(currentTheme == "light"){
	changeTheme.src = "/data/img/change-theme.png"
}
if(currentTheme == "dark"){
	changeTheme.src = "/data/img-dark/change-theme.png"
}


// Set images according to Theme
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

// Set Next-Prev btn width
setTimeout (()=>{
	prev = document.querySelectorAll('#prev-btn')
	next = document.querySelectorAll('#next-btn')
	if(prev.length!=0){
		btnWidth = document.getElementById('btn-container').offsetWidth
		if(prev.length != 0 && prev[0].offsetWidth + next[0].offsetWidth > btnWidth) {
			prev[0].style.display="block";
			prev[1].style.display="block";
			next[0].style.display="block";
			next[1].style.display="block";
			prev[0].style.width="100%";
			prev[1].style.width="100%";
			next[0].style.width="100%";
			next[1].style.width="100%";
			next[0].style.marginTop="5px"
			next[1].style.marginTop="5px"
		}
	}
}, 100)