// Load Firebase JS
setTimeout(() => {
    
    loadScript('/data/assets/js/firebase-app.js', 
        fonload = ()=> {
            // console.log("firebase-app.js Loaded");
            loadScript('/data/assets/js/firebase-auth.js',
                fonload = ()=>{
                    // console.log("firebase-auth.js Loaded");
                    loadScript("/data/assets/js/firebase-firestore.js",
                        fonload = ()=>{
                            // console.log("firebase-firestore Loaded");
                            loadScript("/data/assets/js/auth.js",
                                fonload = ()=>{
                                    // console.log("auth.js Loaded" );
                                    ()=> {
                                        console.log("Firebase Loaded");
                                        // if(window.innerWidth <= 980){
                                        //     document.getElementById('login-btn-width').style.width="100%";
                                        //     document.getElementById('join-btn-width').style.width="100%";
                                        //     document.getElementById('logout-btn-width').style.width="100%";
                                        // }                                      
                                    }
                                }
                            )
                        }
                    )
                }
            )
        }
    )

        
    // setTimeout(() => {
    //     loadScript('/data/assets/js/firebase-auth.js', ()=>{console.log("firebase-auth.js Loaded")})
    
    //     setTimeout(() => {

    //         loadScript('/data/assets/js/firebase-firestore.js', ()=>{console.log("firebase-firestore.js Loaded")})

    //         setTimeout(()=>{
    //             loadScript('/data/auth/auth.js', ()=>{console.log("auth.js Loaded")})
    //             console.log("AUTH LOADED")
    //         }, 500)
    //         console.log(".store LOADED")
    //     }, 200)
    //     console.log(".auth LOADED")
    // }, 200)

    // console.log(".app LOADED")
}, 100)