package com.bog.service;

import java.util.Random;

import org.springframework.stereotype.Service;

import com.bog.model.Chest;
import com.bog.model.PlayerInfo;
import com.bog.model.Room;
import com.bog.model.Status;

import lombok.Getter;
import lombok.Setter;

@Service
public class StageService {
	
	@Getter
	private int currentStage = 1;
	
	@Getter
	@Setter
	private PlayerInfo playerInfo = null;
	
	public void goNextStage() {
		currentStage++;
	}
	
	public void playerInfoInit(String name) {
		Status status;
		
		switch(name) {
		case "gamjeon":
			status = new Status(6, 6, 0, 1, 5, 20, 300);
			playerInfo = new PlayerInfo(10, 5, 5, 1, 0, status);
			break;
		}
	}
	
	public Room[] roomInfoInit() {
		if(currentStage == 1) {
			Room[] roomInfo = new Room[11];
			int[][] map = {{1, 2}, {1, 1}, {0, 1}, {2, 1}, {2, 0}, {1, 3}, {0, 3}, {0, 4}, {2, 3}, {2, 4}, {0, 0}};
			int[][] door = {{0, 0, 2, 2}, {1, 1, 0, 2}, {0, 1, 1, 0}, {1, 0, 1, 0}, {0, 0, 0, 1}, {1, 1, 2, 0}, {0, 1, 0, 1}, {0, 0, 1, 0}, {1, 0, 0, 1}, {0, 0, 1, 0}, {0, 0, 0, 1}};
			int[][] link = {{0, 0, 1, 5}, {2, 3, 0, 0}, {0, 1, 10, 0}, {1, 0, 4, 0}, {0, 0, 0, 3}, {6, 8, 0, 0}, {0, 5, 0, 7}, {0, 0, 6, 0}, {5, 0, 0, 9}, {0, 0, 8, 0}, {0, 0, 0, 2}};
			
			for(int i = 0; i < roomInfo.length; i++) {
				int visited = 0;
				if(i == 1 || i == 5) {
					visited = 1;
				} else if(i == 0) {
					visited = 2;
				}
				roomInfo[i] = new Room(door[i], link[i], visited, map[i], setObstacles(currentStage, i), false);
			}
			
			roomInfo = setSpecialRoom(currentStage, roomInfo);
			roomInfo = setMonsters(currentStage, roomInfo);
			
			return roomInfo;
		} else if(currentStage == 2) {
			Room[] roomInfo = new Room[1];
			int[][] map = {{2, 1}};
			int[][] door = {{0, 0, 0, 0}};
			int[][] link = {{0, 0, 0, 0}};
			
			roomInfo[0] = new Room(door[0], link[0], 2, map[0], setObstacles(currentStage, 0), false);
			
			return roomInfo;
		}
		return null;
	}
	
	private int[][] setObstacles(int stage, int roomNo) { // x, y, code
		if(stage == 1) {
			switch(roomNo) {
			case 1:
				int[][] obstacles101 = {{1, 1, 1}, {5, 1, 1}, {1, 3, 1}, {5, 3, 1}};
				return obstacles101;
			case 2:
				int[][] obstacles102 = new int[10][3];
				for(int i = 0; i < obstacles102.length; i++) {
					obstacles102[i][0] = i%5+1;
					obstacles102[i][1] = (i/5==0) ? 1 : 3;
					obstacles102[i][2] = 1;
				}
				return obstacles102;
			case 3:
				int[][] obstacles103 = {{5, 1, 2}, {1, 1, 1}, {2, 1, 1}, {1, 2, 1}, {5, 2, 1}, {4, 3, 1}, {5, 3, 1}, {1, 4, 2}};
				return obstacles103;
			case 5:
				int[][] obstacles105 = {{1, 1, 2}, {2, 1, 1}, {4, 1, 1}, {5, 1, 2}, {2, 2, 2}, {4, 2, 2}, {1, 3, 2}, {2, 3, 1}, {4, 3, 1}, {5, 3, 2}};
				return obstacles105;
			case 8:
				int[][] obstacles108 = {{5, 0, 1}, {0, 1, 1}, {1, 1, 1}, {2, 1, 1}, {5, 1, 1}, {1, 3, 1}, {4, 3, 1}, {5, 3, 1}, {6, 3, 1}, {1, 4, 1}};
				return obstacles108;
			}
		}
		int[][] obstacles_d = {};
		return obstacles_d;
	}
	
	private Room[] setMonsters(int stage, Room[] room) { // code, x, y
		if(stage == 1) {
			int[][] monster1 = {{1, 180, 180}, {1, 180, 240}};
			room[1].setMonsters(monster1);
			
			int[][] monster2 = {{2, 180, 60}, {2, 240, 180}, {2, 300, 300}};
			room[2].setMonsters(monster2);
			
			int[][] monster3 = {{4, 180, 180}, {4, 300, 180}, {3, 360, 60}, {3, 120, 240}};
			room[3].setMonsters(monster3);
			
			int[][] monster5 = {{3, 200, 200}, {3, 300, 300}};
			room[5].setMonsters(monster5);
			
			int[][] monster6 = {{1, 240, 180}, {2, 120, 120}, {2, 360, 240}};
			room[6].setMonsters(monster6);
			
			int[][] monster8 = {{4, 120, 180}, {4, 240, 180}, {4, 320, 180}};
			room[8].setMonsters(monster8);
		}

		return room;
	}
	
	private Room[] setSpecialRoom(int stage, Room[] room) {
		int max = 0;
		if(stage == 1) {
			max = 4;
		}
		int[] sp = new int[4]; // {boss, golden, chest, key}
		
		Random generator = new Random();
		
		sp[0] = generator.nextInt(max);

		while(true) {
			int randG = generator.nextInt(max);
			if(randG != sp[0]) {
				sp[1] = randG;
				break;
			}
		}
		while(true) {
			int randC = generator.nextInt(max);
			if(randC != sp[0] && randC != sp[1]) {
				sp[2] = randC;
				break;
			}
		}
		while(true) {
			int randK = generator.nextInt(max);
			if(randK != sp[0] && randK != sp[1] && randK != sp[2]) {
				sp[3] = randK;
				break;
			}
		}
		
		switch(sp[0]) { // determine boss room
		case 0:
			int[] doorBossRoom0 = {0, 0, 0, 9};
			int[] doorAdjacent0 = {0, 1, 9, 0};
			room[10].setDoors(doorBossRoom0);
			room[10].setBossRoom(true);
			room[2].setDoors(doorAdjacent0);
			break;
		case 1:
			int[] doorBossRoom1 = {0, 0, 0, 9};
			int[] doorAdjacent1 = {1, 0, 9, 0};
			room[4].setDoors(doorBossRoom1);
			room[4].setBossRoom(true);
			room[3].setDoors(doorAdjacent1);
			break;
		case 2:
			int[] doorBossRoom2 = {0, 0, 9, 0};
			int[] doorAdjacent2 = {0, 1, 0, 9};
			room[7].setDoors(doorBossRoom2);
			room[7].setBossRoom(true);
			room[6].setDoors(doorAdjacent2);
			break;
		case 3:
			int[] doorBossRoom3 = {0, 0, 9, 0};
			int[] doorAdjacent3 = {1, 0, 0, 9};
			room[9].setDoors(doorBossRoom3);
			room[9].setBossRoom(true);
			room[8].setDoors(doorAdjacent3);
			break;
		}
		
		switch(sp[1]) { // determine golden room
		case 0:
			int[] doorBossRoom0 = {0, 0, 0, 8};
			int[] doorAdjacent0 = {0, 1, 7, 0};
			room[10].setDoors(doorBossRoom0);
			int[][] item0 = {{3, 2, randItem("not1line")}};
			room[10].setItems(item0);
			room[2].setDoors(doorAdjacent0);
			break;
		case 1:
			int[] doorBossRoom1 = {0, 0, 0, 8};
			int[] doorAdjacent1 = {1, 0, 7, 0};
			room[4].setDoors(doorBossRoom1);
			int[][] item1 = {{3, 2, randItem("not1line")}};
			room[4].setItems(item1);
			room[3].setDoors(doorAdjacent1);
			break;
		case 2:
			int[] doorBossRoom2 = {0, 0, 8, 0};
			int[] doorAdjacent2 = {0, 1, 0, 7};
			room[7].setDoors(doorBossRoom2);
			int[][] item2 = {{3, 2, randItem("not1line")}};
			room[7].setItems(item2);
			room[6].setDoors(doorAdjacent2);
			break;
		case 3:
			int[] doorBossRoom3 = {0, 0, 8, 0};
			int[] doorAdjacent3 = {1, 0, 0, 7};
			room[9].setDoors(doorBossRoom3);
			int[][] item3 = {{3, 2, randItem("not1line")}};
			room[9].setItems(item3);
			room[8].setDoors(doorAdjacent3);
			break;
		}
		
		
		
		switch(sp[2]) { // determine chest room
		case 0:
			room[10].setChest(new Chest(3, 2, randItem("1line"), false, false, 0));
			break;
		case 1:
			room[4].setChest(new Chest(3, 2, randItem("1line"), false, false, 0));
			break;
		case 2:
			room[7].setChest(new Chest(3, 2, randItem("1line"), false, false, 0));
			break;
		case 3:
			room[9].setChest(new Chest(3, 2, randItem("1line"), false, false, 0));
			break;
		}
		
		switch(sp[3]) { // determine key room
		case 0:
			int[][] item0 = {{3, 2, 4}};
			room[10].setItems(item0);
			break;
		case 1:
			int[][] item1 = {{3, 2, 4}};
			room[4].setItems(item1);
			break;
		case 2:
			int[][] item2 = {{3, 2, 4}};
			room[7].setItems(item2);
			break;
		case 3:
			int[][] item3 = {{3, 2, 4}};
			room[9].setItems(item3);
			break;
		}
		
		return room;
	}
	
	private int randItem(String range) {
		Random generator = new Random();
		int min = 0;
		int max = 15;
		
		switch(range) {
		case "1line":
			max = 7;
			break;
		case "not1line":
			min = 10;
			break;
		}
		
		return generator.nextInt(max - min) + min;
	}
}
