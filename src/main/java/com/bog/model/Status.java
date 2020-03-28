package com.bog.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Status {

	private int life;
	
	private int maxLife;
	
	private int elecLife;
	
	private int damage;
	
	private int speed;
	
	private int range;
	
	private int delay;
}
