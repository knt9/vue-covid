<template>
  <header class="header">
    <b-navbar toggleable="lg" type="dark" variant="danger">
      <b-navbar-brand href="/" class="font-weight-bold">
        JAPAN COVID-19 STATS
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" />

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item right>
            <div></div>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->

        <b-navbar-nav class="ml-auto">
          <div>
            <b-nav-item-dropdown right>
              <template v-slot:button-content>
                <em>Menu</em>
              </template>
              <b-dropdown-item>
                <router-link to="/prefectures"
                  >Each Prefectures Summary</router-link
                ></b-dropdown-item
              >
              <b-dropdown-item>
                <router-link to="/stats">All Prefectures Stats</router-link>
              </b-dropdown-item>
              <b-dropdown-item>
                <router-link to="/jmap">JAPAN MAP</router-link></b-dropdown-item
              >
            </b-nav-item-dropdown>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>
<script></script>

<style scoped></style>
