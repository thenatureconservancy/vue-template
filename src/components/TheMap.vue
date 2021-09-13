<template>
   
  <div id="map">
    <div id="supportingLayers" v-if="$store.state.config.supportingLayersOnMap">
      <SupportingLayers  displayClass="supportingLayersMap"/>
   </div>
    <div id="toolbarDiv" class="">
       <button
        id="distance"
        class="esri-widget--button esri-interactive esri-icon-measure-line esriCustomButton"
        title="Distance Measurement Tool"
        @click="activateLineMeasurement()"
      ></button>
      <button
        id="area"
        class="esri-widget--button esri-interactive esri-icon-measure-area esriCustomButton"
        title="Area Measurement Tool"
        @click="activateAreaMeasurement()"
      ></button>
      <button
        id="clear"
        class="esri-widget--button esri-interactive esri-icon-trash esriCustomButton"
        title="Clear Measurements"
        @click="clearMeasurements()"
      ></button>
    </div>
  </div>
</template>

<script>
import SupportingLayers from "./SupportingLayers.vue"
import Map from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView"
import MapImageLayer from "@arcgis/core/layers/MapImageLayer"
import Legend from "@arcgis/core/widgets/Legend"
import Measurement from "@arcgis/core/widgets/Measurement"
import Expand from "@arcgis/core/widgets/Expand"
import PortalSource from "@arcgis/core/widgets/BasemapGallery/support/PortalBasemapsSource"
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery"
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

//global in order to have access to the maplayer
let esri = { modelLayer: '', supportingMapLayer:'', legend: '', map:'', measurement:'', lgExpand:''}


export default {
  name: 'TheMap',
  components: {
    SupportingLayers
  },
  data() {
    return{
      active: true
    }
  },
  computed: {
    supportingMapVisibleLayers(){
      //returns list of all ticked objects [{id: layer, type: type}, ...]
      return this.$store.state.tree.ticked
    },
    supportingVisibleLayerOpacity(){
      //returns object {value: OpacVal, id: Layerid}
      return this.$store.state.supportingVisibleLayerOpacity
    },
    supportingSublayerList(){
      //returns list of objects [{id:l.id, visible:false, opacity: 1},]
       return this.$store.state.data.supportingSublayerList
    }
    
  },
  watch:{
    supportingMapVisibleLayers(){
      this.updateSupportingVisibility()
    },
    supportingVisibleLayerOpacity(){
      this.updateSupportingOpacity()
    },
    supportingSublayerList(){
      this.addSupportingLayers()
    }

  },
 
  mounted() {
    //select a basemap
    esri.map = new Map({
      basemap: "topo"
    })

    //create the map view 
    const mapView = new MapView({
      map: esri.map,
      center: [-70.99501567725498, 42.310350073610834],
      //center: [-122.506479,48.370655],
      zoom: 11,
      container: this.$el
    })

    //add supporting map layer
    esri.supportingMapLayer = new MapImageLayer({
      url: this.$store.state.config.supportingMapLayersURL,
      sublayers: []
    })
    esri.map.add(esri.supportingMapLayer)

    //add supporting layers widget to map if true
    if (this.$store.state.config.supportingLayersOnMap){
      let supportingLayersExpand = new Expand({
        expandIconClass: "esri-icon-layer-list",  
        expandTooltip: "Expand LayerList", 
        view: mapView,
        content: document.getElementById('supportingLayers')
      })
      mapView.ui.add(supportingLayersExpand, "top-right")
    }

    //add measure tools
    esri.measurement = new Measurement({
      view: mapView,
    });
    mapView.ui.add(esri.measurement, "top-left");

    // create legend widget
    esri.legend = new Legend({
      view: mapView
    });

    // create expand widget to hide and show legend
    esri.lgExpand = new Expand({
      view: mapView,
      content: esri.legend
    })

    // add expand to map
    mapView.ui.add(esri.lgExpand, "bottom-left")
    // show expanded legend on desktop, collapse on mobile
    this.$q.screen.lt.sm || this.$q.screen.lt.md ? true : esri.lgExpand.expand()
    

    // basemaps
    const allowedBasemapTitles = ["Topographic", "Imagery Hybrid", "Streets"]
    // filtering portal basemaps
    const source = new PortalSource({
      filterFunction: (basemap) => allowedBasemapTitles.indexOf(basemap.portalItem.title) > -1
    });
    // basemap gallery widget
    var basemapGallery = new BasemapGallery({
      view: mapView,
      source: source,
      container: document.createElement("div")
    });
    // expand to hold basemap gallery
    var bgExpand = new Expand({
      view: mapView,
      content: basemapGallery
    });
    // place expand in view
    mapView.ui.add(bgExpand, {
      position: "top-right"
    });
    // close expand when basemap is changed
    esri.map.watch('basemap.title', function(){
      bgExpand.collapse();
    });

    // move zoom controls to top right
    mapView.ui.move([ "zoom" ], "top-right")
  },  

  methods: {
   
    updateSupportingVisibility(){
      // turn off all raster layer visibility
      esri.supportingMapLayer.sublayers.forEach((sl) => {
         sl.visible = false
       })
      //turn off all feature layer visibility
      esri.map.layers.items.forEach((fl) => {
        if (fl.type === 'feature'){
        fl.visible = false
        }
      })
      // turn on all sublayers that are part of supportingMapVisibleLayers object
      this.supportingMapVisibleLayers.forEach((l) => {
        //if type is raster layer - find the sublayer by id and make visible
        if (l.type === 'Raster Layer'){
          let sublayer = esri.supportingMapLayer.findSublayerById(l.id)
          sublayer.visible = true
        }
        if (l.type === 'Feature Layer'){
          //check to see if feature layer exists.  if it does make it visible, if not create it.
          let i = esri.map.layers.items.findIndex(layer => layer.layerId == l.id)
          if(i >=0 ){
              console.log('finds feature layer')
              esri.map.layers.items[i].visible = true
            }
          else{
            console.log('creates feature layer')
            esri.map.add( new FeatureLayer({
              url: this.$store.state.config.supportingMapLayersURL + "/" + l.id,         
            }))
          }
        }
     })
    },

    updateSupportingOpacity(){
      //find the layer in the list of sublayers and update its opacity
      let sublayer = esri.supportingMapLayer.findSublayerById(this.supportingVisibleLayerOpacity.id);
      sublayer.opacity = this.supportingVisibleLayerOpacity.value
    },

    addSupportingLayers(){
      //add all raster layers to the map with visibility false
      //this method only gets run once when the map is loaded
      //esri.supportingMapLayer.sublayers = this.supportingSublayerList
      //console.log( esri.supportingMapLayer.sublayers)
      console.log('doing nothing')
    },

    activateAreaMeasurement(){
      const distanceButton = document.getElementById("distance")
      const areaButton = document.getElementById("area")
      esri.measurement.activeTool = 'area'
      distanceButton.classList.remove("active")
      areaButton.classList.add("active")
    },

    activateLineMeasurement(){
      const distanceButton = document.getElementById("distance")
      const areaButton = document.getElementById("area")
      esri.measurement.activeTool = 'distance'
      distanceButton.classList.add("active")
      areaButton.classList.remove("active")
    },

     // Clears all measurements
    clearMeasurements() {
      const distanceButton = document.getElementById("distance")
      const areaButton = document.getElementById("area")
      distanceButton.classList.remove("active")
      areaButton.classList.remove("active")
      esri.measurement.clear()
    }
  }     
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "https://js.arcgis.com/4.20/@arcgis/core/assets/esri/themes/light/main.css";

#map{
  flex: 1;
  min-height: 40vh;
  width: 100%;
  position: relative;
  border-bottom: #999 solid 1pt;
}

#toolbarDiv {
  position: absolute;
  left: 10px;
  top: 10px;
  display: flex;
  box-shadow: 0 1px 2px rgb(0 0 0 / 60%);
 }

esri-expand__content esri-expand__content--expanded div{
    background-color: white;
}
#toolbarDiv button{
  border: unset;
}
#area{
  border-right: solid 1px rgba(110,110,110,0.3) !important;
  border-left: solid 1px rgba(110,110,110,0.3) !important;
}


.esri-widget--button.active,
.esri-widget--button.active:hover,
.esri-widget--button.active:focus {
  cursor: default;
  background-color: lightgrey;
}
.esri-widget--button.active path,
.esri-widget--button.active:hover path,
.esri-widget--button.active:focus path {
  fill: #E4E4E4;
}


.esri-widget *:focus-visible, .esri-widget *:focus{
  outline: none;
}

</style>
<style>
.esri-legend__service h3{
  line-height: unset;
}
.esri-legend__layer-cell{
  padding-top:0;
  padding-bottom:0;
}
.esri-measurement{
   margin: 40px 0 0 -4px;
}
.esri-ui-corner .esri-component, .esri-expand__content {
    box-shadow: 1px 1px 2px rgb(0 0 0 / 60%);
}
</style>