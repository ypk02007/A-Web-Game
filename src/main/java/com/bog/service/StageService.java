package com.bog.service;

import org.springframework.stereotype.Service;

import com.bog.model.Chest;
import com.bog.model.PlayerInfo;
import com.bog.model.Room;
import com.bog.model.Status;

@Service
public class StageService {

	public String goToStage(String str) {
		switch(str) {
		case "GAMJEON":
			return "game";
		default:
			return "title";	
		}
	}
	
	public PlayerInfo playerInfoInit(String name) {
		PlayerInfo playerInfo;
		Status status;
		
		switch(name) {
		case "gamjeon":
			status = new Status(4, 6, 0, 1, 5, 20, 300);
			playerInfo = new PlayerInfo(99, 99, 99, 1, 0, status);
			break;
		default:
			playerInfo = playerInfoInit("gamjeon");
		}
		
		return playerInfo;
	}
	
	public Room[] roomInfoInit() {
		Room[] roomInfo = new Room[11];
		int[][] map = {{1, 2}, {1, 1}, {0, 1}, {2, 1}, {2, 0}, {1, 3}, {0, 3}, {0, 4}, {2, 3}, {2, 4}, {0, 0}};
		
		int[] door0 = {0, 0, 2, 2};
		int[] link0 = {0, 0, 1, 5};
		roomInfo[0] = new Room(door0, link0, 2, map[0], setObstacles(1, 0));
		Chest chestInfo = new Chest(1, 3, 14, false, false, 0);
		roomInfo[0].setChest(chestInfo);
		
		int[] door1 = {1, 1, 0, 2};
		int[] link1 = {2, 3, 0, 0};
		int[][] monster1 = {{1, 180 ,120}};
		roomInfo[1] = new Room(door1, link1, 1, map[1], setObstacles(1, 1));
		roomInfo[1].setMonsters(monster1);
		
		int[] door2 = {0, 1, 1, 0};
		int[] link2 = {0, 1, 10, 0};
		roomInfo[2] = new Room(door2, link2, 0, map[2], setObstacles(1, 2));
		
		int[] door3 = {1, 0, 0, 0};
		int[] link3 = {2, 0, 0, 0};
		roomInfo[3] = new Room(door3, link3, 0, map[3], setObstacles(1, 3));
		
		int[] door4 = {0, 0, 0, 1};
		int[] link4 = {0, 0, 0, 3};
		roomInfo[4] = new Room(door4, link4, 0, map[4], setObstacles(1, 4));
		
		int[] door5 = {1, 1, 2, 0};
		int[] link5 = {6, 8, 0, 0};
		int[][] monster5 = {{3, 300 ,100}};
		roomInfo[5] = new Room(door5, link5, 1, map[5], setObstacles(1, 5));
		roomInfo[5].setMonsters(monster5);
		
		int[] door6 = {0, 1, 0, 1};
		int[] link6 = {0, 5, 0, 7};
		roomInfo[6] = new Room(door6, link6, 0, map[6], setObstacles(1, 6));

		int[] door7 = {0, 0, 1, 0};
		int[] link7 = {0, 0, 6, 0};
		roomInfo[7] = new Room(door7, link7, 0, map[7], setObstacles(1, 7));
		
		int[] door8 = {1, 0, 0, 1};
		int[] link8 = {5, 0, 0, 9};
		roomInfo[8] = new Room(door8, link8, 0, map[8], setObstacles(1, 8));
		
		int[] door9 = {0, 0, 1, 0};
		int[] link9 = {0, 0, 8, 0};
		roomInfo[9] = new Room(door9, link9, 0, map[9], setObstacles(1, 9));
		
		int[] door10 = {0, 0, 0, 1};
		int[] link10 = {0, 0, 0, 2};
		roomInfo[10] = new Room(door10, link10, 0, map[10], setObstacles(1, 10));
		
		return roomInfo;
	}
	
	private int[][] setObstacles(int stage, int roomNo) { // x, y, code
		if(stage == 1 && roomNo == 1) {
			int[][] obstacles = {{0, 0, 1}, {3, 3, 1}};
			return obstacles;
		} else if(stage == 1 && roomNo == 5) {
			int[][] obstacles = {{2, 2, 1}, {3, 3, 2}, {2, 4, 1}};
			return obstacles;
		} else {
			int[][] obstacles = {};
			return obstacles;
		}
	}
	
}
