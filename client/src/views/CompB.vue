<template>
  <div>
    <v-card flat color="#385F73" dark class="mr-5">
      <v-card-subtitle>CompB</v-card-subtitle>
      <v-card-title>
        <v-alert type="info">{{msg}}</v-alert>
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="msg" label="Regular" single-line></v-text-field>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "CompB",
  props: ["propMsg"],
  data() {
    return {
      msg: ""
    };
  },
  methods: {
    sendToCompA() {
     //
    }
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
    },
  
    sharedMsg() {
      return this.$store.state.msg;
    },
    
    cmpMsg() {
      return this.propMsg;
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