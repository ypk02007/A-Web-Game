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
		img : null,
		counter : 0,
		pattern : 0,
		status : {
			life : 25,
			damage : 1,
			speed : 5,
			range : 0
		},
		attack : [],
		act : function() {
			if(this.counter <= 40 && this.counter%2 == 0) {
				this.move();
			}
			
			switch(this.counter) {
			case 50:
				this.pattern = Math.floor(Math.random() * 2);
				
				var dir = (playerInfo.moveBox.x < this.moveBox.x) ? 0 : 1;
				this.cropX = (this.pattern == 0) ? 320 : 640;
				this.cropX += dir * 160;
				break;
			case 60:
				if(this.pattern == 0) {
					var dir = (playerInfo.moveBox.x < this.moveBox.x) ? 0 : 1;
					this.cropX = 400 + dir * 160;
				}
				break;
			case 110:
				var dir = (playerInfo.moveBox.x < this.moveBox.x) ? 0 : 1;
				this.cropX = (this.pattern == 0) ? 0 : 720;
				this.cropX += dir * 160;
				this.attackPattern();
				break;
			}

			this.counter++;
			
			var remove = [];
			for(var i = 0; i < this.attack.length; i++) {
				this.attack[i].x += this.attack[i].mx;
				this.attack[i].y += this.attack[i].my;
				if(this.pattern == 0) {
					this.attack[i].cropX += 60;
					if(this.attack[i].cropX >= 240) {
						this.attack[i].cropX = 0;
					}
				}
				if(this.attack[i].x < -this.attack[i].size || this.attack[i].x > 540 || this.attack[i].y < -this.attack[i].size || this.attack[i].y > 420) {
					remove.push(i);
				}
			}
			remove = remove.sort(function(a, b) {
				return b-a;
			});
			for(var i = 0; i < remove.length; i++) {
				this.attack.splice(remove[i], 1);
			}
			
			if(this.counter > 210) {
				this.counter = 0;
			}
		},
		move : function() {
			var mx = this.moveBox.x;
			var my = this.moveBox.y;
			var pmx = playerInfo.moveBox.x;
			var pmy = playerInfo.moveBox.y;
			var roomEdge = [30, 360-this.moveBox.height, 60, 480-this.moveBox.width];
			if(pmx > mx + 5) {
				if(this.cropX == 160) {
					this.cropX = 240;
				} else {
					this.cropX = 160;
				}
				if(mx < roomEdge[3]) {
					this.x += this.status.speed;
					this.setBoxes();
				}
			} else if(pmx < mx - 5) {
				if(this.cropX == 0) {
					this.cropX = 80;
				} else {
					this.cropX = 0;
				}
				if(mx > roomEdge[2]) {
					this.x -= this.status.speed;
					this.setBoxes();
				}
			}
			if(pmy > my + 5) {
				if(my < roomEdge[1]) {
					this.y += this.status.speed;
					this.setBoxes();
				}
			} else if(pmy < my - 5) {
				if(my > roomEdge[0]) {
					this.y -= this.status.speed;
					this.setBoxes();
				}
			}
		},
		setBoxes : function() {
			this.moveBox.x = this.x;
			this.moveBox.y = this.y + 80;
			this.hitBox.x = this.x;
			this.hitBox.y = this.y;
		},
		attackPattern : function() {
			if(this.pattern == 0) { // throw a bar
				var pmx = playerInfo.moveBox.x + 30;
				var pmy = playerInfo.moveBox.y + 30;
				var vx = pmx - (this.x + 60);
				var vy = pmy - (this.y + 60);
				var mx;
				var my;
				if(Math.abs(vx) > Math.abs(vy)) {
					mx = (vx > 0) ? 7 : -7;
					my = vy * mx / vx;
				} else {
					my = (vy > 0) ? 7 : -7;
					mx = vx * my / vy;
				}
				var atk = {
					x : this.x + 30,
					y : this.y + 30,
					mx : mx,
					my : my,
					cropX : 0,
					cropY : 160,
					size : 60
				}
				this.attack.push(atk);
			} else { // expel bad passengers
				var pmx = playerInfo.moveBox.x;
				var pmy = playerInfo.moveBox.y;
				var mx = [];
				var my = [];
				
				if(pmy + 60 < this.y && pmx + 30 > this.x - 75 && pmx + 30 < this.x + 75 + this.hitBox.width) {
					for(var i = 0; i < 3; i++) {
						mx.push(-2 + i * 2);
						my.push(-6);
					}
				} else if(pmy > this.y + this.hitBox.height && pmx + 30 > this.x - 75 && pmx + 30 < this.x + 75 + this.hitBox.width) {
					for(var i = 0; i < 3; i++) {
						mx.push(-2 + i * 2);
						my.push(6);
					}
				} else if(pmx + 30 < this.x + this.hitBox.height/2) {
					for(var i = 0; i < 3; i++) {
						mx.push(-6);
						my.push(-2 + i * 2);
					}
				} else {
					for(var i = 0; i < 3; i++) {
						mx.push(6);
						my.push(-2 + i * 2);
					}
				}
				
				for(var i = 0; i < 3; i++) {
					var atk = {
						x : this.x + 20,
						y : this.y + 60,
						mx : mx[i],
						my : my[i],
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