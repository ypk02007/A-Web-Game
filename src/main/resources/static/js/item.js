console.log("item.js has been included");

function getItem(itemCode) {
	var itemInfo = null;
	switch(itemCode) {
	case 0: // heart
		if(playerInfo.status.life < playerInfo.status.maxLife) {
			playerInfo.status.life += 2;
		}
		if(playerInfo.status.life > playerInfo.status.maxLife) {
			playerInfo.status.life = playerInfo.status.maxLife;
		}
		break;
	case 1: // half heart
		if(playerInfo.status.life < playerInfo.status.maxLife) {
			playerInfo.status.life++;
		}
		break;
	case 2: // bomb
		if(playerInfo.bomb < 100) {
			playerInfo.bomb++;
		}
		break;
	case 3: // coin
		if(playerInfo.coin < 100) {
			playerInfo.coin++;
		}
		break;
	case 4: // key
		if(playerInfo.key < 100) {
			playerInfo.key++;
		}
		break;
	case 5: // electric heart
		playerInfo.status.eLife += 2;
		break;
	case 6: // half electric heart
		playerInfo.status.eLife++;
		break;
	case 10: // hp up
		playerInfo.status.maxLife += 2;
		playerInfo.status.life += 2;
		itemInfo = ["ENERGY DRINK", "HP UP"];
		break;
	case 11: // dmg up
		playerInfo.status.damage++;
		itemInfo = ["B.F.SWORD", "DMG UP"];
		break;
	case 12: // speed up
		playerInfo.status.speed ++;
		itemInfo = ["THREE-LINED SLIPPER", "SPEED UP"];
		break;
	case 13: // range up
		playerInfo.status.range += 3;
		itemInfo = ["MAGNIFIER", "RANGE UP"];
		break;
	case 14: // delay down
		playerInfo.status.delay -= 25;
		itemInfo = ["BIG RED BUTTON", "DELAY DOWN"];
		break;
	}
	
	return itemInfo;
}