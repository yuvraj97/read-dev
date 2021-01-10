window.quantml["chapters"] ={
    "central-limit-theorem": {
        run: ()=>{
            // IFRAME [START]
                document.getElementById("recommended-watchings-5").addEventListener("click", function(){
                    iframe = document.getElementById("recommended-watchings-5-iframe")
                    if(iframe.innerHTML==''){
                        setDisplay("loading-iframe-5","block")
                        iframe.innerHTML=`<iframe onload='setDisplay("loading-iframe-5","none")' width="560" height="315" src="https://www.youtube.com/embed/N7wW1dlmMaE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                    }
                })
                document.getElementById("recommended-watchings-4").addEventListener("click", function(){
					iframe = document.getElementById("recommended-watchings-4-iframe")
					if(iframe.innerHTML==''){
						setDisplay("loading-iframe-4","block")
						iframe.innerHTML=`<iframe onload='setDisplay("loading-iframe-4","none")' width="560" height="315" src="https://www.youtube.com/embed/Pujol1yC1_A" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
					}
                })
                document.getElementById("recommended-watchings-3").addEventListener("click", function(){
					iframe = document.getElementById("recommended-watchings-3-iframe")
					if(iframe.innerHTML==''){
						setDisplay("loading-iframe-3","block")
						iframe.innerHTML=`<iframe onload='setDisplay("loading-iframe-3","none")' width="560" height="315" src="https://www.youtube.com/embed/YAlJCEDH2uY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
					}
                })
                document.getElementById("recommended-watchings-2").addEventListener("click", function(){
					iframe = document.getElementById("recommended-watchings-2-iframe")
					if(iframe.innerHTML==''){
						setDisplay("loading-iframe-2","block")
						iframe.innerHTML=`<iframe onload='setDisplay("loading-iframe-2","none")' width="560" height="315" src="https://www.youtube.com/embed/JNm3M9cqWyc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
					}
                })
                document.getElementById("recommended-watchings-1").addEventListener("click", function(){
					iframe = document.getElementById("recommended-watchings-1-iframe")
					if(iframe.innerHTML==''){
						setDisplay("loading-iframe-1","block")
						iframe.innerHTML=`<iframe onload='setDisplay("loading-iframe-1","none")' width="560" height="315" src="https://www.youtube.com/embed/IrKUM3nNXJE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
					}
                })               
            // IFRAME [END]
        }
    }
    // "chapterID": {
    //     run: ()=>{
    //         // IFRAME [START]
    //         // IFRAME [END]
    //     }
    // }
}


window.quantml["chapters"][chapterID].run()