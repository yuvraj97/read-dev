function initializeBody(){
    theme = localStorage.getItem("quantmlTheme")
    body = document.querySelector('body')
    preload = document.getElementById('pre-loading')
    preinit = document.getElementById('pre-initializing')
    // console.log(preload)
    if(theme=="dark"){
        body.style.backgroundColor = "rgb(45,45,45)"
        preinit.childNodes[0].src = '/data/img-dark/initializing.gif'
        preload.childNodes[0].src = "/data/img-dark/loading.gif"
    } else {
        body.style.backgroundColor = "#fff"
        preinit.childNodes[0].src = '/data/img/initializing.gif'
        preload.childNodes[0].src = "/data/img/loading.gif"
    }
    preload.style.display="block"
}
initializeBody()