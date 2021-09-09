<template>
<p><q-separator spaced /></p>
  <p class="text-subtitle2 q-mb-none text-primary"> Model Layers </p>
  <div v-if="$store.state.selectedLayerList.length==0">
  <q-card class="q-ma-xs q-pa-lg" flat bordered>
    <p class="text-grey text-center">There are no simulations to display</p>
    </q-card>
  </div>
  <div v-if="$store.state.selectedLayerList.length>0">
    <p>Select a layer to view or use the layer controls to remove layers or set transparency</p>
      <q-item>
        <q-item-section avatar class="q-pl-xl">
          <q-tooltip anchor="top middle" self="bottom middle" :offset="[1, 1]">
          Set Transparency
          </q-tooltip>
          <q-icon color="primary" name="opacity" />
        </q-item-section>
        <q-item-section  class="q-pr-xl"> 
          <q-slider
            v-model="transparency"
            :min="0"
            :max="1"
            :step=".1"
            label
            snap
          />
        </q-item-section>
      </q-item>
   </div>
  <div class="q-pl-md q-pr-sm">
    <q-card class="q-ma-xs card" bordered  @click="cardSelected(layer,index)"
      v-for="layer, index in $store.state.selectedLayerList"
      :key="index"
      v-bind:class="{active: (index === selected) ? true : false}">
      <q-card-section>
        <div class="row">
          <div class="col-10" >
           <h6 class="q-ma-none text-subtitle2 text-secondary "> {{layer.layerNameFirst}} </h6>
           <p><q-separator spaced /></p>
            {{layer.layerNameSecond}} <br/>
            {{layer.layerNameThird}} <br/>
          </div>
          <div class="col-2 text-center">
            <!-- adding .stop to click event prevents parent click event from firing when butn is clicked-->
            <q-btn @click.stop="removeItem(layer,index)" flat round color="negative" icon="delete" size="10px" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>

export default {
  name: 'DynamicLayerList',
  components: { },
  data(){
    return {
      selected: 0,
      isActive: false,
      transparency: 1,
      selectedLayerList: this.$store.state.selectedLayerList
    }
  },

  watch: {
    transparency (){
      this.$store.commit('updateVisibleLayerOpacity', this.transparency)
    },
  },
  methods:{
    cardSelected(layer,index){
      //make the selected item active
      this.selected = index
      //update visible layer on map
      let setLayer = (this.$store.state.selectedLayerList.length > 0) ? layer.layerNum : 'none'
      this.$store.commit('updateVisibleLayer', setLayer)
    },
    removeItem(layer){
      //remove layer from the list
      this.$store.commit('removeLayer', layer.layerNum)
      //set the selected item to the first layer in the list
      this.cardSelected(this.$store.state.selectedLayerList[0], 0)
    },
   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.card:hover{
  background: rgb(224, 224, 224);
  transition: background-color .3s;
}

.active {
  border: 2px solid var(--q-secondary);
}

</style>
