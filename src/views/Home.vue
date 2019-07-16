<template>
  <div class="ion-page" main>
    <ion-header>
      <ion-toolbar text-center>
        <ion-grid>
          <ion-row>
            <ion-col size="2">
              <ion-menu-button></ion-menu-button>
            </ion-col>
            <ion-col size="8" text-center>
              <ion-title class="heading">TASK MANAGER</ion-title>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row v-if="tasks.length > 0">
          <view-todos></view-todos>
        </ion-row>
        <ion-row v-else>
          <ion-col margin-top padding-top size="4" offset="4" class="mt-10">
            <img v-bind:src="taskmanagerLogo" alt />
          </ion-col>
          <ion-col text-center size="12">
            <ion-title>There is no Tasks</ion-title>
          </ion-col>
          <ion-col text-center size="10" offset="1" class="subtext">
            Start creating task by clicking
            <span style="color:#7c4dff;font-weight: bolder">"+"</span> button in bottom right corner.
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button color="danger" @click="addTodo()">
          <ion-icon name="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </div>
</template>

<script>
import AddTodo from "../components/AddTodo";
import ViewTodos from "../components/ViewTodos";

export default {
  components: {
    AddTodo,
    ViewTodos
  },
  data() {
    return {
      tasks: [],
      taskmanagerLogo: require("../assets/ic-tasks.png")
    };
  },
  beforeCreate() {
    // Initializing the store
    this.$store.commit("intializeStore");
  },
  created() {
    // Close the side menu
    this.$ionic.menuController.close();
    // Gets the list of the tasks
    this.tasks = this.$store.getters.tasks;
  },
  methods: {
    /**
     * @description Modal Presents todo form to add todo
     * @returns Promise<any>
     */
    async addTodo() {
      let modal = await this.$ionic.modalController.create({
        component: AddTodo,
        cssClass: "add-modal"
      });
      return await modal.present();
    }
  }
};
</script>

<style>
ion-content {
  --background: rgb(241, 241, 241);
}
.mt-10 {
  margin-top: 100px;
}

.heading {
  color: #ffffff;
  margin-top: 3px;
  font-weight: bolder;
  font-family: "Work Sans", sans-serif;
}

.subtext {
  color: rgb(49, 49, 49);
  font-size: 15px;
}

ion-menu-button {
  color: white;
}

ion-grid {
  padding: 0px;
}

/* ion-modal {
  --width: 85% !important;
  --height: 75% !important;
} */
.add-modal {
  --width: 85% !important;
  --height: 75% !important;
}

.date-block {
  padding: 15px;
  background: #ebebeb;
  color: #656565;
  font-size: 17px;
}
</style>


