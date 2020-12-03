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

console.log("initialize-body.js")