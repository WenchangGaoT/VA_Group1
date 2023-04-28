import numpy as np
import json
from collections import deque
from itertools import product

def bfs(grid, start):
    visited = set()
    queue = deque([start])

    while queue:
        x, y = queue.popleft()

        if (x, y) not in visited:
            visited.add((x, y))

            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nx, ny = x + dx, y + dy

                if 0 <= nx < grid.shape[0] and 0 <= ny < grid.shape[1] and grid[nx][ny] == 1:
                    queue.append((nx, ny))

    return visited

def road_segments_from_sensors(grid, sensors):
    road_segments = []

    for sensor in sensors:
        road_segment = bfs(grid, sensor)
        road_segments.append(road_segment)

    return road_segments

grid = np.array([
    [0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1],
])

sensors = [(2, 4), (4, 5)]

# Flip the grid and sensor coordinates to correct orientation
grid = np.flipud(grid)
sensors = [(grid.shape[0] - 1 - x, y) for x, y in sensors]

road_segments = road_segments_from_sensors(grid, sensors)

with open("road_segments.json", "w") as outfile:
    json.dump([list(segment) for segment in road_segments], outfile)