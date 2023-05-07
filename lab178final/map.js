

function findNeighboringRoadCells(data, sensorRow, sensorCol) {
    const neighbors = [];
  
    [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1]
    ].forEach(([di, dj]) => {
      const newRow = sensorRow + di;
      const newCol = sensorCol + dj;
  
      if (
        newRow >= 0 &&
        newRow < data.length &&
        newCol >= 0 &&
        newCol < data[newRow].length &&
        data[newRow][newCol][0] === 1
      ) {
        neighbors.push({ row: newRow, col: newCol });
      }
    });
  
    return neighbors;
  }


// Function to draw lines
function drawLine(g, x1, y1, x2, y2,id, color = "white") {
    const cellSize = 30;
    g
        .append("line")
        .attr("x1", x1 * cellSize + cellSize / 2)
        .attr("y1", y1 * cellSize + cellSize / 2)
        .attr("x2", x2 * cellSize + cellSize / 2)
        .attr("y2", y2 * cellSize + cellSize / 2)
        .attr("stroke", color)
        .attr("stroke-width", 20)
        .attr("stroke-linecap", "round")
        .attr("class", `road-group-${id}`)
    }


function drawSensor(g, x, y, color, sensor, data, paths) {
    const cellSize = 30;
    g
    .append("circle")
    .attr("cx", x * cellSize + cellSize / 2)
    .attr("cy", y * cellSize + cellSize / 2)
    .attr("r", cellSize-6)
    .attr("fill", color)
    .on("mouseover", function (event) {
        for (const key in paths[sensor]){
          var arr = []
          paths[sensor][key].forEach(coord => {
            arr.push(data.find(item => item.x === coord[0] && item.y === coord[1]))
          });
          for (let i = 0; i < arr.length -1; i++){
            drawLine(g, arr[i].y, arr[i].x, arr[i+1].y, arr[i+1].x, 0, "blue");
          }
        }
        d3.select(this).attr("fill", d3.rgb(color).darker());
    })
    .on("mouseout", function () {
        g.selectAll(`.road-group-${0}`).remove();
        d3.select(this).attr("fill", color);
    })
    .on("click", () => showSensorGraph(sensor));
}

function nameSensor(g,x,y,color,sensor,data,paths)
{
  const cellSize = 30;
  g
    .append("text")
    .attr("x", x * cellSize + cellSize * 2)
    .attr("y", y * cellSize + cellSize* -0.5)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .style("fill", color)
    .attr("font-size", "92px")
    .text(sensor)
    .on("mouseover", function (event) {
      for (const key in paths[sensor]){
        var arr = []
        paths[sensor][key].forEach(coord => {
          arr.push(data.find(item => item.x === coord[0] && item.y === coord[1]))
        });
        for (let i = 0; i < arr.length -1; i++){
          drawLine(g, arr[i].y, arr[i].x, arr[i+1].y, arr[i+1].x, 0, "blue");
        }
      }
      d3.select(this).attr("fill", d3.rgb(color).darker());
    })
    .on("mouseout", function () {
        g.selectAll(`.road-group-${0}`).remove();
        d3.select(this).attr("fill", color);
    })
    .on("click", () => showSensorGraph(sensor));
}

function zoomed(g, event) {
  g.attr("transform", event.transform);
}