<template>
  <v-container>
  <v-card>
    <v-card-row class="green darken-1">
      <v-card-title>
        <span class="white--text">Hello Component</span>
        <v-spacer></v-spacer>
        <div>
          <v-menu>
            <v-btn icon="icon" slot="activator" class="white--text">
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-item>
                <v-list-tile>
                  <v-list-tile-title>Never show rewards</v-list-tile-title>
                </v-list-tile>
              </v-list-item>
              <v-list-item>
                <v-list-tile>
                  <v-list-tile-title>Remove Card</v-list-tile-title>
                </v-list-tile>
              </v-list-item>
              <v-list-item>
                <v-list-tile>
                  <v-list-tile-title>Send Feedback</v-list-tile-title>
                </v-list-tile>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-card-title>
    </v-card-row>
    <v-card-text>
      <v-card-row>
        <h2>{{greeting}}</h2>
      </v-card-row>
      <v-card-row>
        <div>
          <v-icon class="mr-3" dark>card_membership</v-icon>
        </div>
        <div>
          <div>Membership Number</div>
          <div>bla bla</div>
          <strong>113241423</strong>
        </div>
        <v-spacer></v-spacer>
        <v-container fluid>
          <v-text-field
              name="input-1"
              label="Type here to try"
              row="5"
              :value="feedback"
               @input.native="updateFeedback"
              id="input-1"
            ></v-text-field>
        </v-container>
      </v-card-row>
    </v-card-text>
    <v-card-row actions>
      <v-btn flat class="green--text darken-2" @click.native="updateMessage">{{message}}</v-btn>
    </v-card-row>
  </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'

@Component({})
export default class extends Vue {
  @Prop() greeting
  @State message
  @State feedback
  @Action updateMessage
  @Action updateFeedback
}
</script>


<style scoped>
.container {
  outline: 1px solid black;
  padding: 2rem;
}
</style>
