		function keyDown(e) {
			var key = e.keyCode;
			
			if(gameOverFlag) {
				restart();
				return;
			}
			
			if(goNextStageFlag) {
				return;
			}
			
			// ESC
			
			if(key==27) {
				if(controlFlag) {
					clearInterval(drawInterval);
					pause();
				} else {
					drawInterval = setInterval(draw, 20);
					controlFlag = true;
				}
			}
			
			if(!controlFlag) {
				return;
			}
			
			// WASD
			
			if(key==87) {
				pressed[0] = true;
			} else if(key==83) {
				pressed[1] = true;
			}
			
			if(key==65) {
				pressed[2] = true;
			} else if(key==68) {
				pressed[3] = true;
			}
			
			// UDLR
			
			if(key==38) {
				attackSetting(0);
				// playSE("attack");
			}
			if(key==40) {
				attackSetting(1);
				// playSE("attack");
			}
			if(key==37) {
				attackSetting(2);
				// playSE("attack");
			}
			if(key==39) {
				attackSetting(3);
				// playSE("attack");
			}
			
			// C or Shift
			
			if(key==67 || key==16) {
				bombSetting(playerInfo.moveBox.x, playerInfo.moveBox.y);
			}
			
		}

		function keyUp(e) {
			var key = e.keyCode;
			
			if(key==87) {
				pressed[0] = false;
			} else if(key==83) {
				pressed[1] = false;
			}
			
			if(key==65) {
				pressed[2] = false;
			} else if(key==68) {
				pressed[3] = false;
			}
		}
		
		function doorSetting() {
			var doors = roomInfo[roomNo].doors;
			
			for(var i = 0; i < doors.length; i++) {
				if(doors[i] == 0) {
					doorImgInfo[i] = null;
					continue;
				}
				
				var doorInfo = {
					x: 0,
					y: 0,
					cropX: i * 60,
					cropY: 0
				}
				
				switch(i) {
				case 0:
					doorInfo.x = cw/2 - 30; doorInfo.y = 0;
					break;
				case 1:
					doorInfo.x = cw/2 - 30; doorInfo.y = ch - 60;
					break;
				case 2:
					doorInfo.x = 0; doorInfo.y = ch/2 - 30;
					break;
				case 3:
					doorInfo.x = cw - 60; doorInfo.y = ch/2 - 30;
					break;
				}
				
				doorInfo.cropY = (doors[i]-1)*60;

				doorImgInfo[i] = doorInfo;
			}
		}
		
		function doorLockSetting() {
			if(monsterExtinctCheck()) { // all monsters in the room are dead or no monster room
				var doors = roomInfo[roomNo].doors;
				for(var i = 0; i < doors.length; i++) {
					if(doors[i]==3 || doors[i]==7) {
						continue;
					}
					if(doors[i]%2 == 1) {
						roomInfo[roomNo].doors[i]++;
					}
				}
			} else { // monsters exist, so doors are locked
				var doors = roomInfo[roomNo].doors;
				for(var i = 0; i < doors.length; i++) {
					if(doors[i]%2 == 0 && doors[i] > 0) {
						roomInfo[roomNo].doors[i]--;
					}
				}
			}
			doorSetting();
		}
		
		function obstacleSetting() {
			if(obstacleImg.length > 0) {
				obstacleImg.splice(0, obstacleImg.length);
			}
			
			var obstacles = roomInfo[roomNo].obstacles;
			
			for(var i = 0; i < obstacles.length; i++) {
				var obs = document.createElement("img");
				obs.setAttribute("width", "60");
				obs.setAttribute("height", "60");
				
				switch(obstacles[i][2]) {
				case 1:
					obs.setAttribute("src", "img/sprite/stone.png");
					break;
				case 2:
					obs.setAttribute("src", "img/sprite/pit_edge.png");
					break;
				case 3:
					obs.setAttribute("src", "img/sprite/stone_was_here.png");
					break;
				}

				obstacleImg.push(obs);
			}
		}
		
		function monsterSetting() {
			if(monster.length > 0) {
				monster.splice(0, monster.length);
			}
			
			var monsters = roomInfo[roomNo].monsters;
			
			if(monsters == null) { // no monster room
				return;
			}
			
			for(var i = 0; i < monsters.length; i++) {
				if(monsters[i][0] == 0) { // dead monster
					continue;
				}
				var m = monsterInit(monsters[i][0], monsters[i][1], monsters[i][2]);

				monster.push(m);
			}
		}
		
		function attackSetting(dir) {
			if(attackFlag) {
				attackFlag = false;
				
				attackDirection = dir;
				
				var mx = 0;
				var my = 0;
				var md = 10;
				switch(dir) {
				case 0:
					my = -md;
					break;
				case 1:
					my = md;
					break;
				case 2:
					mx = -md;
					break;
				case 3:
					mx = md;
					break;
				}
				var attackObj = {
					mx: mx,
					my: my,
					dir: dir,
					x: playerInfo.x + 30,
					y: playerInfo.y + 30,
					rangeCount: 0,
					move: function() {
						this.x += this.mx;
						this.y += this.my;
						this.rangeCount++;
					},
					isValid: function() {
						if(monsterDamagedCheck(this.x, this.y, 20, playerInfo.status.damage, false)) {
							// console.log("attack removed by monster");
							return false;
						} if(!obstacleAttackCheck(this.dir, this.x, this.y, 20)) {
							// console.log("attack removed by obstacle");
							return false;
						} else if(this.x + 10 < wall[2] || this.x + 10 > cw - wall[3]) {
							// console.log("attack removed by wall left or wall
							// right");
							return false;
						} else if(this.y + 10 < wall[0] || this.y + 10 > ch - wall[1]) {
							// console.log("attack removed by wall top or wall
							// bottom");
							return false;
						} else if(this.rangeCount == playerInfo.status.range) {
							// console.log("attack removed because of range
							// limit");
							return false;
						} else {
							return true;
						}
					}
				};
				attacks.push(attackObj);
				
				setTimeout(function() {
					attackFlag = true;	
				}, playerInfo.status.delay);
			}
		}
		
		function bombSetting(x, y) {
			if(bombInfo == null && playerInfo.bomb > 0) {
				playerInfo.bomb--;
				var bombInfoInit = {
					x: x,
					y: y,
					cropX: 0,
					cropY: 0,
					width: 40,
					height: 40,
					count: 0,
					roomNo: roomNo
				};
				bombInfo = bombInfoInit;
			}
		}
		
		function playerMove() {
			var x = playerInfo.moveBox.x;
			var y = playerInfo.moveBox.y;
			if(pressed[0] && (playerInfo.moveBox.y > wall[0]) && obstacleCheck(0, playerInfo)) {
				playerInfo.y -= playerInfo.status.speed;
				playerInfo.setBoxes();
			}
			if(pressed[1] && (playerInfo.moveBox.y < ch-(wall[1]+40)) && obstacleCheck(1, playerInfo)) {
				playerInfo.y += playerInfo.status.speed;
				playerInfo.setBoxes();
			}
			if(pressed[2] && (playerInfo.moveBox.x > wall[2]) && obstacleCheck(2, playerInfo)) {
				playerInfo.x -= playerInfo.status.speed;
				playerInfo.setBoxes();
			}
			if(pressed[3] && (playerInfo.moveBox.x < cw-(wall[3]+40)) && obstacleCheck(3, playerInfo)) {
				playerInfo.x += playerInfo.status.speed;
				playerInfo.setBoxes();
			}
		}
		
		function directionCheck() {
			if(pressed[0]) {
				directionCode = 0;
				if(pressed[3]) {
					directionCode = 1;
				} else if(pressed[2]) {
					directionCode = 5;
				}
			} else if(pressed[1]) {
				directionCode = 2;
				if(pressed[2]) {
					directionCode = 3;
				} else if(pressed[3]) {
					directionCode = 7;
				}
			} else if(pressed[2]) {
				directionCode = 4;
				if(pressed[0]) {
					directionCode = 5;
				} else if(pressed[1]) {
					directionCode = 3;
				}
			} else if(pressed[3]) {
				directionCode = 6;
				if(pressed[0]) {
					directionCode = 1;
				} else if(pressed[1]) {
					directionCode = 7;
				}
			}
		}
		
		function doorCheck() {
			var doors = roomInfo[roomNo].doors;
			if(playerInfo.moveBox.y <= 40 && doors[0]%2==0 && doors[0]>0) {
				moveRoom(0);
				return;
			} else if(playerInfo.moveBox.y >= (ch-(40+40)) && doors[1]%2==0 && doors[1]>0) {
				moveRoom(1);
				return;
			} else if(playerInfo.moveBox.x <= 40 && doors[2]%2==0 && doors[2]>0) {
				moveRoom(2);
				return;
			} else if(playerInfo.moveBox.x >= (cw-(40+40)) && doors[3]%2==0 && doors[3]>0) {
				moveRoom(3);
				return;
			}
			
			for(var i = 0; i < doorImgInfo.length; i++) { // unlock the door
				if(playerInfo.key < 1 || !monsterExtinctCheck()) { // no key or monsters exist
					break;
				}
				if(doorImgInfo[i] == null) {
					continue;
				}
				var dx = doorImgInfo[i].x + 30;
				var dy = doorImgInfo[i].y + 30;
				var vx = playerInfo.moveBox.x + playerInfo.moveBox.width/2 - dx;
				var vy = playerInfo.moveBox.y + playerInfo.moveBox.height/2 - dy;
				
				if(Math.abs(vx) <= 50 && Math.abs(vy) <= 50 && (doors[i]==3||doors[i]==7)) {
					// playSE("unlock")
					roomInfo[roomNo].doors[i]++;
					playerInfo.key--;
					doorLockSetting();
				}
			}
		}
		
		function chestCheck() {
			var chest = roomInfo[roomNo].chest;
			if(chest == null) {
				return;
			}
			
			var cx = chest.x * 60 + 60 + 30;
			var cy = chest.y * 60 + 60 + 30;
			var vx = playerInfo.moveBox.x + playerInfo.moveBox.width/2 - cx;
			var vy = playerInfo.moveBox.y + playerInfo.moveBox.height/2 - cy;
			
			if(Math.abs(vx) < 50 && Math.abs(vy) < 50 && !chest.opened) {
				roomInfo[roomNo].chest.opened = true;
				var itemInfo = getItem(chest.itemCode);
				if(itemInfo != null && itemGetObj == null) {
					itemGetObj = {
						itemCode: chest.itemCode,
						itemName: itemInfo[0],
						itemDesc: itemInfo[1],
						count: 0
					};
				}
			}
		}
		
		function itemGetCheck() {
			var item = roomInfo[roomNo].items;
			if(item == null) {
				return;
			}
			
			for(var i = 0; i < item.length; i++) {
				var ix = item[i][0] * 60 + 60 + 30;
				var iy = item[i][1] * 60 + 60 + 30;
				var vx = playerInfo.moveBox.x + playerInfo.moveBox.width/2 - ix;
				var vy = playerInfo.moveBox.y + playerInfo.moveBox.height/2 - iy;
				
				if(Math.abs(vx) < 40 && Math.abs(vy) < 40) {
					var itemInfo = getItem(item[i][2]);
					if(itemInfo != null && itemGetObj == null) {
						itemGetObj = {
							itemCode: item[i][2],
							itemName: itemInfo[0],
							itemDesc: itemInfo[1],
							count: 0
						};
						roomInfo[roomNo].items.splice(i, 1);
						return;
					}
					roomInfo[roomNo].items.splice(i, 1);
				}
			}
		}
		
		function wallCheck() {
			var doors = roomInfo[roomNo].doors;
			
			var dx = cw/2 - 30;
			var dy = ch/2 - 30;
			
			if(playerInfo.moveBox.x >= dx && playerInfo.moveBox.x <= dx + 20 && playerInfo.moveBox.y < (ch/2-40) && doors[0]%2 == 0) {
				wall[0] = 40;
				wall[1] = 60;
			} else if(playerInfo.moveBox.x >= dx && playerInfo.moveBox.x <= dx + 20 && doors[1]%2 == 0) {
				wall[0] = 60;
				wall[1] = 40;
			} else {
				wall[0] = 60;
				wall[1] = 60;
			}
			if(playerInfo.moveBox.y >= dy && playerInfo.moveBox.y <= dy + 20 && playerInfo.moveBox.x < (cw/2-40) && doors[2]%2 == 0) {
				wall[2] = 40;
				wall[3] = 60;
			} else if(playerInfo.moveBox.y >= dy && playerInfo.moveBox.y <= dy + 20 && doors[3]%2 == 0) {
				wall[2] = 60;
				wall[3] = 40;
			} else {
				wall[2] = 60;
				wall[3] = 60;
			}
		}
		
		function obstacleCheck(dir, obj) { // obj must contain x, y, moveBox.x,
											// moveBox.y, status.speed,
											// setBoxes()
			var mx = obj.moveBox.x + obj.moveBox.width/2;
			var my = obj.moveBox.y + obj.moveBox.height/2;
			var boundX = 30 + obj.moveBox.width/2;
			var boundY = 30 + obj.moveBox.height/2;
			var ox;
			var oy;
			var vx;
			var vy;
			for(var i = 0; i < obstacleImg.length; i++) {
				if(roomInfo[roomNo].obstacles[i][2] == 3) {
					continue;
				}
				ox = roomInfo[roomNo].obstacles[i][0] * 60 + 60 + 30;
				oy = roomInfo[roomNo].obstacles[i][1] * 60 + 60 + 30;

				vx = mx - ox;
				vy = my - oy;
				
				if(Math.abs(vx) <= boundX && Math.abs(vy) <= boundY) {
					switch(dir) {
					case 0:
						if(my > oy && mx > ox - boundX && mx < ox + boundX) {
							return false;
						}
						break;
					case 1:
						if(my < oy && mx > ox - boundX && mx < ox + boundX) {
							return false;
						}
						break;
					case 2:
						if(mx > ox && my > oy - boundY && my < oy + boundY) {
							return false;
						}
						break;
					case 3:
						if(mx < ox && my > oy - boundY && my < oy + boundY) {
							return false;
						}
						break;
					}
				}
			}
			return true;
		}
		
		function obstacleAttackCheck(dir, x, y, size) {
			var mx = x + size/2;
			var my = y + size/2;
			var boundX = 20 + size/2;
			var boundY = 20 + size/2;
			var ox;
			var oy;
			var vx;
			var vy;
			for(var i = 0; i < obstacleImg.length; i++) {
				if(roomInfo[roomNo].obstacles[i][2] != 1) {
					continue;
				}
				ox = roomInfo[roomNo].obstacles[i][0] * 60 + 60 + 30;
				oy = roomInfo[roomNo].obstacles[i][1] * 60 + 60 + 30;
				vx = mx - ox;
				vy = my - oy;
				
				if(Math.abs(vx) < boundX && Math.abs(vy) < boundY) {
					return false;
				}
			}
			return true;
		}
		
		function explosionCheck(where) {
			var mx = bombInfo.x + bombInfo.width/2;
			var my = bombInfo.y + bombInfo.height/2;
			var ox;
			var oy;
			for(var i = 0; i < roomInfo[where].obstacles.length; i++) {
				if(roomInfo[where].obstacles[i][2] != 1) {
					continue;
				}
				ox = roomInfo[where].obstacles[i][0] * 60 + 60 + 30;
				oy = roomInfo[where].obstacles[i][1] * 60 + 60 + 30;
				
				if(Math.abs(mx-ox) < (bombInfo.width + 60)/2 && Math.abs(my-oy) < (bombInfo.height + 60)/2) {
					roomInfo[where].obstacles[i][2] = 3;
					if(where == roomNo) {
						obstacleImg[i].src = "img/sprite/stone_was_here.png";
					}
				}
			}
			if(where == roomNo) {
				monsterDamagedCheck(bombInfo.x, bombInfo.y, 80, 10, true);
				playerCollisionCheck(bombInfo.x, bombInfo.y, 80, 80, 2);
			}
		}
		
		function playerCollisionCheck(objX, objY, objWidth, objHeight, dmg) { // monster, boss and their attack, bomb
			var vx = (playerInfo.hitBox.x + playerInfo.hitBox.width/2) - (objX + objWidth/2);
			var vy = (playerInfo.hitBox.y + playerInfo.hitBox.height/2) - (objY + objHeight/2);
			var boundX = (playerInfo.hitBox.width + objWidth)/2;
			var boundY = (playerInfo.hitBox.height + objHeight)/2;
			
			if(Math.abs(vx) < boundX && Math.abs(vy) < boundY) {
				playerInfo.damaged(dmg);
			}
		}
		
		function monsterDamagedCheck(bx, by, size, dmg, splash) {
			var vx;
			var vy;
			var boundX;
			var boundY;
			var splashDamage = false;
			
			for(var i = 0; i < monster.length; i++) {
				vx = (monster[i].hitBox.x + monster[i].hitBox.width/2) - (bx + size/2);
				vy = (monster[i].hitBox.y + monster[i].hitBox.height/2) - (by + size/2);
				boundX = monster[i].hitBox.width/2 + size/2;
				boundY = monster[i].hitBox.height/2 + size/2;
				
				if(Math.abs(vx) < boundX && Math.abs(vy) < boundY && monster[i].status.life > 0) {
					monster[i].damaged(dmg);
					// console.log("monster damaged");
					if(!splash) {
						return true;
					} else {
						splashDamage = true;
					}
				}
			}
			
			if(bossInfo != null) {
				vx = (bossInfo.hitBox.x + bossInfo.hitBox.width/2) - (bx + size/2);
				vy = (bossInfo.hitBox.y + bossInfo.hitBox.height/2) - (by + size/2);
				boundX = bossInfo.hitBox.width/2 + size/2;
				boundY = bossInfo.hitBox.height/2 + size/2;
				
				if(Math.abs(vx) < boundX && Math.abs(vy) < boundY) {
					bossInfo.damaged(dmg);
					// console.log("boss damaged");
					return true;
				}
			}
			
			return splashDamage;
		}
		
		function monsterExtinctCheck() {
			var deadMonsterCount = 0;
			var allMonstersDied = false;
			if(roomInfo[roomNo].monsters != null) {
				for(var i = 0; i < roomInfo[roomNo].monsters.length; i++) {
					if(roomInfo[roomNo].monsters[i][0] == 0) {
						deadMonsterCount++;
					}
				}
				if(deadMonsterCount == roomInfo[roomNo].monsters.length) {
					allMonstersDied = true;
				}
			}
			var result = ((monster.length==0 || allMonstersDied) && bossInfo == null);
			return result;
		}
		
		function drawImage() {
			ctx.drawImage(roomImg, 0, 0);
			
			drawDoor();
			
			if(roomNo == 0) {
				ctx.drawImage(floorImg, 60, 60);
			} else {
				ctx.fillStyle = '#C3C3C3';
				ctx.fillRect(60, 60, floor.width, floor.height);
			}
			
			drawChest();
			drawItem();
			drawObstacle();
			
			if(bombInfo != null) {
				drawBomb();
			}
			
			if(goNextStageDoor != null && goNextStageDoor.roomNo == roomNo) {
				ctx.fillStyle = '#000000';
				ctx.fillRect(goNextStageDoor.x, goNextStageDoor.y, 60, 60);
			}
			
			var bodyCrop = Math.floor(directionCode/2);
			if(playerInfo.invincibleFlag) {
				ctx.globalAlpha = 0.5;
				ctx.drawImage(playerImg, bodyCrop * 80, 80, 80, 80, playerInfo.x, playerInfo.y, 80, 80);
				ctx.drawImage(playerImg, attackDirection * 80, 0, 80, 80, playerInfo.x, playerInfo.y, 80, 80);
				ctx.globalAlpha = 1;
			} else {
				ctx.drawImage(playerImg, bodyCrop * 80, 80, 80, 80, playerInfo.x, playerInfo.y, 80, 80);
				ctx.drawImage(playerImg, attackDirection * 80, 0, 80, 80, playerInfo.x, playerInfo.y, 80, 80);
			}
		}
		
		function drawAttack() {
			var remove = [];
			for(var i = 0; i < attacks.length; i++) {
				if(attacks[i].isValid()) {
					attacks[i].move();
					ctx.drawImage(attackImg, attacks[i].x, attacks[i].y);
				} else {
					remove.push(i);
				}
			}
			for(var i = remove.length; i > 0; i--) {
				attacks.splice(remove[i-1], 1);
			}
		}
		
		function drawDoor() {
			for(var i = 0; i < doorImgInfo.length; i++) {
				if(doorImgInfo[i]==null) {
					continue;
				}
				ctx.drawImage(doorImg, doorImgInfo[i].cropX, doorImgInfo[i].cropY, 60, 60, doorImgInfo[i].x, doorImgInfo[i].y, 60, 60);
			}
		}
		
		function drawChest() {
			var chest = roomInfo[roomNo].chest;
			if(chest != null) {
				var cropX;
				if(!chest.opened && !chest.locked) {
					cropX = 0;
				} else if(chest.opened && !chest.locked) {
					cropX = 60;
				}
				ctx.drawImage(chestImg, cropX, 0, 60, 60, chest.x * 60 + 60, chest.y * 60 + 60, 60, 60);
				
				var cx = chest.x * 60 + 60;
				var cy = chest.y * 60 + 60;
				if(chest.opened && roomInfo[roomNo].chest.itemPop < 8) {
					ctx.drawImage(itemImg, chest.itemCode%10*20, Math.floor(chest.itemCode/10)*20, 20, 20, cx + 20, cy - roomInfo[roomNo].chest.itemPop * 5 + 20, 20, 20);
					roomInfo[roomNo].chest.itemPop++;
				}
			}
		}
		
		function drawItem() {
			var item = roomInfo[roomNo].items;
			if(item != null) {
				for(var i = 0; i < item.length; i++) {
					var ix = item[i][0] * 60 + 60;
					var iy = item[i][1] * 60 + 60;
					ctx.drawImage(itemImg, 170, 0, 30, 20, ix + 15, iy + 25, 30, 20); // prop
					ctx.drawImage(itemImg, item[i][2]%10*20, Math.floor(item[i][2]/10)*20, 20, 20, ix + 20, iy + 15, 20, 20); // item icon
				}
			}
		}
		
		function drawItemGetMessage() {
			if(itemGetObj != null) {
				controlFlag = false;
				
				if(itemGetObj.count == 0) {
					// playSE("get_item");
				}
				
				pressed[0] = false;
				pressed[1] = false;
				pressed[2] = false;
				pressed[3] = false;
				
				ctx.drawImage(emotionImg, 0, 0, 50, 50, playerInfo.x + 15, playerInfo.y - 30, 50, 50);
				ctx.drawImage(itemImg, itemGetObj.itemCode%10*20, Math.floor(itemGetObj.itemCode/10)*20, 20, 20, playerInfo.x + 30, playerInfo.y - 20, 20, 20);
				
				ctx.globalAlpha = 0.9;
				ctx.fillStyle = '#000000';
				ctx.fillRect(0, 70, cw, 40);
				ctx.fillRect(cw-200, ch-40, 200, 40);
				ctx.globalAlpha = 1;
				
				ctx.fillStyle = '#FFFFFF';
				ctx.font = '25px Arial Black';
				ctx.fillText(itemGetObj.itemName, (cw - itemGetObj.itemName.length * 15)/2, 98);
				ctx.fillText(itemGetObj.itemDesc, cw-188, ch-12);
				
				itemGetObj.count++;
				if(itemGetObj.count == 100) {
					itemGetObj = null;
					controlFlag = true;
				}
			}
		}
		
		function drawObstacle() {
			for(var i = 0; i < obstacleImg.length; i++) {
				ctx.drawImage(obstacleImg[i], roomInfo[roomNo].obstacles[i][0] * 60 + 60, roomInfo[roomNo].obstacles[i][1] * 60 + 60);
			}
		}
		
		function drawBomb() {
			if(bombInfo.count < 50 && bombInfo.count%5 == 0 && bombInfo.count%10 == 0) {
				bombInfo.cropX = 0;
				bombInfo.cropY = 0;
			} else if(bombInfo.count < 50 && bombInfo.count%5 == 0 && bombInfo.count%10 != 0) {
				bombInfo.cropX = 40;
				bombInfo.cropY = 0;
			} else if(bombInfo.count == 50) {
				bombInfo.cropX = 0;
				bombInfo.cropY = 40;
				bombInfo.width = 80;
				bombInfo.height = 80;
				bombInfo.x -= 20;
				bombInfo.y -= 20;
				explosionCheck(bombInfo.roomNo);
			} else if(bombInfo.count == 55) {
				bombInfo.cropX = 0;
				bombInfo.cropY = 120;
			} else if(bombInfo.count == 60) {
				bombInfo = null;
				return;
			}
			
			if(bombInfo.roomNo == roomNo) {
				ctx.drawImage(bombImg, bombInfo.cropX, bombInfo.cropY, bombInfo.width, bombInfo.height, bombInfo.x, bombInfo.y, bombInfo.width, bombInfo.height);
			}
			
			bombInfo.count++;
		}
		
		function drawEncountingBoss() {
			clearInterval()
		}
		
		function moveRoom(dir) {
			controlFlag = false;
			clearInterval(drawInterval);
			
			var rx;
			var ry;
			var x = 0;
			var y = 0;
			
			var sliceX;
			var sliceY;
			var change;
			
			roomNo = roomInfo[roomNo].linked[dir];
			
			var doors = roomInfo[roomNo].doors;
			var linked = roomInfo[roomNo].linked;
			
			roomInfo[roomNo].visited = 2;
			for(var i = 0; i < linked.length; i++) {
				if(doors[i]==0) {
					continue;
				}
				if(roomInfo[linked[i]].visited==0) {
					roomInfo[linked[i]].visited = 1;
				}
			}
			
			switch(dir) {
			case 0:
				sliceX = 0; sliceY = 20;
				rx = 0; ry = -ch;
				playerInfo.x = cw/2 - 40; playerInfo.y = ch - 140;
				break;
			case 1:
				sliceX = 0; sliceY = -20;
				rx = 0; ry = ch;
				playerInfo.x = cw/2 - 40; playerInfo.y = 60;
				break;
			case 2:
				sliceX = 20; sliceY = 0;
				rx = -cw; ry = 0;
				playerInfo.x = cw - 140; playerInfo.y = ch/2 - 50;
				break;
			case 3:
				sliceX = -20; sliceY = 0;
				rx = cw; ry = 0;
				playerInfo.x = 60; playerInfo.y = playerInfo.y = ch/2 - 50;
				break;
			}
			
			playerInfo.setBoxes();
			
			if(roomInfo[roomNo].bossRoom) { // entered boss room
				var i = 0;
				var boss = bossInit();
				var playerX = -80;
				var playerY = 250;
				var bossX = cw;
				var bossY = 170;
				ctx.fillStyle = '#FFFFFF';
				var spotlight = document.getElementById("spotlight");
				var interval = setInterval(function() {
					ctx.clearRect(0, 0, cw, ch);
					
					if(i < 7) {
						playerX += 20;
						bossX -= 20;
					}
					if(i > 10) {
						ctx.font = '20px Arial Black';
						ctx.fillText("GAMJEON", 50, 40);
						ctx.fillText(boss.name, 330, 40);
						ctx.font = '30px Arial Black';
						ctx.fillText("VS.", 250, 35);
					}
					
					ctx.globalAlpha = 0.7;
					ctx.drawImage(spotlight, 0, 60);
					ctx.drawImage(spotlight, 340, 60);
					ctx.globalAlpha = 1;
					ctx.drawImage(boss.img, boss.cropX, boss.cropY, boss.hitBox.width, boss.hitBox.height, bossX, bossY, boss.hitBox.width, boss.hitBox.height);
					ctx.drawImage(playerImg, 320, 0, 80, 80, playerX, playerY, 80, 80);
					
					i++;
					
					if(i > 80) {
						clearInterval(interval);
						drawInterval = setInterval(draw, 20);
						bossInfo = boss;
						monsterSetting();
						obstacleSetting();
						doorLockSetting();
						controlFlag = true;
					}
				}, 20);
			} else {
				ctx.fillStyle = '#C3C3C3';
				var interval = setInterval(function() {
					ctx.clearRect(0, 0, cw, ch);
						
					x += sliceX; y += sliceY;
					rx += sliceX; ry += sliceY;
						
					ctx.drawImage(roomImg, x, y);
					ctx.fillRect(x + 60, y + 60, floor.width, floor.height);
					ctx.drawImage(roomImg, rx, ry);
					ctx.fillRect(rx + 60, ry + 60, floor.width, floor.height);
						
					if(rx == 0 && ry == 0) {
						clearInterval(interval);
						drawInterval = setInterval(draw, 20);
						monsterSetting();
						obstacleSetting();
						doorLockSetting();
						controlFlag = true;
					}
				}, 20);
			}
		}
		
		function drawMonster() {
			for(var i = 0; i < monster.length; i++) { // monsters exist
				if(monster[i].status.life <= 0) { // a monster died
					roomInfo[roomNo].monsters[i][0] = 0;
					doorLockSetting();
					continue;
				}
				monster[i].act();
				ctx.drawImage(monster[i].img, monster[i].cropX, monster[i].cropY, monster[i].width, monster[i].height, monster[i].x, monster[i].y, monster[i].width, monster[i].height);
				playerCollisionCheck(monster[i].hitBox.x, monster[i].hitBox.y, monster[i].hitBox.width, monster[i].hitBox.height, monster[i].status.damage);
				
				for(var j = 0; j < monster[i].attack.length; j++) {
					ctx.drawImage(monster[i].img, monster[i].attack[j].cropX, monster[i].attack[j].cropY, monster[i].attack[j].size, monster[i].attack[j].size, monster[i].attack[j].x, monster[i].attack[j].y, monster[i].attack[j].size, monster[i].attack[j].size);
					playerCollisionCheck(monster[i].attack[j].x, monster[i].attack[j].y, monster[i].attack[j].size, monster[i].attack[j].size, monster[i].status.damage);
				}
			}
			if(bossInfo != null) { // boss exists
				if(bossInfo.status.end > 30) { // the boss died
					bossInfo = null;
					roomInfo[roomNo].bossRoom = false;
					goNextStageDoor = {
						x: 240,
						y: 120,
						roomNo: roomNo
					};
					doorLockSetting();
				} else {
					bossInfo.act();
					ctx.drawImage(bossInfo.img, bossInfo.cropX, bossInfo.cropY, bossInfo.hitBox.width, bossInfo.hitBox.height, bossInfo.x, bossInfo.y, bossInfo.hitBox.width, bossInfo.hitBox.height);
					playerCollisionCheck(bossInfo.hitBox.x, bossInfo.hitBox.y, bossInfo.hitBox.width, bossInfo.hitBox.height, bossInfo.status.damage);
					for(var i = 0; i < bossInfo.attack.length; i++) {
						ctx.drawImage(bossInfo.img, bossInfo.attack[i].cropX, bossInfo.attack[i].cropY, bossInfo.attack[i].size, bossInfo.attack[i].size, bossInfo.attack[i].x, bossInfo.attack[i].y, bossInfo.attack[i].size, bossInfo.attack[i].size);
						playerCollisionCheck(bossInfo.attack[i].x, bossInfo.attack[i].y, bossInfo.attack[i].size, bossInfo.attack[i].size, bossInfo.status.damage);
					}
					ctx.fillStyle = "#000000"; // hp bar
					ctx.fillRect(140, 10, 260, 20);
					ctx.fillStyle = "#FF0000";
					ctx.fillRect(145, 15, bossInfo.status.life * 10, 10);
				}
			}
		}
		
		function draw() {
			ctx.clearRect(0, 0, cw, ch);
			
			drawImage();
			
			directionCheck();
			
			drawAttack();
			
			drawMonster();
			
			drawItemGetMessage();
			
			wallCheck();
			
			playerMove();
			
			doorCheck();
			
			chestCheck();
			
			itemGetCheck();
			
			goNextStageCheck()
		}
		
		function drawInfo() {
			var inventory = document.getElementById("info_inventory");
			var count;
			var life = playerInfo.status.life;
			var eLife = playerInfo.status.elecLife;
			
			ctx2.clearRect(0, 0, infoCanvas.width, infoCanvas.height);
			
			ctx2.font = "20px Arial";
			
			for(var j = 0; j < roomInfo.length; j++) {
				if(roomInfo[j].visited==0) {
					continue;
				} else if(roomInfo[j].visited==1) {
					ctx2.fillStyle = "#585858";
				} else if(j == roomNo) {
					ctx2.fillStyle = "#FFFFFF";			
				} else {
					ctx2.fillStyle = "#C3C3C3";
				}
				ctx2.fillRect(22 * roomInfo[j].map[1] + 6, 17 * roomInfo[j].map[0] + 3, 20, 15);
			}
			ctx2.fillStyle = "#000000";
			
			ctx2.drawImage(itemImg, 60, 0, 20, 20, 165, 5, 20, 20);
			count = playerInfo.coin;
			if(count<10) {
				count = "0"+count;
			}
			ctx2.fillText("x " + count, 195, 20);
			
			ctx2.drawImage(itemImg, 40, 0, 20, 20, 165, 30, 20, 20);
			count = playerInfo.bomb;
			if(count<10) {
				count = "0"+count;
			}
			ctx2.fillText("x " + count, 195, 46);
			
			ctx2.drawImage(itemImg, 80, 0, 20, 20, 165, 55, 20, 20);
			count = playerInfo.key;
			if(count<10) {
				count = "0"+count;
			}
			ctx2.fillText("x " + count, 195, 73);
			
			ctx2.drawImage(inventory, 255, 5);
			
			ctx2.fillText("LIFE", 430, 25);
			
			var vGap = 0;
			var hGap = 0;
			while(life>0) {
				if(vGap > 1) {
					break;
				}
				if(life>1) {
					ctx2.drawImage(itemImg, 0, 0, 20, 20, 25*hGap + 380, 30 + 25*vGap, 20, 20);
					life -= 2;
				} else {
					ctx2.drawImage(itemImg, 20, 0, 20, 20, 25*hGap + 380, 30 + 25*vGap, 20, 20);
					life--;
				}
				hGap++;
				if(hGap==6) {
					vGap = 1;
					hGap = 0;
				}
			}
			while(eLife>0) {
				if(vGap > 1) {
					break;
				}
				if(eLife>1) {
					ctx2.drawImage(itemImg, 100, 0, 20, 20, 25*hGap + 380, 30 + 25*vGap, 20, 20);
					eLife -= 2;
				} else {
					ctx2.drawImage(itemImg, 120, 0, 20, 20, 25*hGap + 380, 30 + 25*vGap, 20, 20);
					eLife--;
				}
				hGap++;
				if(hGap==6) {
					vGap = 1;
					hGap = 0;
				}
			}
		}
		
		function pause() {
			controlFlag = false;
			
			pressed[0] = false;
			pressed[1] = false;
			pressed[2] = false;
			pressed[3] = false;
			
			var speed = playerInfo.status.speed-4;
			var delay = (325-playerInfo.status.delay)/25;
			var damage = playerInfo.status.damage;
			var range = playerInfo.status.range/4-4;
			var stat = [speed, delay, damage, range];
			
			pausedImg.src = "img/bg/paused.png";
			pausedImg.onload = function() {
				ctx.clearRect(0, 0, cw, ch);
				ctx.drawImage(pausedImg, 70, 35);
				
				for(var i = 0; i < stat.length; i++) {
					for(var j = 0; j < 5; j++) {
						if(stat[i]==0) {
							ctx.fillStyle = "#C3C3C3";
						} else {
							ctx.fillStyle = "#585858";
							stat[i]--;
						}
						ctx.fillRect((140 + i * 80) + j * 6, 130, 3, 10);
					}
				}
			}
		}
		
		function gameOver() {
			clearInterval(drawInterval);
			gameOverFlag = true;
			controlFlag = false;
			pausedImg.src = "img/bg/gameover.png";
			pausedImg.onload = function() {
				ctx.drawImage(pausedImg, 70, 35);
			}
		}
		
		function restart() {
			location.href="/";
		}
		
		function goNextStageCheck() {
			if(goNextStageDoor == null || goNextStageDoor.roomNo != roomNo) {
				return;
			}
			var pmx = playerInfo.moveBox.x + playerInfo.moveBox.width/2;
			var pmy = playerInfo.moveBox.y + playerInfo.moveBox.height/2;
			var dx = goNextStageDoor.x + 30;
			var dy = goNextStageDoor.y + 30;
			
			if(Math.abs(pmx-dx) < 20 && Math.abs(pmy-dy) < 20) {
				controlFlag = false;
				goNextStageFlag = true;
				clearInterval(drawInterval);
				
				directionCode = 2;
				attackDirection = 1;
				var bodyCrop = Math.floor(directionCode/2);
				var gx = goNextStageDoor.x - 10;
				var gy = goNextStageDoor.y - 20;
				var my = -5;
				var count = 0;
				var goNextInterval = setInterval(function() {
					ctx.clearRect(0, 0, cw, ch)
					
					ctx.drawImage(roomImg, 0, 0);
			
					drawDoor();
			
					ctx.fillStyle = '#C3C3C3';
					ctx.fillRect(60, 60, floor.width, floor.height);
					
					ctx.fillStyle = '#000000';
					ctx.fillRect(goNextStageDoor.x, goNextStageDoor.y, 60, 60);
					
					ctx.drawImage(playerImg, bodyCrop * 80, 80, 80, 80, gx, gy, 80, 80);
					ctx.drawImage(playerImg, attackDirection * 80, 0, 80, 80, gx, gy, 80, 80);
					
					my = (count < 10) ? -5 : 5;
					gy += my;
					count++;
					if(count >= 20) {
						clearInterval(goNextInterval);
						sendData();
					}
				}, 20);
			}
		}
		
		function sendData() {
			const data = {
				coin: playerInfo.coin,
				bomb: playerInfo.bomb,
				key: playerInfo.key,
				weapon: playerInfo.weapon,
				item: playerInfo.item,
				status: playerInfo.status
			};
			
			const xhr = new XMLHttpRequest();
			xhr.open('POST', '/gonext');
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.send(JSON.stringify(data));
			xhr.onload = function(e) {
				location.href = "/gonext";
			};
		}