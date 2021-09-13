import { createStore } from 'vuex'
import esriRequest from "@arcgis/core/request"

export default createStore({
  state: {
    data: {
      // data retrieved from web services
      selctors: [],
      supportingLayers: [],  //used to create the supportinglayer tree
      supportingSublayerList: [] //used to add all layers to the map
    },
    config: {
      // config info 
      skagitMapLayersURL: '',
      supportingMapLayersURL: 'https://services2.coastalresilience.org/arcgis/rest/services/Massachusetts/Massachusetts/MapServer',
      supportingMapLayers: { mapService: 'https://services2.coastalresilience.org/arcgis/rest/services/Massachusetts/Massachusetts/MapServer',
                              skipLayers: [],
                              title: "Massachussets",
                              popupTemplate: [{title: 'Watershed Boundary', field: '', label:'', id: '1'}, {title: 'Town Boundary', field: '', label:'', id: '2'}]
                           },
                              
      supportingLayersSkip:[],
      supportingLayersTitle: 'Supporting Layers',
      supportingLayersOnMap: true,
      supportingLayersInPanel: true,
      panelDisplayType: "tabsVertical" //plain, tabsHorizontal, tabsVertical
    },
      // app state info -- supporting layers
      tree: {ticked:[], expanded:[]}, 
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
    updateSupportingSublayerList(state, obj){
      state.data.supportingSublayerList = obj
    },

    //app state -- supporting layers 
    updateTreeState(state, obj){
      state.tree.ticked = obj.ticked
      state.tree.expanded = obj.expanded
    },
    updateSupportingLayerVisibleOpacity(state, obj){
      state.supportingVisibleLayerOpacity = obj
    },
    
  },
   
  actions: {
  
    requestSupportingLayers(context){
      esriRequest(context.state.config.supportingMapLayersURL + "/layers?f=pjson", {responseType: "json"}).then(function (response) {
        let layerJson = response.data.layers
        let obj = []
        let storeNodes = []
        let supportingSublayerList = []

        layerJson.forEach((l) => {
          // add layer to layer viewer if it's id is not present in the skip array
          if (context.state.config.supportingLayersSkip.indexOf(l.id) == -1){
              // Group Layer with no parent
             if (l.type == "Group Layer" && !l.parentLayer){
                //push the object to the list 
                obj.push({label: l.name, children: [], id: l.id, noTick: true, type: l.type})
                //find the index of the object we just pushed, saves the reference to the location
                let parentIndex = obj.findIndex(( obj => obj.id == l.id))
                //save the parent node to the store with reference to its location in the object
                storeNodes.push({parentIndex: parentIndex, parentLoc: obj[parentIndex], parentId: l.id, description: l.description})
               }
              // featurel layer with parent
             if (l.type !== "Group Layer" && l.parentLayer){
                    //find the location of the parent in the node lookup
                    let nodesIndex = storeNodes.findIndex(( obj => obj.parentId == l.parentLayer.id)) 
                    //set the location of the parent
                    let parentLoc = storeNodes[nodesIndex].parentLoc 
                    
                    //push the child to the parent            
                    parentLoc.children.push({label: l.name, children: [], body: 'toggle', id: l.id, description: l.description, type: l.type})
                    supportingSublayerList.push({id:l.id, visible:false, opacity: 1})
              }
              // group layer with parent
             if (l.type == "Group Layer" && l.parentLayer){
                //find the location of the parent in the node lookup
                let nodesIndex = storeNodes.findIndex(( obj => obj.parentId == l.parentLayer.id)) 
                //set the location of the parent
                let parentLoc = storeNodes[nodesIndex].parentLoc 
                //push the new parent into the found parent as child
               
                parentLoc.children.push({label: l.name, children: [], id: l.id, noTick: true, type: l.type})
                //find the index of the child we just pushed
                let parentIndex = parentLoc.children.findIndex(( obj => obj.id == l.id))   
                //save the reference to the location          
                parentLoc = parentLoc.children[parentIndex]
                //save the parent node to the store with reference to its location in the object
                storeNodes.push({parentIndex: parentIndex, parentLoc: parentLoc, parentId: l.id, description: l.description})
             }
              // feature layer with no parent length = number of nodes
              if (l.type !== "Group Layer" && !l.parentLayer){
                  obj.push({label: l.name, children: [], body: 'toggle', id: l.id, description: l.description, type: l.type})
                  supportingSublayerList.push({id:l.id, visible:false, opacity: 1})
              }
            }
          })
          context.commit('updateSupportingSublayerList', supportingSublayerList)
          context.commit('updateSupportingLayers', obj)
      })
      
    }
  
  },

  modules: {
  }
})
