<template>
  <ion-list class="p0">
    <ion-item @click="editTask()">
      <ion-label class="pl-2">Edit</ion-label>
    </ion-item>
    <ion-item @click="deleteTask()">
      <ion-label class="pl-2">Delete</ion-label>
    </ion-item>
  </ion-list>
</template>

<script>
import router from "../router/index";
export default {
  created() {},
  methods: {
    /**
     * @description Dismiss the popover menu and passes the string 'edit' to the parent component of the modal
     * @returns void
     */
    editTask() {
      this.$ionic.popoverController.dismiss("edit");
      router.push("");
    },
    /**
     * @description Dismiss the popover menu and passes the string 'delete' to parent component of the modal
     * @returns void
     */
    deleteTask() {
      this.$ionic.popoverController.dismiss("delete");
    }
  }
};
</script>

<style>
.p0 {
  padding: 0px;
}
.pl-2 {
  padding-left: 15px;
}
</style>
