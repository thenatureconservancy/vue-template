<template>
  <div :class="displayClass" @click.stop @keypress.stop>
    <p class="text-subtitle2 text-primary q-mb-none">
      {{ $store.state.config.supportingLayersTitle }}
    </p>
    <q-separator></q-separator>
    <p class="q-pa-md">
      Learn more about your area of interest by selecting from these additional
      information layers.
    </p>
    <!--q-input
      ref="filterRef"
      class="q-mb-md"
      outlined
      dense
      v-model="filter"
      label="Begin typing to filter layers"
    >
      <template v-slot:append>
        <q-icon
          v-if="filter !== ''"
          name="clear"
          class="cursor-pointer"
          @click="resetFilter"
        />
      </template>
    </q-input-->
    <q-linear-progress
      v-if="!showTree"
      dark
      query
      color="accent"
      class="q-mt-sm"
    />
    <div v-if="showTree">
      <q-tree
        ref="tree"
        :nodes="treeData"
        node-key="id"
        tick-strategy="leaf"
        v-model:ticked="ticked"
        v-model:expanded="expanded"
        :filter="filter"
      >
        <template v-slot:default-header="prop">
          <div class="row items-center" v-if="prop.node.icon">
            <div class="text-weight-bold text-primary">
              {{ prop.node.label }}
            </div>
            <q-btn
              @click.stop="clickedIcon(prop.node.id)"
              class="q-ml-sm"
              padding="none"
              color="primary"
              flat
              icon="info"
            />
          </div>
          <div class="row items-center" v-if="!prop.node.icon">
            <div class="">{{ prop.node.label }}</div>
          </div>
        </template>

        <template v-slot:body-toggle="prop">
          <div class="q-pa-none">
            <q-list class="">
              <q-expansion-item
                expand-icon-toggle
                dense
                dense-toggle
                label=""
                header-class="text-secondary"
                id="expandMore"
              >
                <q-card class="">
                  <q-scroll-area
                    v-if="prop.node.description"
                    style="height:150px"
                    :thumb-style="{
                      background: 'var(--q-secondary)',
                      width: '4px',
                    }"
                  >
                    <div class="q-mr-md">
                      {{ prop.node.description }}
                    </div>
                  </q-scroll-area>

                  <div class="row items-left q-pa-sm">
                    <div class="col-1">
                      <q-icon color="secondary" name="opacity" size="xs" />
                    </div>
                    <div class="col-11 q-pr-xl">
                      <q-slider
                        color="secondary"
                        snap
                        dense
                        @change="
                          setTransparency($event, prop.node.id, prop.node.type)
                        "
                        :min="0"
                        :max="1"
                        :step="0.1"
                        :model-value="1"
                        label
                      />
                    </div>
                  </div>
                </q-card>
              </q-expansion-item>
            </q-list>
          </div>
        </template>
      </q-tree>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SupportingLayers',
  data() {
    return {
      layerList: '',
      activeLayers: [],
      showDescription: false,
      ticked: this.$store.state.tree.ticked,
      expanded: this.$store.state.tree.expanded,
      showDialog_0: false,
      showDialog_24: false,
      showDialog_29: false,
      filter: '',
      filterRef: null,
      showTree: false,
      treeData: [],
    };
  },
  props: ['displayClass'],
  computed: {
    slReady() {
      return this.$store.state.data.slReady;
    },
  },
  created() {
    if (this.slReady) {
      this.treeData = this.$store.state.data.supportingLayers;
      this.showTree = true;
    } else {
      this.$store.dispatch('requestSupportingLayers');
    }
  },

  watch: {
    ticked() {
      //get type and create ticked object with layer id and layer type to retrieve in map
      let tickedObj = [];
      this.ticked.forEach((layer) => {
        let node = this.$refs.tree.getNodeByKey(layer);
        let type = node.type;
        let layerInfo = layer.split('_');
        tickedObj.push({
          mapServiceIndex: layerInfo[1],
          id: layerInfo[0],
          type: type,
        });
      });
      this.$store.commit('updateTreeState', {
        tickedObj: tickedObj,
        ticked: this.ticked,
        expanded: this.expanded,
      });
    },
    slReady() {
      if (this.slReady) {
        this.treeData = this.$store.state.data.supportingLayers;
        this.showTree = true;
      }
    },
  },
  methods: {
    setTransparency(value, id, type) {
      let layerInfo = id.split('_');
      let layerObj = {
        value: value,
        id: layerInfo[0],
        mapServiceIndex: layerInfo[1],
        type: type,
      };
      this.$store.commit('updateSupportingLayerVisibleOpacity', layerObj);
    },
    resetFilter() {
      this.filter = '';
      this.filterRef.focus();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.supportingLayersMap {
  background-color: white;
  max-height: calc(100vh - 120px);
  overflow-x: hidden;
  overflow-y: auto;
  min-width: 460px;
  padding: 20px;
}

.supportingLayersPanel {
  padding: 10px;
}
</style>
<style>
.q-tree__node-body {
  padding: 0px !important;
  top: -30px;
  margin-bottom: -30px;
  left: 25px;
}
</style>
