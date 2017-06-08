<template>
  <v-app id="app">
    <v-toolbar fixed class="green darken-1">
      <v-toolbar-title>Scanner Zerosix</v-toolbar-title>
      <v-btn @click.native="reset" icon light>
        <v-icon>refresh</v-icon>
      </v-btn>
    </v-toolbar>
    <main>
      <v-container fluid class="text-xs-center">
        <!--v-router-->
        <v-progress-circular v-if="loading" indeterminate :width="1" size="240" class="green--text">vérifiation en cours</v-progress-circular>
        <div v-if="!loading && !voucher">
          <PhotoUpload @change="ocrImage" v-if="!loading && !voucher" />
          ou
          <CodeInput @submit="checkCode" v-if="!loading && !voucher" />
        </div>
        <VoucherInfos v-else-if="voucher" :voucher="voucher" />
        <Snackbar />
        <!--<img src="../assets/logo.png">    -->
      </v-container>
    </main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { State, Action } from 'vuex-class'


import PhotoUpload from './PhotoUpload.vue'
import CodeInput from './CodeInput.vue'
import VoucherInfos from './VoucherInfos.vue'
import Snackbar from './Snackbar.vue'


@Component({
  components: {
    PhotoUpload,
    CodeInput,
    VoucherInfos,
    Snackbar
  }
})
export default class App extends Vue {
  @State loading
  @State voucher
  @Action checkCode
  @Action ocrImage
  @Action reset
}
</script>

<style src="vuetify/dist/vuetify.min.css"></style>
