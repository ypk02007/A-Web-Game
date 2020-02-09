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
	public String mainPage(Model model) {
		//model.addAttribute("message", "This is Main Page.");
		int[] pos = {230, 180};
		model.addAttribute("pos", pos);
		
		return "canvas";
	}
	
	@PostMapping(value="/shutdown")
	public void shutdown() {
		shutdownManager.initiateShutdown();
	}

}
