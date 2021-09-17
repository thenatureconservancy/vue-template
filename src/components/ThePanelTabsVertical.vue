<template>
 
    <div class="q-pt-md">
     <q-splitter
      v-model="splitterModel"
    
     >
    <!--Example with supporting layers in a vertical tab-->
       
     
       <template v-slot:before>
        <q-tabs

          v-model="tab"
          vertical
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
        >
          <q-route-tab to="/" name="supporting" label="Layers" icon="layers"/>
          <q-route-tab to="/panel1" name="panel1" label="Panel 1" icon="description"/>
          <q-route-tab to="/panel2" name="panel2" label="Panel 2" icon="info" />
        </q-tabs>
       </template>

       <template v-slot:after>
        <q-tab-panels v-model="tab" animated swipeable vertical >
          <q-tab-panel name="panel1" class="panel">
             <div>            
              </div>
          </q-tab-panel>
          <q-tab-panel name="panel2" class="panel">
             <div>            
              </div>
          </q-tab-panel>

          <q-tab-panel name="supporting" class="q-pr-none">
             <div v-if="!$store.state.data.slReady">
                <q-spinner-ball
                  color="primary"
                  size="2em"
                />
                <q-tooltip :offset="[0, 8]">QSpinnerBall</q-tooltip>
              </div>
            <q-scroll-area id="panelM" class="panel" :thumb-style="{ width: '7px'}">
              <div class="q-mr-lg" v-if="$store.state.data.slReady">
                <SupportingLayers displayClass="supportingLayersPanel"/>
              </div>
            </q-scroll-area>
          </q-tab-panel>
        </q-tab-panels>
      </template>
     
    
  </q-splitter>
  </div>
  
</template>

<script>

import SupportingLayers from './SupportingLayers.vue'

export default {
  name: 'ThePanelTabsVertical',
  components: {
    SupportingLayers

  },
  data(){
    return{
      tab: 'supporting',
      splitterModel: 16
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .panel{
    height: calc(100vh - 100px);
  }

  @media screen and (max-width: 700px){
    .panel{
       height: 230px;
    }
}
</style>
