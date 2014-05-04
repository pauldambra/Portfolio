var Dimensions = function(width, height) {
	this.width = width;
	this.height = height;
}

var KnowledgeCloud = function(element, data, dimensions) {

	var fill = d3.scale.category20();

	  d3.layout.cloud().size([dimensions.width, dimensions.height])
	      .words(data.map(function(d) {
	        return {text: d, size: 14 + Math.random() * 80};
	      }))
	      .padding(5)
	      .rotate(function() { return ~~(Math.random() * 2) * 90; })
	      .font("Impact")
	      .fontSize(function(d) { return d.size; })
	      .on("end", draw)
	      .start();
	
	  function draw(words) {
	    d3.select(element).append("svg")
	        .attr("width", dimensions.width)
	        .attr("height", dimensions.height)
	      .append("g")
	        .attr("transform", "translate(" + dimensions.width/2 + "," + dimensions.height/2 + ")")
	      .selectAll("text")
	        .data(words)
	      .enter().append("text")
	        .style("font-size", function(d) { return d.size + "px"; })
	        .style("font-family", "Impact")
	        .style("fill", function(d, i) { return fill(i); })
	        .attr("text-anchor", "middle")
	        .attr("transform", function(d) {
	          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
	        })
	        .text(function(d) { return d.text; });
	  };
};