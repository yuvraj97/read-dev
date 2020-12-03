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
          d = new Date();end = d.getTime();console.log(name, "load time", end-start)
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
  d = new Date();end = d.getTime();console.log(name, "get time", end-start)
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
