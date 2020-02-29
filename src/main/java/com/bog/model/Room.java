package com.bog.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Room {
	
	private int[] doors;
	
	private int[] linked;
	
	private int visited; // 0: not found 1: able to visit 2: visited already
	
	private int[] map;
}
