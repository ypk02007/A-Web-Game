package com.bog.service;

import org.springframework.stereotype.Service;

import com.bog.model.PlayerInfo;
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
			status = new Status(5, 6, 3, 5, 300);
			playerInfo = new PlayerInfo(0, 0, 0, 1, 0, status);
			break;
		default:
			playerInfo = playerInfoInit("gamjeon");
		}
		
		return playerInfo;
	}
}
