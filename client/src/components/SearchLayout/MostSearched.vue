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
          <v-dialog v-model="dialog" max-width="650">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" text v-on="on" @click="sendAddress(item)">
                <v-icon size="30">mdi-map-marker</v-icon>
                {{item.morada}} || {{item.freguesia}}
              </v-btn>
            </template>
            <v-card>
              <Map />
            </v-card>
          </v-dialog>
          <v-btn color="primary" text>
            <v-icon size="30">mdi-cellphone-basic</v-icon>
            {{item.telefone}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import axios from "axios";
import Map from "@/components/Map";

export default {
  name: "mostSearched",
  components: {
    Map
  },
  data() {
    return {
      api: process.env.VUE_APP_REST_API,
      data: [],
      dialog: false,
      randPos: [
        { lat: 41.172881, lng: -8.611004 },
        { lat: 41.148898, lng: -8.605908 },
        { lat: 41.20098, lng: -8.676401 },
        { lat: 41.228208, lng: -8.632687 },
        { lat: 41.112881, lng: -8.111004 },
        { lat: 41.148838, lng: -8.605918 },
        { lat: 41.201981, lng: -8.675401 },
        { lat: 41.298208, lng: -8.632187 },
        { lat: 41.162881, lng: -8.711004 },
        { lat: 41.348898, lng: -8.601908 },
        { lat: 41.20011, lng: -8.626401 }
      ],
      items: [
        {
          src:
            "https://media.istockphoto.com/photos/abstract-geometric-landscape-picture-id832632796?k=6&m=832632796&s=612x612&w=0&h=fA_-At_kccr38c3MTh_029UbGGpkHSVf-hCULZM3YDw="
        },
        {
          src:
            "https://www.123freevectors.com/wp-content/original/132092-black-and-blue-geometric-abstract-background-vector-illustration.jpg"
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
        const response = await axios.post(this.api + "/get/top/10");
        this.data = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    sendAddress(item) {
      console.log(item);
      //Just for test, becasue billing wont allow me to use geocoder api
      var num = Math.floor(Math.random() * 10 + 0);
      this.$store.state.position.lat = this.randPos[num].lat;
      this.$store.state.position.lng = this.randPos[num].lng;
    }
  }
};
</script>