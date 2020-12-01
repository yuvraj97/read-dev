function _cacheScript(name, url) {
    var xmlhttp = new XMLHttpRequest(); // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          localStorage.setItem(name, JSON.stringify(xmlhttp.responseText));
        } else {
          console.warn('error loading '+url);
        }
      }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }

function _loadScript(url, name, callback) {
  var s = document.createElement('script');

  if (s.readyState) { //IE
    s.onreadystatechange = function() {
      if (s.readyState == "loaded" || s.readyState == "complete") {
        s.onreadystatechange = null;
        _cacheScript(name, url);
        if (callback) callback();
      }
    };
  } else { //Others
    s.onload = function() {
      _cacheScript(name, url);
      if (callback) callback();
      d = new Date();end = d.getTime();console.log(name, "load time", end-start)
    };
  }

  s.setAttribute("src", url);
  document.getElementsByTagName("head")[0].appendChild(s)
}

function _injectScript(content, url, name, callback) {
  var c = JSON.parse(content);
  var s = document.createElement('script');
  s.type = "text/javascript";
  var scriptContent = document.createTextNode(c);
  console.log(c.content)
  s.appendChild(scriptContent);
  document.getElementsByTagName("head")[0].appendChild(s);
  if (callback) callback();
  d = new Date();end = d.getTime();console.log(name, "get time", end-start)
}

function requireScript(name, url, callback) {
  var c = localStorage.getItem(name);
  if (c == null) {
    console.log("fatching", name)
    _loadScript(url, name, callback);
  } else {
      console.log(name, "LOGGED")
    _injectScript(c, url, name, callback);
  }
}
