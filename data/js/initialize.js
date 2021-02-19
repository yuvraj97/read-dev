quantml = {
	theme: localStorage.getItem("quantmlTheme")
}
// Setting Theme
if(quantml["theme"]==null){
	localStorage.setItem("quantmlTheme", "light");
	quantml["theme"] = "light"
}

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

function changeThemeCSS(currentTheme){
	var s = document.createElement('style')
	s.id = "style-theme"
	homeStylesheet = document.getElementById('style-theme')
	if(currentTheme == "dark"){
		e = document.getElementById("main-light-css")
		if(e!=null) e.remove();
		// e = document.getElementById("auth-light-css")
		// if(e!=null) e.remove();
	
		requireScript("main-dark-css", "0.1.0", "/data/css/main-dark.css", function(){})
		// requireScript("auth-dark-css", "0.1.0", "/data/css/authStyle-dark.css", function(){})
		if(homeStylesheet != null) {
			homeStylesheet.remove()
			s.innerHTML = ".book{box-shadow:.1rem .1rem 1.2rem .1rem #000}.btn{background-color:#2d2d2d;box-shadow:.05rem .05rem .5rem .1rem rgb(255,255,255,.6)}.btn.disabled,.btn.disabled:focus,.btn.disabled:hover{box-shadow:.05rem .05rem .5rem 0 rgb(255,166,0,.6)}"
		}
	
	} else {
		e = document.getElementById("main-dark-css")
		if(e!=null) e.remove();
		// e = document.getElementById("auth-dark-css")
		// if(e!=null) e.remove();
		
		requireScript("main-light-css", "0.1.0", "/data/css/main-light.css", function(){})
		// requireScript("auth-light-css", "0.1.0", "/data/css/authStyle-light.css", function(){})
	
		if(homeStylesheet != null) {
			homeStylesheet.remove()
			s.innerHTML = ".book{box-shadow:.1rem .1rem 1.2rem .1rem #003d61}.btn{background-color:#fff;box-shadow:.05rem .05rem .5rem .1rem #003d61}.btn.disabled{box-shadow:.05rem .05rem .5rem .1rem #610000}"
		}
	}
	document.getElementsByTagName("head")[0].appendChild(s);
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

function loadNavBar(){
	nav = document.getElementById('nav')
	ul = document.createElement('ul')
	ul.classList.add('icons')
	if(quantml["theme"]=="light"){
		imgsrc = "/data/img/"
	} else {
		imgsrc = "/data/img-dark/"
  	}
	whiteback = ""
	app_size = "30px"
	if(quantml["theme"]=="dark") app_size = "25px"
	if(quantml["notDesktop"]) app_size = "30px"
	if(quantml["theme"]=="light" && quantml["notDesktop"] == false) whiteback = "whiteback";
	discord_size = "30px"
	linkedin_size = "25px"
	if(quantml["notDesktop"] == true) {
		discord_size = "32px";
		linkedin_size = "30px"
	}
	ul.innerHTML = `<li class="link size"><a rel="noreferrer" target="_blank" class="${whiteback}" href="https://app.quantml.org/statistics/"><img class="app-img" src="${imgsrc}app.webp" alt="App" width="${app_size}" height="${app_size}"></a></li>
	<li class="link"><a rel="noreferrer" target="_blank" class="${whiteback}" href="https://discord.quantml.org/"><img class="discord-img" src="${imgsrc}discord.svg" alt="Discord" width="${discord_size}" height="${discord_size}"></a></li>
	<li class="link size"><a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/yuvraj97/"><img src="${imgsrc}linkedin.webp" alt="LinkedIn" width="${linkedin_size}" height="${linkedin_size}"></a></li>
	<!--<li class="link size"><a rel="noreferrer" target="_blank" href="https://github.com/yuvraj97/"><img src="${imgsrc}github.webp" alt="GitHub"></a></li>-->
	<li id="join-button"><a rel="noreferrer" target="_blank" href="https://www.patreon.com/quantml" class="join join-width">Join <img src="${imgsrc}patreon.webp" alt="Patreon"></a></li>
	<li class="link size" title="Change Theme" ><img onclick="changeTheme()" id="change-theme" src="${imgsrc}change-theme.webp" alt="Change Theme" width="30px" height="30px"></li>
	<li title="Settings" class="jump link size"><img onclick="showSettings()" src="${imgsrc}settings.webp" alt="Settings" width="30px" height="30px"></li>
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
  theme = quantml["theme"]
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

function applyMetaTags(){

	var link = document.createElement('link');
	link.setAttribute("rel", "icon")
	link.setAttribute("href", "/data/icon.png")
	link.setAttribute("type", "image/png")
	link.setAttribute("sizes", "16x16")
    document.getElementsByTagName("head")[0].appendChild(link);

	var meta = document.createElement('meta');
    meta.setAttribute('charset', 'utf-8')
    document.getElementsByTagName("head")[0].appendChild(meta);
	
	var meta = document.createElement('meta');
    meta.name = "title"
    meta.content = document.querySelector('title').innerText
    document.getElementsByTagName("head")[0].appendChild(meta);

	var meta = document.createElement('meta');
    meta.name = "author"
    meta.content = "Yuvraj Garg"
    document.getElementsByTagName("head")[0].appendChild(meta);

    var meta = document.createElement('meta');
    meta.name = "viewport"
    meta.content = "width=device-width, initial-scale=1"
    document.getElementsByTagName("head")[0].appendChild(meta);

    var meta = document.createElement('meta');
    meta.name = "robots"
    meta.content = "index, follow"
    if("meta" in quantml && "allow-robots" in quantml["meta"] && quantml["meta"]["allow-robots"] == false) meta.content = "noindex";
    document.getElementsByTagName("head")[0].appendChild(meta);

	if(!("meta" in quantml)) return;

    var meta = document.createElement('meta');
    meta.name = "description"
    meta.content = quantml["meta"]["description"]
    document.getElementsByTagName("head")[0].appendChild(meta);

	var meta = document.createElement('meta');
	meta.setAttribute("property", "og:type")
    meta.content = "website"
    document.getElementsByTagName("head")[0].appendChild(meta);
	
    var meta = document.createElement('meta');
	meta.setAttribute("property", "og:url")
    meta.content = document.URL.replace("index.html","") // quantml["meta"]["url"]
    document.getElementsByTagName("head")[0].appendChild(meta);

	var meta = document.createElement('meta');
	meta.setAttribute("property", "og:title")
    meta.content = document.querySelector('title').innerText
	document.getElementsByTagName("head")[0].appendChild(meta);
	
	var meta = document.createElement('meta');
	meta.setAttribute("property", "og:description")
    meta.content = quantml["meta"]["description"]
    document.getElementsByTagName("head")[0].appendChild(meta);

    var meta = document.createElement('meta');
	meta.setAttribute("property", "og:image")
    meta.content = quantml["meta"]["image-url"]
    document.getElementsByTagName("head")[0].appendChild(meta);

    var meta = document.createElement('meta');
	meta.setAttribute("property", "twitter:card")
    meta.content = "summary_large_image"
    document.getElementsByTagName("head")[0].appendChild(meta);

	var meta = document.createElement('meta');
	meta.setAttribute("property", "twitter:url")
    meta.content = document.URL.replace("index.html","") //quantml["meta"]["url"]
    document.getElementsByTagName("head")[0].appendChild(meta);

	var meta = document.createElement('meta');
	meta.setAttribute("property", "twitter:title")
    meta.content = document.querySelector('title').innerText
    document.getElementsByTagName("head")[0].appendChild(meta);

	var meta = document.createElement('meta');
	meta.setAttribute("property", "twitter:description")
    meta.content = quantml["meta"]["description"]
    document.getElementsByTagName("head")[0].appendChild(meta);

	var meta = document.createElement('meta');
	meta.setAttribute("property", "twitter:image")
    meta.content = quantml["meta"]["image-url"]
    document.getElementsByTagName("head")[0].appendChild(meta);
}

if(typeof(importPrism) != "undefined" && importPrism == true) requireScript('prism-css', '0.1.0', '/data/prism/prism.css', function(){});
changeThemeCSS(quantml["theme"]);

let check = false;
(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
quantml["notDesktop"] = check
quantml["pagination"]={}