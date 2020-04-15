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
	case 4:
		monster = slug(x, y);
		monster.img = monsterImgInit("slug.png", "480", "60");
		monster.dir = Math.floor(Math.random() * 4);
	case 5:
		monster = dog(x, y);
		monster.img = monsterImgInit("dog.png", "240", "80");
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
		attack : [],
		act: function() {
			if(this.counter<4) {
				this.move();
			}
			
			if((playerInfo.moveBox.x + playerInfo.moveBox.width/2) < (this.moveBox.x + this.moveBox.width/2)) {
				if(this.counter%4 > 1) {
					this.cropX = 60;
				} else {
					this.cropX = 0;
				}
			} else {
				if(this.counter%4 > 1) {
					this.cropX = 180;
				} else {
					this.cropX = 120;
				}
			}
			
			this.counter++;
			
			if(this.counter>=4) {
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

function sonic(x, y) {
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
		dir: 3,
		img: null,
		superSonicFlag: false,
		status: {
			life: 4,
			damage: 1,
			speed: 2,
			range: 0
		},
		attack : [],
		act: function() {
			this.superSonic();
			this.move();
		},
		move: function() {
			var mx = this.moveBox.x;
			var my = this.moveBox.y;
			var roomEdge = [60, 360-this.moveBox.height, 60, 480-this.moveBox.width];
			
			if(this.dir == 3) {
				this.cropX = (this.superSonicFlag) ? 120 : 0;
				if(mx < roomEdge[3] && obstacleCheck(this.dir, this)) {
					this.status.speed = (this.superSonicFlag) ? 4 : 2;
					this.x += this.status.speed;
					this.setBoxes();
				} else {
					this.dir = 2;
				}
			} else {
				this.cropX = (this.superSonicFlag) ? 180 : 60;
				if(mx > roomEdge[2] && obstacleCheck(this.dir, this)) {
					this.status.speed = (this.superSonicFlag) ? 4 : 2;
					this.x -= this.status.speed;
					this.setBoxes();
				} else {
					this.dir = 3;
				}
			}
		},
		superSonic: function() {
			var pmx = playerInfo.moveBox.x + playerInfo.moveBox.width/2;
			var pmy = playerInfo.moveBox.y + playerInfo.moveBox.height/2;
			var mx = this.moveBox.x + this.moveBox.width/2;
			var my = this.moveBox.y + this.moveBox.height/2;
			if(pmy > my - (this.moveBox.height + playerInfo.moveBox.height/2) && pmy < my + (this.moveBox.height + playerInfo.moveBox.height/2)) {
				if((this.dir == 3 && pmx > mx) || (this.dir == 2 && pmx < mx)) {
					this.superSonicFlag = true;
				} else {
					this.superSonicFlag = false;
				}
			} else {
				this.superSonicFlag = false;
			}
		},
		setBoxes: function() {
			this.moveBox.x = this.x + 10;
			this.moveBox.y = this.y + 20;
			this.hitBox.x = this.x + 5;
			this.hitBox.y = this.y + 5;
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
		img: null,
		status: {
			life: 4,
			damage: 1,
			speed: 1,
			range: 0
		},
		attack : [],
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
				if(mx < roomEdge[3]) {
					this.x += this.status.speed;
					this.setBoxes();
				}
			} else if(pmx < mx - 5) {
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

function slug(x, y) {
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
		dir: 0,
		img: null,
		status: {
			life: 4,
			damage: 1,
			speed: 2,
			range: 0
		},
		counter: 0,
		attack : [],
		act: function() {
			if(this.counter%6 < 3) {
				this.cropX = this.dir * 120;
			} else {
				this.cropX = this.dir * 120 + 60;
			}
			
			this.move();
			this.counter++;
			if(this.counter >= 6) {
				this.counter = 0;
			}
		},
		move: function() {
			var mx = this.moveBox.x;
			var my = this.moveBox.y;
			var roomEdge = [60, 360-this.moveBox.height, 60, 480-this.moveBox.width];
			
			switch(this.dir) {
			case 3:
				if(mx < roomEdge[3] && obstacleCheck(this.dir, this)) {
					this.x += this.status.speed;
					this.setBoxes();
				} else {
					this.dirChange();
				}
				break;
			case 2:
				if(mx > roomEdge[2] && obstacleCheck(this.dir, this)) {
					this.x -= this.status.speed;
					this.setBoxes();
				} else {
					this.dirChange();
				}
				break;
			case 1:
				if(my < roomEdge[1] && obstacleCheck(this.dir, this)) {
					this.y += this.status.speed;
					this.setBoxes();
				} else {
					this.dirChange();
				}
				break;
			case 0:
				if(my > roomEdge[0] && obstacleCheck(this.dir, this)) {
					this.y -= this.status.speed;
					this.setBoxes();
				} else {
					this.dirChange();
				}
				break;
			}
			
		},
		dirChange: function() {
			while(true) {
				var rand = Math.floor(Math.random() * 4);
				if(rand != this.dir) {
					this.dir = rand;
					break;
				}
			}
		},
		setBoxes: function() {
			this.moveBox.x = this.x + 10;
			this.moveBox.y = this.y + 20;
			this.hitBox.x = this.x + 5;
			this.hitBox.y = this.y + 5;
		},
		damaged: function(dmg) {
			this.status.life -= dmg;
		}
	};

	return monster;
}

function dog(x, y) {
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
			width: 50,
			height: 60
		},
		hitBox: {
			x: 0,
			y: 0,
			width: 50,
			height: 60
		},
		dir: 0,
		img: null,
		status: {
			life: 4,
			damage: 1,
			speed: 2,
			range: 0
		},
		counter: 0,
		attack : [],
		act: function() {
			if(this.counter%6 < 3) {
				this.cropX = this.dir * 120;
			} else {
				this.cropX = this.dir * 120 + 60;
			}
			
			this.move();
			this.counter++;
			if(this.counter >= 6) {
				this.counter = 0;
			}
		},
		move: function() {
			var mx = this.moveBox.x;
			var my = this.moveBox.y;
			var roomEdge = [60, 360-this.moveBox.height, 60, 480-this.moveBox.width];
			
			switch(this.dir) {
			case 3:
				if(mx < roomEdge[3] && obstacleCheck(this.dir, this)) {
					this.x += this.status.speed;
					this.setBoxes();
				} else {
					this.dirChange();
				}
				break;
			case 2:
				if(mx > roomEdge[2] && obstacleCheck(this.dir, this)) {
					this.x -= this.status.speed;
					this.setBoxes();
				} else {
					this.dirChange();
				}
				break;
			case 1:
				if(my < roomEdge[1] && obstacleCheck(this.dir, this)) {
					this.y += this.status.speed;
					this.setBoxes();
				} else {
					this.dirChange();
				}
				break;
			case 0:
				if(my > roomEdge[0] && obstacleCheck(this.dir, this)) {
					this.y -= this.status.speed;
					this.setBoxes();
				} else {
					this.dirChange();
				}
				break;
			}
			
		},
		dirChange: function() {
			while(true) {
				var rand = Math.floor(Math.random() * 4);
				if(rand != this.dir) {
					this.dir = rand;
					break;
				}
			}
		},
		setBoxes: function() {
			this.moveBox.x = this.x + 10;
			this.moveBox.y = this.y + 20;
			this.hitBox.x = this.x + 5;
			this.hitBox.y = this.y + 5;
		},
		damaged: function(dmg) {
			this.status.life -= dmg;
		}
	};

	return monster;
}