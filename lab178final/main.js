d3.json("bmp_per_pixel.json").then((data) => {
    //data = data.map(row =>
    //    row.map(cell => [parseInt(cell[0], 10), parseInt(cell[1], 10)])
    //);
    console.log(data[0])

    const tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("display", "none");
            
    const cellSize = 30;
    const width = 6000;
    const height = 6000;
    
    const sensorColors = {
        2: "red",
        3: "cyan",
        4: "green",
        5: "yellow",
        6: "purple",
        7: "orange",
      };
    // Set up the zoom behavior
    const zoom = d3.zoom()
    .scaleExtent([1, 10]) // Limit zoom scaling to a range of 1x to 10x
    .on("zoom", (event) => zoomed(g, event));
      
  
    const svg = d3
    .select("#line-plot")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .style("pointer-events", "all");
    
    const g = svg.append("g");



    function findNeighboringRoadCells(data, x, y) {
      const neighboringCoords = [
        { x: x - 1, y },
        { x: x + 1, y },
        { x, y: y - 1 },
        { x, y: y + 1 }
      ];
    
      return neighboringCoords
        .map(coord => data.find(item => item.x === coord.x && item.y === coord.y))
        .filter(neighbor => neighbor && neighbor.type === 1);
    }
    
    // Draw the roads and sensors
    data.forEach(item => {
      const { x, y, type, road } = item;

      if (type === 1) {
        const neighbors = [
          { x: x - 1, y },
          { x: x + 1, y },
          { x, y: y - 1 },
          { x, y: y + 1 }
        ];

        neighbors.forEach(neighbor => {
          const foundNeighbor = data.find(item => item.x === neighbor.x && item.y === neighbor.y);

          if (foundNeighbor && foundNeighbor.type === 1) {
            drawLine(g, y, x, neighbor.y, neighbor.x, road);
          }
        });
      } else if (type !== 0) {
        const neighboringRoadCells = findNeighboringRoadCells(data, x, y);

        neighboringRoadCells.forEach(roadCell => {
          drawLine(g, y, x, roadCell.y, roadCell.x, road);
        });
      }
    });

    // Then, draw the sensors
    data.forEach(item => {
      const { x, y, type } = item;

      if (type !== 0 && type !== 1) {
        drawSensor(g, y, x, sensorColors[type], item);
      }
    });
svg.call(zoom);
});


document.body.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    d3.select("#graph-container").style("display", "none");
  }
});