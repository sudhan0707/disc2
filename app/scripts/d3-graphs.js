/**
 * Equinix - Responsive Main Theme
 * Copyright 2015 
 * @Author - Sudhanva Gnaneshwar
 */

// Popukation Pyramid Graph Source: https://strongriley.github.io/d3/ex/population.html

var ppyramid = function (d3, scope, iElement, iAttrs){
	var w = 400,
		h = scope.height,
		x = d3.scale.linear().range([0, w]),
		y = d3.scale.linear().range([0, h - 40]);

		//SVG element with a bottom-right origin
		 var basesvg = d3.select(iElement[0])
		 		.append("svg:svg")
		 			.attr("width", "100%")
		 			.attr("height", h);

		 // on window resize, re-render d3 canvas
          window.onresize = function() {
            return scope.$apply();
          };			

           scope.$watch(function(){
              return angular.element(window)[0].innerWidth;
            }, function(){
              return scope.render(scope.data);
            }
          );

           // watch for data changes and re-render
          scope.$watch('data', function(newVals, oldVals) {
            return scope.render(newVals);
          }, true);

       scope.render = function(data){
         basesvg.selectAll("*").remove();
		// A sliding container to hold the bars
		var w = d3.select(iElement[0])[0][0].offsetWidth - 26;
		x = d3.scale.linear().range([0, w]),
		y = d3.scale.linear().range([0, h - 40]);
		
		var svg = basesvg
				.append("svg:svg")
					.attr("width", "100%")
					.attr("height", h)
				.append("svg:g")
					.attr("transform", "translate(" + x(1) + "," + (h - 20) + ")scale(-1,-1)");

		var body = svg.append("svg:g")
					.attr("transform","translate(0,0)");

		//A container to hold the y-axis rules.
		var rules = svg.append("svg:g");

		
		d3.csv("population.csv", function(data) {

			  // Convert strings to numbers.
			  data.forEach(function(d) {
			    d.people = +d.people;
			    d.year = +d.year;
			    d.age = +d.age;
			  });

			  // Compute the extent of the data set in age and years.
			  var age0 = 0,
			      age1 = d3.max(data, function(d) { return d.age; }),
			      year0 = d3.min(data, function(d) { return d.year; }),
			      year1 = d3.max(data, function(d) { return d.year; }),
			      year = year1;

			  // Update the scale domains.
			  x.domain([0, age1 + 5]);
			  y.domain([0, d3.max(data, function(d) { return d.people; })]);

			  // Add rules to show the population values.
			  rules = rules.selectAll(".rule")
			      .data(y.ticks(10))
			    .enter().append("svg:g")
			      .attr("class", "rule")
			      .attr("transform", function(d) { return "translate(0," + y(d) + ")"; });

			  rules.append("svg:line")
			      .attr("x2", w);

			  rules.append("svg:text")
			      .attr("x", 6)
			      .attr("dy", ".35em")
			      .attr("transform", "rotate(180)")
			      .text(function(d) { return Math.round(d / 1e6) + "M"; });

			  // Add labeled rects for each birthyear.
			  var years = body.selectAll("g")
			      .data(d3.range(year0 - age1, year1 + 5, 5))
			    .enter().append("svg:g")
			      .attr("transform", function(d) { return "translate(" + x(year1 - d) + ",0)"; });

			  years.selectAll("rect")
			      .data(d3.range(2))
			    .enter().append("svg:rect")
			      .attr("x", 1)
			      .attr("width", x(5) - 2)
			      .attr("height", 1e-6);

			  years.append("svg:text")
			      .attr("y", -6)
			      .attr("x", -x(5) / 2)
			      .attr("transform", "rotate(180)")
			      .attr("text-anchor", "middle")
			      .style("fill", "#fff")
			      .text(String);

			  // Add labels to show the age.
			  svg.append("svg:g").selectAll("text")
			      .data(d3.range(0, age1 + 5, 5))
			    .enter().append("svg:text")
			      .attr("text-anchor", "middle")
			      .attr("transform", function(d) { return "translate(" + (x(d) + x(5) / 2) + ",-4)scale(-1,-1)"; })
			      .attr("dy", ".71em")
			      .text(String);

			  // Nest by year then birthyear.
			  data = d3.nest()
			      .key(function(d) { return d.year; })
			      .key(function(d) { return d.year - d.age; })
			      .rollup(function(v) { return v.map(function(d) { return d.people; }); })
			      .map(data);

			  // Allow the arrow keys to change the displayed year.
			  d3.select(window).on("keydown", function() {
			    switch (d3.event.keyCode) {
			      case 37: year = Math.max(year0, year - 10); break;
			      case 39: year = Math.min(year1, year + 10); break;
			    }
			    redraw();
			  });

			  redraw();

			  function redraw() {
			    if (!(year in data)) return;
			    // title.text(year);

			    body.transition()
			        .duration(750)
			        .attr("transform", function(d) { return "translate(" + x(year - year1) + ",0)"; });

			    years.selectAll("rect")
			        .data(function(d) { return data[year][d] || [0, 0]; })
			      .transition()
			        .duration(750)
			        .attr("height", y);
			  }
			});
	};
};

 var d3bars1 = function (d3, scope, iElement, iAttrs){
 	var svg = d3.select(iElement[0])
              .append("svg")
              .attr("width", "100%");

          // on window resize, re-render d3 canvas
          window.onresize = function() {
            return scope.$apply();
          };
          scope.$watch(function(){
              return angular.element(window)[0].innerWidth;
            }, function(){
              return scope.render(scope.data);
            }
          );

          // watch for data changes and re-render
          scope.$watch('data', function(newVals, oldVals) {
            return scope.render(newVals);
          }, true);

          // define render function
          scope.render = function(data){
            // remove all previous items before render
            svg.selectAll("*").remove();

            // setup variables
            var width, height, max;
            width = d3.select(iElement[0])[0][0].offsetWidth - 20;
              // 20 is for margins and can be changed
            height = scope.data.length * 35;
              // 35 = 30(bar height) + 5(margin between bars)
            max = 98;
              // this can also be found dynamically when the data is not static
              // max = Math.max.apply(Math, _.map(data, ((val)-> val.count)))

            // set the height based on the calculations above
            svg.attr('height', height);

            //create the rectangles for the bar chart
            svg.selectAll("rect")
              .data(data)
              .enter()
                .append("rect")
                .on("click", function(d, i){return scope.onClick({item: d});})
                .attr("height", 30) // height of each bar
                .attr("width", 0) // initial width of 0 for transition
                .attr("x", 10) // half of the 20 side margin specified above
                .attr("y", function(d, i){
                  return i * 35;
                }) // height + margin between bars
                .transition()
                  .duration(1000) // time of duration
                  .attr("width", function(d){
                    return d.score/(max/width);
                  }); // width based on scale

            svg.selectAll("text")
              .data(data)
              .enter()
                .append("text")
                .attr("fill", "#fff")
                .attr("y", function(d, i){return i * 35 + 22;})
                .attr("x", 15)
                .text(function(d){return d[scope.label];});

          };
      };


var biPartite = function(d3, bP, scope, iElement, iAttrs){
	 var height = scope.height;
	 var basesvg = d3.select(iElement[0])
		 		.append("svg:svg")
		 			.attr("width", "100%")
		 			.attr("height", height);
	
              // on window resize, re-render d3 canvas
          window.onresize = function() {
            return scope.$apply();
          };
          scope.$watch(function(){
              return angular.element(window)[0].innerWidth;
            }, function(){
              return scope.render(scope.data);
            }
          );

          // watch for data changes and re-render
          scope.$watch('data', function(newVals, oldVals) {
            return scope.render(newVals);
          }, true);

          // define render function
          scope.render = function(data){
            // remove all previous items before render
            basesvg.selectAll("*").remove();

            var w = d3.select(iElement[0])[0][0].offsetWidth - 26;
				x = d3.scale.linear().range([0, w]),
				y = d3.scale.linear().range([0, height - 40]),
            	margin ={b:0, t:20, l:((w *35)/100), r:00};

           var svg = basesvg
				.append("svg:svg")
				.attr("width", "100%")
				.attr("height", "100%")
				.append("g").attr("transform","translate("+ margin.l+","+margin.t+")");

		var data = [ 
					{
						data: 	bP.partData(scope.data.records,2), 
						id: 	scope.data["id"], 
						header: scope.data["header"]
					}
				];

		bP.draw(data, svg);
    };
};