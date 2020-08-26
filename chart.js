
// Create chart instance
var chart = am4core.create("chartdiv", am4charts.XYChart)
chart.colors.list = [
  am4core.color("#CE5B78")
];

var data=[];
// Add data
chart.data = data;

// Create axes
var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "moves";

categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.minGridDistance = 30;
categoryAxis.renderer.labels.template.fill = am4core.color("#ffffff");


var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

valueAxis.renderer.labels.template.fill = am4core.color("#ffffff");
chart.numberFormatter = new am4core.NumberFormatter(); 

// Create series
var series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.valueY = "amount";
series.dataFields.categoryX = "moves";
series.tooltipText = "[bold][white]{valueY}[/]";
chart.cursor = new am4charts.XYCursor();
chart.cursor.snapToSeries = series;
chart.cursor.xAxis = categoryAxis;


