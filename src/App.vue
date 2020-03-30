
<template>
  <div>
   <left-menu></left-menu>
   <map-component></map-component>
  </div>
</template>

<script>
import LeftMenu from "./components/LeftMenu/index.vue";
import MapComponent from "./components/Map/index.vue";

export default {
  name: "tilemap-editor",
  components: {
      LeftMenu,
      MapComponent
  },

  props: {
  
  },
  
  data() {
    return {
    };
  },
  
  methods: {
  
  },
  
  mounted() {
    
  }
};
</script>