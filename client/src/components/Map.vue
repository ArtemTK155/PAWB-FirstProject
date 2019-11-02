<template>
  <GmapMap :center="pos" :zoom="13" style="width: 650px; height: 650px">
    <GmapMarker
      :position="pos"
      :clickable="true"
      :draggable="false"
      @click="center=pos"
    />
  </GmapMap>
</template>
<script>
import { gmapApi } from "vue2-google-maps";
export default {
  name: "Map",
  data: () => ({
    markers: [
      {
        position: { lat: 41.16662, lng: -8.604256 }
      },
      {
        position: { lat: 41.12662, lng: -8.104256 }
      }
    ]
  }),

  computed: {
    google: gmapApi,
    pos(){
      return this.$store.state.position
    }
  }
};
</script>
