
<template>
  <v-card flat>
    <v-card-row height="80vh" >
      <v-container class="text-xs-center">
        <v-btn class="green green--text" outline @click.native="chooseFile">Ouvrir l'appareil photo</v-btn>
        <input type="file" id="foo" ref="fileInput" @change="fileSelected">
      </v-container>
    </v-card-row>
  </v-card>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { State } from 'vuex-class'

@Component({})
export default class extends Vue {

  chooseFile(e) {
    const fileInput = this.$refs.fileInput as HTMLElement;
    fileInput.click()
  }

  fileSelected(e: Event): void {
    const file = (e.target as HTMLInputElement).files[0]
    this.$emit('change', file)
  }
}
</script>

<style scoped>
    input[type=file] {
        position: absolute;
        left: -99999px;
    }
</style>