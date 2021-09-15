<template>
  <the-header></the-header>
  <div id="">
      <q-splitter
      v-model="splitterModel"
      unit="px"
      separator-class="bg-primary"
      :horizontal="smallScreen"
    >

      <template v-slot:before>
            <!--PANEL COMPONENT-->
            <the-panel v-if="$store.state.config.panelDisplayType=='plain'"></the-panel>
            <the-panel-tabs-horizontal v-if="$store.state.config.panelDisplayType=='tabsHorizontal'"></the-panel-tabs-horizontal>
            <the-panel-tabs-vertcial v-if="$store.state.config.panelDisplayType=='tabsVertical'"></the-panel-tabs-vertcial>
      </template>

      <template v-slot:after>
          <!--MAP COMPONENT-->
          <the-map></the-map>
      </template>

    </q-splitter>
  </div>



</template>

<script>
     
import TheMap from './components/TheMap.vue'
import TheHeader from './components/UI/TheHeader.vue'
import ThePanel from './components/ThePanel.vue'
import ThePanelTabsHorizontal from './components/ThePanelTabsHorizontal.vue'
import ThePanelTabsVertcial from './components/ThePanelTabsVertical.vue'

export default {
  name: 'App',
  components: {
    TheMap, TheHeader, ThePanel, ThePanelTabsVertcial, ThePanelTabsHorizontal
    //TheMapToggle, TheSideNav
  },
  data(){
    return{
     splitterModel: this.$q.screen.lt.sm ? 300 : 400,
     smallScreen: this.$q.screen.lt.sm ? true : false
    }
      
  },
  mounted() {
    // create data store for the app
    this.$store.dispatch('requestSupportingLayers')
  }
}
</script>

<style>

@media screen and (max-width: 700px){
 
   .q-splitter__before, .q-splitter__after {
      overflow: hidden !important;
    }
   .esri-view-width-xsmall .esri-expand--auto .esri-expand__mask--expanded {
    display: none;
   }
  .esri-view-width-xsmall .esri-expand--auto .esri-expand__container--expanded {
    top: 100px;
  }
  .esri-view-width-xsmall .esri-expand--auto .esri-expand__container--expanded .esri-expand__panel{
    padding: 2px;
  }

}
</style>
