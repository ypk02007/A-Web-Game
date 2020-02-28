package com.bog.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Room {

	private int roomNo;
	
	private int[] doors;
	
	private int[] linked;
	
	private int[] visited;
	
}
