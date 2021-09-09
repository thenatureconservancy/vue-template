<template>
 
    <div class="q-pa-lg panel">
          <SupportingLayers displayClass="supportingLayersPanel"/>
    </div>
  
</template>

<script>

import SupportingLayers from './SupportingLayers.vue'

export default {
  name: 'ThePanel',
  components: {
    SupportingLayers

  },
  data(){
    return{
      tab: 'supporting'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .panel{
    position: relative;
    height: calc(100vh - 100px);
    overflow-y: auto;
    display: block;
    width: 100%;
  }

  @media screen and (max-width: 700px){
    .panel{
      position: relative;
      height: 32vh;
      overflow-y: auto;
      display: block;
      width: 100%;
    }
}
</style>
