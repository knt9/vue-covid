<template>
  <b-card>
    <h3>感染者統計情報</h3>
    <b-table stacked :items="stats" :fields="fields"> </b-table>
  </b-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      stats: [],
      fields: [
        { key: "date", label: "統計取得日" },
        { key: "hospitalize", label: "合計入院患者数" },
        { key: "positive", label: "合計感染者数" },
        { key: "death", label: "合計死亡者数" },
        { key: "symptomConfirming", label: "本日の感染者数" }
      ]
    };
  },
  methods: {
    // 感染統計情報取得
    getCovidStats() {
      let url = "https://covid19-japan-web-api.now.sh/api/v1/total";
      axios.get(url).then(response => {
        this.stats.push(response.data);
      });
    }
  },
  created() {
    this.getCovidStats();
  }
};
</script>

<style></style>
