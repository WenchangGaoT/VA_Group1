import numpy as np
import plotly.graph_objs as go
import dash
from dash import dcc
from dash import html
from dash.dependencies import Input, Output
import heapq
import numpy as np
from PIL import Image



def load_grid_from_file(file_path):
    return np.loadtxt(file_path, dtype=int)

# Example usage
array = load_grid_from_file("grid.txt")
array = np.flipud(array)
# Extract road and sensor coordinates
road_coords = np.argwhere(array == 1)
sensor_coords = np.argwhere(array > 1)

# Function to create road segments
def create_road_segments(road_coords):
    road_segments = []
    road_coords_set = set(map(tuple, road_coords))

    for coord in road_coords_set:
        neighbors = [(coord[0] + i, coord[1] + j) for i, j in [(-1, 0), (1, 0), (0, -1), (0, 1)]]

        for neighbor in neighbors:
            if neighbor in road_coords_set:
                road_segments.append((coord, neighbor))

    return road_segments

road_segments = create_road_segments(road_coords)

# Create interactive scatterplot
trace_roads = []
for segment in road_segments:
    x_coords = [segment[0][1], segment[1][1]]
    y_coords = [segment[0][0], segment[1][0]]
    trace_roads.append(go.Scatter(x=x_coords, y=y_coords, mode='lines', line=dict(color='blue'), hoverinfo='text', text='Road Info'))

trace_sensors = go.Scatter(x=sensor_coords[:, 1], y=sensor_coords[:, 0], mode='markers', marker=dict(size=15, color='red'), name='Sensors', hoverinfo='text', text='Sensor Info')

layout = go.Layout(
    hovermode='closest',
    title='Interactive Roadmap',
    xaxis=dict(showgrid=False),
    yaxis=dict(showgrid=False),
    autosize=False,
    width=1600,
    height=1000,
    margin=dict(l=50, r=50, b=100, t=100, pad=4)
)

fig = go.Figure(data=trace_roads + [trace_sensors], layout=layout)

# Create Dash app
app = dash.Dash(__name__)

app.layout = html.Div([
    dcc.Graph(id='roadmap', figure=fig)
])

if __name__ == '__main__':
    app.run_server(debug=True)