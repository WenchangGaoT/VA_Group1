function updateTooltip(content, x, y) {
    const tooltip = d3.select("#tooltip");
    tooltip
      .html(content)
      .style("left", `${x + 10}px`)
      .style("top", `${y - 10}px`)
      .style("display", "block");
  }