<template>
  <header class="print-hide">
    <q-btn flat icon="menu" color="dark" padding="none" class="q-mr-md">
      <q-menu>
        <q-list style="min-width: 100px" dense>
          <q-item
            clickable
            v-close-popup
            tag="a"
            target="_blank"
            href="https://www.nature.org/en-us/what-we-do/our-priorities/protect-water-and-land/land-and-water-stories/protecting-our-ocean/?vu=r.v_marine"
          >
            <q-item-section>Link</q-item-section>
            <q-item-section side>
              <q-icon name="link" size="xs"></q-icon>
            </q-item-section>
          </q-item>
          <q-separator inset />
          <q-item clickable v-close-popup tag="a" target="_blank" href="">
            <q-item-section>Link</q-item-section>
            <q-item-section side>
              <q-icon name="link" size="xs"></q-icon>
            </q-item-section>
          </q-item>
          <q-separator inset />
          <q-item clickable v-close-popup tag="a" target="_blank" href="">
            <q-item-section>Link</q-item-section>
            <q-item-section side>
              <q-icon name="link" size="xs"></q-icon>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
    <span class="">
      <span class="text-dark text-bold">Decision Support Tool </span>
    </span>
    <div>
      <q-btn
        :icon="optionsVisible ? 'visibility' : 'visibility_off'"
        label="Advanced Options"
        size="md"
        class="q-mr-sm"
        color="dark"
        flat
        @click="this.openPanel"
      />

      <q-btn
        @click="showHelp = true"
        label="Help"
        size="md"
        color="dark"
        flat
      />
      <q-btn
        @click="showAbout = true"
        label="About"
        size="md"
        color="dark"
        flat
      />
    </div>
  </header>

  <!-- INTRO DIALOG -->
  <q-dialog v-model="showAbout" maximized persistent>
    <div class="row">
      <div class="col-6 overlaydiv">
        <q-img src="capefear.jpg" style="height:100%"></q-img>
      </div>
      <div class="col-6 bg-white text-left q-pa-xl" style="height: 100%">
        <p class="text-h4 text-dark text-bold">
          About Decision Support Tool
        </p>
        <p class="text-dark text-body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <q-btn
          style="width: 100%"
          size="lg"
          color="dark"
          @click="this.showAbout = false"
          >Enter Site</q-btn
        >
      </div>
    </div>
  </q-dialog>

  <!--HELP SCREEN-->
  <q-dialog v-model="showHelp" maximized>
    <div class="bg-white text-left q-pa-xl" style="height: 100%">
      <p class="text-h4 text-dark text-bold">
        How to use the decision support tool
      </p>
      <p class="text-dark text-body1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <q-btn style="" size="lg" color="dark" @click="this.showHelp = false"
        >Close</q-btn
      >
    </div>
  </q-dialog>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
      showHelp: false,
      showAbout: true,
      optionsVisible: false,
    };
  },
  mounted() {},

  methods: {
    openPanel() {
      this.$store.commit('updateCloseInfo');
      this.optionsVisible = !this.optionsVisible;
      let width = this.optionsVisible ? 400 : 0;
      this.$store.commit('updatePanelWidth', width);
    },
  },
};
// removed from .header //
</script>

<style scoped>
header {
  background: rbga(255, 255, 255, 0.5);
  height: 50px;
  color: white;
  font-size: 22px;
  padding: 10px 20px;
  border-bottom: 1px solid var(--q-primary);
  position: relative;
  z-index: 10;
  display: flex;
}

.q-img__content {
  background-color: rgba(255, 255, 255, 0.8);
}

header span {
  flex: 1;
  width: 700px;
  overflow: hidden;
  white-space: wrap;
  text-overflow: ellipsis;
}

header button {
  font-size: 15px;
}

@media screen and (max-width: 700px) {
  header {
    background: var(--q-primary);
    height: 30px;
    color: #fff;
    font-size: 14px;
    padding: 5px 10px;
    box-shadow: 0px 8px 8px -2px rgb(51 51 51 / 42%);
    position: relative;
    z-index: 10;
    display: flex;
  }
  header button {
    font-size: 12px;
  }
}
</style>
