<template> 
    <!--div id="print-header">
        <h6>Print Name of App</h6>
    </div-->
    <q-separator />
    <div id="print-map">
        <img id="mapImage" :src="$store.state.mapPrintURI" />
    </div>
    <!--div id="print-footer">
        <p>date: 10/16/2021</p>
        <p>url: http://localhost:8080 </p>
    </div-->
</template>

<script>


export default {
  name: 'ThePrint',
  components: {

  },
  data(){
    return{
    }

  },
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#print-header{
    position: absolute;
    top: 0px;
    height: 30px;
}
#print-footer{
    position: absolute;
    bottom: 0px;
    height: 30px;
}
#print-map{
    position: absolute;
    top: 30px;
    height: 500px;
}

</style>
