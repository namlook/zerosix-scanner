
<template>
  <div>
    <v-card>
      <v-card-row :img="voucher.imageUrl">
        <v-card-title style="background: rgba(0, 0, 0, .35)" class="white--text pa-5">
          {{voucher.name}}*
        </v-card-title>
      </v-card-row>
      <v-card-row>
        <v-card-text>{{voucher.description}}</v-card-text>
      </v-card-row>
      <v-card-text>
        <v-card-row height="75px">
          <div>
            <v-icon class="mr-2" dark>access_time</v-icon>
            Expire le
            <strong>{{voucher.expirationDate}}</strong>
          </div>
        </v-card-row>
      </v-card-text>
      <v-card-row actions>
        <h4 class="mb-0"><code>{{voucher.code}}</code></h4>
        <v-spacer></v-spacer>
        <v-btn outline class="green green--text">utiliser</v-btn>
      </v-card-row>
    </v-card>
    <small>*{{voucher.legalNotices}}</small>
  
    <!--{{voucher.code}} {{voucher.name}} {{voucher.description}} {{voucher.legalNotices}} {{voucher.value}} {{voucher.valueUnit}}-->
    <!--<img :src="voucher.imageUrl" /> {{voucher.imageUrl}} {{voucher.contact.firstName}} {{voucher.contact.lastName}} {{voucher.used}} {{voucher.expired}} {{voucher.expirationDate}}-->

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
