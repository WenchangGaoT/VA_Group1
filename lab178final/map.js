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
function drawLine(g, x1, y1, x2, y2, id, color = "white") {
    const cellSize = 30;
    g
        .append("line")
        .attr("x1", x1 * cellSize + cellSize / 2)
        .attr("y1", y1 * cellSize + cellSize / 2)
        .attr("x2", x2 * cellSize + cellSize / 2)
        .attr("y2", y2 * cellSize + cellSize / 2)
        .attr("stroke", color)
        .attr("stroke-width", 15)
        .attr("stroke-linecap", "round") // Add this attribute to make line corners rounded
        .attr("class", `road-group-${id}`)
        .on("mouseover", function (event) {
        g.selectAll(`.road-group-${id}`).attr("stroke", "blue");
        updateTooltip(`Road ID: ${id}`, event.pageX, event.pageY);
        })
        .on("mouseout", function () {
        g.selectAll(`.road-group-${id}`).attr("stroke", color);
        d3.select("#tooltip").style("display", "none");
        })
        .on("click", () => showGraph({ type: "road", id: id }, x1, y1));

    }


function drawSensor(g, x, y, color, cell) {
    const cellSize = 30;
    g
    .append("circle")
    .attr("cx", x * cellSize + cellSize / 2)
    .attr("cy", y * cellSize + cellSize / 2)
    .attr("r", cellSize-6)
    .attr("fill", color)
    .on("mouseover", function (event) {
        d3.select(this).attr("fill", d3.rgb(color).darker());
        updateTooltip(`Sensor Color: ${color}`, event.pageX, event.pageY);
    })
    .on("mouseout", function () {
        d3.select(this).attr("fill", color);
        d3.select("#tooltip").style("display", "none");
    })
    .on("click", () => showGraph({ type: "sensor", color: color }, x, y));


}

function zoomed(g, event) {
  g.attr("transform", event.transform);
}