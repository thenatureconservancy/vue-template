<template>
 
    <div v-if="$store.state.data.slReady">
       <div v-if="!$store.state.data.slReady">
        <q-spinner-ball
          color="primary"
          size="2em"
        />
        <q-tooltip :offset="[0, 8]">QSpinnerBall</q-tooltip>
      </div>
      <q-scroll-area id="panelM" class="panel q-pa-md" :thumb-style="{ width: '7px'}">
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
      height: 100%;
    }
}

</style>
