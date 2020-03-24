console.log("sound.js has been included.")

var bgm;

function playSE(name) {
	var se = new Audio();
	var source = "sound/SE/"+name+".mp3";
	se.src = source;
	
	se.play();
}

function playBGM(name) {
	bgm = new Audio();
	var source = "sound/BGM/"+name+".mp3";
	bgm.src = source;
	bgm.loop = true;
	
	bgm.play();
}