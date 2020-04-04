var canvas = document.getElementById("canvas");
var infoCanvas = document.getElementById("info");
var ctx = canvas.getContext("2d");
var ctx2 = infoCanvas.getContext("2d");
var imgs = [];
const complete = 5;

var drawInterval;
var lightX = 540;
var playerX = 230;
var playerY = -80;
var counter = 0;
var stageInfo;

function init(stage) {
	stageInfo = stage;
	loadImg();
}

function loadImg() {
	imgs.push(getImg("img/bg/subway.png", "540", "420"));
	imgs.push(getImg("img/sprite/subway_door_left.png", "49", "88"));
	imgs.push(getImg("img/sprite/subway_door_right.png", "49", "88"));
	imgs.push(getImg("img/sprite/tunnel_light.png", "75", "15"));
	imgs.push(getImg("img/character/gamjeon.png", "400", "160"));
	
	loadCheck();
}

function getImg(src, width, height, x, y) {
	var img = document.createElement("img");
	img.setAttribute("src", src);
	img.setAttribute("width", width);
	img.setAttribute("height", height);
	
	var result = {
		img: img,
		loaded: false,
		loader: function() {
			this.loaded = true;
		}
	}
	result.img.onload = result.loader();
	
	return result;
}

function loadCheck() {
	var count = 0;
	while(true) {
		for(var i = 0; i < imgs.length; i++) {
			if(imgs[i].loaded) {
				count++;
			}
		}
		if(count == complete) {
			console.log("load complete");
			drawInterval = setInterval(draw, 20);
			break;
		} else {
			count = 0;
		}
	}
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx2.clearRect(0, 0, infoCanvas.width, infoCanvas.height);
	
	tunnelLightMove();
	ctx.drawImage(imgs[3].img, lightX, 140);
	ctx.drawImage(imgs[1].img, 77, 135);
	ctx.drawImage(imgs[2].img, 126, 135);
	ctx.drawImage(imgs[0].img, 0, 0);
	drawPlayer();
	
	drawInfo();
	
	counter++;
	if(counter >= 140) {
		clearInterval(drawInterval);
		console.log("interval ended");
	}
}

function tunnelLightMove() {
	if(lightX < -75) {
		lightX = 540;
	} else {
		lightX -= 10;
	}
}

function drawPlayer() {
	if(counter >= 10 && counter < 40) {
		playerY += 10;
	} else if(counter >= 60 && counter < 80) {
		var pitWidth = (counter - 60) * 4;
		ctx.clearRect(270 - pitWidth/2, playerY + 10, pitWidth, 70);
	} else if(counter >= 80) {
		ctx.clearRect(230, playerY + 10, 80, 70);
	}
	if(counter < 100) {
		ctx.drawImage(imgs[4].img, 320, 0, 80, 80, playerX, playerY, 80, 80);
	} else {
		var fallDown = (counter - 100) * 10;
		if(fallDown > 80) {
			fallDown = 80;
		}
		ctx.drawImage(imgs[4].img, 320, 0, 80, 80 - fallDown, playerX, playerY + fallDown, 80, 80 - fallDown);
	}
}

function drawInfo() {
	if(counter == 50) {
		stageInfo++;
	}
	
	for(var i = 0; i < 5; i++) {
		ctx2.fillStyle = (i == stageInfo-1) ? '#C3C3C3' : '#585858';
		ctx2.fillRect(45 + i * 100, 50, 50, 20);
	}
	
	if(counter >= 30 && counter < 50) {
		var headMove = (counter - 30) * 5;
		ctx2.drawImage(imgs[4].img, 240, 0, 80, 80, 30 + (stageInfo-1) * 100 + headMove, 0, 80, 80);
	} else {
		ctx2.drawImage(imgs[4].img, 80, 0, 80, 80, 30 + (stageInfo-1) * 100, 0, 80, 80);
	}
}