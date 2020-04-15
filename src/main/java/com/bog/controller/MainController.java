package com.bog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.bog.component.ShutdownManager;
import com.bog.model.PlayerInfo;
import com.bog.model.Room;
import com.bog.service.StageService;

@Controller
public class MainController {
	
	@Autowired
	private StageService stageService;
	
	@Autowired
	private ShutdownManager shutdownManager;
	
	@GetMapping
	public String titlePage() {
		return "title";
	}
	
	@PostMapping(value="/game")
	public String stage(Model model, String posted) {
		int[] pos = {210, 160};
		model.addAttribute("pos", pos);
		
		if(stageService.getPlayerInfo() == null) { // first stage
			stageService.playerInfoInit(posted);
		} else {
			stageService.goNextStage();
		}
		
		PlayerInfo playerInfo = stageService.getPlayerInfo();
		model.addAttribute("playerInfo", playerInfo);
		
		Room[] roomInfo = stageService.roomInfoInit();
		model.addAttribute("roomInfo", roomInfo);
		
		String stage = (playerInfo == null || roomInfo == null) ? "error" : "game";
		
		return stage;
	}
	
	@GetMapping(value="/gonext")
	public String goNext(Model model) {
		model.addAttribute("stage", stageService.getCurrentStage());
		return "gonext";
	}
	
	@PostMapping(value="/gonext")
	public void goNext(@RequestBody PlayerInfo playerInfo) {
		stageService.setPlayerInfo(playerInfo);
	}
	
	@PostMapping(value="/shutdown")
	public void shutdown() {
		shutdownManager.initiateShutdown();
	}

}
