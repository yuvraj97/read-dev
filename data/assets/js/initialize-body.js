function initializeBody(){
    theme = localStorage.getItem("quantmlTheme")
    body = document.querySelector('body')
    preload = document.getElementById('pre-loading')
    // console.log(preload)
    if(theme=="dark"){
        body.style.backgroundColor = "rgb(45,45,45)"
        e = document.getElementById('pre-initializing')
        e.childNodes[0].src = e.childNodes[0].src.replace('/img/','/img-dark/')
        preload.childNodes[0].src = "/data/img-dark/loading.gif"
    } else {
        body.style.backgroundColor = "#fff"
        preload.childNodes[0].src = "/data/img/loading.gif"
    }
    preload.style.display="block"
}