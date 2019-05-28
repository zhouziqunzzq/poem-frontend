<template>
  <v-container>
    <transition-group
        name="fade"
        tag="div"
        class="layout row wrap">
      <v-flex
          xs12 mb-2
          text-xs-center
          v-for="p in displayList"
          :key="p"
      >
        <span class="headline">{{p}}</span>
      </v-flex>
    </transition-group>
  </v-container>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "PoemDisplay",
    props: [
      "displayList",
    ],
  });
</script>

<style scoped lang="stylus">
  .fade-enter-active, .fade-leave-active
    transition: opacity .5s

  .fade-enter, .fade-leave-to
    opacity: 0
</style>
