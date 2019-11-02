<template>
  <div>
    <h1 id="element"></h1>
    <v-card v-for="item in items" :key="item._id">
      <v-card-title>
        {{item.nome}}
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon color="indigo" size="50">mdi-account-circle</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-subtitle>{{item.freguesia}}</v-card-subtitle>
      <v-list-item three-line>
        <v-card-text
          class="text--primary"
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam quis purus lobortis, aliquet est nec, facilisis leo. In imperdiet, orci eu blandit dapibus, ipsum arcu venenatis sapien, quis imperdiet ligula mauris in risus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam quis purus lobortis, aliquet est nec, facilisis leo. In imperdiet, orci eu blandit dapibus, ipsum arcu venenatis sapien, quis imperdiet ligula mauris in risus</v-card-text>
      </v-list-item>
      <v-card-actions>
        <v-btn color="primary" text>
          <v-icon size="30">mdi-cellphone-basic</v-icon>
          {{item.telefone}}
        </v-btn>
        <v-btn color="primary" text>
          <v-icon size="30">mdi-map-marker</v-icon>
          {{item.morada}}
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-pagination v-model="page" :length="6"></v-pagination>
    <v-btn v-scroll-to="'#element'">Go Up</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: ["1", "2", "3", "4", "5"],
      page: 1,
    };
  },

  computed: {
    items() {
      return this.$store.state.searchResult;
    }
  }
};
</script>