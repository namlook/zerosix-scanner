import Vue from 'vue'

import Vuetify from 'vuetify'
Vue.use(Vuetify as any)

import Vuex from 'vuex'
Vue.use(Vuex) 

import voucherData from './data'
import { Voucher, Snackbar } from '../interfaces'

import { extractCodeFromImage } from './utils'

import { SET_LOADING, TOGGLE_SNACKBAR, UPDATE_SNACKBAR, UPDATE_VOUCHER, RESET } from './constants'


interface State {
  voucher: Voucher | null
  loading: boolean
  snackbar: Snackbar
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