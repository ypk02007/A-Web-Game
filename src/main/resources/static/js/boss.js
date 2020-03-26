console.log("boss.js has been included");

function bossInit() {
	const numOfBoss = 2;
	var rand = Math.floor(Math.random) * numOfBoss;

	var boss;
	switch (rand) {
	case 0:
		boss = subwayAgent();
		boss.img = bossImgInit("agent.png", "960", "220");
		break;
	default:
		boss = subwayAgent();
		boss.img = bossImgInit("agent.png", "960", "220");
	}
	
	return boss;
}

function bossImgInit(src, width, height) {
	var img = document.createElement("img");
	img.setAttribute("src", "img/boss/"+src);
	img.setAttribute("width", width);
	img.setAttribute("height", height);
	return img;
}

function subwayAgent() {
	var boss = {
		name : "SUBWAY AGENT",
		x : 230,
		y : 130,
		cropX : 0,
		cropY : 0,
		moveBox : {
			x : 0,
			y : 0,
			width : 80,
			height : 80
		},
		hitBox : {
			x : 0,
			y : 0,
			width : 80,
			height : 160
		},
		dir : 1,
		img : null,
		patternCounter : 0,
		status : {
			life : 20,
			damage : 1,
			speed : 2,
			range : 0
		},
		attack : [],
		move : function() {
			if(this.patternCounter == 0) {
				var atk = {
					x : this.x + 30,
					y : this.y + 60,
					mx : -4,
					my : 2,
					cropX : 0,
					cropY : 160,
					size : 60
				}
				this.attack.push(atk);
				console.log("attack added");
			}
			this.patternCounter++;
			
			for(var i = 0; i < this.attack.length; i++) {
				this.attack[i].x += this.attack[i].mx;
				this.attack[i].y += this.attack[i].my;
				this.attack[i].cropX += 60;
				if(this.attack[i].cropX >= 240) {
					this.attack[i].cropX = 0;
				}
				if(this.attack[i].x < 0) {
					this.attack.splice(i, 1);
					console.log("attack removed");
				}
			}
			
			if(this.patternCounter > 100) {
				this.patternCounter = 0;
			}
			/*if(this.moveBox.y >= 280) {
				this.dir = 0;
			} else if(this.moveBox.y <= 60) {
				this.dir = 1;
			}
			
			if(this.dir == 0) {
				this.y -= this.status.speed;
			} else {
				this.y += this.status.speed;
			}
			this.setBoxes();*/
			
		},
		setBoxes : function() {
			this.moveBox.x = this.x;
			this.moveBox.y = this.y + 80;
			this.hitBox.x = this.x;
			this.hitBox.y = this.y;
		},
		changeImage : function() {

		},
		damaged : function(dmg) {
			this.status.life -= dmg;
		}
	}
	
	return boss;
}