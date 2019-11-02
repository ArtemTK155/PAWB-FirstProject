<template>
  <v-container>
    <v-row>
      <v-col>
        <SearchArea />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="12" lg="12">
        <MostSearched />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="12" lg="12">
        <SearchResultsArea />
       <!--
      </v-col>
      <v-col cols="12" xs="12" sm="6" md="4" lg="4">
       
        <v-img
          class="white--text align-center"
          justify-center
          max-width="auto"
          src=" https://pplware.sapo.pt/wp-content/uploads/2019/05/radares_google_maps_pt_1.jpg"
        ></v-img>
        
        <v-row justify="center">
          <v-dialog v-model="dialog" max-width="650">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
            </template>
            <v-card>
              <Map />
            </v-card>
          </v-dialog>
        </v-row>
         -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SearchArea from "@/components/SearchLayout/SearchArea";
import MostSearched from "@/components/SearchLayout/MostSearched";
import SearchResultsArea from "@/components/SearchLayout/SearchResultsArea2";
//import Map from "@/components/Map";

export default {
  name: "searchLayout",
  components: {
    SearchArea,
    MostSearched,
    SearchResultsArea
    //Map
  },
  data() {
    return {
      dialog: false
    };
  }
};
</script>
