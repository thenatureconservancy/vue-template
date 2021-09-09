<template>
 
    <div class="q-pt-md">
     <q-splitter
      v-model="splitterModel"
    
     >
    <!--Example with supporting layers in a tab-->
       
     
       <template v-slot:before>
        <q-tabs

          v-model="tab"
          vertical
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
        >
          
          <q-tab name="supporting" label="Layers" icon="layers"/>
          <q-tab name="panel1" label="Panel 1" icon="description"/>
          <q-tab name="panel2" label="Panel 2" icon="info" />
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

          <q-tab-panel name="supporting" class="panel">
             <div>
              <SupportingLayers displayClass="supportingLayersPanel"/>
             </div>
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
