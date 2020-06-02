<template>
  <div>
    <div id="chartdiv"></div>
  </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
// 日本地図のgeodataを取得
import am4geodata_japanLow from "@amcharts/amcharts4-geodata/japanHigh";
import axios from "axios";
export default {
  data: function() {
    return {
      prefectures: []
    };
  },
  mounted() {
    let url = "https://covid19-japan-web-api.now.sh/api/v1/prefectures";
    axios.get(url).then(response => {
      this.prefectures = response.data;
      let map = am4core.create("chartdiv", am4maps.MapChart);
      map.geodata = am4geodata_japanLow;
      map.projection = new am4maps.projections.Miller();
      var polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.useGeodata = true;
      polygonSeries.mapPolygons.template.events.on("hit", function(ev) {
        map.zoomToMapObject(ev.target);
      });
      let imageSeries = map.series.push(new am4maps.MapImageSeries());
      imageSeries.sequencedInterpolation = true;

      let imageSeriesTemplate = imageSeries.mapImages.template;
      // マーカーの形を定義(丸を指定)
      let circle = imageSeriesTemplate.createChild(am4core.Circle);
      // マーカーの色
      circle.fill = am4core.color("orange");
      // マーカーのサイズ
      circle.radius = 5;
      // 枠線の色
      circle.stroke = am4core.color("red");
      // 枠線のサイズ
      circle.strokeWidth = 1;
      // ツールチップに表示するテキスト dataのtextを表示できる
      circle.tooltipHTML = "<b>{title}</b>";

      // imageSeriesTemplateのlatitute,longitude(緯度経度)と配列の要素を紐付け
      imageSeriesTemplate.propertyFields.latitude = "latitude";
      imageSeriesTemplate.propertyFields.longitude = "longitude";
      var prefStats = [];
      for (var i = 0; i < this.prefectures.length; i++) {
        var link = "http://localhost:8080/detail/" + this.prefectures[i].id;
        prefStats.push({
          title:
            this.prefectures[i].name_ja +
            ":" +
            this.prefectures[i].cases +
            "<br><a href=" +
            link +
            ">More info</a>",
          id: this.prefectures[i].id,
          value: this.prefectures[i].cases,
          latitude: this.prefectures[i].lat,
          longitude: this.prefectures[i].lng
        });
      }
      imageSeries.data = prefStats;
      imageSeries.tooltip.label.interactionsEnabled = true;
      imageSeries.tooltip.keepTargetHover = true;
      imageSeries.calculateVisualCenter = true;
      imageSeries.tooltipPosition = "fixed";
      imageSeries.heatRules.push({
        property: "fill",
        target: circle,
        min: am4core.color("#ffffff"),
        max: am4core.color("#FF0000")
      });
    });
  },
  beforeDestroy() {
    if (this.map) {
      this.map.dispose();
    }
  }
};
</script>
<style scoped>
#chartdiv {
  width: 100%;
  height: 600px;
}
</style>
