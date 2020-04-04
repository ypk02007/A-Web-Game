package com.bog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.bog.component.ShutdownManager;
import com.bog.model.PlayerInfo;
import com.bog.model.Room;
import com.bog.service.StageService;

@Controller
public class BOGController {
	
	@Autowired
	private StageService stageService;
	
	@Autowired
	private ShutdownManager shutdownManager;
	
	@GetMapping
	public String titlePage() {
		return "title";
	}
	
	@GetMapping(value="/gonext")
	public String goNext(Model model) {
		model.addAttribute("stage", 1);
		return "gonext";
	}
	
	@PostMapping(value="/game")
	public String stage(Model model, String posted) {
		int[] pos = {210, 160};
		model.addAttribute("pos", pos);
		
		PlayerInfo playerInfo = stageService.playerInfoInit("gamjeon");
		model.addAttribute("playerInfo", playerInfo);
		
		Room[] roomInfo = stageService.roomInfoInit(1);
		model.addAttribute("roomInfo", roomInfo);
		
		String stage = stageService.goToStage(posted);
		
		return stage;
	}
	
	@PostMapping(value="/shutdown")
	public void shutdown() {
		shutdownManager.initiateShutdown();
	}

}
