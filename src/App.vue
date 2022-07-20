<template>
  <v-snackbar
    v-if="updateExists"
    class="q-pa-md"
    bottom
    right
    :value="updateExists"
    :timeout="0"
    color="primary"
  >
    <span class="text-caption">
      An update is available
      <q-btn flat @click="refreshApp" size="sm" color="primary">
        Update
      </q-btn></span
    >
  </v-snackbar>
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
          <the-panel-tabs-vertcial
            v-if="$store.state.config.panelDisplayType == 'tabsVertical'"
          ></the-panel-tabs-vertcial>
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
        v-model="splitterModel"
        unit="px"
        separator-class="bg-primary"
        :limits="[70, Infinity]"
        @update:model-value="updateCondensedTabs($event)"
      >
        <template v-slot:before>
          <!--PANEL COMPONENT-->
          <the-panel-tabs-vertcial
            v-if="$store.state.config.panelDisplayType == 'tabsVertical'"
          ></the-panel-tabs-vertcial>
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
        <template v-slot:after>
          <!--MAP COMPONENT-->
          <the-map></the-map>
        </template>
      </q-splitter>
    </div>
  </div>
</template>

<script>
import TheMap from './components/UI/TheMap.vue';
import TheHeader from './components/UI/TheHeader.vue';
import ThePanelTabsVertcial from './components/UI/ThePanelTabsVertical.vue';
import ThePrint from './components/AppTools/ThePrint.vue';

export default {
  name: 'App',
  components: {
    TheMap,
    TheHeader,
    ThePanelTabsVertcial,
    ThePrint,
    //TheMapToggle, TheSideNav
  },
  data() {
    return {
      splitterModel:
        this.$store.state.config.panelDisplayType == 'tabsVertical' ? 650 : 750,
      splitterModelMobile:
        this.$store.state.config.panelDisplayType == 'tabsVertical' ? 300 : 400,
      panelScreenSize: 'v-slot:before',
      //for the service worker (pwa update)
      registration: null,
      updateExists: false,
    };
  },
  created() {
    document.addEventListener('swUpdated', this.updateAvailable, {
      once: true,
    });
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      // We'll also need to add 'refreshing' to our data originally set to false.
      if (this.refreshing) return;
      this.refreshing = true;
      // Here the actual reload of the page occurs
      window.location.reload();
    });
  },
  computed: {
    smallScreen() {
      return this.$q.screen.lt.sm;
    },
  },
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
  updateAvailable(event) {
    this.registration = event.detail;
    this.updateExists = true;
  },
  refreshApp() {
    this.updateExists = false;
    // Make sure we only send a 'skip waiting' message if the SW is waiting
    if (!this.registration || !this.registration.waiting) return;
    // Send message to SW to skip the waiting and activate the new SW
    this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
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
