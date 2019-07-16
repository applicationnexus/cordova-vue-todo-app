<template>
  <div style="width:100%;">
    <!-- Ion segmnet code -->
    <ion-grid>
      <ion-row>
        <ion-col size="12" class="no-padding">
          <ion-segment color="tertiary" v-on:ionChange="segmentChange($event)">
            <ion-segment-button value="todays" checked>
              <ion-label>Todays</ion-label>
            </ion-segment-button>
            <ion-segment-button value="urgent">
              <ion-label>Urgent</ion-label>
            </ion-segment-button>
            <ion-segment-button value="upcoming">
              <ion-label>Upcoming</ion-label>
            </ion-segment-button>
            <ion-segment-button value="pending">
              <ion-label>Pending</ion-label>
            </ion-segment-button>
          </ion-segment>
        </ion-col>
      </ion-row>
    </ion-grid>
    <!-- ion segment code end here -->
    <!-- Todays segment -->
    <ion-grid v-if="type =='todays'">
      <ion-row v-for="(task, i) of allTasks" :key="i + 1">
        <template class="todays-task" v-if="task.date === todaysDate">
          <ion-col size="12" class="date-block">{{task.date}}</ion-col>
          <ion-col size="12" class="task-block no-padding">
            <ion-item v-for="(todo, i) of task.todos" :key="i + 23">
              <ion-checkbox
                :checked="todo.completed"
                color="success"
                slot="start"
                @ionChange="updateTask(task.date, todo.name, todo.completed)"
              ></ion-checkbox>
              <ion-row class="pb-5 width-100">
                <ion-col size="8" class="todo-heading">
                  <h3
                    class="no-padding task-title"
                    v-bind:class="{ 'text-strike': todo.completed }"
                  >{{todo.name}}</h3>
                </ion-col>
                <ion-col size="4" text-end>
                  <ion-icon
                    class="task-icons"
                    name="stopwatch"
                    color="warning"
                    v-if="todo.remainder"
                  ></ion-icon>
                  <ion-icon name="star" class="task-icons" color="danger" v-if="todo.urgent"></ion-icon>
                </ion-col>
                <ion-col size="12" class="todo-notes">{{todo.notes}}</ion-col>
              </ion-row>
            </ion-item>
          </ion-col>
        </template>
      </ion-row>
    </ion-grid>
    <!-- Ends -->

    <!-- Urgent tasks segment -->
    <ion-grid v-if="type =='urgent'">
      <ion-row v-for="(task, i) of allTasks" :key="i + 32">
        <ion-col size="12" class="date-block" v-if="task.todos.length > 0 ">{{task.date}}</ion-col>
        <ion-col size="12" class="task-block no-padding">
          <div v-for="(todo, i) of task.todos" :key="i + 435">
            <ion-item v-if="todo.urgent === true">
              <ion-checkbox
                :checked="todo.completed"
                color="danger"
                slot="start"
                @ionChange="updateTask(task.date, todo.name, todo.completed)"
              ></ion-checkbox>
              <ion-row class="width-100">
                <ion-col size="8" class="todo-heading">
                  <h3 class="no-padding task-title">{{todo.name}}</h3>
                </ion-col>
                <ion-col size="4" text-end>
                  <ion-icon
                    class="task-icons"
                    name="stopwatch"
                    color="warning"
                    v-if="todo.remainder"
                  ></ion-icon>
                  <ion-icon name="star" class="task-icons" color="danger" v-if="todo.urgent"></ion-icon>
                </ion-col>
                <ion-col size="12" class="todo-notes">{{todo.notes}}</ion-col>
              </ion-row>
            </ion-item>
          </div>
        </ion-col>
      </ion-row>
    </ion-grid>
    <!-- Ends here -->

    <!-- Upcoming tasks here -->
    <ion-grid v-if="type =='upcoming'">
      <ion-row v-for="(task, i) of allTasks" :key="i + 324">
        <ion-col size="12" class="date-block" v-if="task.todos.length > 0">{{task.date}}</ion-col>
        <ion-col size="12" class="task-block no-padding">
          <ion-item v-for="(todo, i) of task.todos" :key="i + 333">
            <ion-checkbox
              :checked="todo.completed"
              color="success"
              slot="start"
              @ionChange="updateTask(task.date, todo.name, todo.completed)"
            ></ion-checkbox>
            <ion-row class="width-100">
              <ion-col size="8" class="todo-heading">
                <h3 class="no-padding task-title">{{todo.name}}</h3>
              </ion-col>
              <ion-col size="4" text-end>
                <ion-icon class="task-icons" name="stopwatch" color="warning" v-if="todo.remainder"></ion-icon>
                <ion-icon name="star" class="task-icons" color="danger" v-if="todo.urgent"></ion-icon>
              </ion-col>
              <ion-col size="12" class="todo-notes">{{todo.notes}}</ion-col>
            </ion-row>
          </ion-item>
        </ion-col>
      </ion-row>
    </ion-grid>
    <!-- Ends here -->

    <!-- Pending tasks -->
    <!-- Check if the pending segment is selected -->
    <ion-grid v-if="type =='pending'">
      <!-- Loops thorugh all the tasks -->
      <ion-row v-for="(task, i) of allTasks" :key="i + 233">
        <ion-col size="12" class="date-block" v-if="task.todos.length > 0">{{task.date}}</ion-col>
        <ion-col size="12" class="task-block no-padding">
          <div v-for="(todo, i) of task.todos" :key="i + 657">
            <ion-item v-if="todo.completed === false" class="full-width">
              <ion-row class="full-width width-100">
                <ion-col size="2">
                  <ion-checkbox
                    :checked="todo.completed"
                    color="success"
                    @ionChange="updateTask(task.date, todo.name, todo.completed)"
                  ></ion-checkbox>
                </ion-col>
                <ion-col size="9">
                  <ion-row>
                    <ion-col size="7" class="todo-heading">{{todo.name}}</ion-col>
                    <ion-col size="4" text-end>
                      <ion-icon
                        class="task-icons"
                        name="stopwatch"
                        color="warning"
                        v-if="todo.remainder"
                      ></ion-icon>
                      <ion-icon name="star" class="task-icons" color="danger" v-if="todo.urgent"></ion-icon>
                    </ion-col>
                    <ion-col size="12" class="todo-notes">{{todo.notes}}</ion-col>
                  </ion-row>
                </ion-col>
                <ion-col size="1">
                  <ion-button
                    color="light"
                    size="large"
                    class="menu-button"
                    @click="showPopoverMenu($event, task.date, todo.name, todo.remainderDate)"
                  >
                    <ion-icon name="more"></ion-icon>
                  </ion-button>
                </ion-col>
              </ion-row>
            </ion-item>
          </div>
        </ion-col>
      </ion-row>
    </ion-grid>
    <!-- Ends here -->
  </div>
</template>


<script>
import PopoverMenu from "./popoverMenu.vue";
import DateMixin from "../mixins/DateMixin.js";
export default {
  mixins: [DateMixin],
  data() {
    return {
      /***
       * todo type binded to the segment
       */
      type: "todays",
      tasks: [],
      allTasks: [],
      selectedTask: {},
      isUrgent: {}
    };
  },
  computed: {
    /**
     * @description return today's date
     */
    todaysDate: function() {
      return this.getTodaysDate();
    }
  },
  created() {
    /**
     * Gets the list of todays tasj=k from store
     */
    this.tasks = this.$store.getters.todaysTask;
    /**
     * Gets the list of all tasks from the store
     */
    this.allTasks = this.$store.getters.tasks;
  },
  methods: {
    updateTask(date, name, status) {
      let taskToUpdate = {
        date: date,
        name: name,
        status: status
      };
      /**
       * Calls the store mutation of type 'updateTaskStatus' and passes the task to update
       */
      this.$store.commit("updateTaskStatus", taskToUpdate);
    },
    segmentChange(event) {
      this.type = event.detail.value;
    },
    /**
     * @description Display the popover menu to edit and delete the tasks
     * @returns Promise<any>
     */
    async showPopoverMenu(ev, date, name, remainderId) {
      /**
       * Gets the details of the selected task to edit/delete
       */
      this.selectedTask = { date: date, name: name, remainderId: remainderId };
      const popover = await this.$ionic.popoverController.create({
        component: PopoverMenu,
        event: ev,
        translucent: true
      });

      popover.onDidDismiss().then(data => {
        /**
         * If the popover menu is dismissed with 'delete' string then mutate the store with the type 'deleteTask' to delete the task
         */
        if (data.data === "delete") {
          this.$store.commit("deleteTask", this.selectedTask);
        } else if (data.data === "edit") {
        /**
         * Else If the popover menu is dismissed with the string 'edit' then navigate to EditTask Page and passes the task to edit in the query params
         **/
          this.$router.push({
            name: "EditTask",
            query: {
              date: this.selectedTask.date,
              name: this.selectedTask.name,
              remainder: this.selectedTask.remainderId
            }
          });
        }
      });
      /**
       * Presenting the popover modal
       */
      return await popover.present();
    }
  }
};
</script>

<style>
.menu-button {
  --box-shadow: 0px 0px 0px;
  --ion-color-base: white !important;
  --border-color: white;
  --padding-start: 0px;
  --padding-end: 0px;
  --ion-color-base: var(--ion-color-light, #ffffff) !important;
}
.full-width {
  width: 100%;
}
h5 {
  margin-top: 5px;
  margin-bottom: 5px;
}

ion-segment-button {
  background: #7142f2 !important;
  --background-activated: #7044ff;
  color: white !important;
  font-weight: bolder;
  --indicator-color-checked: red !important;
}
.todo-heading {
  margin-top: 3px;
  font-size: 20px;
  margin-bottom: 0px;
  padding-bottom: 0px;
  font-family: "Work Sans", sans-serif;
  letter-spacing: -0.3px;
}
.todo-notes {
  font-family: "Work Sans", sans-serif;
  letter-spacing: -0.4px;
  padding-top: 3px;
}
.text-strike {
  text-decoration: line-through;
}
.todays-task {
  width: 100%;
}
.no-padding {
  padding: 0px;
}
ion-checkbox {
  --size: 20px;
  margin-left: 10px;
}
.task-icons {
  font-size: 25px;
  margin-right: 10px;
  margin-top: 5px;
}
.task-title {
  font-size: 20px;
  margin: 0px;
}
.pb-5 {
  padding-bottom: 5px;
}
.width-100 {
  width: 100%;
}
.full-width {
  --padding-start: 0px;
  --inner-padding-end: 0px;
}
</style>

