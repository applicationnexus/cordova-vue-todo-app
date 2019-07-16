<template>
  <div id="app">
    <ion-app>
      <ion-menu side="start">
        <ion-header>
          <ion-toolbar>
            <!-- user profile and name block -->
            <ion-grid>
              <ion-row>
                <ion-col size="4">
                  <ion-icon name="contact" color="light" class="user-icon"></ion-icon>
                </ion-col>
                <ion-col size="8">
                  <ion-title class="user-name">{{userName}}</ion-title>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-toolbar>
        </ion-header>
        <ion-content padding class="sidebar-content">
          <ion-grid>
            <ion-row
              class="menu-item"
              v-for="(menu, i) of sideMenuContent"
              :key="i + 3342"
              menuClose
            >
              <router-link :to="menu.url">
                <ion-icon class="icons" v-bind:name="menu.icon"></ion-icon>
                <ion-title class="menu-title">{{menu.title}}</ion-title>
              </router-link>
            </ion-row>
          </ion-grid>
        </ion-content>
      </ion-menu>

      <router-view />
    </ion-app>
    <ion-menu-controller></ion-menu-controller>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      sideMenuContent: [
        { title: "Task", url: "/task", icon: "clipboard" },
        { title: "Notes", url: "/notes", icon: "book" },
        { title: "logout", url: "/logout", icon: "log-out" }
      ]
    };
  },
  created() {
    setTimeout(() => {
      let user = JSON.parse(localStorage.getItem("currentUser"));
      if (user) {
        this.userName = user.name;
      }
    }, 1000);
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Work+Sans&display=swap");

ion-toolbar {
  --background: #7c4dff;
  min-height: 50px;
}

ion-header {
  font-family: "Work Sans", sans-serif;
}

ion-content {
  font-family: "Work Sans", sans-serif;
}

.sidebar-content {
  --padding-start: 0px !important;
  --padding-end: 0px !important;
  --padding-top: 0px !important;
  --padding-bottom: 0px !important;
}

.menu-item {
  border-bottom: 1px solid rgba(185, 185, 185, 0.404);
}

.router-link-active {
  color: #f4f0ff !important;
  background-color: rgb(233, 225, 255);
  width: 100%;
}
.router-link-active ion-icon {
  color: rgb(76, 0, 255);
}

.user-icon {
  font-size: 80px;
}
.user-name {
  font-size: 20px;
  font-weight: bolder;
  color: white;
  margin-top: 15%;
  font-family: "Work Sans", sans-serif;
}
.icons {
  font-size: 30px;
  margin: 5%;
  color: rgb(0, 0, 0);
  float: left;
}
a {
  width: 100%;
}
.menu-title {
  margin: 6%;
  color: rgb(24, 24, 24);
  float: left;
  font-family: "Work Sans", sans-serif;
}
</style>
