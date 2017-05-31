
<template>
  <div>
    <v-text-field name="code" label="Entrez le code promo" v-model="code" @keyup.enter.native="submit" :rules="rules" />
    <v-btn class="green green--text" outline @click.native="submit" v-if="codeCorrect">vérifier</v-btn>
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { State } from 'vuex-class'

@Component
export default class CodeInput extends Vue {
  code: string = ''
  rules = [
    (value: string): boolean | string => /^[0-9A-Z]*$/.test(value) || "uniquement des chiffres ou des lettres non accentuées"
  ]

  get codeCorrect() {
    const badCode = (rule) => rule(this.code) !== true
    return this.code && !this.rules.filter(badCode).length
  }

  submit() {
    this.$emit('submit', this.code)
  }
}
</script>
