var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var bg = document.getElementById("bg");
var skip = document.getElementById("skip");
var doorLeft = document.getElementById("doorLeft");
var doorRight = document.getElementById("doorRight");
var tunnelLight = document.getElementById("tunnelLight");
var phead = document.getElementById("phead");
var pbody = document.getElementById("pbody");
var zzz = document.getElementById("zzz");
var confused = document.getElementById("confused");

var prologueFlag = false;
var tunnelLightFlag = true;
var zzzFlag = false;
var doorMoveFlag = false;
var confusedFlag = false;
var surprisedFlag = false;
var playerMoveFlag = false;

var playerX = 246;
var playerY = 155;
var leftX = 77;
var rightX = 126;
var lightX = 540;

var zzzChk = 0;
var doorChk = 0;

document.addEventListener("keydown", keyDown, false);

window.onload = function() {
	ctx.drawImage(bg, 0, 0);
};

function keyDown(e) {
	var key = e.keyCode;

	if (key == 13 && !prologueFlag) {
		//playBGM("title");
		prologueFlag = true;
		bg.src = "img/bg/subway.png";
		setInterval(draw, 20);
	} else if (key == 13 && prologueFlag) {
		prologueEnd();
	}
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if (tunnelLightFlag) {
		drawTunnelLight();
	}

	if (doorMoveFlag) {
		doorMove();
	}

	drawStaticImage();

	blackout();
	
	ctx.drawImage(skip, canvas.width - skip.width - 20, canvas.height - skip.height - 20);
	
	if(playerMoveFlag) {
		playerMove();
	}
}

function drawStaticImage() {
	if (!doorMoveFlag) {
		ctx.drawImage(doorLeft, leftX, 135);
		ctx.drawImage(doorRight, rightX, 135);
	}

	ctx.drawImage(bg, 0, 0);
	ctx.drawImage(pbody, playerX, playerY);
	ctx.drawImage(phead, playerX, playerY);

	if (zzzFlag) {
		ctx.drawImage(zzz, 261, 125);
	}
	if (confusedFlag) {
		ctx.drawImage(confused, 261, 125);
	}
	if (surprisedFlag) {
		ctx.drawImage(surprised, playerX + 15, playerY - 30);
	}
}

function drawTunnelLight() {
	lightX -= 10;

	if (lightX < -75) {
		lightX = 540;
		zzzChk++;
	}
	if (zzzChk > 3) {
		zzzFlag = true;
	}

	ctx.drawImage(tunnelLight, lightX, 140);
}

function doorMove() {
	leftX -= 5;
	rightX += 5;

	doorChk++;

	ctx.drawImage(doorLeft, leftX, 135);
	ctx.drawImage(doorRight, rightX, 135);

	if (doorChk > 7) {
		doorMoveFlag = false;
	}
}

function blackout() {
	if (zzzChk > 5 && zzzChk < 7) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	} else if (zzzChk == 7) {
		zzzChk++;
		tunnelLightFlag = false;
		doorLeft.src = "img/sprite/subway_door_left_dark.png";
		doorRight.src = "img/sprite/subway_door_right_dark.png";
		bg.src = "img/bg/subway_dark.png";
		setTimeout(function() {
			doorMoveFlag = true;
			setTimeout(function() {
				zzzFlag = false;
				confusedFlag = true;
			}, 500);
			setTimeout(function() {
				confusedFlag = false;
				playerMoveFlag = true;
			}, 1500);
		}, 3000);
	}
}

function playerMove() {
	if(playerX > 86) {
		phead.src = "img/character/gamjeon_head_left.png";
		pbody.src = "img/character/gamjeon_body_left.png";
		playerX -= 5;
	} else if(playerY > 125) {
		phead.src = "img/character/gamjeon_head_back.png";
		pbody.src = "img/character/gamjeon_body_back.png";
		playerY -= 5;
	} else {
		playerMoveFlag = false;
		surprisedFlag = true;
		setTimeout(function() {
			surprisedFlag = false;
			playerY = 500;
			setTimeout(prologueEnd, 1000);
		}, 1000);
	}
}

function prologueEnd() {
	var form = document.createElement("form");
	form.setAttribute("charset", "UTF-8");
	form.setAttribute("method", "Post");
	form.setAttribute("action", "/game");

	var hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("name", "posted");
	hiddenField.setAttribute("value", "gamjeon");
	form.appendChild(hiddenField);

	document.body.appendChild(form);

	form.submit();
}