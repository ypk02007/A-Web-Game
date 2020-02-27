package com.bog.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PlayerInfo {
	
	private int coin;
	
	private int bomb;
	
	private int key;
	
	private int weapon;
	
	private int item;
	
	private Status status;
	
}
