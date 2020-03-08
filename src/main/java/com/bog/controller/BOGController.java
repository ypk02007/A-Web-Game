package com.bog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.bog.component.ShutdownManager;
import com.bog.model.PlayerInfo;
import com.bog.model.Room;
import com.bog.model.TestModel;
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
	
	@GetMapping(value="/test")
	public String test(Model model) {
		int[] pos = {210, 160};
		model.addAttribute("pos", pos);
		
		return "canvas";
	}
	
	@PostMapping(value="/game")
	public String stage(Model model, String posted) {
		int[] pos = {210, 160};
		model.addAttribute("pos", pos);
		
		PlayerInfo playerInfo = stageService.playerInfoInit("gamjeon");
		model.addAttribute("playerInfo", playerInfo);
		
		Room[] roomInfo = stageService.roomInfoInit();
		model.addAttribute("roomInfo", roomInfo);
		
		TestModel tm = new TestModel();
		tm.setInfo("test info");
		model.addAttribute("testInfo", tm);
		
		String stage = stageService.goToStage(posted);
		
		return stage;
	}
	
	@PostMapping(value="/shutdown")
	public void shutdown() {
		shutdownManager.initiateShutdown();
	}

}
