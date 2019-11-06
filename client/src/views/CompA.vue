<template>
  <div>
    <v-card>
      <v-container fluid>
        <v-row>
          <v-col cols="5">
            <v-card flat class="ml-5">
              <v-card-subtitle>CompA</v-card-subtitle>
              <v-card-title>
                <v-alert type="success">{{msg}}</v-alert>
              </v-card-title>
              <v-card-text>
                <v-text-field v-model="msg" label="Regular" single-line></v-text-field>
              </v-card-text>
            </v-card>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="5">
            <CompB />
            <!-- <CompB v-bind:propMsg="propMsg" v-on:changedMsg="newMsg" /> -->
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import CompB from "@/views/CompB";
export default {
  name: "CompA",

  data() {
    return {
      msg: "",
      propMsg: ""
    };
  },
  methods: {
    newMsg() {
     
     //
    },
    sendToCompB() {
     //
    }
  },
  components: {
    CompB
  },
  /*
  computed: {
    sharedMsg: {
      get() {
       //
      },
      set(val) {
       //
      }
    }

    
    sharedMsg() {
      return this.$store.state.msg;
    }
    
  },
  */
  watch: {
    msg() {
      //
    }
  },
  mounted() {
   //
  }
};
</script>

<style>
</style>