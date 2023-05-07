d3.json("bmp_per_pixel.json").then((data) => {
  d3.json("pathing.json").then((paths) => {

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
      .scaleExtent([0.25, 10]) // Limit zoom scaling to a range of 1x to 10x
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
              drawLine(g, y, x, neighbor.y, neighbor.x, 5);
            }
          });
        } else if (type !== 0) {
          const neighboringRoadCells = findNeighboringRoadCells(data, x, y);

          neighboringRoadCells.forEach(roadCell => {
            drawLine(g, y, x, roadCell.y, roadCell.x, 5);
          });
        }
      });

      // Then, draw the sensors
      data.forEach(item => {
        const { x, y, type } = item;

        if (type !== 0 && type !== 1) {
          drawSensor(g, y, x, sensorColors[type], item.sensor, data, paths);
          nameSensor(g, y, x, sensorColors[type], item.sensor, data, paths);
        }
      });
  svg.call(zoom);


  document.body.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      d3.select("#graph-container").style("display", "none");
      d3.select("#graph-name").style("display", "none");
      d3.select("#bottom-space").style("display", "none");
      d3.select("#json-container").style("display", "none");
    }
  });

  document.getElementById("squatters").addEventListener("click", () => {
    d3.select("#json-container").style("display", "block");
    d3.select("#bottom-space").style("display", "block");
    displayJsonContent_squat((clickedValue) => {
      g.selectAll(`.road-group-${0}`).remove();
      const carIdMatch = clickedValue.match(/car-id: "(.+?)"/);
      var carId = "";
      if (carIdMatch) {
        carId = carIdMatch[1];
      }
    d3.json("many_sensors.json").then((people) => {
      console.log(people[carId]);
    });
  });
});


    document.getElementById("sketchy-people-btn").addEventListener("click", () => {
      d3.select("#json-container").style("display", "block");
      d3.select("#bottom-space").style("display", "block");
      displayJsonContent((clickedValue) => {
        g.selectAll(`.road-group-${0}`).remove();
        const carIdMatch = clickedValue.match(/car-id: "(.+?)"/);
        var carId = "";
        if (carIdMatch) {
          carId = carIdMatch[1];
        }
      d3.json("many_sensors.json").then((people) => {
        console.log(people[carId]);
        

          for (let i = 0; i < people[carId]["route"].length - 1; i++){
            var array = paths[people[carId]["route"][i]][people[carId]["route"][i+1]];
            var arr = []
            if (array !== undefined){
              array.forEach(coord => {
                arr.push(data.find(item => item.x === coord[0] && item.y === coord[1]))
              });
              for (let i = 0; i < arr.length -1; i++){
                drawLine(g, arr[i].y, arr[i].x, arr[i+1].y, arr[i+1].x, 0, "blue");
              }
            }
          }
      });
    });
  });
});


});


function displayJsonContent(onValueClick) {
  d3.json("many_sensors.json").then((people) => {
    const container = document.querySelector(".json-content");
    let listHtml = "<ul>";

    for (const key in people) {
      const person = people[key];
      listHtml += `<li class="clickable-value" style="color: yellow;">car-id: "${person.car_id}" , car-type: "${person.car_type}", route-length: "${person.route.length}", frequency: "${person.frequency}"</li>`;
    }

    listHtml += "</ul>";
    container.innerHTML = listHtml;

    const clickableValues = document.querySelectorAll(".clickable-value");
    clickableValues.forEach((value) => {
      value.addEventListener("click", () => {
        if (onValueClick) {
          onValueClick(value.textContent);
        }
      });
    });
  });
}


function displayJsonContent_squat(onValueClick) {
  d3.json("long_stay.json").then((people) => {
    const container = document.querySelector(".json-content");
    let listHtml = "<ul>";

    for (const key in people) {
      const person = people[key];
      console.log(person);
      listHtml += `<li class="clickable-value" style="color: yellow;">car-id: "${person.car_id}" , campsite: "${person.location}", days-spent: "${person.hours_spent}", start-date: "${person.start_time}"</li>`;
    }

    listHtml += "</ul>";
    container.innerHTML = listHtml;

    const clickableValues = document.querySelectorAll(".clickable-value");
    clickableValues.forEach((value) => {
      value.addEventListener("click", () => {
        if (onValueClick) {
          onValueClick(value.textContent);
        }
      });
    });
  });
}