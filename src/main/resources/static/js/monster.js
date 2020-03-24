console.log("monster.js has been included");

function monsterInit(monsterCode, x, y) {
	var monster;
	var img = document.createElement("img");
	
	switch(monsterCode) {
	case 1:
		img.setAttribute("width", "60");
		img.setAttribute("height", "60");
		img.setAttribute("src", "img/monster/knuckles_0.png");
		monster = knuckles(img, x, y);
		break;
	case 2:
		img.setAttribute("width", "60");
		img.setAttribute("height", "60");
		img.setAttribute("src", "img/monster/sonic_0.png");
		monster = sonic(img, x, y);
		break;
	case 3:
		img.setAttribute("width", "40");
		img.setAttribute("height", "60");
		img.setAttribute("src", "img/monster/hog.png");
		monster = hog(img, x, y);
		break;
	}
	
	monster.setBoxes();
	return monster;
}

function knuckles(img, x, y) {
	var monster = {
		x: x,
		y: y,
		moveBox: {
			x: 0,
			y: 0,
			width: 40,
			height: 40
		},
		hitBox: {
			x: 0,
			y: 0,
			width: 50,
			height: 50
		},
		dir: 3,
		img: img,
		srcCode: 0,
		changeDirCount: 0,
		status: {
			life: 4,
			damage: 1,
			speed: 2,
			range: 0
		},
		move: function(pmx, pmy) {
			var mx = this.moveBox.x;
			var my = this.moveBox.y;
			var roomEdge = [40, 360-this.moveBox.height, 40, 480-this.moveBox.width];
			if(pmx > mx + 5) {
				this.dirX = 3;
				if(mx < roomEdge[3] && obstacleCheck(this.dirX, this)) {
					this.x += this.status.speed;
					this.setBoxes();
				}
			} else if(pmx < mx - 5) {
				this.dirX = 2;
				if(mx > roomEdge[2] && obstacleCheck(this.dirX, this)) {
					this.x -= this.status.speed;
					this.setBoxes();
				}
			}
			if(pmy > my + 5) {
				this.dirY = 1;
				if(my < roomEdge[1] && obstacleCheck(this.dirY, this)) {
					this.y += this.status.speed;
					this.setBoxes();
				}
			} else if(pmy < my - 5) {
				this.dirY = 0;
				if(my > roomEdge[0] && obstacleCheck(this.dirY, this)) {
					this.y -= this.status.speed;
					this.setBoxes();
				}
			}
			this.changeImage();
		},
		setBoxes: function() {
			this.moveBox.x = this.x + 10;
			this.moveBox.y = this.y + 20;
			this.hitBox.x = this.x + 10;
			this.hitBox.y = this.y + 10;
		},
		changeImage: function() {
			this.changeDirCount++;
			if(this.changeDirCount == 8) {
				this.srcCode++;
				if(this.srcCode > 1) {
					this.srcCode = 0;
				}
				switch(this.srcCode) {
				case 0:
					this.img.src = "img/monster/knuckles_0.png"; break;
				case 1:
					this.img.src = "img/monster/knuckles_1.png"; break;
				}
				this.changeDirCount = 0;
			}
		},
		damaged: function(dmg) {
			this.status.life -= dmg;
			var seSource = (this.status.life > 0) ? "hit" : "kill";
			playSE(seSource);
		}
	};

	return monster;
}

function sonic(img, x, y) {
	var monster = {
		x: x,
		y: y,
		moveBox: {
			x: 0,
			y: 0,
			width: 40,
			height: 40
		},
		hitBox: {
			x: 0,
			y: 0,
			width: 50,
			height: 50
		},
		dir: 3,
		img: img,
		superSonicFlag: false,
		status: {
			life: 4,
			damage: 1,
			speed: 2,
			range: 0
		},
		move: function(pmx, pmy) {
			var mx = this.moveBox.x;
			var my = this.moveBox.y;
			var roomEdge = [40, 360-this.moveBox.height, 40, 480-this.moveBox.width];
			
			if(!this.superSonicFlag) {
				this.changeImage(pmx, pmy, mx, my);
			}
			
			if(pmx > mx + 5) {
				this.dirX = 3;
				if(mx < roomEdge[3] && obstacleCheck(this.dirX, this)) {
					this.x += this.status.speed;
					this.setBoxes();
				}
			} else if(pmx < mx - 5) {
				this.dirX = 2;
				if(mx > roomEdge[2] && obstacleCheck(this.dirX, this)) {
					this.x -= this.status.speed;
					this.setBoxes();
				}
			}
			if(pmy > my + 5) {
				this.dirY = 1;
				if(my < roomEdge[1] && obstacleCheck(this.dirY, this)) {
					this.y += this.status.speed;
					this.setBoxes();
				}
			} else if(pmy < my - 5) {
				this.dirY = 0;
				if(my > roomEdge[0] && obstacleCheck(this.dirY, this)) {
					this.y -= this.status.speed;
					this.setBoxes();
				}
			}
		},
		setBoxes: function() {
			this.moveBox.x = this.x + 10;
			this.moveBox.y = this.y + 20;
			this.hitBox.x = this.x + 10;
			this.hitBox.y = this.y + 10;
		},
		changeImage: function(pmx, pmy, mx, my) {
			var vx = pmx - mx;
			var vy = pmy - my;
			if(Math.abs(vx) < 150 && Math.abs(vy) < 150) {
				this.superSonicFlag = true;
				this.img.src = "img/monster/sonic_1.png";
				this.status.speed = 3;
			}
		},
		damaged: function(dmg) {
			this.status.life -= dmg;
		}
	};

	return monster;
}

function hog(img, x, y) {
	var monster = {
		x: x,
		y: y,
		moveBox: {
			x: 0,
			y: 0,
			width: 40,
			height: 40
		},
		hitBox: {
			x: 0,
			y: 0,
			width: 40,
			height: 40
		},
		dir: 3,
		img: img,
		status: {
			life: 4,
			damage: 1,
			speed: 1,
			range: 0
		},
		move: function(pmx, pmy) {
			var mx = this.moveBox.x;
			var my = this.moveBox.y;
			var roomEdge = [40, 360-this.moveBox.height, 40, 480-this.moveBox.width];
			if(pmx > mx + 5) {
				this.dirX = 3;
				if(mx < roomEdge[3]) {
					this.x += this.status.speed;
					this.setBoxes();
				}
			} else if(pmx < mx - 5) {
				this.dirX = 2;
				if(mx > roomEdge[2]) {
					this.x -= this.status.speed;
					this.setBoxes();
				}
			}
			if(pmy > my + 5) {
				this.dirY = 1;
				if(my < roomEdge[1]) {
					this.y += this.status.speed;
					this.setBoxes();
				}
			} else if(pmy < my - 5) {
				this.dirY = 0;
				if(my > roomEdge[0]) {
					this.y -= this.status.speed;
					this.setBoxes();
				}
			}
		},
		setBoxes: function() {
			this.moveBox.x = this.x;
			this.moveBox.y = this.y;
			this.hitBox.x = this.x;
			this.hitBox.y = this.y;
		},
		damaged: function(dmg) {
			this.status.life -= dmg;
		}
	};

	return monster;
}