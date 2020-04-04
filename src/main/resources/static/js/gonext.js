var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var imgs = [];
const complete = 5;
var lightX = 540;
var playerX = 230;
var playerY = -80;
var counter = 0;
var stageInfo;

function init(stage) {
	stageInfo = stage;
	console.log("stageinfo: " + stageInfo);
	loadImg();
}

function loadImg() {
	imgs.push(getImg("img/bg/subway.png", "540", "420"));
	imgs.push(getImg("img/sprite/subway_door_left.png", "49", "88"));
	imgs.push(getImg("img/sprite/subway_door_right.png", "49", "88"));
	imgs.push(getImg("img/sprite/tunnel_light.png", "75", "15"));
	imgs.push(getImg("img/character/gamjeon_lying.png", "80", "80"));
	
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
			setInterval(draw, 20);
			break;
		} else {
			count = 0;
		}
	}
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	tunnelLightMove();
	ctx.drawImage(imgs[3].img, lightX, 140);
	ctx.drawImage(imgs[1].img, 77, 135);
	ctx.drawImage(imgs[2].img, 126, 135);
	ctx.drawImage(imgs[0].img, 0, 0);
	drawPlayer();
	
	counter++;
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
		ctx.clearRect(270 - pitWidth/2, playerY + 10, pitWidth, 60);
	} else if(counter >= 80) {
		ctx.clearRect(230, playerY + 10, 80, 60);
	}
	if(counter < 100) {
		ctx.drawImage(imgs[4].img, playerX, playerY);
	}
}