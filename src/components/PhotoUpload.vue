
<template>
  <v-card flat>
    <v-card-row>
      <v-container class="text-xs-center">
        <v-btn class="green green--text" outline @click.native="chooseFile">Ouvrir l'appareil photo</v-btn>
        <input type="file" ref="fileInput" @change="fileSelected">
      </v-container>
    </v-card-row>
  </v-card>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { State, Action } from 'vuex-class'

@Component({})
export default class extends Vue {
  
  chooseFile(e) {
    const fileInput = this.$refs.fileInput as HTMLElement;
    fileInput.click()
  }

  fileSelected(e: Event): void {
    const files = (e.target as HTMLInputElement).files
    if (files) {
      this.$emit('change', files[0])
    }
  }

}
</script>

<style scoped>
    input[type=file] {
        position: absolute;
        left: -99999px;
    }
</style>