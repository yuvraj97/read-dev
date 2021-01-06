window.quantml = {}

function _cacheFile_(name, version, url) {
	var xmlhttp = new XMLHttpRequest(); // code for IE7+, Firefox, Chrome, Opera, Safari
	xmlhttp.onreadystatechange = function() {
	  if (xmlhttp.readyState == 4) {
		if (xmlhttp.status == 200) {
		  localStorage.setItem(name, JSON.stringify({
			content: xmlhttp.responseText,
			version: version
		  }));
		} else {
		  console.warn('error loading '+url);
		}
	  }
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function _onLoad_(s, url, name, version, callback){
	if (s.readyState) { //IE
		s.onreadystatechange = function() {
		  if (s.readyState == "loaded" || s.readyState == "complete") {
			s.onreadystatechange = null;
			_cacheFile_(name, version, url);
			if (callback) callback();
		  }
		};
	  } else { //Others
		s.onload = function() {
		  _cacheFile_(name, version, url);
		  if (callback) callback();
		  // d = new Date();end = d.getTime();console.log(name, "load time", end-start)
		};
	  }	
}

function _loadScript(url, name, version, callback) {
  if(url.search(".css")!=-1){
	// console.log("files is CSS")
	var e = document.createElement('link');
	e.rel="stylesheet"
	e.id=name
	  e.href = url
  } else {
	// console.log("files is JS")
	var e = document.createElement('script');
	e.setAttribute("src", url);
  }
  //   Caching
  _onLoad_(e, url, name, version, callback)
  document.getElementsByTagName("head")[0].appendChild(e)
}

function _injectScript(content, url, name, version, callback) {
  var c = JSON.parse(content);
  // cached version is not the request version, clear the cache, this will trigger a reload next time
  if (c.version != version) {
	localStorage.removeItem(name);
	_loadScript(url, name, version, callback);
	return;
  }
  if(url.search(".css")!=-1){
	var s = document.createElement('style')
	s.id = name
	s.innerHTML = c.content
  } else {
	var s = document.createElement('script');
	// s.type = "text/javascript";
	var scriptContent = document.createTextNode(c.content);
	s.appendChild(scriptContent);
  }
  document.getElementsByTagName("head")[0].appendChild(s);
  if (callback) callback();
  // d = new Date();end = d.getTime();console.log(name, "get time", end-start)
}

function requireScript(name, version, url, callback) {
  var c = localStorage.getItem(name);
  if (c == null) {
	// console.log("fatching", name)
	_loadScript(url, name, version, callback);
  } else {
	// console.log(name, "LOGGED")
	_injectScript(c, url, name, version, callback);
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
	if(localStorage.getItem("quantmlTheme")=="light"){
		var src = `/data/img/loading-${which}.svg`;
	} else {
		var src = `/data/img-dark/loading-${which}.svg`;
	}
	return `<img style="-webkit-transform: translateY(.6rem); transform: translateY(.6rem);" src="${src}" alt="..." width="30px" height="30px"/>`
}

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
	
		requireScript("main-dark-css", "0.1.0", "/data/css/main-dark.css", function(){})
		requireScript("auth-dark-css", "0.1.0", "/data/css/authStyle-dark.css", function(){})

		e = document.getElementById("style-light-css")
		if(e!=null) {
			e.remove();
			requireScript('style-dark-css', '0.1.0', '/style-dark.css', function(){})
		}		
	
	} else {
		e = document.getElementById("main-dark-css")
		if(e!=null) e.remove();
		e = document.getElementById("auth-dark-css")
		if(e!=null) e.remove();
		
		requireScript("main-light-css", "0.1.0", "/data/css/main-light.css", function(){})
		requireScript("auth-light-css", "0.1.0", "/data/css/authStyle-light.css", function(){})
	
		e = document.getElementById("style-dark-css")
		if(e!=null) {
			e.remove();
			requireScript('style-light-css', '0.1.0', '/style-light.css', function(){})
		}
	}	
}

function setPageWidth(){
	page_width = localStorage.getItem("page-width")
	if(page_width  != null) {
		document.getElementById('nav').style.maxWidth =  page_width
		document.getElementById('main').style.maxWidth =  page_width
	}
	else {
		localStorage.setItem("page-width", "72rem"); 
		document.getElementById('nav').style.maxWidth = "72rem";
		document.getElementById('main').style.maxWidth = "72rem";
	}
}

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

function loadNavBar(){
	nav = document.getElementById('nav')
	ul = document.createElement('ul')
	ul.classList.add('icons')
	if(localStorage.getItem("quantmlTheme")=="light"){
		imgsrc = "/data/img/"
	} else {
		imgsrc = "/data/img-dark/"
  	}
	if(typeof(isConcluded) == "undefined" || isConcluded == false){
		log_in_out = `<li style="display: none; text-align: center;" id="fb-loading"><img class="fb-loading" src="${imgsrc}fb-loading.gif" alt=" "></li>
		<li style="display: none;" id="login-button"><button id="login-btn-width" class="login-logout-join" >Login <img src="${imgsrc}patreon.png" alt="Patreon"></button></li>
		<li style="display: none;" id="logout-button"><button id="logout-btn-width" class="login-logout-join" >Logout <img src="${imgsrc}patreon.png" alt="Logout"></button></li>`
	} else if(isConcluded == true) {
		log_in_out = ``
	}
	ul.innerHTML = `<li class="link"><a rel="noreferrer" target="_blank" href="https://app.quantml.org/stats/"><img src="${imgsrc}app.png" alt="App"></a></li>
	<li class="link"><a rel="noreferrer" target="_blank" href="https://join.slack.com/t/quantml-org/shared_invite/zt-jffw86bo-6M260iyt1q2MgBma9elewg"><img class="whiteback" src="${imgsrc}slack.png" alt="Slack"></a></li>
	<li class="link"><a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/yuvraj97/"><img src="${imgsrc}linkedin.png" alt="LinkedIn"></a></li>
	<!--<li class="link"><a rel="noreferrer" target="_blank" href="https://github.com/yuvraj97/"><img src="${imgsrc}github.png" alt="GitHub"></a></li>-->
	${log_in_out}
	<li style="display: none;" id="join-button"><button onclick=" window.open('https://www.patreon.com/quantml','_blank','noopener')" id="join-btn-width" class="login-logout-join" >Join <img src="${imgsrc}patreon.png" alt="Patreon"></button></li>
	<li class="link" title="Change Theme" ><img onclick="changeTheme()" id="change-theme" src="${imgsrc}change-theme.png" alt="Change Theme"></li>
	<li title="Settings" class="jump link"><img onclick="showSettings()" src="${imgsrc}setings.png" alt="Settings" width="25px" height="25px"></li>
	`
	nav.appendChild(ul)
  navPanel = document.createElement('div')
  navPanel.id="navPanel"
  navPanel.innerHTML = nav.innerHTML;
  div = document.createElement('div')
  div.id="close-navbar";
  div.classList.add("close")
  navPanel.appendChild(div)
  document.getElementsByTagName("body")[0].appendChild(navPanel)
  // Close Navbar
  div.addEventListener('click',function(){
	document.querySelector('body').classList.remove('is-navPanel-visible');
  })

}

function initializeBody(){
//   console.log("initializeBody()")
  theme = localStorage.getItem("quantmlTheme")
  if(theme=="dark") {
	document.querySelector('body').style.backgroundColor = "#2d2d2d"
  }
  else {
	document.querySelector('body').style.backgroundColor = "#fff"
  }
  loadInit(theme)
  loadNavBar();
  setPageWidth();
  document.getElementById('wrapper').style.display = "block"
}

function loadInit(theme){
  document.querySelectorAll("#load-init").forEach(function(div, index){
	// div = document.getElementById('load-init')
	load = document.createElement('div')
	init = document.createElement('div')
	
	load.style.display = "block"; load.id="pre-loading"
	loadImg = document.createElement('img')
	loadImg.class = "loading"; loadImg.alt=" "; loadImg.width="215"; loadImg.height="50"
  
	init.style.display = "none"; init.id="pre-initializing"
	initImg = document.createElement('img')
	initImg.class = "loading"; initImg.alt=" "; initImg.width="285"; initImg.height="50"
  
	if(theme=="dark"){
	  loadImg.src="/data/img-dark/loading.svg",
	  initImg.src="/data/img-dark/initializing.svg";
	} else {
	  loadImg.src="/data/img/loading.svg",
	  initImg.src="/data/img/initializing.svg";
	}
	load.appendChild(loadImg)
	init.appendChild(initImg)
	div.appendChild(load); div.appendChild(init);		
  })
}

if(typeof(importPrism) != "undefined" && importPrism == true) requireScript('prism-css', '0.1.0', '/data/prism/prism.css', function(){});
changeThemeCSS(localStorage.getItem("quantmlTheme"));
requireScript('auth-css', '0.1.0', '/data/css/authStyle.css', function(){})