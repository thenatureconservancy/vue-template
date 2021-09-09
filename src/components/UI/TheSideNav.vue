<template>
    <div id="side-nav" :class="{ hideSideNavWidth: $store.state.showControls }">
        <the-panel></the-panel>
    </div>
</template>

<script>
import ThePanel from '../ThePanel.vue'

export default {
    name: 'TheSideNav',
    components: {
        ThePanel
    }
}
</script>

<style scoped>
#side-nav {
    display: block;
    position: relative;
    z-index: 3;
    width: 430px;
    height: 100%;
    transition: width 0.75s, height 0.75s;
}
#side-nav.hideSideNavWidth{
   width: 0px;
}
@media screen and (max-width: 700px){
    #side-nav{
        width:100%;
        height: 43%;
    }

    #side-nav.hideSideNavWidth{
        height: 0%;
    }
}
</style>