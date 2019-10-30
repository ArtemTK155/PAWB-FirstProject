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
      <v-col cols="12" xs="12" sm="12" md="8" lg="8">
        <SearchResultsArea />
      </v-col>
      <v-col cols="12" xs="12" sm="6" md="4" lg="4">
        <v-img
          class="white--text align-center"
          justify-center
          max-width="auto"
          src=" https://pplware.sapo.pt/wp-content/uploads/2019/05/radares_google_maps_pt_1.jpg"
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SearchArea from "@/components/SearchLayout/SearchArea";
import MostSearched from "@/components/SearchLayout/MostSearched";
import SearchResultsArea from "@/components/SearchLayout/SearchResultsArea";

export default {
  name: "searchLayout",
  components: {
    SearchArea,
    MostSearched,
    SearchResultsArea
  }
};
</script>
