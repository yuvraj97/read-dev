// Load Firebase JS
setTimeout(() => {
    script = document.createElement('script');
    script.src = '/data/assets/js/firebase-app.js';
    document.body.appendChild(script);
    
    setTimeout(() => {
        script = document.createElement('script');
        script.src = '/data/assets/js/firebase-auth.js';
        document.body.appendChild(script);
    
        setTimeout(() => {

            script = document.createElement('script');
            script.src = '/data/assets/js/firebase-firestore.js';
            document.body.appendChild(script);        

            setTimeout(()=>{
                script = document.createElement('script');
                script.src = '/data/auth/auth.js';
                document.body.appendChild(script);    
                console.log("AUTH LOADED")
            }, 500)        
            console.log(".store LOADED")
        }, 100)
        console.log(".auth LOADED")
    }, 100)

    console.log(".app LOADED")
}, 100)