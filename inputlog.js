var w = false;
var a = false;
var s = false;
var d = false;
var q = false;
var e = false;
var f = false;
var p = false;
var space = false;
var shift = false;
var slash = false;
var t = false;
var ctrl = false;
var rightMouse = false;
var leftMouse = false;
var r = false;
var k = false;
var l = false;

var inText = true;

var playerBrickIndex = 0;

const gameWindow = document.getElementById("gameWindow");
const webgl = gameWindow.getContext("webgl2");
var program = webgl.createProgram();

window.addEventListener("beforeUnload", function(unload){
	unload.preventDefault();
});

window.addEventListener("keydown", function(key){
	if(key.code == "KeyR"){
		r = true;
	};
	if(key.code == "KeyW"){
		w = true;
		key.preventDefault();
	};
	if(key.code == "KeyA"){
		a = true;
		key.preventDefault();
		
	};
	if(key.code == "KeyS"){
		s = true;
		key.preventDefault();
		
	};
	if(key.code == "KeyD"){
		d = true;
		key.preventDefault();
		
	};
	if(key.code == "Space"){
		space = true;
		key.preventDefault();
	};
	if(key.code == "KeyQ"){
		q = true;
	};
	if(key.code == "KeyE"){
		e = true;
	};
	if(key.code == "KeyT"){
		t = true;
	};
	if(key.code == "KeyP"){
		p = true;
		
	};
	if(key.code == "Slash"){
		slash = true;
	};
	if(key.code == "ShiftLeft"){
		shift = true;
		
	};
	if(key.code == "ControlLeft"){
		ctrl = true;
		
	};
	if(key.code == "KeyF"){
		f = true;
		
		if(gameWindow.requestFullscreen){
			gameWindow.requestFullscreen();
		};
	};
	
	if(key.code == "KeyK"){
		k = true;
	};
	if(key.code == "KeyL"){
		l = true;
	};
});

window.addEventListener("keyup", function(key){
	if(inText == false){
		key.preventDefault();
	};
	if(key.code == "KeyR"){
		r = false;
	};
	if(key.code == "KeyW"){
		w = false;
	};
	if(key.code == "KeyA"){
		a = false;
	};
	if(key.code == "KeyS"){
		s = false;
	};
	if(key.code == "KeyD"){
		d = false;
	};
	if(key.code == "Space"){
		space = false;
	};
	if(key.code == "KeyQ"){
		q = false;
	};
	if(key.code == "KeyE"){
		//e = false;
	};
	if(key.code == "ShiftLeft"){
		shift = false;
	};
	if(key.code == "ControlLeft"){
		ctrl = false;
	};
	if(key.code == "KeyF"){
		f = false;
	};
	if(key.code == "KeyK"){
		k = false;
	};
	if(key.code == "KeyL"){
		l = false;
	};
	if(key.code == "KeyT"){
		t = false;
	};
});