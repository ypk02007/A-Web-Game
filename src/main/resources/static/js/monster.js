console.log("monster.js has been included");

function monsterInit(monsterCode, x, y) {
	var monster;
	var img;
	
	switch(monsterCode) {
	case 0:
		img = setMonsterImg(monsterCode);
		monster = knuckles(img, x, y);
		break;
	}
	
	return monster;
}

function setMonsterImg(monsterCode) {
	var img = document.createElement("img");
	img.setAttribute("width", "60");
	img.setAttribute("height", "60");
	switch(monsterCode) {
	case 0:
		img.setAttribute("src", "img/monster/knuckles_0.png"); break;
	}
	return img;
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
		dir: 3,
		img: img,
		srcCode: 0,
		changeDirCount: 0,
		status: {
			life: 3,
			damage: 1,
			speed: 2,
			range: 0
		},
		move: function(pmx, pmy) {
			var mx = this.moveBox.x;
			var my = this.moveBox.y;
			if(pmx > mx + 5) {
				this.dirX = 3;
				if(this.x < 490 && obstacleCheck(this.dirX, this)) {
					this.x += this.status.speed;
					this.setBoxes();
				}
			} else if(pmx < mx - 5) {
				this.dirX = 2;
				if(this.x > 30 && obstacleCheck(this.dirX, this)) {
					this.x -= this.status.speed;
					this.setBoxes();
				}
			}
			if(pmy > my + 5) {
				this.dirY = 1;
				if(this.y < 340 && obstacleCheck(this.dirY, this)) {
					this.y += this.status.speed;
					this.setBoxes();
				}
			} else if(pmy < my - 5) {
				this.dirY = 0;
				if(this.y > 20 && obstacleCheck(this.dirY, this)) {
					this.y -= this.status.speed;
					this.setBoxes();
				}
			}
			this.changeImage();
		},
		setBoxes: function() {
			this.moveBox.x = this.x + 10;
			this.moveBox.y = this.y + 20;
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
		}
	};

	return monster;
}