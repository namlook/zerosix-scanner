<template>
  <v-snackbar :timeout="timeout" :value="display" @input="toggleSnackbar" :multi-line="true" :success="context === 'success'" :info="context === 'info'" :warning="context === 'warning'" :error="context === 'error'" :primary="context === 'primary'" :secondary="context === 'secondary'">
    {{ snackbar.message }}
    <v-btn flat @click.native="toggleSnackbar(false)">Close</v-btn>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'

@Component
export default class App extends Vue {

  @State snackbar
  @Action toggleSnackbar

  get display(): boolean {
    return this.snackbar.display
  }

  get timeout(): number {
    return this.snackbar.timeout || 3000
  }

  get context(): string {
    return this.snackbar.context
  }

}
</script>