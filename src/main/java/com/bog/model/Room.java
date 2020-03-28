package com.bog.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Room {
	
	private int[] doors;
	
	private int[] linked;
	
	private int visited; // 0: not found 1: able to visit 2: visited already
	
	private int[] map; // grid position of room(minimap graphic)
	
	private int[][] obstacles; // {gridX, gridY, obstacleCode}
	
	private int[][] monsters; // {monsterCode, x, y}
	
	private int[][] items; // {gridX, gridY, itemCode}
	
	private Chest chest;
	
	private boolean bossRoom;

	public Room(int[] doors, int[] linked, int visited, int[] map, int[][] obstacles, boolean bossRoom) {
		this.doors = doors;
		this.linked = linked;
		this.visited = visited;
		this.map = map;
		this.obstacles = obstacles;
		this.bossRoom = bossRoom;
	}
}
