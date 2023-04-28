import json
from PIL import Image

# Load road segments from the JSON file
with open("road_segments.json", "r") as infile:
    road_segments = json.load(infile)

# Define the dimensions of your grid
height, width = 5, 12

# Set sensor pixels to red
sensor_positions = [(2, 4), (4, 5)]  # Replace with your sensor positions

for i, segment in enumerate(road_segments):
    # Create a black image of the same size as the grid
    image = Image.new("RGB", (width, height), "black")
    pixels = image.load()

    # Set road pixels to white
    for coord in segment:
        y, x = coord
        pixels[x, height - y - 1] = (255, 255, 255)

    # Draw sensors on the image
    for y, x in sensor_positions:
        pixels[x, height - y - 1] = (255, 0, 0)

    # Save the image to a file
    image.save(f"road_segment_{i}.png")