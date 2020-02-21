var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var bg = document.getElementById("bg");
var doorLeft = document.getElementById("doorLeft");
var doorRight = document.getElementById("doorRight");
var tunnelLight = document.getElementById("tunnelLight");
var gamjeon = document.getElementById("gamjeon");
var zzz = document.getElementById("zzz");
var surprised = document.getElementById("surprised");

var prologueFlag = false;
var tunnelLightFlag = true;
var zzzFlag = false;
var doorMoveFlag = false;
var surprisedFlag = false;

var xLeft = 77;
var xRight = 126;
var xLight = 500;

var zzzChk = 0;
var doorChk = 0;

document.addEventListener("keydown", keyDown, false);

window.onload = function() {
	ctx.drawImage(bg, 0, 0);
};

function keyDown(e) {
	var key = e.keyCode;

	if (key == 13 && !prologueFlag) {
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
}

function drawStaticImage() {
	if (!doorMoveFlag) {
		ctx.drawImage(doorLeft, xLeft, 125);
		ctx.drawImage(doorRight, xRight, 125);
	}

	ctx.drawImage(bg, 0, 0);
	ctx.drawImage(gamjeon, 246, 145);

	if (zzzFlag) {
		ctx.drawImage(zzz, 261, 115);
	}
	if (surprisedFlag) {
		ctx.drawImage(surprised, 261, 115);
	}
}

function drawTunnelLight() {
	xLight -= 10;

	if (xLight < -75) {
		xLight = 500;
		zzzChk++;
	}
	if (zzzChk > 7) {
		zzzFlag = true;
	}

	ctx.drawImage(tunnelLight, xLight, 130);
}

function doorMove() {
	xLeft -= 5;
	xRight += 5;

	doorChk++;

	ctx.drawImage(doorLeft, xLeft, 125);
	ctx.drawImage(doorRight, xRight, 125);

	if (doorChk > 7) {
		doorMoveFlag = false;
	}
}

function blackout() {
	if (zzzChk > 10 && zzzChk < 15) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	} else if (zzzChk == 15) {
		zzzChk++;
		tunnelLightFlag = false;
		doorLeft.src = "img/sprite/subway_door_left_dark.png";
		doorRight.src = "img/sprite/subway_door_right_dark.png";
		bg.src = "img/bg/subway_dark.png";
		setTimeout(function() {
			zzzFlag = false;
			surprisedFlag = true;
			doorMoveFlag = true;
			setTimeout(prologueEnd, 1000);
		}, 3000);
	}
}

function prologueEnd() {
	var form = document.createElement("form");
	form.setAttribute("charset", "UTF-8");
	form.setAttribute("method", "Post");
	form.setAttribute("action", "http://localhost:8888/game");

	var hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("name", "posted");
	hiddenField.setAttribute("value", "GAMJEON");
	form.appendChild(hiddenField);

	document.body.appendChild(form);

	form.submit();
}