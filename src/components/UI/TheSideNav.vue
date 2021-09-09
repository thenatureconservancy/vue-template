<template>
    <div id="side-nav" :class="{ hideSideNavWidth: $store.state.showControls }">
        <the-panel v-if="$store.state.config.panelDisplayType=='plain'"></the-panel>
        <the-panel-tabs-horizontal v-if="$store.state.config.panelDisplayType=='tabsHorizontal'"></the-panel-tabs-horizontal>
        <the-panel-tabs-vertcial v-if="$store.state.config.panelDisplayType=='tabsVertical'"></the-panel-tabs-vertcial>
    </div>
</template>

<script>
import ThePanel from '../ThePanel.vue'
import ThePanelTabsHorizontal from '../ThePanelTabsHorizontal.vue'
import ThePanelTabsVertcial from '../ThePanelTabsVertical.vue'

export default {
    name: 'TheSideNav',
    components: {
        ThePanel,
        ThePanelTabsHorizontal,
        ThePanelTabsVertcial
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