<template>
  <b-card>
    <b-button v-b-toggle.collapse-1 variant="info" class="font-weight-bold"
      >Search Condition</b-button
    >
    <b-collapse id="collapse-1" class="mt-2">
      <b-card>
        <b-form-group
          ><b-form-group
            label-cols-sm="3"
            label="Cases:"
            label-align-sm="right"
            label-class="font-weight-bold pt-0"
            label-for="nested-street"
          >
            <b-form-input
              id="nested-street"
              v-model.number="lowerLimit"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label-cols-sm="3"
            label="Display Num:"
            label-align-sm="right"
            label-class="font-weight-bold pt-0"
            label-for="nested-street"
          >
            <b-form-input
              id="nested-street"
              v-model.number="limit"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="3"
            label="Prefecture Name:"
            label-align-sm="right"
            label-for="nested-street"
            label-class="font-weight-bold pt-0"
          >
            <b-input-group>
              <b-form-input
                type="search"
                placeholder="Search Prefecture"
                v-model="prefecture"
              ></b-form-input
              ><b-input-group-prepend is-text>
                <b-icon icon="search"></b-icon> </b-input-group-prepend
            ></b-input-group>
          </b-form-group>
          <b-form-group
            label-cols-sm="3"
            label="Sort:"
            label-align-sm="right"
            label-for="nested-street"
            label-class="font-weight-bold pt-0"
          >
            <b-button id="nested-street" variant="info" @click="active">{{
              sortLabel
            }}</b-button>
          </b-form-group>
        </b-form-group>
      </b-card>
    </b-collapse>
    <p>Total Cases：{{ totalCases }} | Display Num：{{ limited.length }}</p>
    <b-table striped hover :items="limited" :fields="fields"></b-table>
  </b-card>
</template>
<script>
import axios from "axios";
export default {
  name: "Prefectures",
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
      prefecture: "",
      prefectures: [],
      limit: 47,
      lowerLimit: 0,
      sort: true // true:降順,false:昇順
    };
  },
  methods: {
    // 県別感染情報取得
    getCovidInfoByPrefectures() {
      let url = "https://covid19-japan-web-api.now.sh/api/v1/prefectures";
      axios.get(url).then(response => {
        this.prefectures = response.data;
      });
    },
    active: function() {
      this.sort = !this.sort;
    }
  },
  created() {
    this.getCovidInfoByPrefectures();
  },
  computed: {
    sorted: function() {
      return this.prefectures.slice().sort((a, b) => {
        var s = this.sort ? -1 : 1;
        return a.cases < b.cases ? s : a.cases > b.cases ? s * -1 : 0;
      });
    },
    matched: function() {
      if (this.prefecture == "") {
        return this.sorted.filter(el => {
          return el.cases >= this.lowerLimit;
        }, this);
      } else {
        return this.sorted.filter(el => {
          return (
            el.cases >= this.lowerLimit &&
            el.name_ja.indexOf(this.prefecture) != -1
          );
        }, this);
      }
    },
    // limit 件数分取り出す
    limited: function() {
      return this.matched.slice(0, this.limit);
    },
    sortLabel: function() {
      return this.sort ? "DESC" : "ASC";
    },
    totalCases: function() {
      return this.prefectures.reduce((p, x) => p + x.cases, 0);
    }
  }
};
</script>
