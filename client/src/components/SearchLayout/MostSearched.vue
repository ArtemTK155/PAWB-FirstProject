<template>
  <v-carousel hide-delimiters height="360px">
    <v-carousel-item v-for="item in data" :key="item._id">
      <v-card class="mx-auto" color="white">
        <v-img
          class="white--text align-center"
          height="200px"
          justify-center
          max-width="auto"
          :src="items[1].src"
        >
          <v-card-title color="black">{{item.nome}}</v-card-title>
        </v-img>

        <v-card-text class="text--primary">
          <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam quis purus lobortis, aliquet est nec, facilisis leo. In imperdiet, orci eu blandit dapibus, ipsum arcu venenatis sapien, quis imperdiet ligula mauris in risus.</div>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" text>
            <v-icon size="30">mdi-cellphone-basic</v-icon>{{item.telefone}}
          </v-btn>

          <v-btn color="primary" text>
            <v-icon size="30">mdi-map-marker</v-icon>{{item.morada}} || {{item.freguesia}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import axios from "axios";

export default {
  name: "mostSearched",
  components: {},
  data() {
    return {
      data: [],
      items: [
        {
          src: "https://media.istockphoto.com/photos/abstract-geometric-landscape-picture-id832632796?k=6&m=832632796&s=612x612&w=0&h=fA_-At_kccr38c3MTh_029UbGGpkHSVf-hCULZM3YDw="
        },
        {
          src: "https://www.123freevectors.com/wp-content/original/132092-black-and-blue-geometric-abstract-background-vector-illustration.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg"
        }
      ]
    };
  },

  created() {
    this.getMostSearched();
  },

  methods: {
    async getMostSearched() {
      try {
        const response = await axios.post(
          "http://localhost:4000/empresas/get/top/10"
        );
        this.data = response.data;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>