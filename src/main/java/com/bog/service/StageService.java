package com.bog.service;

import org.springframework.stereotype.Service;

import com.bog.model.PlayerInfo;
import com.bog.model.Room;
import com.bog.model.Status;

@Service
public class StageService {

	public String goToStage(String str) {
		switch(str) {
		case "GAMJEON":
			return "stage1";
		default:
			return "title";	
		}
	}
	
	public PlayerInfo playerInfoInit(String name) {
		PlayerInfo playerInfo;
		Status status;
		
		switch(name) {
		case "gamjeon":
			status = new Status(6, 6, 3, 5, 300);
			playerInfo = new PlayerInfo(0, 0, 0, 1, 0, status);
			break;
		default:
			playerInfo = playerInfoInit("gamjeon");
		}
		
		return playerInfo;
	}
	
	public Room[] roomInfoInit() {
		Room[] roomInfo = new Room[10];

		int[] door0 = {0, 0, 2, 2};
		int[] link0 = {0, 0, 1, 5};
		roomInfo[0] = new Room(door0, link0, 2);
		
		int[] door1 = {1, 1, 1, 1};
		int[] link1 = {2, 3, 4, 0};
		roomInfo[1] = new Room(door1, link1, 1);
		
		int[] door2 = {0, 1, 0, 0};
		int[] link2 = {0, 1, 0, 0};
		roomInfo[2] = new Room(door2, link2, 0);
		
		int[] door3 = {1, 0, 0, 0};
		int[] link3 = {2, 0, 0, 0};
		roomInfo[3] = new Room(door3, link3, 0);
		
		int[] door4 = {0, 0, 0, 1};
		int[] link4 = {0, 0, 0, 3};
		roomInfo[4] = new Room(door4, link4, 0);
		
		int[] door5 = {1, 1, 1, 0};
		int[] link5 = {6, 8, 1, 0};
		roomInfo[5] = new Room(door5, link5, 1);
		
		int[] door6 = {0, 1, 0, 1};
		int[] link6 = {0, 5, 0, 7};
		roomInfo[6] = new Room(door6, link6, 0);

		int[] door7 = {0, 0, 1, 0};
		int[] link7 = {0, 0, 6, 0};
		roomInfo[7] = new Room(door7, link7, 0);
		
		int[] door8 = {1, 0, 0, 1};
		int[] link8 = {5, 0, 0, 9};
		roomInfo[8] = new Room(door8, link8, 0);
		
		int[] door9 = {0, 0, 1, 0};
		int[] link9 = {0, 0, 8, 0};
		roomInfo[9] = new Room(door9, link9, 0);
		
		return roomInfo;
	}
	
}
