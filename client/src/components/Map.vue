<template>
  <GmapMap :center="{lat:41.166680, lng: -8.604556}" :zoom="12" style="width: 400px; height: 300px">
    <GmapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="false"
      @click="center=m.position"
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
    google: gmapApi
  }
};
</script>
