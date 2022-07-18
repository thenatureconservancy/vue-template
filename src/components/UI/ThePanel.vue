<template>
  <div>
    <q-scroll-area
      id="panelM"
      class="panel panelM q-pa-md"
      :thumb-style="{ width: '7px' }"
    >
      <div class="q-pr-lg">
        <coastal-risk-explorer></coastal-risk-explorer>
      </div>
    </q-scroll-area>
  </div>
</template>

<script>
import CoastalRiskExplorer from './AppTools/tab1.vue';

export default {
  name: 'ThePanel',
  components: {
    CoastalRiskExplorer,
  },
  data() {
    return {
      tab: 'supporting',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.panel {
  height: calc(100vh - 50px);
}

@media screen and (max-width: 700px) {
  .panel {
    height: calc(100vh - 310px);
  }
}
</style>
