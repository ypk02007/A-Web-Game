package com.bog.service;

import org.springframework.stereotype.Service;

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
	
}
