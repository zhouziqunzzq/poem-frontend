<template>
  <v-container>
    <v-tabs
        color="lime darken-4"
        dark
        slider-color="orange"
        grow
    >
      <v-tab ripple>绝句生成</v-tab>
      <v-tab-item>
        <JuejuGenerator/>
      </v-tab-item>

      <v-tab ripple>藏头诗生成</v-tab>
      <v-tab-item>
        <CangtouGenerator/>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script lang="ts">
  import Vue from "vue";
  import JuejuGenerator from "@/components/JuejuGenerator.vue";
  import CangtouGenerator from "@/components/CangtouGenerator.vue";

  export default Vue.extend({
    name: "generate",
    components: {
      JuejuGenerator,
      CangtouGenerator
    },
    data: () => ({
      //
    }),
    computed: {
      //
    },
    methods: {
      //
      showInfo(msg: string) {
        this.$store.dispatch("showInfo", msg);
      },
      showError(msg: string) {
        this.$store.dispatch("showError", msg);
      },
    },
  });
</script>

<style scoped lang="stylus">

</style>
