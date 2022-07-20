<template>
  <header class="print-hide">
    <q-btn flat icon="menu" color="white" padding="none" class="q-mr-md">
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
    <span class="text-weight-thin text-white"
      ><span class="text-weight-thin"> Application Title Update</span>
      <span class="text-weight-thin text-secondary"> </span>
      <span class="text-secondary text-subtitle1 text-weight-thin"
        >&nbsp;&nbsp;Application Subtitle</span
      ></span
    >
    <div>
      <q-btn
        @click="showHelp = true"
        padding="none"
        color="white"
        flat
        icon="help"
      />
    </div>
  </header>

  <!-- INTRO DIALOG -->
  <q-dialog v-model="showHelp" :persistent="persistent">
    <q-card style="height: 72vh; max-width: 70vw">
      <q-toolbar class="bg-white">
        <q-toolbar-title>
          <span class="text-weight-thin text-primary"
            >Application Title
            <span class="text-weight-thin"> app subtitle </span>
          </span></q-toolbar-title
        >
      </q-toolbar>
      <q-img
        src="pexels-jeshootscom-576832.jpg"
        style="width: 70vw;height:55vh"
      >
      </q-img>
      <q-card-actions class="q-pb-none">
        <q-checkbox
          v-if="showUserOption"
          v-model="userHideDialogOptionMeramac"
          label="Do not show again"
        />
        <q-space />
        <q-btn
          flat
          label="OK"
          color="primary"
          @click="setUserChoice"
          v-close-popup
        />
      </q-card-actions>
      <div v-if="showUserOption" class="text-caption q-ml-md text-grey-7">
        *This dialog can be rerieved at any time by clicking the help button at
        the top of the screen
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
      showHelp: true,
      userHideDialogOptionMeramac: false,
      showUserOption: true,
      persistent: true,
    };
  },
  mounted() {
    //localStorage.userHideDialogOptionMeramac = '';
    if (localStorage.userHideDialogOptionMeramac == 'true') {
      this.showHelp = false;
      this.showUserOption = false;
      this.persistent = false;
    }
  },
  methods: {
    setUserChoice() {
      if (this.userHideDialogOptionMeramac == true) {
        localStorage.userHideDialogOptionMeramac = 'true';
        this.showUserOption = false;
        this.persistent = false;
      }
    },
  },
};
// removed from .header //
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Are+You+Serious&family=Carattere&family=Cookie&family=Merienda&display=swap');
header {
  background: var(--q-primary);
  height: 50px;
  color: white;
  font-size: 22px;
  padding: 10px 20px;
  box-shadow: 0px 8px 8px -2px rgb(51 51 51 / 42%);
  border-bottom: 1px solid var(--q-primary);
  position: relative;
  z-index: 10;
  display: flex;
}

.storymap {
  background: #fff;
  height: 50px;
  color: #000000;
  font-size: 25px;
  padding: 10px 20px;
  box-shadow: 0px 8px 8px -2px rgb(51 51 51 / 42%);
  position: relative;
  z-index: 10;
  display: flex;
  font-family: 'Merienda', cursive;
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
