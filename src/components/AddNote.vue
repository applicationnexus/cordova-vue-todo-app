<template>
  <div class="ion-page" main>
    <ion-header class="add-notes-header">
      <ion-row>
        <ion-col size="2" @click="closeModel()" text-center>
          <ion-icon name="arrow-back" class="note-icon"></ion-icon>
        </ion-col>
        <ion-col size="8">
          <ion-title text-center>Notes</ion-title>
        </ion-col>
        <ion-col size="2" @click="addNote()" text-center>
          <ion-icon name="checkmark" class="note-icon"></ion-icon>
        </ion-col>
      </ion-row>
    </ion-header>
    <ion-content class="light-bg">
      <ion-grid>
        <ion-row margin-top>
          <ion-col size="12">
            <ion-item>
              <input
                type="text"
                v-model="name"
                class="note-input note-heading"
                placeholder="Enter Title"
              />
            </ion-item>
          </ion-col>
          <ion-col size="2">
            <ion-icon name="book" class="input-icon"></ion-icon>
          </ion-col>
          <ion-col size="10">
            <ion-item>
              <input
                type="text"
                v-model="note"
                class="note-input sub-heading"
                placeholder="Enter Note"
              />
            </ion-item>
          </ion-col>
          <ion-col size="2">
            <ion-icon name="stopwatch" class="input-icon"></ion-icon>
          </ion-col>
          <ion-col size="10">
            <ion-label>Add remainder</ion-label>
            <ion-item>
              <input
                type="time"
                v-model="remainder"
                class="note-input sub-heading"
                placeholder="12:30 AM/PM format"
                id="time"
              />
            </ion-item>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </div>
</template>

<script>
import DateMixin from "../mixins/DateMixin.js";
import store from "../store";
export default {
  mixins: [DateMixin],
  data() {
    return {
      name: "",
      note: "",
      remainder: "",
      time: ""
    };
  },
  methods: {
    /**
     * @description Adds the note to the array of notes into the store
     * @returns void
     */
    addNote() {
      /**
       * Gets the today's date into structerized format by calling the getDate() of mixin
       */
      let date = this.getDate(new Date().toISOString());
      let notes = {
        name: this.name,
        remainder: this.remainder,
        note: this.note,
        date: date,
        remainderDate: new Date().getTime()
      };
      /**
       * Commit the note the store by passing the type 'addNote' and note data to the
       */
      store.commit("addNote", notes);
      /**
       * Dismiss the modal on add note
       */
      this.$ionic.modalController.dismiss();
    },
    /**
     * @description Dismiss the modal of add notes
     * @returns void
     */
    closeModel() {
      this.$ionic.modalController.dismiss();
    }
  }
};
</script>

<style>
.date-input {
  font-size: 20px;
  margin-top: 3px;
}
.add-notes-header {
  background: #536dfe;
  color: white;
  padding-top: 10px;
  padding-bottom: 10px;
}
.add-notes-header ion-title {
  font-weight: bolder;
  font-family: "Work Sans", sans-serif;
}

.note-icon {
  font-size: 25px;
  padding-left: 10px;
  padding-right: 10px;
}
*:focus {
  outline: none;
}
.note-heading {
  font-size: 30px;
  color: #7044ff;
  font-family: "Work Sans", sans-serif;
}
.sub-heading {
  font-size: 20px;
  font-family: "Work Sans", sans-serif;
}
.note-input {
  width: 100% !important;
  border: none;
  min-height: 35px;
}
.input-icon {
  font-size: 30px;
  color: #536dfe;
  padding: 10px;
}
.light-bg {
  --background: white;
}
</style>
