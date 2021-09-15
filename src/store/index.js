import { createStore } from 'vuex'
import esriRequest from "@arcgis/core/request"

export default createStore({
  state: {
    data: {
      // data retrieved from web services
      supportingLayers: '',  //used to create the supportinglayer tree
      slReady: false
    },
    config: {
      // config info 
      supportingMapLayers: [{ mapService: 'https://services2.coastalresilience.org/arcgis/rest/services/Massachusetts/Massachusetts/MapServer',
                              skipLayers: [],
                              title: "MA",
                              popupTemplate: [{title: 'Watershed Boundary', field: 'NAME', label:'Watershed Name', id: '1'}, {title: 'Town Boundary', field: 'TOWN', label:'Town Name', id: '2'}]
                           },
                           {  mapService: 'https://services2.coastalresilience.org/arcgis/rest/services/Washington/Skagit/MapServer',
                              skipLayers: [],
                              title: "Skagit",
                              popupTemplate: [{title: 'Watershed Boundary', field: 'NAME', label:'Watershed Name', id: '1'}, {title: 'Town Boundary', field: 'TOWN', label:'Town Name', id: '2'}]
                           }],
                              
      supportingLayersTitle: 'Supporting Layers',
      supportingLayersOnMap: true,
      supportingLayersInPanel: true,
      panelDisplayType: "tabsHorizontal" //plain, tabsHorizontal, tabsVertical
    },
      // app state info -- supporting layers
      tree: {ticked:[], expanded:[], tickedObj: []}, 
      selectedLayerList: [],
      supportingVisibleLayerOpacity: {},

      // app state info -- layout
      showControls: false,
      hideControls: true
   },
  mutations: {
    //data retrieved from web services
    updateSupportingLayers(state, obj){
      state.data.supportingLayers = obj
    },
    updateSLReady(state, bool){
      state.data.slReady = bool
    },
    updateSupportingSublayerList(state, obj){
      state.data.supportingSublayerList = obj
    },

    //app state -- supporting layers 
    updateTreeState(state, obj){
      state.tree.ticked = obj.ticked
      state.tree.expanded = obj.expanded
      state.tree.tickedObj = obj.tickedObj
    },
    updateSupportingLayerVisibleOpacity(state, obj){
      state.supportingVisibleLayerOpacity = obj
    },
    
  },
   
  actions: {
  
    requestSupportingLayers(context){
      //for each map service object in supporting map layers
      let obj = []
      let smnum = context.state.config.supportingMapLayers.length
      let smcount = 0
      context.state.config.supportingMapLayers.forEach((service, index) => {  
        esriRequest(service.mapService + "/layers?f=pjson", {responseType: "json"}).then(function (response) {
        let layerJson = response.data.layers
        //push main header to the object
        obj.push({label: service.title, children: [], id: 999 + index, noTick: true, type: 'header'})
        let storeNodes = []

        layerJson.forEach((l) => {
          // add layer to layer viewer if it's id is not present in the skip array
          if (service.skipLayers.indexOf(l.id) == -1){
              // Group Layer with no parent
             if (l.type == "Group Layer" && !l.parentLayer){
                //push the object to the list as child of main header
                obj[index].children.push({label: l.name, children: [], id: l.id + "_" + index, noTick: true, type: l.type})
                //find the index of the object we just pushed, saves the reference to the location
                let parentIndex = obj[index].children.findIndex(( obj => obj.id  == l.id + "_" + index))
                //save the parent node to the store with reference to its location in the object
                storeNodes.push({parentIndex: parentIndex, parentLoc: obj[index].children[parentIndex], parentId: l.id + "_" + index, description: l.description})
               }
              // featurel layer with parent
             if (l.type !== "Group Layer" && l.parentLayer){
                    //find the location of the parent in the node lookup
                    let nodesIndex = storeNodes.findIndex(( obj => obj.parentId == l.parentLayer.id + "_" + index)) 
                    //set the location of the parent
                    let parentLoc = storeNodes[nodesIndex].parentLoc 
                    //push the child to the parent            
                    parentLoc.children.push({label: l.name, children: [], body: 'toggle', id: l.id + "_" + index, description: l.description, type: l.type})
              }
              // group layer with parent
             if (l.type == "Group Layer" && l.parentLayer){
                //find the location of the parent in the node lookup
                let nodesIndex = storeNodes.findIndex(( obj => obj.parentId  == l.parentLayer.id + "_" + index)) 
                //set the location of the parent
                let parentLoc = storeNodes[nodesIndex].parentLoc 
                //push the new parent into the found parent as child
                parentLoc.children.push({label: l.name, children: [], id: l.id + "_" + index, noTick: true, type: l.type})
                //find the index of the child we just pushed
                let parentIndex = parentLoc.children.findIndex(( obj => obj.id == l.id + "_" + index))   
                //save the reference to the location          
                parentLoc = parentLoc.children[parentIndex]
                //save the parent node to the store with reference to its location in the object
                storeNodes.push({parentIndex: parentIndex, parentLoc: parentLoc, parentId: l.id + "_" + index, description: l.description})
             }
              // feature layer with no parent length = number of nodes
              if (l.type !== "Group Layer" && !l.parentLayer){
                  obj[index].children.push({label: l.name, children: [], body: 'toggle', id: l.id + "_" + index, description: l.description, type: l.type})
              }
            }
         })
         smcount = smcount + 1
         console.log(smcount)
         console.log(smnum)
         if (smcount == smnum){
          context.commit('updateSupportingLayers', obj)
          context.commit('updateSLReady', true)
         }
      })
     })
    
  }
  
  },

  modules: {
  }
})
