setTimeout(() => {
    script = document.createElement('script');
    script.src = '/data/assets/js/firebase-app.js';
    document.body.appendChild(script);
    
    script = document.createElement('script');
    script.src = '/data/assets/js/firebase-auth.js';
    document.body.appendChild(script);
    
    script = document.createElement('script');
    script.src = '/data/assets/js/firebase-firestore.js';
    document.body.appendChild(script);
    
    setTimeout(()=>{
        script = document.createElement('script');
        script.src = '/data/auth/auth.js';
        document.body.appendChild(script);    
        // console.log("AUTH LOADED")
    }, 500)
    
    // console.log("FB LOADED")

}, 100)