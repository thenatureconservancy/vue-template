<template>
  <div id="print" class="print-only">
    <the-print></the-print>
  </div>
  <the-header></the-header>

  <div>
    <div id="mobile" v-if="smallScreen" class="print-hide">
      <q-splitter
        v-model="splitterModelMobile"
        unit="px"
        separator-class="bg-primary"
        horizontal
        @update:model-value="updateScrollContainerHeight($event)"
      >
        <template v-slot:after v-if="smallScreen">
          <!--PANEL COMPONENT-->
          <the-panel></the-panel>
        </template>
        <template v-slot:separator>
          <q-avatar
            draggable="false"
            color="primary"
            text-color="white"
            size="20px"
            icon="drag_indicator"
          />
        </template>
        <template v-slot:before>
          <!--MAP COMPONENT-->
          <the-map></the-map>
        </template>
      </q-splitter>
    </div>
    <div id="desktop" v-if="!smallScreen" class="print-hide">
      <q-splitter
        reverse
        v-model="panelWidth"
        separator-class="bg-primary"
        @update:model-value="updateCondensedTabs($event)"
        unit="px"
        :limits="[0, 800]"
      >
        <template v-slot:before>
          <!--MAP COMPONENT-->
          <the-map></the-map>
        </template>
        <template v-slot:separator>
          <q-avatar
            draggable="false"
            color="dark"
            text-color="white"
            size="20px"
            v-if="this.panelWidth > 0"
            ><q-icon name="drag_indicator" size="20px"> </q-icon
          ></q-avatar>
        </template>
        <template v-slot:after>
          <!--PANEL COMPONENT-->
          <the-panel></the-panel>
        </template>
      </q-splitter>
    </div>
  </div>
</template>

<script>
import TheMap from './components/UI/TheMap.vue';
import TheHeader from './components/UI/TheHeader.vue';
import ThePanel from './components/UI/ThePanel.vue';
import ThePrint from './components/AppTools/ThePrint.vue';

export default {
  name: 'App',
  components: {
    TheMap,
    TheHeader,
    ThePanel,
    ThePrint,
    //TheMapToggle, TheSideNav
  },
  computed: {
    smallScreen() {
      return this.$q.screen.lt.sm;
    },
    panelWidth: {
      get() {
        return this.$store.state.config.panelWidth;
      },
      set(val) {
        this.$store.commit('updatePanelWidth', val);
      },
    },
  },
  data() {
    return {
      splitterModel:
        this.$store.state.config.panelDisplayType == 'plain'
          ? this.panelWidth
          : 750,
      splitterModelMobile:
        this.$store.state.config.panelDisplayType == 'tabsVertical' ? 300 : 400,
      panelScreenSize: 'v-slot:before',
      //for the service worker (pwa update)
      registration: null,
      updateExists: false,
    };
  },
  created() {},
  mounted() {
    // create data store for the app
    this.$store.dispatch('requestSupportingLayers');
    this.$q.screen.setSizes({ sm: 700 });
  },
  methods: {
    updateCondensedTabs(value) {
      //this function updates the tab state (condensed true/false) to show icon only
      if (value < 150 && !this.$store.state.condensedTabs) {
        this.$store.commit('updateCondensedTabs', true);
      } else if (value > 150 && this.$store.state.condensedTabs) {
        this.$store.commit('updateCondensedTabs', false);
      }
      this.$store.commit('updateContainerWidth', value);
    },
    updateScrollContainerHeight(value) {
      //this function updates the height of the scroll container (tab panels) in mobile view

      //todo: notate what does the 150 control
      let newVal = value;
      //document.getElementById('panelM').style.height = 'calc(100vh - ' + newVal  + 'px)'
      document.getElementsByClassName('panelM').forEach((elem) => {
        elem.style.height = 'calc(100vh - ' + newVal + 'px)';
      });
    },
  },
};
</script>

<style>
@media screen and (max-width: 700px) {
  .q-splitter__before,
  .q-splitter__after {
    overflow: hidden !important;
  }
  .esri-view-width-xsmall .esri-expand--auto .esri-expand__mask--expanded {
    display: none;
  }
  .esri-view-width-xsmall .esri-expand--auto .esri-expand__container--expanded {
    top: 100px;
  }
  .esri-view-width-xsmall
    .esri-expand--auto
    .esri-expand__container--expanded
    .esri-expand__panel {
    padding: 2px;
  }
}
</style>
