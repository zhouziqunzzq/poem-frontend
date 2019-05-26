<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <v-textarea
            v-model="srcPage"
            :error-messages="srcPageErrors"
            :label="translatePageInputPlaceHolder"
            required
            @input="$v.srcPage.$touch()"
            @blur="$v.srcPage.$touch()"
        ></v-textarea>
      </v-flex>
      <v-flex xs12>
        <v-textarea
            v-model="translatePageResult"
            :label="translatePageResultPlaceHolder"
            readonly
        ></v-textarea>
      </v-flex>

      <v-flex xs12>
        <v-switch
            v-model="isPageChToEn"
            :label="isPageChToEnSwitch"
        ></v-switch>
      </v-flex>

      <v-flex xs12>
        <v-btn @click="translatePage" color="success">翻译页面</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import Vue from "vue";
  import {validationMixin} from "vuelidate";
  import {required, maxLength, minLength, sameAs} from "vuelidate/lib/validators";
  import config from "@/config.ts";
  import {get, post} from "@/helpers.ts";

  export default Vue.extend({
    name: "PageTranslator",
    mixins: [validationMixin],
    validations: {
      srcPage: {required},
    },
    data: () => ({
      // Page
      srcPage: "",
      translatePageResult: "",
      isPageChToEn: false,
    }),
    computed: {
      // Page
      isPageChToEnSwitch() {
        if (this.isPageChToEn) {
          return "中译英";
        } else {
          return "英译中";
        }
      },
      srcPageErrors() {
        const errors: any[] = [];
        if (!this.$v.srcPage!.$dirty) {
          return errors;
        }
        if (this.isPageChToEn) {
          !this.$v.srcPage!.required && errors.push("Please input HTML");
        } else {
          !this.$v.srcPage!.required && errors.push("请输入 HTML");
        }
        return errors;
      },
      translatePageInputPlaceHolder() {
        if (this.isPageChToEn) {
          return "Please input HTML";
        } else {
          return "输入 HTML";
        }
      },
      translatePageResultPlaceHolder() {
        if (this.isPageChToEn) {
          return "Translation result";
        } else {
          return "翻译结果";
        }
      },
      translatePageAPI() {
        if (this.isPageChToEn) {
          return "translatehtml";
        } else {
          return "translatehtml";
        }
      },
    },
    methods: {
      async translatePage() {
        this.$v.$touch();
        if (this.$v.srcPage!.$invalid) {
          return;
        } else {
          this.translatePageResult = "";
          try {
            const response = await post<{
              result: boolean,
              code: number,
              msg: string,
              data: string,
            }>(config.baseUrl + this.translatePageAPI,
              {
                input: this.srcPage,
              });
            // console.log(response.parsedBody);
            if (response.parsedBody!.result) {
              this.showInfo(response.parsedBody!.msg);
              // console.log(response.parsedBody.data);
              this.translatePageResult = response.parsedBody.data;
            } else {
              this.showError(response.parsedBody!.msg);
            }
          } catch (response) {
            this.showError("出错啦！详细信息：" + response);
          }
        }
      },
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
