<template>
  <div>
    <b-card>
      <b-table stacked :items="matched" :fields="fields"> </b-table>
    </b-card>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Detail",
  data: function() {
    return {
      fields: [
        { key: "id", label: "ID" },
        { key: "name_ja", label: "名称(漢字表記)" },
        { key: "name_en", label: "名称(ローマ字表記)" },
        { key: "lat", label: "緯度" },
        { key: "lng", label: "経度" },
        { key: "population", label: "人口" },
        { key: "cases", label: "感染者数" },
        { key: "deaths", label: "死亡者数" }
      ],
      prefectures: []
    };
  },
  methods: {
    // 県別感染情報取得
    getCovidInfoByPrefectures() {
      let url = "https://covid19-japan-web-api.now.sh/api/v1/prefectures";
      axios.get(url).then(response => {
        console.log(response.data);
        this.prefectures = response.data;
      });
    }
  },
  created() {
    this.getCovidInfoByPrefectures();
  },
  computed: {
    matched: function() {
      return this.prefectures.filter(el => {
        return el.id == this.$route.params.id;
      }, this);
    }
  }
};
</script>
