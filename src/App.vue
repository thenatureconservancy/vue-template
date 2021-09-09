<template>
  <the-header></the-header>
  <div id="panel-map-wrap">
      <the-side-nav></the-side-nav>
      <the-map-toggle></the-map-toggle>
      <the-map></the-map>
  </div>



</template>

<script>
     
import TheMap from './components/TheMap.vue'
import TheHeader from './components/UI/TheHeader.vue'
import TheMapToggle from './components/UI/TheMapToggle.vue'
import TheSideNav from './components/UI/TheSideNav.vue'

export default {
  name: 'App',
  components: {
    TheMap, TheHeader, TheMapToggle, TheSideNav
  },
  data(){
    return{
     
    }
      
  },
  mounted() {
    // create data store for the app
    this.$store.dispatch('requestSupportingLayers')
  }
}
</script>

<style>
#panel-map-wrap{
    display: flex;
    flex-direction: row;
    height: calc(100vh - 49px);
    width: 100vw;
}
@media screen and (max-width: 700px){
  #panel-map-wrap {
    flex-direction: column-reverse;
    width: 100vw;
  }
  #side-nav{
    width:100%;
    height: 45%;
   }
   #map-div{
    height:55%;
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
