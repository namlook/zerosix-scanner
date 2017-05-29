
<template>
  <div>
    {{voucher.code}}
    {{voucher.contact.firstName}}
    {{voucher.contact.lastName}}
    {{voucher.used}}
    {{voucher.expired}}
    <!--<v-card class="ma-2">
      <v-card-title class="green">
        <span class="white--text">Code promo trouvé</span>
      </v-card-title>
      <v-card-text>
        <v-card-row height="75px">
          ici
        </v-card-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-row actions>
        <v-btn>utiliser</v-btn>
      </v-card-row>
    </v-card>-->
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: ['voucher']
})
export default class VoucherInfos extends Vue {
  name = "Nico"
  displayHorizontal = true

  windowWidth = window.innerWidth
  
  handleWindowResize(event) { 
    this.windowWidth = event.currentTarget.innerWidth
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize)
  }

  mounted() {
    window.addEventListener('resize', this.handleWindowResize)
  }

}
</script>
