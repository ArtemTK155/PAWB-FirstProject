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
