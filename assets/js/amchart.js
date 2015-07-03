var ChartsAmcharts = function() {
  var drawChart = function(data) {

  var legend = { "equalWidths": false, "useGraphSettings": true, "valueAlign": "left", "valueWidth": 120 }
  var distance_alert_axis = {"id": "distanceAlertAxis", "axisAlpha": 0, "gridAlpha": 0, "position": "left", "title": "distance / alerts"};
  var fuel_avg_axis = {"id": "fuelAxis", "axisAlpha": 0, "gridAlpha": 0, "inside": false, "position": "right", "title": "fuel"};
  var distance_graph = {"alphaField":"alpha",
    "balloonText":"[[value]]kms",
    "lineColor":"#FFFF00",
    "dashLengthField":"dashLength",
    "fillAlphas":0.7,
    "legendPeriodValueText":"total:[[value.sum]]kms",
    "legendValueText":"[[value]]kms",
    "title":"distance",
    "type":"column",
    "valueField":"distance",
    "valueAxis":"distanceAlertAxis"};

  var alert_graph = {"alphaField":"alpha",
    "lineColor":"red",
    "balloonText":"[[value]]",
    "dashLengthField":"dashLength",
    "fillAlphas":0.7,
    "legendPeriodValueText":"total:[[value.sum]]",
    "legendValueText":"[[value]]",
    "title":"alerts",
    "type":"column",
    "valueField":"alert",
    "valueAxis":"distanceAlertAxis"};

  var fuel_graph = {"bullet":"square",
    "lineColor":"blue",
    "bulletBorderAlpha":1,
    "bulletBorderThickness":1,
    "dashLengthField":"dashLength",
    "legendValueText":"[[value]]",
    "title":"fuel average",
    "fillAlphas":0,
    "valueField":"fuel",
    "valueAxis":"fuelAxis"};


  var chart_cursor = { "categoryBalloonDateFormat": "DD", "cursorAlpha": 0.1, "cursorColor": "#000000", "fullWidth": true, "valueBalloonsEnabled": false, "zoomable": false}
  var category_axis = { "dateFormats": [{"period": "DD", "format": "DD"}, {"period": "WW", "format": "MMM DD"}, {"period": "MM", "format": "MMM" }, {"period": "YYYY", "format": "YYYY" }],
    "parseDates": true,
    "autoGridCount": false,
    "axisColor": "#555555",
    "gridAlpha": 0.1,
    "gridColor": "#FFFFFF",
    "gridCount": 50};

  var export_config = {"menuBottom":"20px", "menuRight":"22px", "menuItems":[{"icon":Metronic.getGlobalPluginsPath()+"amcharts/amcharts/images/export.png" ,"format":'png'}]};

 /* var data = [{
    "date": "2012-01-01",
      "distance": 120,
      "alert": 5,
      "fuel": 10
  }, {
    "date": "2012-01-02",
      "distance": 35,
      "alert": 10,
      "fuel": 408
  }]; */

  var chart_initializer = {
      "type": "serial",
      "theme": "light",
      "fontFamily": 'Open Sans', 
      "color": '#888888',
      "legend": legend,
      "valueAxes": [distance_alert_axis, fuel_avg_axis],
      "graphs": [distance_graph, alert_graph, fuel_graph],
      "chartCursor": chart_cursor,
      "dataDateFormat": "YYYY-MM-DD",
      "categoryField": "date",
      "categoryAxis": category_axis,
      "exportConfig": export_config,
      "dataProvider": data
      }

    var chart = AmCharts.makeChart("chart_2", chart_initializer);

    $('#chart_2').closest('.portlet').find('.fullscreen').click(function() {
      chart.invalidateSize();
    });
  }


  return {
    //main function to initiate the module
    init: function(data) {
      drawChart(data);
    }
  };
}();
