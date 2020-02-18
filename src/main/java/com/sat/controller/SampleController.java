package com.sat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.sat.component.ShutdownManager;

@Controller
public class SampleController {
	
	@Autowired
	private ShutdownManager shutdownManager;
	
	@GetMapping
	public String titlePage() {
		return "title";
	}
	
	@PostMapping(value="/game")
	public String game(Model model, String posted) {
		int[] pos = {210, 160};
		model.addAttribute("pos", pos);
		
		System.out.println("*** ["+posted+"] ***");
		
		return "canvas";
	}
	
	@PostMapping(value="/shutdown")
	public void shutdown() {
		shutdownManager.initiateShutdown();
	}

}
