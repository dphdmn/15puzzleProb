

class SimpleGraph{
   constructor(id, colorText,colorItems){
     
     this.chart = am4core.create(id, am4charts.XYChart)
      
      this.categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
      this.categoryAxis.dataFields.category = "moves";
      this.valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());

     this.chart.data = data;
      this.chart.colors.list = [
        am4core.color(colorItems)
      ];
      this.series = this.chart.series.push(new am4charts.ColumnSeries());


      this.categoryAxis.renderer.grid.template.location = 0;
      this.categoryAxis.renderer.minGridDistance = 30;
      this.categoryAxis.renderer.labels.template.fill = am4core.color(colorText);
      this.valueAxis.renderer.labels.template.fill = am4core.color(colorText);
      this.chart.numberFormatter = new am4core.NumberFormatter(); 
      this.series.dataFields.valueY = "amount";
      this.series.dataFields.categoryX = "moves";
      this.series.tooltipText = "[bold]["+colorText+"]{valueY}[/]";
      this.chart.cursor = new am4charts.XYCursor();
      this.chart.cursor.snapToSeries = this.series;
      this.chart.cursor.xAxis = this.categoryAxis;
   }
  
      changeFormat(v){
      this.chart.numberFormatter=new am4core.NumberFormatter();
    //console.log(maximumv);
    if (v < 1){

       this.chart.numberFormatter.numberFormat = '#.######e';

    }else{
       this.chart.numberFormatter.numberFormat = '#.######'
    }

     this.categoryAxis.numberFormatter = new am4core.NumberFormatter();
     this.categoryAxis.numberFormatter.numberFormat="#.#";
      }
}

var data=[];
var g1=new SimpleGraph("chartdiv","#ffffff","#CE5B78");
var g2=new SimpleGraph("chartdiv2","#ffffff","#CE5B78");
