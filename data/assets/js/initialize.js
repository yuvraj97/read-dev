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
    console.log("files is CSS")
    var e = document.createElement('link');
    e.rel="stylesheet"
    e.id=name
	  e.href = url
  } else {
    console.log("files is JS")
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
    console.log("fatching", name)
    _loadScript(url, name, version, callback);
  } else {
    console.log(name, "LOGGED")
    _injectScript(c, url, name, version, callback);
  }
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
		
		requireScript("main-dark-css", "0.1.0", "/data/assets/css/main-dark.css", function(){})
		requireScript("auth-dark-css", "0.1.0", "/data/assets/css/authStyle-dark.css", function(){})
	} else {
		e = document.getElementById("main-dark-css")
		if(e!=null) e.remove();
		e = document.getElementById("auth-dark-css")
		if(e!=null) e.remove();
		
		requireScript("main-light-css", "0.1.0", "/data/assets/css/main-light.css", function(){})
		requireScript("auth-light-css", "0.1.0", "/data/assets/css/authStyle-light.css", function(){})
	}	
}

function initializeBody(){
    console.log("initializeBody()")
    theme = localStorage.getItem("quantmlTheme")
    preload = document.getElementById('pre-loading')
    preinit = document.getElementById('pre-initializing')
    // console.log(preload)
    if(theme=="dark"){
        preinit.childNodes[0].src = '/data/img-dark/initializing.gif'
        preload.childNodes[0].src = "/data/img-dark/loading.gif"
    } else {
        preinit.childNodes[0].src = '/data/img/initializing.gif'
        preload.childNodes[0].src = "/data/img/loading.gif"
    }
    preload.style.display="block"
}

function loadNavBar(ID){
    navBarIcons = document.getElementById(ID)
	if(localStorage.getItem("quantmlTheme")=="light"){
		imgsrc = "/data/img/"
	} else {
		imgsrc = "/data/img-dark/"
	}
	navBarIcons.innerHTML = `<li><a rel="noreferrer" target="_blank" href="https://app.quantml.org/stats/"><img src="${imgsrc}app.png" alt="App"></a></li>
	<li><a rel="noreferrer" target="_blank" href="https://join.slack.com/t/quantml-org/shared_invite/zt-jffw86bo-6M260iyt1q2MgBma9elewg"><img class="whiteback" src="${imgsrc}slack.png" alt="Slack"></a></li>
	<li><a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/yuvraj97/"><img src="${imgsrc}linkedin.png" alt="LinkedIn"></a></li>
	<li><a rel="noreferrer" target="_blank" href="https://github.com/yuvraj97/"><img src="${imgsrc}github.png" alt="GitHub"></a></li>
	<li style="display: none; text-align: center;" id="fb-loading"><img class="fb-loading" src="${imgsrc}fb-loading.gif" alt="Loading..."></li>
	<li style="display: none;" id="login-button"><button id="login-btn-width" class="login-logout-join" >Login <img src="${imgsrc}patreon.png" alt="Patreon"></button></li>
	<li style="display: none;" id="join-button"><button onclick=" window.open('https://www.patreon.com/quantml','_blank','noopener')" id="join-btn-width" class="login-logout-join" >Join <img src="${imgsrc}patreon.png" alt="Patreon"></button></li>
	<li style="display: none;" id="logout-button"><button id="logout-btn-width" class="login-logout-join" >Logout <img src="${imgsrc}patreon.png" alt="Logout"></button></li>
	<li title="Change Theme"><a style="cursor: pointer;"><img id="change-theme" src="${imgsrc}change-theme.png" alt="Change Theme"></a></li>
	<li title="Settings" class="settings jump"><img onclick="showSettings()" src="${imgsrc}setings.png" alt="Settings" width="25px" height="25px"></li>
	`
}

changeThemeCSS(localStorage.getItem("quantmlTheme"));