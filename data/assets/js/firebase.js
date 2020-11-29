// Load Firebase JS
setTimeout(() => {
    
    loadScript('/data/assets/js/firebase-app.js')
    
    setTimeout(() => {
        loadScript('/data/assets/js/firebase-auth.js')
    
        setTimeout(() => {

            loadScript('/data/assets/js/firebase-firestore.js')

            setTimeout(()=>{
                loadScript('/data/auth/auth.js')
                console.log("AUTH LOADED")
            }, 200)        
            console.log(".store LOADED")
        }, 200)
        console.log(".auth LOADED")
    }, 200)

    console.log(".app LOADED")
}, 100)