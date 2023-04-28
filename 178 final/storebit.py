from PIL import Image
import numpy as np
import json

def load_bitmap(filename):
    image = Image.open(filename)
    data = np.array(image)
    grid = np.zeros((data.shape[0], data.shape[1]))

    def assign_color(pixel, i, j):
        if pixel == 35:
            return 1  # White (road)
        elif pixel == 28:
            return 2  # Green (entrance sensors)
        elif pixel == 29:
            return 3  # Cyan (general-gate sensors)
        elif pixel == 30:
            return 4  # Red (gate sensors)
        elif pixel == 31:
            return 5  # Orange (camping sensors)
        elif pixel == 32:
            return 6  # Purple (ranger-base)
        elif pixel == 33:
            return 7  # Yellow (ranger-stops)
        else:
            return 0  # Black (non-traversable space)

    for j in range(data.shape[1]):  # Traverse columns
        for i in range(data.shape[0]):  # Traverse rows
            pixel = data[j][i]
            grid[j][i] = assign_color(pixel, i, j)

    # Save the grid to a file
    np.savetxt("grid.txt", grid, fmt='%d')

    return grid

# Example usage
filename = "Lekagul Roadways.bmp"
grid = load_bitmap(filename)