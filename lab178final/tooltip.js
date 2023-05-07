function updateTooltip(content, x, y) {
    const tooltip = d3.select("#tooltip");
    const tooltipHeight = parseInt(tooltip.style("height"));

    tooltip
      .html(content)
      .style("left", x +"px")
      .style("top", (y - 30) + "px")
      .style("display", "block");
  }