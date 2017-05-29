
<template>
  <div>
    <v-text-field
      name="code"
      label="Entrez le code promo"
      v-model="code"
      @keyup.enter.native="submit"
      :rules="rules" />
    <v-btn class="green green--text" outline @click.native="submit" :disabled="!code">vérifier</v-btn>
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { State } from 'vuex-class'

@Component({})
export default class CodeInput extends Vue {
  code: string = ''
  rules = [
    (value) => /^[0-9A-Z]*$/.test(value) || "uniquement des chiffres ou des lettres non accentuées"
  ]

  submit() {
    this.$emit('submit', this.code)
  }
}
</script>
