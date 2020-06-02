<template>
  <div>
    <b-card
      ><h1>Menu</h1>
      <b-list-group>
        <b-list-group-item variant="light"
          ><router-link to="/prefectures"
            >県別統計情報</router-link
          ></b-list-group-item
        >
        <b-list-group-item variant="light"
          ><router-link to="/stats"
            >全国統計情報</router-link
          ></b-list-group-item
        >
        <b-list-group-item variant="light"
          ><router-link to="/jmap">日本地図</router-link></b-list-group-item
        >
      </b-list-group></b-card
    >
  </div></template
>

<script>
export default {};
</script>

<style></style>
