<template>
  <div :class="displayClass" v-if="$store.state.data.supportingLayers" @click.stop @keypress.stop >
    <p class="text-subtitle2 text-primary q-mb-none"> {{$store.state.config.supportingLayersTitle}}</p>
    <p>Use the search to filter layers or expand the contents to browse</p>
     <q-input ref="filterRef" class="q-mb-md" outlined dense v-model="filter" label="Begin typing to filter layers">
      <template v-slot:append>
        <q-icon v-if="filter !== ''" name="clear" class="cursor-pointer" @click="resetFilter" />
      </template>
    </q-input>
    <q-tree
      ref="tree"
      :nodes="$store.state.data.supportingLayers"
      node-key="id"
      tick-strategy="leaf"
      v-model:ticked="ticked"
      v-model:expanded="expanded"
      :filter = "filter"
     >
      <template v-slot:default-header="prop">
        <div class="row items-center" v-if="prop.node.icon" >
          <div class="text-weight-bold text-primary"  >{{ prop.node.label }}</div>
          <q-btn  @click.stop="clickedIcon(prop.node.id)" class="q-ml-sm" padding="none" color="primary" flat icon="info"  />
        </div>
        <div class="row items-center" v-if="!prop.node.icon">
          <div class="">{{ prop.node.label }}</div>
        </div>
      </template>
      
    <template v-slot:body-toggle="prop">
    
    <div class="q-pa-none" style="max-width: 350px">
      <q-list class="">
      <q-expansion-item
        dense
        dense-toggle
        icon=""
        label=""
        header-class="text-secondary"
        id="expandMore"
      >
        <q-card class="q-ma-none q-pa-none">
          <p class="q-mb-none">{{prop.node.description}} </p>
          <div class='row items-left q-pa-sm'>
            <div class="col-1"><q-icon color="secondary" name="opacity" size="xs" /></div>
            <div class="col-11 q-pr-xl"><q-slider  color="secondary" snap dense @change="setTransparency($event, prop.node.id)" :min="0" :max="1" :step=".1" :model-value="1" label /></div>
          </div>
        </q-card>
      </q-expansion-item>
      </q-list>
    </div>
    
    </template>
    </q-tree>
  </div>

</template>

<script>
import { ref } from 'vue'

export default {
  name: 'SupportingLayers',
  data() {
      return{
        layerList:'',
        activeLayers:[],
        showDescription: false,
        ticked: this.$store.state.tree.ticked,
        expanded: this.$store.state.tree.expanded,
        showDialog_0: false,
        showDialog_24: false,
        showDialog_29: false
      }
    },
  props:   ['displayClass'],  

  setup () {
    //TODO: this is the setup for the filter.  I think this can be moved to data obj. 
    const filter = ref('')
    const filterRef = ref(null)
    return {
      filter,
      filterRef,
      resetFilter () {
        filter.value = ''
        filterRef.value.focus()
      },

      
    }
  },

  watch: {
    ticked: function(){    
      //get type and create ticked object with layer id and layer type to retrieve in map
      let tickedObj = []
      this.ticked.forEach((layer) => {
          let node = this.$refs.tree.getNodeByKey(layer)
          let type = node.type
          let layerInfo = layer.split("_")
          tickedObj.push({mapServiceIndex: layerInfo[1] , id: layerInfo[0], type: type})
      })
      this.$store.commit('updateTreeState', {ticked: tickedObj, expanded: this.expanded})
    }
  },
  methods: {
    setTransparency(value,id){
      console.log('set transparency')
      let layerObj = {value: value, id: id}
      this.$store.commit('updateSupportingLayerVisibleOpacity', layerObj)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.supportingLayersMap{
  background-color: white;
  max-height: calc(100vh - 120px);
  overflow-x: hidden;
  overflow-y: auto;
  min-width: 460px;
  padding: 20px;
}

.supportingLayersPanel{
  max-width: 370px;
  padding: 10px;
}

</style>
<style>
.q-tree__node-body{
  padding:0px !important;
  top:-30px;
  margin-bottom: -30px;
  left: 25px;
}

</style>
