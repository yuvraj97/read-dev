// Load Firebase JS
setTimeout(() => {
    
    requireScript('fb-app', '/data/assets/js/firebase-app.js', 
        ()=> {
            // console.log("firebase-app.js Loaded");
            requireScript('fb-auth', '/data/assets/js/firebase-auth.js',
                ()=>{
                    // console.log("firebase-auth.js Loaded");
                    requireScript('fb-store',"/data/assets/js/firebase-firestore.js",
                        ()=>{
                            // console.log("firebase-firestore Loaded");
                            // if(window.innerWidth <= 980){
                            //     document.getElementById('login-btn-width').style.width="100%";
                            //     document.getElementById('join-btn-width').style.width="100%";
                            //     document.getElementById('logout-btn-width').style.width="100%";
                            // }                              

                            // ============================== FIREBASE SETUP [START] ============================== //

                            // Your web app's Firebase configuration
                            var firebaseConfig = {
                                apiKey: "AIzaSyBdgsjeNlaEuDVWVMRXgPOfvm2HEnpRjMQ",
                                authDomain: "statistics-guide.firebaseapp.com",
                                databaseURL: "https://statistics-guide.firebaseio.com",
                                projectId: "statistics-guide",
                            };
                            // Initialize Firebase
                            firebase.initializeApp(firebaseConfig);

                            globalThis.fb_auth = firebase.auth();
                            globalThis.fb_db   = firebase.firestore();

                            globalThis.fb_db.settings({timestampsInSnapshots: true});

                            // Listen For Auth Status Change
                            globalThis.fb_auth.onAuthStateChanged(user=>{
                                if(user) {
                                    // console.log('Logged In :)');
                                    setDisplay('login-button','none');
                                    setDisplay('join-button','none');
                                    setDisplay('logout-button',getDisplay());
                                    setDisplay('secrets',getDisplay());
                                    setDisplay('login-require','none');
                                } else {
                                    // console.log('Logged Out!');
                                    setDisplay('login-button',getDisplay());
                                    setDisplay('join-button',getDisplay());
                                    setDisplay('logout-button','none');
                                    setDisplay('secrets','none');
                                    setDisplay('login-require',getDisplay());
                                }
                            });
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
}, 500)