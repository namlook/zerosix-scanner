<template>
  <v-app id="app">
    <v-toolbar fixed class="green">
      <v-toolbar-title>Scanner Zerosix</v-toolbar-title>
      <v-btn @click.native="reset" icon light>
        <v-icon>refresh</v-icon>
      </v-btn>
    </v-toolbar>
    <main>
      <v-container fluid>
        <v-card flat>
          <v-card-row height="80vh">
            <v-container class="text-xs-center">
              <!--v-router-->
              <!--<PhotoUpload @change="uploadPhoto" v-if="!file" />-->
              <CodeInput @submit="checkCode" v-if="displayCodeInput" />
              <v-progress-circular v-else-if="loading" indeterminate :width="1" size="240" class="green--text">vérifiation en cours</v-progress-circular>
              <VoucherInfos v-else-if="voucher && voucher.code" :voucher="voucher" />
            </v-container>
          </v-card-row>
        </v-card>
        <!--<img src="../assets/logo.png">    -->
      </v-container>
      <v-snackbar :timeout="3000" :success="context === 'success'" :info="context === 'info'" :warning="context === 'warning'" :error="context === 'error'" :primary="context === 'primary'" :secondary="context === 'secondary'" :multi-line="true"  v-model="snackbar">
        {{ snackbarText }}
        <v-btn flat @click.native="snackbar = false">Close</v-btn>
      </v-snackbar>
    </main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import voucherData from '../store/data'

import PhotoUpload from './PhotoUpload'
import CodeInput from './CodeInput'
import VoucherInfos from './VoucherInfos'

type SnackbarContext = 'error' | 'info' | 'success' | 'warning' | 'primary' | 'secondary'


@Component({
  components: {
    PhotoUpload,
    CodeInput,
    VoucherInfos,
  }
})
export default class App extends Vue {
  file: File = null
  code: string = ''
  loading: boolean = false
  context: SnackbarContext = 'error'
  snackbar: boolean = false
  snackbarText: string = ''

  voucher = null

  get displayCodeInput() {
    if (this.loading) {
      return false
    } else if (this.voucher && this.voucher.code) {
      return false
    }
    return true
  }

  checkCode(code: string) {
    this.loading = true
    setTimeout(() => {
      this.code = code
      this.loading = false
      console.log(voucherData)
      this.voucher = voucherData[code] // fetch the voucher
      console.log('_---', this.voucher)

      if (this.code && !this.voucher.code) {
        this.showSnackbar('Aucun code trouvé', 'error')        
      }
    }, 500)
  }

  showSnackbar(message: string, context: SnackbarContext) {
    this.snackbarText = message
    this.context = context
    this.snackbar = true
  }

  reset() {
    this.code = ''
    this.voucher = null
  }

  uploadPhoto(file: File) {
    this.file = file
    // const file = files[0]
    // const data = new FormData()
    // data.append('files[]', file, file.name)
  }

}
</script>

<style src="vuetify/dist/vuetify.min.css"></style>
