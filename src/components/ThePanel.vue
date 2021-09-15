<template>
 
    <div v-if="$store.state.data.slReady">
      <q-scroll-area class="panel q-pa-md" :thumb-style="{ width: '7px'}">
        <div class="q-pr-lg" v-if="$store.state.data.slReady">
          <SupportingLayers displayClass="supportingLayersPanel"/>
        </div>
      </q-scroll-area>

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
    height: calc(100vh - 90px);
  }

  @media screen and (max-width: 700px){
    .panel{
      height: 230px;
    }
}

</style>
