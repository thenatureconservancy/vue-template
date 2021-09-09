<template>
  <header> 
    <span>App Title</span>
    <div><q-btn @click="showHelp=true; step=3" padding="none" color="white" flat icon="help"  /></div>
   
  </header>

    <!-- INTRO DIALOG -->
  <q-dialog v-model="showHelp" >
     <q-card>
        <q-card-section>
          <div class="text-h6">Help Dialog</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
  </q-dialog>
   
</template>

<script>
export default {
  data(){
    return{
      showHelp: false,
      step: 1
    }
  },
  methods: {
    selectPanelType(event){
      console.log(event)
    }
  }

}
</script>

<style scoped>
    header{
        background: var(--q-primary);
        height: 50px;
        color: #fff;
        font-size: 22px;
        padding: 10px 20px;
        box-shadow: 0px 8px 8px -2px rgb(51 51 51 / 42%);
        position: relative;
        z-index: 10;
        display: flex;
    }

    header span{
      flex: 1;
      width: 700px;
      overflow: hidden;
      white-space: wrap; 
      text-overflow: ellipsis;
    }
    
    .minHeight{
      min-height: 200px;
    }

    .maxWidth{
      max-width: 1000px;
    }

    @media screen and (max-width: 700px){
     .minHeight{
       min-height: 100%;
      }
     header{
      background: var(--q-primary);
      height: 50px;
      color: #fff;
      font-size: 14px;
      padding: 5px 10px;
      box-shadow: 0px 8px 8px -2px rgb(51 51 51 / 42%);
      position: relative;
      z-index: 10;
      display: flex;
    }
    .selected{
      color: #8c9fb9
    }

}
</style>