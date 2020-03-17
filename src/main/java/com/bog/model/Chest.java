package com.bog.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Chest {
	
	private int x;
	
	private int y;
	
	private int itemCode;
	
	private boolean opened;
	
	private boolean locked;
	
	private boolean hidden;
	
}
