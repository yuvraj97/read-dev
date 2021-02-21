if("chapterID" in quantml) requireScript('chapter-js', '0.1.3', '/data/js/chapter.js', function(){});


// Functions

async function encryptMessage(message) {
	msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
	hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
	hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
	hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
	return hashHex;
}
// const encrypted_msg = await encryptMessage("text");
// console.log(encrypted_msg);

function changePageWidth(size){
	if(size=="large"){
		document.getElementById('nav').style.maxWidth="100%"
		document.getElementById('main').style.maxWidth="100%"
		localStorage.setItem("page-width", "100%")
	} else if(size=="medium"){
		document.getElementById('nav').style.maxWidth="82rem"
		document.getElementById('main').style.maxWidth="82rem"
		localStorage.setItem("page-width", "82rem")
	} else if(size=="small"){
		document.getElementById('nav').style.maxWidth="72rem"
		document.getElementById('main').style.maxWidth="72rem"
		localStorage.setItem("page-width", "72rem")
	}

}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function get_loader_img_str(which = "login"){
	if(quantml["theme"]=="light"){
		var src = `/data/img/loading-${which}.svg`;
	} else {
		var src = `/data/img-dark/loading-${which}.svg`;
	}
	return `<img style="-webkit-transform: translateY(.6rem); transform: translateY(.6rem);" src="${src}" alt="..." width="30px" height="30px"/>`
}

// ***************************************************************
// Font Settings
// ***************************************************************

function getFontSize(){
	return parseInt(localStorage.getItem('paragraph-font-size'));
}

function incrementFontSize(){
	localStorage.setItem('paragraph-font-size', getFontSize() + 1);
}

function decrementFontSize(){
	localStorage.setItem('paragraph-font-size', getFontSize() - 1)
}

function resetFontSize(){
	if(screen.width < 500){
		localStorage.setItem('paragraph-font-size', "14");
	} else {
		localStorage.setItem('paragraph-font-size', "16");
	}
}

function setFontSize(){
	document.getElementById('paragraph-content').style.fontSize = localStorage.getItem('paragraph-font-size') + "px";
}

// ***************************************************************
// Functions
// ***************************************************************

function showSettings(){
	setDisplay('settings-model', 'block');
	document.querySelector('body').classList.remove('is-navPanel-visible');
}

function setDisplay(ID, disp){
	elements = document.querySelectorAll('#'+ID)
	elements.forEach(function(element,index){
			element.style.display=disp;
	})
	// if(elements.length == 0) { console.log(ID, "is missing!") }
}

function getDisplay(){
	if(screen.width <= 980){
		return "block";
	} else {
		return "";
	}
}

function clearModelOnBackgroundClick(modal){
	// When the user clicks anywhere outside of the modal, close it
	document.addEventListener('mousedown',function(event){
		// console.log(event.target)
		// For Settings, Login
		for (let idx = 0; idx < modal.length; idx++) {
			if (event.target == modal[idx]) {
				setDisplay()
				modal[idx].style.display = "none";
			}
		}

		// For Nav Panel
		if(event.target.id != "navPanel" && event.target.id != "navPanelToggle" && event.target.nodeName != "NAV") {
			document.querySelector('body').classList.remove('is-navPanel-visible');
		}
	})
}

function changeTheme() {
	currentTheme = quantml["theme"];
	if(currentTheme == "light"){
		// console.log("Light2Dark");
		changeThemeCSS("dark")
		loadCorrectThemeImages("dark")
		localStorage.setItem("quantmlTheme", "dark");
		quantml["theme"] = "dark";
	}
	else if (currentTheme == "dark"){
		// console.log("Dark2Light");
		changeThemeCSS("light")
		loadCorrectThemeImages("light")
		localStorage.setItem("quantmlTheme", "light");
		quantml["theme"] = "light";
	}
}

function loadCorrectThemeImages(currentTheme){
	images = document.querySelectorAll('img')
	if(currentTheme == "light"){
		for (let index = 0; index < images.length; index++) {
			// console.log(images[index].src,"->", images[index].src.replace("/img-dark/","/img/"))
			if(images[index].src.search("/img-dark/")!=-1) images[index].src = images[index].src.replace("/img-dark/","/img/");
		}
	} else if(currentTheme == "dark"){
		for (let index = 0; index < images.length; index++) {
			// console.log(images[index].src,"->", images[index].src.replace("/img/","/img-dark/"))
			if(images[index].src.search("/img/")!=-1) images[index].src = images[index].src.replace("/img/","/img-dark/");
		}
	}
}

function isInputRequires(){
	models = [
	]
	for (let index = 0; index < models.length; index++) {
		element = models[index];
		if(typeof(element) !="undefined" && element.style.display=="block"){
			return true
		}
	}
	isactive = [
		document.getElementById('patreon-suggestion')
	]
	for (let index = 0; index < isactive.length; index++) {
		element = isactive[index];
		if(typeof(element) !="undefined" && document.activeElement===element){
			return true
		}
	}
	
	return false

}

function katexLoaded(){
	setDisplay('pre-loading', 'none')
	setDisplay('pre-initializing', 'none')
	loadCorrectThemeImages(quantml["theme"]);
	if(localStorage.getItem('paragraph-font-size') == null) resetFontSize();
	setFontSize()
	setDisplay('paragraph-content', 'block')
}

function isInViewport(element) {
	const rect = element.getBoundingClientRect();
	if(rect.top == 0 && rect.left == 0 && rect.bottom == 0 && rect.right == 0) return false;
    return (
        rect.top + 400 >= 0 &&
        rect.left + 100 >= 0 &&
        rect.bottom - 400 <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right - 100 <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function loadQuantmlKatexDisplay(){

	elements = document.querySelectorAll('.quantml-katex-display')
	quantml["katex"] = {
		"elements": [],
		"status": []
	}
	for (let index = 0; index < elements.length; index++) {
		quantml["katex"]["elements"].push(elements[index])
		quantml["katex"]["status"].push(false)
	}

	handler = function(){
		// console.log("Running handler")
		for (let index = 0; index < quantml["katex"]["elements"].length; index++) {
			if(quantml["katex"]["status"][index]==false && isInViewport(quantml["katex"]["elements"][index])){
				// console.log(quantml["katex"]["elements"][index])
				// console.log(quantml["katex"]["elements"][index].getBoundingClientRect())
				quantml["katex"]["status"][index] = true
				renderMathInElement(quantml["katex"]["elements"][index])
			}
		}
	}

	if (window.addEventListener) {
		addEventListener('DOMContentLoaded', handler, false);
		addEventListener('load', handler, false);
		addEventListener('scroll', handler, false);
		addEventListener('resize', handler, false);
	} else if (window.attachEvent)  {
		attachEvent('onDOMContentLoaded', handler); // Internet Explorer 9+ :(
		attachEvent('onload', handler);
		attachEvent('onscroll', handler);
		attachEvent('onresize', handler);
	}

	document.querySelectorAll('details').forEach(function(element, index_){
		element.addEventListener('click', function(){
			elements = element.querySelectorAll('.quantml-katex-display')
			// console.log(elements)
			for (let index = 0; index < elements.length; index++) {
				idx = quantml["katex"]["elements"].indexOf(elements[index])
				// console.log("idx", idx)
				// console.log("element", elements[index])

				if(idx != -1 && quantml["katex"]["status"][idx] == false){
					quantml["katex"]["status"][idx] = true
					renderMathInElement(elements[index])
				}
			}
		})
	});

}

function loadKatex(isKatexImportant, callback){
	if(localStorage.hasOwnProperty('katex-js') == false && isKatexImportant == true){
		setDisplay('pre-loading', 'none')
		setDisplay('pre-initializing', 'block')
	}
	requireScript('katex-css', '0.6.0', '/data/katex/katex.min.css', function(){})
	requireScript('katex-js', '0.6.0','/data/katex/katex.min.js', function(){
		requireScript('auto-render-js', '0.6.0','/data/katex/auto-render.min.js', function(){
			loadQuantmlKatexDisplay();
			if(isKatexImportant) katexLoaded();
			if(callback) callback();
		})
	})
}

function isClassNamePresent(node, className){
	while(node.localName!="body"){
		// console.log(node)
		var isClassPresent = false
		className.forEach(function(element, index){
			if(node.classList.contains(element)){
				// console.log(node.classList, "CONTAINS", element)
				isClassPresent = true
				return
			}
		})
		if(isClassPresent) return true;
		node = node.parentElement
	}
	return false

}

function createImageModals(){
	document.addEventListener('click',function(e){
		// console.log(e.target)
		if(e.target.id=="image-modal"){
			setDisplay('image-modal', 'none')
		}
	})
	document.addEventListener("keydown", function(evt) {
		if(evt.code == "Escape") {
			setDisplay('image-modal', 'none')
		}
	})
	document.querySelectorAll('.full-size-img').forEach(function(element,index){
		element.addEventListener('click', function(e) {
			div = document.createElement('div')
			div.id = 'image-modal'
			div.setAttribute('class', 'modal')
			div.innerHTML = `
			<div class="image-content animate" style="width:${element.width}px; height:${element.height}px;">
				<!--<a class="close" style="float: right; padding-top: 0%; padding-bottom: 0%;" onclick="setDisplay('image-modal', 'none')">X</a>-->
				<img class="full-size-img" src="${element.src}" alt="">
			</div>`
			div.style.display="block"
			document.getElementById("paragraph-content").appendChild(div);
			// something forgot--- leave it
		});
	});
}

function paginationButton(){
	btnContainer = document.querySelectorAll('#btn-container')
	if(btnContainer.length !=0 && btnContainer[0].innerHTML == '') {
		btnContainerHTML = ''
		if("prev" in  quantml["pagination"]) btnContainerHTML += `<a href="${quantml["pagination"]["prev"]["path"]}"><button id="prev-btn" class="button">&#x25C0;&nbsp;&nbsp; ${quantml["pagination"]["prev"]["title"]}</button></a>`;
		if("next" in  quantml["pagination"]) btnContainerHTML += `<a href="${quantml["pagination"]["next"]["path"]}"><button id="next-btn" class="button"  style="float: right;">${quantml["pagination"]["next"]["title"]}&nbsp;&nbsp;&#x25B6;</button></a>`;
		
		btnContainer.forEach(function(element, index){
			element.innerHTML=btnContainerHTML
		})

		btnContainer = document.querySelectorAll('#btn-container-top')
		if("next" in  quantml["pagination"] && "prev" in  quantml["pagination"]){
			btnContainer.forEach(function(element, index){
				element.innerHTML=`
				<a href="${quantml["pagination"]["prev"]["path"]}"><button id="prev-btn" class="button">&#x25C0;&nbsp;&nbsp; ${quantml["pagination"]["prev"]["title"]}</button></a>
				<a href="${quantml["pagination"]["next"]["path"]}"><button id="next-btn" class="button"  style="float: right;">${quantml["pagination"]["next"]["title"]}&nbsp;&nbsp;&#x25B6;</button></a>
				`
			})
		}
	}
}

function applyAnalytics(){
	var s = document.createElement('script');
	s.async = true
	s.src = "https://www.googletagmanager.com/gtag/js?id=G-ZYZD5RRP5G"
	document.getElementsByTagName("head")[0].appendChild(s);
	
	script = `window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag('js', new Date());
	
	  gtag('config', 'G-ZYZD5RRP5G');`
	var s = document.createElement('script');
	var scriptContent = document.createTextNode(script);
	s.appendChild(scriptContent);
	document.getElementsByTagName("head")[0].appendChild(s);
}

function fullyLoaded(){
	extraWork()
	paginationButton()
	createImageModals()
	
	// Set Next-Prev btn width
	btnContainer = document.querySelectorAll('#btn-container')
	if(btnContainer.length != 0) {
		const nextPrevBtnWidthInterval = setInterval(function(){
			btnContainer = document.querySelectorAll('#btn-container')
			// console.log(btnContainer)
			// console.log("nextPrevBtnWidthInterval", btnContainer[1].offsetWidth)
			if(btnContainer[1].offsetWidth != 0) {
				prev = document.querySelectorAll('#prev-btn')
				next = document.querySelectorAll('#next-btn')
				// console.log(prev)
				if(prev.length!=0 && next.length!=0){
					// console.log(prev[1].offsetWidth , next[1].offsetWidth , btnContainer[1].offsetWidth)
					if(prev[1].offsetWidth + next[1].offsetWidth > btnContainer[1].offsetWidth) {
						prev[0].style.display="block";
						next[0].style.display="block";
						prev[0].style.width="100%";
						next[0].style.width="100%";
						next[0].style.marginTop="5px"

						prev[1].style.display="block";
						next[1].style.display="block";
						prev[1].style.width="100%";
						next[1].style.width="100%";
						next[1].style.marginTop="5px"
						next[1].style.marginBottom="15px"
					}
				} else if(prev.length!=0) {
					if(prev[1].offsetWidth > btnContainer[1].offsetWidth * 0.75){
						prev[0].style.display="block";
						prev[0].style.width="100%";
						prev[1].style.display="block";
						prev[1].style.width="100%";
					}
				}
				clearInterval(nextPrevBtnWidthInterval)
			}
			// clearInterval(nextPrevBtnWidthInterval);	
		}, 50)
	}


	imgsrc = "img"
	if(quantml["theme"] == "dark") imgsrc = "img-dark";
	document.getElementById('modals-html').innerHTML =`
	<!--=============== SETTINGS[START] ===============-->

	<div id="settings-model" class="modal">
		<div class="modal-content animate">
			<a class="close" style="float: right; padding-top: 0%; padding-bottom: 0%;" onclick="setDisplay('settings-model', 'none')">X</a>
			<div class="container settings" style="margin: 1rem;">
				<!--<h2 style="text-align: center; display:block">Settings</h2>-->
				<b>Font size</b> &nbsp;
				<button class="button" onclick="incrementFontSize();setFontSize()">+</button>
				<button class="button" onclick="decrementFontSize();setFontSize()">-</button>
				<button class="button" onclick="resetFontSize();setFontSize()">Reset</button>
				<br>
				<!--<h2 style="text-align: center; display:block">Navigation</h2>-->
				<!--<span class="bb">Navigation</span>-->
				<div id="desktop-mode">
					<b>Page size</b>
					<button class="button" onclick="changePageWidth('small')">Small</button>
					<button class="button" onclick="changePageWidth('medium')">Medium</button>
					<button class="button" onclick="changePageWidth('large')">Large</button>
				</div>
				<hr>
				<div id="desktop-mode">
					Press <span class="bb">D</span> to change theme. <br>
					Press <span class="bb">&larr;</span> to go to previous page. <br>
					Press <span class="bb">&rarr;</span> to go to next page. <br>
					Press <span class="bb">+</span> to increase font size. <br>
					Press <span class="bb">-</span> to decrease font size. <br>
				</div>
				<div id="mobile-mode">
					<span class="bb">Swipe Right</span> to go to previous page. <br>
					<span class="bb">Swipe Left </span> to go to next page. <br>
				</div>
				<button style="float: right" class="button" onclick="localStorage.clear();location.reload()">Reinitialize</button>
				<br>
			</div>
		</div>
	</div>

	<!--=============== SETTINGS[END] ===============-->
	`;

	var modal = [
			document.getElementById("settings-model"),
			document.getElementById("UPI-QR"),
		];

	clearModelOnBackgroundClick(modal);

	// Menu Button Navbar
	document.getElementById('navPanelToggle').addEventListener('click',function(){
		document.querySelector('body').classList.add('is-navPanel-visible');
	})

	document.addEventListener('scroll', function(e) {
		// console.log("scroll List...", window.scrollY)
		if(window.scrollY > 100){
			// console.log("ALT")
			document.getElementById('navPanelToggle').classList.add('alt')
		} else {
			document.getElementById('navPanelToggle').classList.remove('alt')
		}
	});

	window.keydowns = {"ctrl": false, "alt": false}

	document.addEventListener("keyup", function(evt) {
		// console.log(evt.code)
		// console.log("CTRL:",window.keydowns["ctrl"])
		if(isInputRequires()){
			// PASS
		} else if(evt.code == "KeyD"){
			changeTheme()
		} else if(evt.code == "NumpadSubtract" && window.keydowns["ctrl"] != true){
			decrementFontSize();setFontSize()
		} else if(evt.code == "NumpadAdd" && window.keydowns["ctrl"] != true){
			incrementFontSize();setFontSize()
		} else if(evt.code == "ControlLeft" || evt.code == "ControlRight"){
			window.keydowns["ctrl"] = false;
		} else if(evt.code == "AltLeft" || evt.code == "AltRight"){
			window.keydowns["alt"] = false;
		}
	})
	document.addEventListener("keydown", function(evt) {
		evt = evt || window.event;
		// console.log(evt)
		// console.log("DOWN", evt.code)
		if(evt.code == "Escape") {
			for (let idx = 0; idx < modal.length; idx++) {
				modal[idx].style.display = "none";
			}
		} else if(isInputRequires()){
			// PASS
		} else if(evt.code == "ControlLeft" || evt.code == "ControlRight"){
			window.keydowns["ctrl"] = true;
		} else if(evt.code == "AltLeft" || evt.code == "AltRight"){
			window.keydowns["alt"] = true;
		} else if(evt.code == "ArrowRight" && "right" in quantml["pagination"] && window.keydowns["alt"] != true){
			window.location.href = quantml["pagination"]["right"]
		} else if(evt.code == "ArrowLeft" && "left" in quantml["pagination"] && window.keydowns["alt"] != true){
			window.location.href = quantml["pagination"]["left"]
		}
	})

	document.addEventListener('swiped-left', function(e) {
		// console.log(e.target); // element that was swiped
		// console.log(e.detail); // event data { dir: 'left', xStart: 196, xEnd: 230, yStart: 196, yEnd: 4 }
		if(window.innerWidth - e.detail.xStart < 10) document.querySelector('body').classList.add('is-navPanel-visible');
		else if( !e.target.classList.contains("language-python") &&
			!e.target.classList.contains("language-julia") &&
			!e.target.classList.contains("token")  &&
			!isClassNamePresent(e.target, ["math-container", "modal", "code-toolbar", "table-wrapper"])  ){
				if("right" in quantml["pagination"]) window.location.href = quantml["pagination"]["right"];
				// console.log("GO LEFT")
			}
	});

	document.addEventListener('swiped-right', function(e) {
		// console.log(e.target); // element that was swiped
		// console.log(e.detail); // event data { dir: 'left', xStart: 196, xEnd: 230, yStart: 196, yEnd: 4 }
		if( !e.target.classList.contains("language-python") &&
			!e.target.classList.contains("language-julia") &&
			!e.target.classList.contains("token")  &&
			!isClassNamePresent(e.target,  ["math-container", "modal", "code-toolbar", "table-wrapper"]) ){
                if("left" in quantml["pagination"]) window.location.href = quantml["pagination"]["left"];
				// console.log("GO RIGHT")
			}
	});

	// Show Content acc. to Device
	if(quantml["notDesktop"]) {
		setDisplay('desktop-mode', "none")
		setDisplay('mobile-mode', "block")
	} else {
		setDisplay('desktop-mode', "block")
		setDisplay('mobile-mode', "none")
	}
}

function extraWork(){
	applyAnalytics()
	requireScript('dwin-js', '0.1.3', 'https://www.dwin2.com/pub.838437.min.js', function(){})
}

function cssLoaded(isKatexImportant = true, callback){
	// d = new Date();end = d.getTime();  // Remove it
	// console.log("CSS Load time:",end-start)  // Remove it
	setTimeout(function(){
		requireScript('swiped-events-js', '0.1.3', '/data/js/swiped-events.js', function(){})				
		if(typeof(importPrism) != "undefined" && importPrism == true) requireScript('prism-js', '0.1.3', '/data/prism/prism.js', function(){})
	}, 500)
	if(isKatexImportant == true){
		loadKatex(isKatexImportant)
	} else {
		katexLoaded()
		setTimeout(function(){loadKatex()}, 1500)
	}
	fullyLoaded()
	if(callback) callback();
	// d = new Date();end = d.getTime();  // Remove it
	// console.log("Fully Loaded:",end-start)  // Remove it

	extraWork()
}