<template>
  <div class="bg-blue-grey-1">
    <div>
      <p class="text-body1 q-ma-none">
        Basin-wide Reduction Modeling
      </p>
      <q-separator spaced color="dark"></q-separator>

      <p class="">
        Explanation of what the user can do on this page will go here
      </p>
    </div>
    <!--Options-->
    <div class="shadow-1 q-pa-md q-mt-lg bg-white">
      <q-expansion-item
        dense
        dense-toggle
        expand-separator
        label="Options"
        class="bg-grey-9 text-white"
        expand-icon-class="text-white"
        v-model="expanded"
      >
        <div class="q-pa-xs bg-white text-blue-grey-10">
          <div class="q-pa-xs">
            <p class="text-blue-grey-9 q-mb-none">
              Select area of interest
            </p>
            <q-option-group
              @update:model-value="updateLayersView"
              v-model="model"
              color="secondary"
              type="radio"
              inline
              :options="[
                { label: 'UMRB', value: 'one' },
                {
                  label: 'Select HUC 8(s) from map',
                  value: 'two',
                },
              ]"
            ></q-option-group>
          </div>
          <div class="">
            <!--set conservation goal-->
            <q-btn
              icon="flag"
              color="secondary"
              label="Set conservation goal"
              unelevated
              text-color="white"
              class="q-mt-md q-mr-md"
            >
              <q-menu>
                <div class="q-pa-md" style="width: 350px; height: 250px">
                  <p class="text-body1 q-mt-none q-mb-md">
                    Create new conservation goal
                  </p>
                  <q-separator></q-separator>
                  <q-select
                    dense
                    label="Select conservation goal"
                    class="q-mb-sm q-mt-md"
                    v-model="model2"
                    color="secondary"
                    outlined
                    clearable
                    :options="[
                      { label: '% Reduction in Nitrogen Load ', value: '1' },
                      { label: '% Reduction in Phosphorus Load ', value: '2' },
                      { label: '% Reduction in Sediment Load ', value: '3' },
                    ]"
                  ></q-select>
                  <p class="text-blue-grey-9 q-mb-none"></p>
                  <q-input
                    dense
                    suffix="%"
                    v-model="model3"
                    outlined
                    label="Input goal value"
                    color="secondary"
                  >
                  </q-input>
                  <q-btn
                    @click="addGoal()"
                    label="set goal"
                    v-close-popup
                    class="absolute-bottom-right q-ma-md"
                    color="secondary"
                    text-color="white"
                    unelevated
                  ></q-btn>
                </div> </q-menu
            ></q-btn>
            <!--set conservation action-->
            <q-btn
              v-if="this.goals.length > 0"
              icon="task"
              color="deep-orange-6"
              label="Add conservation action"
              unelevated
              text-color="white"
              class="q-mt-md"
            >
              <q-menu>
                <div class="q-pa-md" style="width: 350px; height: 250px">
                  <p class="text-body1 q-mt-none q-mb-md">
                    Add conservation action
                  </p>
                  <q-separator></q-separator>
                  <q-option-group
                    type="radio"
                    class="q-mb-md q-mt-md"
                    v-model="actions"
                    color="secondary"
                    outlined
                    :options="[
                      {
                        label:
                          'Essential Regenerative Practices on 50% of Row Crop Acres',
                        value:
                          'Essential Regenerative Practices on 50% of Row Crop Acres',
                      },
                      {
                        label: 'Floodplain Restoration on 2-year floodplain',
                        value: 'Floodplain Restoration on 2-year floodplain',
                      },
                      {
                        label: 'State Nutrient Reduction Strategies',
                        value: 'State Nutrient Reduction Strategies',
                      },
                    ]"
                  ></q-option-group>

                  <q-btn
                    @click="addAction()"
                    label="add Action(s)"
                    v-close-popup
                    class="absolute-bottom-right q-ma-md"
                    color="deep-orange"
                    text-color="white"
                    unelevated
                  ></q-btn>
                </div> </q-menu
            ></q-btn>
          </div>
          <p class="q-mt-sm" v-if="this.actions.length > 0">
            *Note: These values are hard coded and do not represent actual data
          </p>
          <q-item
            v-for="(item, key) in goals"
            :key="key"
            class="shadow-1 q-mt-sm q-mb-sm"
            style="border: 1px solid lightgray"
          >
            <q-item-section class="text-body1">
              <q-item-label>{{ item.value }}{{ item.name }}</q-item-label>
              <q-item-label v-if="actions.length > 0">
                <q-btn
                  flat
                  label="Cost and benenfits"
                  icon="monetization_on"
                  size="sm"
                  color="secondary"
                  padding="none"
                >
                  <q-menu style="width: 350px; height: 300px">
                    <div class="q-ma-md">
                      <p class="text-body1">
                        Cost and Benefits
                      </p>
                      <q-separator></q-separator>

                      <p class="q-mb-none q-mt-md">Cost: Moderate</p>
                      <q-linear-progress
                        size="20px"
                        value=".6"
                        color="deep-orange-6"
                        class="q-mt-xs q-mb-sm"
                        style="width:200px"
                      >
                        <div class="absolute-full flex flex-center">
                          <q-badge
                            color="white"
                            text-color="deep-orange-6"
                            label="Moderate"
                          />
                        </div>
                      </q-linear-progress>

                      <p class="q-mb-none">
                        Benefit: High
                      </p>
                      <q-linear-progress
                        size="20px"
                        value=".9"
                        color="deep-orange-6"
                        class="q-mt-xs q-mb-sm"
                        style="width:200px"
                      >
                        <div class="absolute-full flex flex-center">
                          <q-badge
                            color="white"
                            text-color="deep-orange-6"
                            label="High"
                          />
                        </div>
                      </q-linear-progress>
                      <p class="q-mb-none q-mt-md">
                        Conservation Action:
                      </p>
                      <ul>
                        <li>
                          {{ this.actions }}
                        </li>
                      </ul>
                    </div>
                  </q-menu>
                </q-btn>
              </q-item-label>
            </q-item-section>

            <q-item-section side class="">
              <q-item-label class="text-secondary text-caption">
                Goal Status
                <q-linear-progress
                  size="20px"
                  :value="item.percentComplete"
                  color="secondary"
                  class="q-mt-xs"
                  style="width:200px"
                >
                  <div class="absolute-full flex flex-center">
                    <q-badge
                      color="white"
                      text-color="primary"
                      :label="item.percentCompleteLabel"
                    />
                  </div> </q-linear-progress
              ></q-item-label>
            </q-item-section>
          </q-item>
          <!--q-item-section side>
              <q-btn
                unelevated
                outline
                color="secondary"
                :icon-right="project.showVisits ? 'expand_less' : 'expand_more'"
                @click="
                  project.showVisits = !project.showVisits;
                  project.showMap = false;
                  this.view = 'table';
                  closeVisitTable(project.qaqc_id);
                  getVisits(
                    project.qaqc_id,
                    project.project_id,
                    project.showVisits
                  );
                "
                >VISITS</q-btn
              >
            </q-item-section>
          </q-item>
          <q-slide-transition>
            <div v-show="project.showVisits">
              <q-btn-toggle
                flat
                unelevated
                v-model="view"
                spread
                toggle-color="primary"
                color="blue-grey-1"
                text-color="black"
                :options="[
                  { label: 'View Table', value: 'table' },
                  { label: 'View Map', value: 'map' },
                ]"
                @update:model-value="changeView(project)"
              ></q-btn-toggle>
              <q-table
                :rows="qaqcVisits"
                :columns="columns"
                row-key="visitId"
                flat
                bordered
                v-if="view == 'table'"
              >
                <template v-slot:header="props">
                  <q-tr :props="props">
                    <q-th auto-width />
                    <q-th
                      v-for="col in props.cols"
                      :key="col.name"
                      :props="props"
                    >
                      {{ col.label }}
                    </q-th>
                  </q-tr>
                </template>

                <template v-slot:body="props">
                  <q-tr :props="props">
                    <q-td auto-width>
                      <q-btn
                        size="sm"
                        color="secondary"
                        round
                        dense
                        @click="props.expand = !props.expand"
                        :icon="props.expand ? 'remove' : 'add'"
                        :disable="
                          props.cols[0].value == 'Completed' ? false : true
                        "
                      />
                    </q-td>
                    <q-td
                      v-for="col in props.cols"
                      :key="col.name"
                      :props="props"
                    >
                      {{ col.value }}
                    </q-td>
                  </q-tr>
                  <q-tr v-show="props.expand" :props="props" dense>
                    <q-td colspan="100%">
                      <div class="text-left">
                        <q-table
                          v-if="qaqcVisits[props.cols[6].value]"
                          flat
                          bordered
                          dense
                          title="QAQC Measurement Comparison"
                          title-class="text-body2"
                          :rows="qaqcVisits[props.cols[6].value].data"
                          :columns="columns2"
                          row-key="name"
                          separator="vertical"
                          hide-bottom
                          class="bg-blue-grey-1 text-dark"
                          :pagination="{ rowsPerPage: 0 }"
                        >
                          <template v-slot:body="props">
                            <q-tr :props="props" style="height:20px">
                              <q-td key="measurement" :props="props">{{
                                props.row.measurement
                              }}</q-td>
                              <q-td key="initialVal" :props="props">{{
                                props.row.initialVal
                              }}</q-td>
                              <q-td key="qaqcVal" :props="props">{{
                                props.row.qaqcVal
                              }}</q-td>
                              <q-td key="range" :props="props">{{
                                props.row.range
                              }}</q-td>
                              <q-td key="withinRange" :props="props"
                                ><q-icon
                                  :name="
                                    props.row.withinRange ? 'check' : 'close'
                                  "
                                  :color="
                                    props.row.withinRange ? 'green' : 'red'
                                  "
                                  size="sm"
                              /></q-td>
                            </q-tr> </template
                        ></q-table>
                      </div>
                    </q-td>
                  </q-tr> </template
              ></q-table>
              <div>
                <p
                  v-if="
                    view == 'map' &&
                      project.showMap == true &&
                      project.status == 'COMPLETED'
                  "
                  key=""
                  class="q-ma-md text-center"
                >
                  Map is disabled for completed QAQC
                </p>
              </div>
              <div
                v-if="
                  view == 'map' &&
                    project.showMap == true &&
                    project.status == 'ACTIVE'
                "
              >
                <MapQAQC></MapQAQC>
              </div>
            </div>
          </q-slide-transition-->
        </div>
      </q-expansion-item>
    </div>
    <!--Nutrient loads-->
    <div class="shadow-1 q-pa-md q-mt-lg bg-white">
      <q-expansion-item
        dense
        dense-toggle
        expand-separator
        label="Nutrient / sediment loads"
        class="bg-grey-9 text-white"
        expand-icon-class="text-white"
        v-model="expanded1"
      >
        <div class="q-pa-xs bg-white">
          <p class="q-mt-sm text-blue-grey-9">
            *Note: These values are hard coded and do not represent actual data
          </p>
          <q-table
            class="q-mt-md"
            :rows="this.model == 'one' ? this.rows : this.rows2"
            :columns="this.model == 'one' ? this.columns : this.columns2"
            row-key="name"
            hide-bottom
          >
            <template v-slot:bottom> </template
          ></q-table>
        </div>
      </q-expansion-item>
    </div>
    <!--Top crops-->
    <div class="shadow-1 q-pa-md q-mt-lg bg-white">
      <q-expansion-item
        dense
        dense-toggle
        expand-separator
        label="Top Crops"
        class="bg-grey-9 text-white"
        expand-icon-class="text-white"
        v-model="expanded3"
      >
        <div class="q-pa-xs bg-white text-blue-grey-10">
          <p class="q-mt-sm text-blue-grey-9">
            *Note: These values are hard coded and do not represent actual data
          </p>
          <q-table
            grid
            flat
            bordered
            :rows="rows3"
            :columns="columns"
            row-key="name"
            hide-header
            hide-bottom
          >
            <template v-slot:bottom> </template>
            <template v-slot:item="props">
              <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
                <q-card flat bordered>
                  <q-card-section class="text-center">
                    <strong>{{ props.row.name }}</strong>
                  </q-card-section>
                  <q-separator />
                  <q-card-section class="flex flex-center">
                    <div>{{ props.row.area }}</div>
                  </q-card-section>
                </q-card>
              </div>
            </template>
          </q-table>
        </div>
      </q-expansion-item>
    </div>
    <!--Layers-->
    <div class="shadow-1 q-pa-md q-mt-lg bg-white">
      <q-expansion-item
        dense
        dense-toggle
        expand-separator
        label="Layers"
        class="bg-grey-9 text-white"
        expand-icon-class="text-white"
        v-model="expanded2"
      >
        <div class="q-pa-xs bg-white">
          <SupportingLayers></SupportingLayers>
        </div>
      </q-expansion-item>
    </div>
  </div>
</template>

<script>
import SupportingLayers from './SupportingLayers.vue';
export default {
  name: 'tab1',
  components: { SupportingLayers },
  data() {
    return {
      model: 'one',
      model2: '',
      model3: '',
      goals: [],
      distinctGoals: [],
      expanded: true,
      expanded1: true,
      expanded2: true,
      expanded3: true,
      actions: [],

      columns: [
        {
          name: 'area',
          label: 'Area',
          field: 'area',
        },
        {
          name: 'phosphorus',
          label: 'Phosphorus (kg/km)',
          field: 'phosphorus',
        },
        { name: 'nitrogen', label: 'Nitrogen (kg/km)', field: 'nitrogen' },
        { name: 'sediment', label: 'Sediment (kg/km)', field: 'sediment' },
        { name: 'fish', label: 'Fish', field: 'fish' },
      ],
      columns2: [
        {
          name: 'area',
          label: 'Huc 8',
          field: 'area',
        },
        {
          name: 'phosphorus',
          label: 'Phosphorus (kg/km)',
          field: 'phosphorus',
        },
        { name: 'nitrogen', label: 'Nitrogen (kg/km)', field: 'nitrogen' },
        { name: 'sediment', label: 'Sediment (kg/km)', field: 'sediment' },
        { name: 'fish', label: 'Fish', field: 'fish' },
      ],
      rows: [
        {
          area: 'UMRB',
          phosphorus: '1,070',
          nitrogen: '140',
          sediment: '146',
          fish: '--',
        },
      ],
      rows2: [
        {
          area: '07010108',
          phosphorus: '6,543',
          nitrogen: '973',
          sediment: '191',
          fish: '1.4',
        },
        {
          area: '07130001',
          phosphorus: '2,978',
          nitrogen: '4,790',
          sediment: '141',
          fish: '2.3',
        },
      ],
      rows3: [
        {
          name: 'Corn',
          area: '752,674 acres',
        },
        {
          name: 'Soy',
          area: '557,587 acres',
        },
        {
          name: 'Alfalfa',
          area: '23,884 acres',
        },
      ],
    };
  },
  methods: {
    addGoal() {
      let concat = this.model2.label;
      if (!this.distinctGoals.includes(concat)) {
        this.distinctGoals.push(concat);
        this.goals.push({
          name: this.model2.label,
          value: this.model3,
          percentComplete: 0,
          percentCompleteLabel: '0%',
        });
      }
      this.model2 = '';
      this.model3 = '';
    },
    addAction() {
      for (let i = 0; i < this.goals.length; i++) {
        let random = Math.random();
        this.goals[i].percentComplete = random;
        this.goals[i].percentCompleteLabel = Math.floor(random * 100) + '%';
      }
    },
    updateLayersView() {
      console.log(this.model);
      if (this.model == 'one') {
        this.$store.commit('updateSetTicked', {
          tick: ['1_0'],
          untick: ['5_0'],
        });
      } else {
        this.$store.commit('updateSetTicked', {
          tick: ['5_0'],
          untick: ['1_0'],
        });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#print-header {
  position: absolute;
  top: 0px;
  height: 30px;
}
#print-footer {
  position: absolute;
  bottom: 0px;
  height: 30px;
}
#print-map {
  position: absolute;
  top: 30px;
  height: 500px;
}
</style>
