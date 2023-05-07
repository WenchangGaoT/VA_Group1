function showSensorGraph(sensor) {

    if (!sensor.includes("camping"))
    {
      var file = "gate_counts.json";
    }
    else
    {
      var file = "output.json";
    }

    Promise.all([
      d3.json(file),
      d3.json("weeks.json")
    ]).then(function(data)
    {
      weeks = data[0][sensor]
      weeks_index = data[0][sensor].map((d, i) => ({ value: d, index: data[1][0][i] }));
    
    const graphContainer = d3.select("#graph-container");
    const graphBottom = d3.select("#bottom-space");
  
    // Clear any existing content
    graphContainer.selectAll('*').remove();
    graphBottom.selectAll('*').remove();
  
    // Show the graph container
    graphContainer.style("display", "block");
    graphBottom.style("display", "block");
    // Set up the chart dimensions
    const height = 300;
    const barWidth = 40;
    const width = barWidth * weeks.length;
    const xAxisLength = 58;

    document.getElementById("graph-name").innerText = `${sensor} Weekly visitors`;
    d3.select("#graph-name").style("display","block");
  
    // Create an SVG for the chart
    const chart = graphContainer
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const xScale = d3
      .scaleLinear()
      .domain([1, xAxisLength])
      .range([0, width]);
  
    const yScale = d3
      .scaleLinear()
      .domain([-3, d3.max(weeks)])
      .range([height, 0]);


  
    const bar = chart
      .selectAll("g")
      .data(weeks_index)
      .join("g")
      .attr("transform", (d, i) => `translate(${i * barWidth}, 0)`);
  
    bar
      .append("rect")
      .attr("y", (d) => yScale(d.value))
      .attr("fill", "red")
      .attr("width", barWidth - 1)
      .attr("height", (d) => height - yScale(d.value) + 5)
      .on("mouseover", function (event, d) {
        updateTooltip(`Week: ${d.index}`, event.pageX, event.pageY);
        })
      .on("mouseout", function () {
        d3.select("#tooltip").style("display", "none");
        })
      .on("click", (event, d) => { console.log ('Bar value: ', d.value);});
  
    bar
      .append("text")
      .attr("x", barWidth/8)
      .attr("y", (d) => yScale(d.value) -1)
      .attr("dy", ".75em")
      .attr("font-size", "20px")
      .text((d) => d.value)
      .on("mouseover", function (event, d) {
        updateTooltip(`Week: ${d.index}`, event.pageX, event.pageY);
        })
      .on("mouseout", function () {
        d3.select("#tooltip").style("display", "none");
        })
      .on("click", (event, d) => { console.log ('Bar value: ', d.value);});
    });
  }