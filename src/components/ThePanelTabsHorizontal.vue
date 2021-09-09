<template>
 
    <div class="q-pt-md">

    <!--Example with supporting layers in a tab-->
    <div class="q-gutter-y-md">
      <q-card flat>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          
          <q-tab name="supporting" label="Supporting Layers" />
          <q-tab name="panel1" label="Panel 1" />
          <q-tab name="panel2" label="Panel 2" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated >
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
      </q-card>
    </div>
  </div>
  
</template>

<script>

import SupportingLayers from './SupportingLayers.vue'

export default {
  name: 'ThePanelTabsHorizontal',
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
