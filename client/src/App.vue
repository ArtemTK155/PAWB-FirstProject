<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-toolbar dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
          <v-spacer></v-spacer>
          <v-toolbar-title>
            <router-link to="/crud" tag="button">
              <v-btn class="mr-2" color="dark-grey">CRUD</v-btn>
            </router-link>
            <router-link to="/search" tag="button">
              <v-btn class="mr-2" color="dark-grey">Search</v-btn>
            </router-link>
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-row>
      <v-row>
       <v-col>
          <router-view></router-view></v-col>  
      </v-row>
    </v-container>
  </v-app>
</template>



<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      //
    };
  }
};
</script>

