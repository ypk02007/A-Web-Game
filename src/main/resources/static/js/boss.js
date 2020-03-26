console.log("boss.js has been included");

function bossInit() {
	const numOfBoss = 2;
	var rand = Math.floor(Math.random() * numOfBoss);

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
	
	console.log("rand: " + rand);
	
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
		counter : 0,
		pattern : 0,
		status : {
			life : 20,
			damage : 1,
			speed : 2,
			range : 0
		},
		attack : [],
		move : function() {
			switch(this.counter) {
			case 0:
				this.cropX = 0;
				this.pattern = Math.floor(Math.random() * 2);
				console.log("pattern: " + this.pattern);
				break;
			case 10:
				this.cropX = (this.pattern == 0) ? 320 : 640;
				break;
			case 20:
				if(this.pattern == 0) {
					this.cropX = 400;
				}
				break;
			case 70:
				this.cropX = (this.pattern == 0) ? 0 : 720;
				this.attackPattern();
				break;
			}

			this.counter++;
			
			for(var i = this.attack.length-1; i >= 0; i--) {
				this.attack[i].x += this.attack[i].mx;
				this.attack[i].y += this.attack[i].my;
				if(this.pattern == 0) {
					this.attack[i].cropX += 60;
					if(this.attack[i].cropX >= 240) {
						this.attack[i].cropX = 0;
					}
				}
				if(this.attack[i].x < 0) {
					this.attack.splice(i, 1);
				}
			}
			
			if(this.counter > 170) {
				this.counter = 0;
			}
		},
		setBoxes : function() {
			this.moveBox.x = this.x;
			this.moveBox.y = this.y + 80;
			this.hitBox.x = this.x;
			this.hitBox.y = this.y;
		},
		attackPattern : function() {
			if(this.pattern == 0) {
				var atk = {
					x : this.x + 30,
					y : this.y + 30,
					mx : -4,
					my : 2,
					cropX : 0,
					cropY : 160,
					size : 60
				}
				this.attack.push(atk);
			} else {
				for(var i = 0; i < 3; i++) {
					var atk = {
						x : this.x + 20,
						y : this.y + 60,
						mx : -4,
						my : -2 + i * 2,
						cropX : 240 + i * 40,
						cropY : 160,
						size : 40
					}
					this.attack.push(atk);
				}
			}
		},
		damaged : function(dmg) {
			this.status.life -= dmg;
		}
	}
	
	return boss;
}