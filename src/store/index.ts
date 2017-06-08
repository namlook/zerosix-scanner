import Vue from 'vue'

import Vuetify from 'vuetify'
Vue.use(Vuetify as any)

import Vuex from 'vuex'
Vue.use(Vuex) 

import voucherData from './data'

export type SnackbarContext = 'error' | 'info' | 'success' | 'warning' | 'primary' | 'secondary'

export interface Snackbar {
  message: string
  context: SnackbarContext
  display: boolean
  timeout: number
}

export interface Voucher {
  code: string
  name: string
  description: string
  value: number | null
  valueUnit: string | null
  legalNotices: string
  imageUrl: string
  contact: {
    firstName: string
    lastName: string
  },
  used: boolean
  expired: boolean
  expirationDate: string
}

interface State {
  voucher: Voucher | null
  loading: boolean
  snackbar: Snackbar
}

import axios from 'axios'

import { 
  SET_LOADING,
  TOGGLE_SNACKBAR,
  UPDATE_SNACKBAR,
  UPDATE_VOUCHER,
  RESET
 } from './mutation-types'


async function extractCodeFromImage(file: File) {
  const url = 'https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/ocr'
  // const data = JSON.stringify({url: fileUrl})
  const data = file
  const params = { language: "unk",  detectOrientation: "true" }
  const headers = {
    // 'Content-Type': 'application/json',
    'Content-Type': 'application/octet-stream',
    'Ocp-Apim-Subscription-Key': '120c13aa28944c9f8472bfbdc600c907' }
  
  let response
  try {
    response = await axios.post(url, data, { params, headers })
  } catch(e) {
    console.log('xxx', e)
  }

  const results: string[] = []
  if (response) {
    for (let region of response.data.regions) {
      for (let line of region.lines) {
        for (let word of line.words) {
          results.push(word.text)
        }
      }
    }
  }
  const text = results.join(' ')
  console.log('results>', text)

  const match = /\/\/\/([0-9A-Z]+)\/\/\//.exec(text)
  if (match) {
    return match[1]
  }
}

const initialState: State = {
    voucher: null,
    loading: false,
    snackbar: { message: '', context: 'error', display: false, timeout: 3000},
}

export default new Vuex.Store({
  state: { ...initialState },
  mutations: {
    [RESET](state) {
      for (let property in initialState) {
        state[property] = initialState[property]
      }
    },

    [SET_LOADING](state, loading: boolean) {
      state.loading = loading
    },

    [TOGGLE_SNACKBAR](state, shouldDisplay: boolean | undefined) {
      if (shouldDisplay === undefined) {
        state.snackbar.display = !state.snackbar.display
      } else {
        state.snackbar.display = shouldDisplay
      }
    },

    [UPDATE_SNACKBAR](state, { message, context, display, timeout }: Snackbar) {
      state.snackbar = {
        message, context, display,
        timeout: timeout || 3000
      }
    },

    [UPDATE_VOUCHER](state, voucher: Voucher | null) {
      state.voucher = voucher
    }
  },
  actions: {

    reset({ commit }) {
      commit(RESET)
    },

    updateSnackbar({ commit }, snackbar: Snackbar) {
      commit(UPDATE_SNACKBAR, snackbar)
    },
    
    toggleSnackbar({ commit }, shouldDisplay: boolean) {
      commit(TOGGLE_SNACKBAR, shouldDisplay)
    },

    checkCode({ commit }, code: string) {
      commit(SET_LOADING, true)
      setTimeout(() => {
        commit(SET_LOADING, false)
        const voucher = voucherData.filter((item) => item.code === code).pop() // fetch the voucher
        if (!code || !voucher) {
          commit(UPDATE_SNACKBAR, { message: 'Aucun code trouvé', context: 'error', display: true })
        } else {
          commit(UPDATE_VOUCHER, voucher)
        }
      }, 10)
    },

    async ocrImage({ commit, dispatch }, file: File) {
      commit(SET_LOADING, true)
      const code = await extractCodeFromImage(file)
      dispatch('checkCode', code)
    }
  }
})