<template>
  <div class="ion-page" main>
    <ion-header>
      <ion-toolbar class="edit-task-header" text-center>
        <ion-grid>
          <ion-row>
            <ion-col size="2" text-start @click="goBack()">
              <ion-icon name="arrow-back" class="back-icon"></ion-icon>
            </ion-col>
            <template margin-top></template>
            <ion-col size="12" margin-top>
              <ion-item class="edit-title" text-center>
                <input v-model="taskName" class="edit-name" />
              </ion-item>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-header>
    <ion-content class="edit-task">
      <ion-grid>
        <ion-row margin-start>
          <ion-col size="12">
            <!-- date selector dropdown code -->
            <ion-item>
              <ion-grid>
                <ion-row margin-top>
                  <ion-col size="12" class="no-padding">
                    <ion-label class="heading-1">Date</ion-label>
                  </ion-col>
                  <ion-col size="12" class="no-padding">
                    <ion-select
                      v-on:ionChange="setDate($event)"
                      v-bind:placeholder="selectedDate"
                      disabled="true"
                    >
                      <ion-select-option
                        v-for="(date, i) of dates"
                        :key="i"
                        :value="date.date + '#' + date.value"
                      >{{date.value}}</ion-select-option>
                    </ion-select>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-item>
            <!-- End here  -->
            <!-- time selector dropdown code -->
            <ion-item>
              <ion-grid>
                <ion-row margin-top>
                  <ion-col size="10">
                    <ion-label class="heading-1">Remainder</ion-label>
                  </ion-col>
                  <!-- <ion-col size="2">
                    <ion-toggle color="success" v-bind:value="remainder"></ion-toggle>
                  </ion-col>-->
                  <ion-col size="12" class="no-padding">
                    <ion-list class="no-padding">
                      <input type="time" v-model="time" />
                      <!-- <input
                        v-else
                        placeholder="No Remainder"
                        class="date-input"
                        type="text"
                        onfocus="(this.type='time')"
                        onblur="if(this.value==''){this.type='text'}"
                        v-model="time"
                      >-->
                    </ion-list>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-item>
            <!-- End here  -->
            <!-- Ion Check box code -->
            <ion-item lines="none">
              <ion-label color="tertiary" class="heading-1">Urgent</ion-label>
              <input type="checkbox" v-model="isUrgent" />
            </ion-item>
            <!-- Ends -->

            <ion-item lines="none">
              <ion-grid>
                <ion-row>
                  <ion-col size="12">
                    <ion-label class="heading-1">Add Note</ion-label>
                  </ion-col>
                  <ion-col size="12" class="no-padding">
                    <ion-item>
                      <textarea v-model="notes" placeholder="Enter note here"></textarea>
                    </ion-item>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-item>

            <ion-grid>
              <ion-row>
                <ion-col size="4" offset="4">
                  <ion-button
                    color="tertiary"
                    shape="round"
                    text-center
                    margin-top
                    @click="saveTask()"
                  >Save Task</ion-button>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </div>
</template>

<script>
import DateMixin from "../mixins/DateMixin.js";
export default {
  mixins: [DateMixin],
  data() {
    return {
      dates: [],
      selectedDate: "",
      remainder: false,
      taskName: "",
      isUrgent: false,
      notes: "",
      time: "",
      remainderTime: ""
    };
  },
  created() {
    /**
     * Gets the task id from route query params
     */
    let queryData = this.$route.query;
    /**
     * Gets the task from store by passing the task id
     */
    let data = this.$store.getters.getTask(queryData);
    this.taskName = queryData.name;
    this.selectedDate = queryData.date;
    this.isUrgent = data.urgent;
    this.notes = data.notes;
    this.time = data.time;
    this.remainderTime = data.remainderDate;
    this.remainder = data.remainder;

    /**
     * Retrive the week dates from mixin functions
     */
    this.dates = this.getWeekDates();
  },
  methods: {
    /**
     * @description Gets the selected date from date dropdown
     * @returns void
     */
    setDate(event) {
      /**
       * Split the date key and value and storing in the dateArray
       */
      let dateArray = event.detail.value.split("#");
      this.selectedDate = dateArray[1];
      this.remainderTime = dateArray[0];
    },
    saveTask() {
      let task = {
        date: this.selectedDate,
        isUrgent: this.isUrgent,
        notes: this.notes,
        name: this.taskName,
        remainder: this.remainder,
        time: this.time,
        remainderDate: this.remainderTime
      };
      /**
       * Calls the store mutation to add data in store
       */
      console.log(task);
      this.$store.commit("updateTask", {
        taskToUpdate: this.$route.query,
        task: task
      });
    },
    goBack() {
      this.$router.back();
    }
  }
};
</script>

<style>
.heading-1 {
  font-family: "Work Sans", sans-serif !important;
  font-size: 18px !important;
}
.edit-task {
  --background: white;
}
.edit-task-header {
  min-height: 160px;
}
.back-icon {
  font-size: 35px;
  color: white;
}
.edit-title {
  --background: #7c4dff;
  color: white;
  font-size: 30px;
  --border-color: var(--ion-color-danger, #ffffff);
  font-family: "Work Sans", sans-serif !important;
}
.no-padding {
  padding: 0px;
}

*:focus {
  outline: none;
}

ion-item {
  --padding-start: 0px;
}
input[type="text"],
select {
  width: 100%;
  border: none;
  height: 30px;
  font-size: 18px;
}

textarea {
  width: 100%;
  border: none;
  font-size: 18px;
}
ion-toggle {
  padding-top: 5px;
}
ion-select {
  max-width: 100%;
  padding-left: 0px;
  font-size: 22px;
  color: rgb(45, 0, 128);
  font-family: "Work Sans", sans-serif;
}
.edit-name {
  background: #7c4dff;
  border: none;
  color: white;
}
textarea {
  width: 100%;
  border: none;
  font-size: 20px !important;
  font-family: "Work Sans", sans-serif !important;
  color: rgb(45, 0, 128) !important;
}
input[type="checkbox"] {
  width: 25px;
  height: 25px;
}
input[type="time"] {
  border: none;
  letter-spacing: 3px;
  font-size: 20px;
  color: rgb(45, 0, 128);
  font-family: "Work Sans", sans-serif;
  background: white;
  width: 100%;
}
</style>
