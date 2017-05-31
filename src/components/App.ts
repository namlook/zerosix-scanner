import Vue from 'vue'
import Component from 'vue-class-component'

import voucherData from '../store/data'

import PhotoUpload from './PhotoUpload.vue'
import CodeInput from './CodeInput.vue'
import VoucherInfos from './VoucherInfos.vue'

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
      this.voucher = voucherData[code] || {} // fetch the voucher
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