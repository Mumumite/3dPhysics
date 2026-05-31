var currentPhysicsObject = 0;

class vector3{
	constructor(x, y, z){
		this.x = x;
		this.y = y;
		this.z = z;
	};
	
	add(vec3){
		return new vector3(this.x + vec3.x, this.y + vec3.y, this.z + vec3.z);
	};
	
	subtract(vec3){
		return new vector3(this.x - vec3.x, this.y - vec3.y, this.z - vec3.z);
	};
	
	multiply(x){
		return new vector3(this.x * x, this.y * x, this.z * x);
	};
	
	static dotProduct(vec31, vec32){
		return vec31.x * vec32.x + vec31.y * vec32.y + vec31.z * vec32.z;
	};
	
	mag(){
		return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
	};
	
	normal(){
		return new vector3(-this.z, this.y, this.x).unit();
	};
	
	unit(){
		if(this.mag() == 0){
			return new vector3(0, 0, 0);
		}else{
			return new vector3(this.x / this.mag(), this.y / this.mag(), this.z / this.mag());
		};
	};
};

gameWindow.addEventListener("wheel", scrollValue => {
	const zoom = Math.sign(scrollValue.deltaY) * 2;
	cameraDistancePlayer += zoom;
	if(cameraDistancePlayer < 8){
		cameraDistancePlayer = 8;
	};
	console.log(cameraDistancePlayer);
});

var camDirection = glMatrix.vec3.fromValues(Math.cos(yaw * (Math.PI / 180)) * Math.cos(pitch * (Math.PI / 180)), Math.sin(pitch * (Math.PI / 180)), Math.sin(yaw * (Math.PI / 180)) * Math.cos(pitch * (Math.PI / 180)));
var camPos = glMatrix.vec3.fromValues(camX, camY, camZ);
var camFront = glMatrix.vec3.fromValues(0, 0, -1);
var camUp = glMatrix.vec3.fromValues(0, 1, 0);
var camPosFront = glMatrix.vec3.fromValues(0, 0, 0);

window.addEventListener("mousedown", mouseClick => {
	if(mouseClick.buttons == 2){
		rightMouse = true;
		mouseX = mouseClick.clientX - gameWindow.offsetLeft;
		mouseY = mouseClick.clientY - gameWindow.offsetTop;
	};
});

window.addEventListener("mouseup", mouseClick => {
	if(mouseClick.button == 2){
		rightMouse = false;
	};
});

window.addEventListener("contextmenu", mouseClick => {
	mouseClick.preventDefault();
});

window.addEventListener("mousemove", mousePos => {
	mouseX = mousePos.clientX - gameWindow.offsetLeft;
	mouseY = mousePos.clientY - gameWindow.offsetTop;
});

/* height 500 width 400 */
var lastY = 300;
var lastX = 400;
var firstClick = false;
var firstClick2 = false;
var mouseSense = 0.5;
var mouseX = 0;
var mouseY = 0;
var cameraDistancePlayer = 50;
var cameraAnglePlayer = 0;
var yaw = 0;
var pitch = 90;
var forward;
var right;
var up;
var camX = 0;
var camY = 0;
var camZ = 0;
var eyeLevel = 2;


var getCameraPos = function(horizontal, vertical, playerPos){
	var theta = (33.135210686865 * Math.PI / 180) + cameraAnglePlayer;
	var offsetX = horizontal * Math.sin(theta);
	var offsetZ = horizontal * Math.cos(theta);
	camPos = glMatrix.vec3.fromValues(playerPos.x - offsetX, 3 + playerPos.y + vertical, playerPos.z - offsetZ);
};

var mouseInput = function(playerPos){
	if(rightMouse){		
		if (firstClick == false) {
			lastX = mouseX;
			lastY = mouseY;
			firstClick = true;
		}
		
		var newX = mouseX - lastX;
		newX *= mouseSense;
		lastX = mouseX;
		cameraAnglePlayer -= newX * (Math.PI / 180);
		
		var newY = mouseY - lastY;
		newY *= mouseSense;
		lastY = mouseY;
		pitch += newY;
		
		if(pitch < -89){
			pitch = -89;
		}else if(pitch > 89){
			pitch = 89;
		};
		
	}else{
		firstClick = false;
	};

	var horizontalDistance = (cameraDistancePlayer * Math.cos(pitch * (Math.PI / 180)));
	var verticalDistance = (cameraDistancePlayer * Math.sin(pitch * (Math.PI / 180)));
	//console.log(horizontalDistance);
	getCameraPos(horizontalDistance, verticalDistance, playerPos);
	yaw = ((33.135210686865 * Math.PI / 180) + cameraAnglePlayer);
	forward = new vector3(Math.sin(yaw), 0, Math.cos(yaw));
	right = new vector3(Math.sin(yaw - Math.PI / 2), 0, Math.cos(yaw - Math.PI / 2));
};