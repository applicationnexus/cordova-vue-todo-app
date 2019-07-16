<template>
  <div class="ion-page" main>
    <ion-content class="add-todo">
      <ion-grid>
        <ion-row>
          <ion-col size="10" text-center offset="1" padding-top>
            <ion-item>
              <input
                type="text"
                v-model="taskName"
                placeholder="Enter task name"
                class="modal-heading"
              />
            </ion-item>
            <!-- date selector dropdown code -->
            <ion-item margin-bottom>
              <ion-grid>
                <ion-row margin-top>
                  <ion-col size="12" class="no-padding">
                    <ion-label class="heading-1">Set Date</ion-label>
                  </ion-col>
                  <ion-col size="12" class="no-padding">
                    <ion-select
                      v-on:ionChange="setDate($event)"
                      :placeholder="selectedDate"
                      v-model="selectedDate"
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
            <ion-item margin-bottom>
              <ion-grid>
                <ion-row margin-top>
                  <ion-col size="10" class="no-padding">
                    <ion-label class="heading-1">Add Remainder</ion-label>
                  </ion-col>
                  <!-- <ion-col size="2">
                    <ion-toggle color="tertiary"></ion-toggle>
                  </ion-col>-->
                  <ion-col size="12" class="no-padding">
                    <ion-list class="no-padding">
                      <input type="time" v-model="time" value="No Reminder" />
                      <!-- <input
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
            <ion-item lines="none" margin-bottom>
              <ion-label color="tertiary" class="heading-1 ml-3">Mark as Urgent</ion-label>
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
                <ion-col size="12">
                  <ion-button
                    color="tertiary"
                    shape="round"
                    text-center
                    margin-top
                    @click="saveTask()"
                    :disabled="!isValid"
                  >Add Task</ion-button>
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
import store from "../store";
import DateMixin from "../mixins/DateMixin.js";
import firebase from "firebase";

export default {
  mixins: [DateMixin],
  data() {
    return {
      dates: [],
      selectedDate: "",
      timeSlots: [],
      remainder: false,
      taskName: "",
      isUrgent: false,
      notes: "",
      remainderTime: "",
      dateArray: [],
      time: ""
    };
  },
  computed: {
    /**
     * @description Checks If the taskname is not empty
     * @returns booleen
     */
    isValid() {
      return this.taskName !== "";
    }
  },
  created() {
    /**
     * Retrive the week dates from getWeekDates() mixin function
     */
    this.dates = this.getWeekDates();
    /**
     * Assings today's date as default value to the selectedDate variable binded to select date dropdow in the template
     */
    this.selectedDate = this.dates[0].value;
    /**
     * Assign the default date to reminder
     */
    this.remainderTime = this.dates[1].date;
  },
  methods: {
    /**
     * @description Sets the
     */
    setDate(event) {
      /**
       * Spilt the date key and value into dateArray
       * For ex. splitting '1563262638213#16 July 2019' into [1563262638213, 16 July 2019]
       */
      this.dateArray = event.detail.value.split("#");
      this.selectedDate = this.dateArray[1];
      this.remainderTime = this.dateArray[0];
    },
    /**
     * @description Gets the data from form and add to store
     */
    saveTask() {
      /**
       * Dissmising the modal after save button clicked
       */
      this.$ionic.modalController.dismiss();
      /**
       * Checks if the time variable has value. If true the sets the remainder variable to true
       */
      if (this.time) {
        this.remainder = true;
      }
      /**
       * Gets the form data
       */
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
      store.commit("addTask", task);
    }
  }
};
</script>

<style>
.date-input {
  font-size: 20px;
  margin-top: 3px;
}
.heading-1 {
  font-family: "Work Sans", sans-serif !important;
  font-size: 18px !important;
}
.add-todo {
  --background: white;
}
.modal-heading {
  font-size: 25px !important;
  color: rgb(45, 0, 128);
  font-family: "Work Sans", sans-serif;
}

ion-select {
  max-width: 100%;
  padding-left: 0px;
  font-size: 22px;
  /* color: rgb(45, 0, 128); */
  font-family: "Work Sans", sans-serif;
}
ion-textarea {
  --padding-top: 0px;
  border-bottom: 1px solid rgb(184, 184, 184);
}
.no-padding {
  padding: 0px;
}
ion-toggle {
  padding-top: 5px;
}

ion-item {
  --padding-start: 0px;
}
input[type="text"],
select {
  width: 100%;
  border: none;
  height: 30px;
}

textarea {
  width: 100%;
  border: none;
  font-size: 20px !important;
  font-family: "Work Sans", sans-serif !important;
  color: rgb(45, 0, 128) !important;
}

*:focus {
  outline: none;
}

input[type="checkbox"] {
  width: 25px;
  height: 25px;
}

input[type="time"] {
  border: none;
  letter-spacing: 3px;
  font-size: 20px;
  /* color: rgb(45, 0, 128); */
  font-family: "Work Sans", sans-serif;
  background: white;
  width: 100%;
}

.ml-3 {
  margin-left: 3px;
  font-weight: bolder;
  font-size: 20px;
}
</style>


