function showGraph(data, x, y) {
    const graphContainer = d3.select("#graph-container");
  
    // Clear any existing content
    graphContainer.selectAll('*').remove();
  
    // Show the graph container
    graphContainer.style("display", "block");
  
    // Example data for the bar chart
    const exampleData = [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2];
  
    // Set up the chart dimensions
    const height = 1200;
    const barWidth = 120;
  
    // Create an SVG for the chart
    const chart = graphContainer
      .append("svg")
      .attr("width", barWidth * exampleData.length)
      .attr("height", height);
  
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(exampleData)])
      .range([height, 0]);
  
    const bar = chart
      .selectAll("g")
      .data(exampleData)
      .join("g")
      .attr("transform", (d, i) => `translate(${i * barWidth}, 0)`);
  
    bar
      .append("rect")
      .attr("y", (d) => yScale(d))
      .attr("fill", "red")
      .attr("width", barWidth - 1)
      .attr("height", (d) => height - yScale(d));
  
    bar
      .append("text")
      .attr("x", barWidth/8)
      .attr("y", (d) => yScale(d) + 3)
      .attr("dy", ".75em")
      .attr("font-size", "72px")
      .text((d) => d);
    
    chart.call(zoom);
  }
  