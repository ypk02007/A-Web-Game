function included() {
	console.log("monster.js has been included");
}

function monsterInit() {
	var img = document.createElement("img");
	img.setAttribute("width", "60");
	img.setAttribute("height", "60");
	img.setAttribute("src", "img/monster/knuckles_0.png");
	var monster = {
		x: 180,
		y: 120,
		moveBox: {
			x: 0,
			y: 0,
			width: 40,
			height: 40
		},
		dirX: 0,
		dirY: 0,
		img: img,
		srcCode: 0,
		changeDirCount: 0,
		move: function() {
			if(playerInfo.x > this.x) {
				this.dirX = 3;
				if(obstacleCheck(this.dirX, this.x + 10, this.y + 20, 40, 40)) {
					this.x += 2;
				}
			} else {
				this.dirX = 2;
				if(obstacleCheck(this.dirX, this.x + 10, this.y + 20, 40, 40)) {
					this.x -= 2;
				}
			}
			if(playerInfo.y > this.y) {
				this.dirY = 1;
				if(obstacleCheck(this.dirY, this.x + 10, this.y + 20, 40, 40)) {
					this.y += 2;
				}
			} else {
				this.dirX = 0;
				if(obstacleCheck(this.dirY, this.x + 10, this.y + 20, 40, 40)) {
					this.y -= 2;
				}
			}
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
	monster.setBoxes();
	return monster;
}