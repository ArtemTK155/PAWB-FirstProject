<template>
  <v-card dark>
    <v-container>
      <v-row>
        <v-col cols="12" sm="4" md="6" lg="6">
          <v-text-field class="mx-2" v-model="select" label="Empresa" required></v-text-field>
        </v-col>
        <v-col cols="12" sm="4" md="4" lg="4">
          <v-autocomplete
            clearable
            v-model="select2"
            :loading="loading2"
            :items="items2"
            :search-input.sync="search2"
            cache-items
            class="mx-2"
            flat
            hide-details
            label="Local?"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" sm="4" md="2" lg="2">
          <v-btn class="mt-3" @click="searchEvn()">
            <v-icon class="mr-3">mdi-feature-search-outline</v-icon>Search
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      loading: false,
      items: [],
      search: null,
      select: null,
      states: [],
      loading2: false,
      items2: [],
      search2: null,
      select2: null,
      states2: [],
      search3: null,
      n: 0
    };
  },
  watch: {
    search2(val) {
      val && val !== this.select2 && this.querySelections2(val);
    }
  },

  created() {
    this.fetchFregs();
  },

  computed: {
    ...mapGetters(["names"]),
    ...mapGetters(["fregs"])
  },

  methods: {
    ...mapActions(["fetchNames"]),
    ...mapActions(["fetchFregs"]),

    querySelections2(v) {
      this.loading2 = true;
      this.items2 = this.fregs.filter(e => {
        return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
      });
      this.loading2 = false;
    },
    async searchEvn() {
      try {
        const response = await axios.post(
          "http://localhost:4000/empresas/search",
          {
            nome: this.select,
            freg: this.select2
          }
        );
        console.log(response.data);
        this.$store.state.searchResult = response.data;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>