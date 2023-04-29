import json

# Read the input file and create a 2D array
with open('grid.txt', 'r') as file:
    data = [list(map(int, line.strip().split())) for line in file]

# Convert the 2D array to JSON format and write it to the output file
with open('data1.json', 'w') as file:
    json.dump(data, file, indent=2)