// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


d3.csv("assets/data/data.csv").then(function(data){
  data.forEach(function(data){
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
  });

var xLinearScale = d3.scaleLinear()
  .domain([d3.min(data, d=> d.poverty)*0.9, d3.max(data, d=> d.poverty)*1.1])
  .range([0, width]); 

var yLinearScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.healthcare)])
  .range([height, 0]);

var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

chartGroup.append("g")
    .call(leftAxis);


var circlesGroup = chartGroup.selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.poverty))
  .attr("cy", d => yLinearScale(d.healthcare))
  .attr("r", "15")
  .attr("fill", "blue")
  .attr("opacity", ".25");

var toolTip = d3.tip()
    .attr("class","d3-tip")
    .offset([90, -90])
    .html(function(d){
      return (`State: ${d.state}<br>Poverty: ${d.poverty}%<br>Lack Healthcare: ${d.healthcare}%`);
    });
  
textGroup = chartGroup.append("g")
textGroup.selectAll("text")
  .data(data)
  .enter()
  .append("text")
  .text(function(d){
    return d.abbr;
  })
  .attr("dx", function(d){
    return xLinearScale(d.poverty)-10;
  })
  .attr("dy", function(d){
    return yLinearScale(d.healthcare)+ 15/2.5;
  })
  .attr("font-size", 15)
  .call(toolTip);

circlesGroup.on("mouseover", function (data){
    toolTip.show(data, this);
  })
    .on("mouseout", function(data, index){
      toolTip.hide(data);
    });
chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left +40)
  .attr("x", 0 - (height/2))
  .attr("dy", "1em")
  .attr("class","axisText")
  .text("Lack Healthcare (%)");

chartGroup.append("text")
  .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
  .attr("class", "axisText")
  .text("Poverty (%)");
}).catch(function(error) {
console.log(error);
});



// let width = parseInt(d3.select("#scatter").style("width"))
// let height = width-width/3.9;

// let margin = 20;

// let labelArea=110;

// let topPadBottom = 40;
// let topPadLeft = 40;

// var svg = d3
//   .select("#scatter")
//   .append("svg")
//   .attr("width", width)
//   .attr("height", height)
//   .attr("class", "chart");
// var circleRadius;

// function GetCircle (){
//   if(width <= 530){
//     circleRadius =5;
//   } else{
//     circleRadius =10;
//   }
// }

// svg.append("g").attr("class", "xText" )
// let xText = d3.select(".xText");

// function xTextRefresh()
// {
//   xText.attr("transform", `translate(${((width-labelArea)/2 + labelArea)}, ${height-margin-topPadBottom})`)
// }

// xTextRefresh()

// xText.append("text")
//   .attr("y", -26)
//   .attr("data-name", "poverty")
//   .attr("data-axis", "x")
//   .attr("class", "aText active x")
//   .text ("In Poverty(%)")

// xText.append("text")
//   .attr("y", -0)
//   .attr("data-name", "age")
//   .attr("data-axis", "x")
//   .attr("class", "aText active x")
//   .text ("Age (Median)")


// xText.append("text")
//   .attr("y", 26)
//   .attr("data-name", "income")
//   .attr("data-axis", "x")
//   .attr("class", "aText active x")
//   .text ("Household Income (Median)")


// let leftTextX = margin - topPadLeft;
// let leftTextY = (height + labelArea) / 2 - labelArea;


// svg.append("g").attr ("class",".yText")
// let yText = d3.select(".yText")

// function yTextRefresh(){
//   yText.attr(
//     "transform",
//     `translate(${leftTextX}, ${leftTextY})rotate(-90)`
//   )
// }

// yTextRefresh()

// yText.append("text")
//   .attr("y", -26)
//   .attr("data-name", "obesity")
//   .attr("data-axis", "y")
//   .attr("class", "aText active y")
//   .text ("Obese %")


// yText.append("text")
//   .attr("y", 0)
//   .attr("data-name", "smokes")
//   .attr("data-axis", "y")
//   .attr("class", "aText active y")
//   .text ("Smokes %")



// yText.append("text")
//   .attr("y", 26)
//   .attr("data-name", "healthcare")
//   .attr("data-axis", "y")
//   .attr("class", "aText active y")
//   .text ("Lack healthcare %")


// // d3.csv("assets/data/data.csv", function(data){
// //   visualize(data);
// // })


// // function visualize(theData){
// //   let curX = "poverty";
// //   let curY = "obesity"

// //   var xMin;
// //   var xMax;
// //   var yMin;
// //   var yMax;

// //   let toolTip = d3.tip().attr("class", "d3-tip").offset([40,-60])
// //   .html(function(d){
// //     let theX;
// //     let theState = "<div>" + d.state + "</div>"
// //     let theY = "<div>" + curY + ":"+ d[curY] + "%</div>"
// //     if(curX === "poverty"){
// //       theX = "<div>" + curX + ":"+ d[curX] + "%</div>"
// //     } else { 
// //       theX = "<div>" + curX + ":"+ parseFloat(d[curX]) + "%</div>"
// //     }
// //     }
// //   })
// // }


