<template>
  <ion-grid>
    <ion-row>
      <ion-col size="12">
        <ion-card v-for="note of notes" :key="note">
          <ion-card-header class="bottom-border">
            <ion-card-subtitle>{{note.name}}</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>{{note.note}}</ion-card-content>
          <ion-card-header>
            <ion-card-subtitle class="date">{{note.date}}</ion-card-subtitle>
          </ion-card-header>
        </ion-card>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script>
export default {
  data() {
    return {
      /**
       * Array of the notes binded to the template
       */
      notes: []
    };
  },
  created() {
    /**
     * Gets the list of the notes from the store
     */
    this.notes = this.$store.getters.notes;
  }
};
</script>

<style>
ion-card {
  --background: white !important;
  border-radius: 0px !important;
}

ion-card-subtitle {
  font-size: 20px;
  color: black;
}
.bottom-border {
  border-bottom: 1px solid rgb(225, 225, 225);
  margin-bottom: 10px;
}
ion-card-content {
  font-size: 18px !important;
}
.date {
  color: rgb(55, 173, 252);
}
</style>
