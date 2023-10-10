<template>
  <div class="q-pa-md bg-blue-grey-1" style="height:100vh">
    <p class="text-h6 text-dark q-mb-none">
      Advanced Options
    </p>

    <q-separator color="dark"></q-separator>
    <p class="text-subtitle2">
      Define a custom area and generate a printable report summarizing project
      benefits under different weather conditions in terms of: erosion control
      (sediment), nutrient retention (total N & P), water supply and storage
      (runoff avoided or provided).
    </p>
    <!--user selects an area-->
    <div class="shadow-1 q-pa-md q-mt-lg bg-white">
      <p class="text-bold q-mb-xs">
        <span class="text-red" v-if="!defineAreaSelection">* &nbsp;</span>Select
        an option to define a custom area:
      </p>
      <q-select
        class="q-mt-none"
        v-model="defineAreaSelection"
        :options="defineAreaOptions"
        color="blue"
        dense
        @update:model-value="this.acres = 50"
      >
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section avatar>
              <q-icon :name="scope.opt.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label style="font-size:15px">{{
                scope.opt.label
              }}</q-item-label>
              <q-item-label class="text-grey-6">{{
                scope.opt.description
              }}</q-item-label>
            </q-item-section>
          </q-item>
        </template></q-select
      >

      <p class="q-ml-xs q-mb-none" v-if="acres !== ''">
        Area: &nbsp;<span class="text-blue text-bold">50 acres</span>
      </p>
    </div>
    <!--user selects weather-->
    <div class="shadow-1 q-pa-md q-mt-md bg-white">
      <p class="text-bold q-mb-xs">
        <span class="text-red" v-if="!weatherConditions">* &nbsp;</span> Select
        weather conditions: &nbsp;
        <span class="text-blue"> {{ this.weatherConditions }}</span>
      </p>
      <div class="row justify-evenly">
        <div
          class="q-mr-sm container"
          :style="
            this.weatherConditions == 'Normal'
              ? 'border: 3px solid #2196f3'
              : ''
          "
        >
          <img src="weather_normal.svg" @click="setWeather('Normal')" />
        </div>
        <div
          class="q-mr-sm container"
          :style="
            this.weatherConditions == 'Dry' ? 'border: 3px solid #2196f3' : ''
          "
        >
          <img src="weather_dry.svg" @click="setWeather('Dry')" />
        </div>
        <div
          class="container"
          :style="
            this.weatherConditions == 'Wet' ? 'border: 3px solid #2196f3' : ''
          "
        >
          <img src="weather_wet.svg" @click="setWeather('Wet')" />
        </div>
      </div>
    </div>
    <!--user selects an project type-->
    <div class="shadow-1 q-pa-md q-mt-md bg-white">
      <p class="text-bold q-mb-xs">
        <span class="text-red" v-if="!this.projectType">* &nbsp;</span> Select
        project type: &nbsp;
        <span class="text-blue"> {{ this.projectType }}</span>
      </p>
      <div class="row justify-evenly">
        <div
          class="q-mr-md container"
          :style="
            this.projectType == 'Trees' ? 'border: 3px solid #2196f3' : ''
          "
        >
          <img src="project_trees.svg" @click="setProject('Trees')" />
        </div>
        <div
          class="q-mr-sm container"
          :style="this.projectType == 'Pond' ? 'border: 3px solid #2196f3' : ''"
        >
          <img src="project_pond.svg" @click="setProject('Pond')" />
        </div>
        <div
          class="container"
          :style="
            this.projectType == 'River' ? 'border: 3px solid #2196f3' : ''
          "
        >
          <img src="project_river.svg" @click="setProject('River')" />
        </div>
      </div>
    </div>
    <div class="row q-mt-lg justify-evenly">
      <q-btn
        color="secondary"
        class="q-mr-md"
        @click="this.$store.commit('updateOpenLayers')"
        >View Map Layers</q-btn
      ><q-btn
        color="dark"
        :disabled="this.acres !== '' && this.projectType !== '' ? disabled : ''"
        >Generate Report</q-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThePanel',
  components: {},
  computed: {
    description() {
      let description = '';
      if (this.defineAreaSelection) {
        description = this.defineAreaOptions[this.defineAreaSelection.value]
          .description;
      }
      return description;
    },
  },
  data() {
    return {
      defineAreaSelection: '',
      defineAreaOptions: [
        {
          label: 'Select by subwatershed',
          value: 0,
          description: 'Select a subwatershed on the map',
          icon: 'near_me',
        },
        {
          label: 'Draw a custom shape',
          value: 1,
          description: 'Use the draw tools on the map to draw a custom shape',
          icon: 'edit',
        },
        {
          label: 'Select by parcel',
          value: 2,
          description: 'Select a parcel on the map',
          icon: 'near_me',
        },
        {
          label: 'Upload a shapefile',
          value: 3,
          description: 'Use the tools to upload a zipped shapefile',
          icon: 'folder',
        },
      ],
      weatherConditions: 'default = All',
      projectType: '',
      acres: '',
    };
  },
  methods: {
    setWeather(selected) {
      if (this.weatherConditions !== selected) {
        this.weatherConditions = selected;
      } else {
        this.weatherConditions = 'default = All';
      }
    },
    setProject(selected) {
      if (this.projectType !== selected) {
        this.projectType = selected;
      } else {
        this.projectType = '';
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.panel {
  height: calc(100vh - 50px);
}
p {
  font-size: 15px;
}
img {
  width: 80px;
  height: 80px;
  opacity: 1;
  transition: 0.5s ease;
}
.container:hover img {
  opacity: 0.5;
}

@media screen and (max-width: 700px) {
  .panel {
    height: calc(100vh - 310px);
  }
}
</style>
