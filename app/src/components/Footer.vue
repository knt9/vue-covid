<template>
  <footer class="footer">
    <b-navbar toggleable="lg" type="dark" variant="danger">
      <b-navbar-brand class="ml-auto font-weight-bold">
        {{ copyright }}
      </b-navbar-brand>
    </b-navbar>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      copyright: "© 2020 Copyright:KNT9"
    };
  }
};
</script>

<style scoped></style>
