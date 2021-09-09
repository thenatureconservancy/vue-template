<template>
    <div id="map-toggle">
        <div @click="toggleControls" class="landscape-toggle half-circle"> 
            <span v-if="$store.state.hideControls"><i class="fas fa-chevron-left"></i> HIDE <i class="fas fa-chevron-left"></i></span>
            <span v-if="$store.state.showControls"><i class="fas fa-chevron-right"></i> SHOW <i class="fas fa-chevron-right"></i></span> 
            <!--span v-if="$store.state.hideControls">CONTROLS<i class="fas fa-chevron-left mar-top"></i></span>
            <span v-if="$store.state.showControls">CONTROLS<i class="fas fa-chevron-right mar-top"></i></span-->
        </div>
        <div @click="toggleControls" class="portrait-toggle half-circle">
            <span v-if="$store.state.hideControls"><i class="fas fa-chevron-down mar-right"></i>HIDE <i style="margin-left: 10px;" class="fas fa-chevron-down mar-left"></i></span> 
            <span v-if="$store.state.showControls"><i class="fas fa-chevron-up mar-right"></i>SHOW <i style="margin-left: 10px;" class="fas fa-chevron-up mar-left"></i></span> 
            <!-- <span v-if="$store.state.hideControls">CONTROLS<i style="" class="fas fa-chevron-down mar-left"></i></span>
            <span v-if="$store.state.showControls">CONTROLS<i style="margin-left: 10px;" class="fas fa-chevron-up mar-left"></i></span> -->
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        toggleControls(){
          this.$store.state.hideControls = !this.$store.state.hideControls;
          this.$store.state.showControls = !this.$store.state.showControls; 
        }
    }   
}
</script>

<style scoped>
.half-circle {
    margin-right: -21px;
    margin-top: 30%;
    padding: 2px;
    height: 150px;
    background-color:var(--q-primary);
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    box-shadow: 4px 2px 6px -2px rgb(51 51 51 / 65%);
    cursor: pointer;
}
#map-toggle {
    width: 2px;
    background: var(--q-primary);
    font-size: 12px;
    color: white;
    text-align: center;
    box-shadow: 7px 0px 8px -2px rgb(51 51 51 / 42%);
    z-index: 2;
    writing-mode: vertical-rl;
    text-orientation: upright;
}
.half-circle:hover{
   color: var(--q-yellowField);
}
.landscape-toggle {
    display: block;
    margin-right: -21px;
    margin-top: 30%;
    padding: 2px;
    height: 150px;
    background-color:var(--q-primary);
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
}
.portrait-toggle {
    display: none;
}
.mar-bottom{
    margin-bottom: 10px;
}
.mar-top{
    margin-top: 10px;
}
.mar-right{
    margin-right: 10px;
}
.mar-left{
    margin-left: 10px;
}
@media screen and (max-width: 700px){
    #map-toggle {
        height: 2px;
        width: 100%;
        writing-mode: unset;
        text-orientation: unset;
        padding-top: 4px;
        font-size: 14px;
        margin-bottom: 2px;
    }   
    .portrait-toggle{
        display: block;
    }
    .landscape-toggle{
        display: none;
    }
    .half-circle{
        margin-top: -25px;
        margin-left: calc(50vw - 75px);
        padding: 2px;
        height: 25px;
        width: 150px;
        background-color:var(--q-primary);
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        box-shadow: 4px 2px 6px -2px rgb(51 51 51 / 65%);
        cursor: pointer;
    }
}
</style>