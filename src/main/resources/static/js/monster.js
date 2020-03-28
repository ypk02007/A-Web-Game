console.log("monster.js has been included");

function monsterInit(monsterCode, x, y) {
	var monster;
	var img = document.createElement("img");
	
	switch(monsterCode) {
	case 1:
		monster = knuckles(x, y);
		monster.img = monsterImgInit("knuckles.png", "240", "60");
		break;
	case 2:
		monster = sonic(x, y);
		monster.img = monsterImgInit("sonic.png", "240", "60");
		break;
	case 3:
		monster = hog(x, y);
		monster.img = monsterImgInit("hog.png", "40", "60");
		break;
	}
	
	monster.setBoxes();
	return monster;
}

function monsterImgInit(src, width, height) {
	var img = document.createElement("img");
	img.setAttribute("src", "img/monster/"+src);
	img.setAttribute("width", width);
	img.setAttribute("height", height);
	return img;
}

function knuckles(x, y) {
	var monster = {
		x: x,
		y: y,
		cropX: 0,
		cropY: 0,
		width: 60,
		height: 60,
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
		img: null,
		status: {
			life: 4,
			damage: 1,
			speed: 2,
			range: 0
		},
		counter : 0,
		act: function() {
			if(this.counter<6) {
				this.move();
			}
			
			if((playerInfo.moveBox.x + playerInfo.moveBox.width/2) < (this.moveBox.x + this.moveBox.width/2)) {
				if(this.cropX == 0) {
					this.cropX = 60;
				} else {
					this.cropX = 0;
				}
			} else {
				if(this.cropX == 120) {
					this.cropX = 180;
				} else {
					this.cropX = 120;
				}
			}
			
			this.counter++;
			
			if(this.counter>=18) {
				this.counter = 0;
			}
		},
		move: function() {
			var mx = this.moveBox.x;
			var my = this.moveBox.y;
			var pmx = playerInfo.moveBox.x;
			var pmy = playerInfo.moveBox.y;
			var roomEdge = [40, 360-this.moveBox.height, 40, 480-this.moveBox.width];
			if(pmx > mx + 5) {
				if(mx < roomEdge[3] && obstacleCheck(3, this)) {
					this.x += this.status.speed;
					this.setBoxes();
				}
			} else if(pmx < mx - 5) {
				if(mx > roomEdge[2] && obstacleCheck(2, this)) {
					this.x -= this.status.speed;
					this.setBoxes();
				}
			}
			if(pmy > my + 5) {
				if(my < roomEdge[1] && obstacleCheck(1, this)) {
					this.y += this.status.speed;
					this.setBoxes();
				}
			} else if(pmy < my - 5) {
				if(my > roomEdge[0] && obstacleCheck(0, this)) {
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
		damaged: function(dmg) {
			this.status.life -= dmg;
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
		move: function() {
			var mx = this.moveBox.x;
			var my = this.moveBox.y;
			var pmx = playerInfo.moveBox.x;
			var pmy = playerInfo.moveBox.y;
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
			this.hitBox.x = this.x + 5;
			this.hitBox.y = this.y + 5;
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

function hog(x, y) {
	var monster = {
		x: x,
		y: y,
		cropX: 0,
		cropY: 0,
		width: 40,
		height: 60,
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
		act: function() {
			this.move();
		},
		move: function() {
			var mx = this.moveBox.x;
			var my = this.moveBox.y;
			var pmx = playerInfo.moveBox.x;
			var pmy = playerInfo.moveBox.y;
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