<template>
  <div class="ion-page" main>
    <ion-header>
      <ion-toolbar text-center>
        <ion-grid v-if="isSearch">
          <ion-row>
            <ion-col size="12">
              <input type="text" class="search-box" />
            </ion-col>
          </ion-row>
        </ion-grid>
        <ion-grid v-else>
          <ion-row>
            <ion-col size="2">
              <ion-menu-button></ion-menu-button>
            </ion-col>
            <ion-col size="8" text-center>
              <ion-title class="heading">Notes</ion-title>
            </ion-col>
            <!-- <ion-col size="2">
              <ion-icon name="search" class="search-icon" @click="toggle()"></ion-icon>
            </ion-col>-->
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-header>

    <ion-content class="grey-bg">
      <ion-grid>
        <ion-row v-if="notes.length > 0">
          <view-notes></view-notes>
        </ion-row>
        <ion-row v-else>
          <ion-col margin-top padding-top size="4" offset="4" class="mt-10">
            <img v-bind:src="taskmanagerLogo" alt />
          </ion-col>
          <ion-col text-center size="12">
            <ion-title>There is no Notes</ion-title>
          </ion-col>
          <ion-col text-center size="10" offset="1" class="subtext">
            Start creating task by clicking
            <span style="color:#7c4dff;font-weight: bolder">"+"</span> button in bottom right corner.
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button color="danger" @click="addNote()">
          <ion-icon name="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </div>
</template>

<script>
import AddNote from "../components/AddNote";
import ViewNotes from "../components/ViewNotes";

export default {
  components: {
    ViewNotes
  },
  data() {
    return {
      notes: [],
      taskmanagerLogo: require("../assets/ic-tasks.png"),
      isSearch: false
    };
  },
  created() {
    // Gets the array of notes from the store
    this.notes = this.$store.getters.notes;
  },
  beforeCreate() {
    // Toggle the side menu
    this.$ionic.menuController.toggle();
  },
  methods: {
    /**
     * @description Present the add Note modal to add the notes
     */
    async addNote() {
      let modal = await this.$ionic.modalController.create({
        component: AddNote
      });
      return await modal.present();
    },
    toggle() {
      this.isSearch = true;
      console.log(this.isSearch);
    }
  }
};
</script>

<style>
.gery-bg {
  --background: rgb(233, 233, 233);
}
.search-icon {
  color: white;
  font-size: 25px;
  margin-top: 3px;
}
.search-box {
  width: 100%;
  height: 30px;
}
</style>
