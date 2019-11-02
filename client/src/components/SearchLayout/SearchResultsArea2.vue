<template>
  <v-container>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page="currentPage"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar id="element" dark color="grey darken-3">
          <template>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle v-model="sortDesc" mandatory>
              <v-btn medium depressed color="grey" :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn medium depressed color="grey" :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>
      <template v-slot:default="props">
        <v-row v-for="item in props.items" :key="item._id">
          <v-col>
            <v-card>
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
                <v-dialog v-model="dialog" max-width="650">
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" text v-on="on" @click="sendAddress(item)">
                      <v-icon size="30">mdi-map-marker</v-icon>
                      {{item.morada}}
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
          </v-col>
        </v-row>
      </template>
      <template v-slot:footer>
        <v-toolbar dark color="grey darken-3">
          <v-row class="mt-1" align="center" justify="center">
            <span class="white--text ml-3">Items per page</span>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn outlined color="white" class="ml-3" v-on="on">
                  {{ itemsPerPage }}
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(number, index) in itemsPerPageArray"
                  :key="index"
                  @click="updateItemsPerPage(number)"
                >
                  <v-list-item-title>{{ number }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-spacer></v-spacer>
            <span class="mr-4 white--text">Page {{ currentPage }} of {{ numberOfPages }}</span>
            <v-btn
              small
              v-scroll-to="'#element'"
              fab
              dark
              color="blue darken-3"
              class="mr-1"
              @click="formerPage"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
              small
              v-scroll-to="'#element'"
              fab
              dark
              color="blue darken-3"
              class="ml-1"
              @click="nextPage"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-row>
        </v-toolbar>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import Map from "@/components/Map";
export default {
  components: {
    Map
  },
  data() {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: "",
      filter: {},
      sortDesc: false,
      //page: 1,
      itemsPerPage: 4,
      dialog: false,
      sortBy: "nome",
      keys: ["nome", "morada", "freguesia", "telefono"],
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
      ]
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    items() {
      return this.$store.state.searchResult;
    },
    currentPage() {
      return this.$store.state.page;
    }
  },
  methods: {
    nextPage() {
      if (this.currentPage + 1 <= this.numberOfPages)
        this.$store.state.page += 1;
    },
    formerPage() {
      if (this.currentPage - 1 >= 1) this.$store.state.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    sendAddress(item) {
      console.log(item);
      //Just for test, becasue billing wont allow me to use geocoder api
      var num = Math.floor(Math.random() * 10 + 0);
      this.$store.state.position.lat = this.randPos[num].lat;
      this.$store.state.position.lng = this.randPos[num].lng;
      /*
      this.$geocoder.setDefaultMode("address"); // this is default
      var addressObj = {
        address_line_1: "1600 Amphitheatre Parkway",
        address_line_2: "",
        city: "Mountain View",
        state: "CA", // province also valid
        zip_code: "94043", // postal_code also valid
        country: "United States"
      };
      this.$geocoder.send(addressObj, response => {
        console.log(response);
      });
      */
    }
  }
};
</script>