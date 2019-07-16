<template>
  <div class="ion-page" main>
    <ion-content class="login-page">
      <ion-grid margin-top margin-bottom>
        <ion-row margin-top margin-bottom>
          <ion-col margin-top size="6" offset="3" class="logo-block">
            <img v-bind:src="taskmanagerLogo" class="logo" />
          </ion-col>
          <ion-col size="12">
            <ion-title text-center class="title">TASK MANAGER</ion-title>
          </ion-col>
          <ion-col size="10" offset="1" margin-bottom text-center>
            <ion-label
              class="sub-title"
            >Create your account to easily add and manage your task with our simple task manager</ion-label>
          </ion-col>
        </ion-row>
        <ion-row margin-top margin-bottom>
          <ion-col size="10" offset="1" margin-top>
            <ion-button
              expand="block"
              shape="round"
              size="large"
              color="light"
              class="buttons"
              @click="facebookLogin()"
            >
              <img v-bind:src="facebookLogo" class="social-logo" alt />
              Continue with Facebook
            </ion-button>
          </ion-col>
          <ion-col size="10" offset="1" margin-top>
            <ion-button
              expand="block"
              shape="round"
              size="large"
              color="light"
              @click="googleLogin()"
              class="buttons"
            >
              <img v-bind:src="googleLogo" class="social-logo" alt />
              Continue with Google
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </div>
</template>

<script>
import firebase, { functions } from "firebase";

export default {
  data() {
    return {
      facebookLogo: require("../assets/ic-fb.png"),
      googleLogo: require("../assets/ic-google.png"),
      taskmanagerLogo: require("../assets/ic-tasks-white.png")
    };
  },
  created() {
    // Disable the side menu
    this.$ionic.menuController.enable(false);
  },
  methods: {
    /**
     * @description Presents the google login modal
     * @returns void
     */
    googleLogin() {
      // Check If the platform is browser or native
      if (window.plugins === undefined) {
        /**
         * Instance of the GoogleAuthProvider
         */
        const provider = new firebase.auth.GoogleAuthProvider();

        /**
         * Presenting the google login auth
         */
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(data => {
            /**
             * If login is successfull then store the user data ino localStorage
             */
            localStorage.setItem(
              "currentUser",
              JSON.stringify({
                name: data.user.displayName,
                email: data.user.email
              })
            );
            /**
             * Enables the side Menu
             */
            this.$ionic.menuController.enable(true);
            /**
             * Navigates to the login page
             */
            this.$router.push("Login");
          })
          .catch(err => {
            console.log(err);
          });
      }
      /**
       * If the platform is native then present the native google login plugin of cordova
       *
       */
      window.plugins.googleplus.login(
        {
          scopes: "profile email",
          webClientId:
            "1065978663438-aoak0u1s1guvqbjgdlh4332ijru90jfd.apps.googleusercontent.com",
          offline: true
        },
        function(data) {
          /**
           * If login is successfull then store the user data ino localStorage
           */
          localStorage.setItem(
            "currentUser",
            JSON.stringify({
              name: data.user.displayName,
              email: data.user.email
            })
          );
          /**
           * Enables the side Menu
           */
          this.$ionic.menuController.enable(true);
          /**
           * Navigates to the login page
           */
          this.$router.push("Login");
        },
        function(err) {
          console.log("error" + err);
        }
      );
    },
    /**
     * @description Present the login with facebood modal
     * @returns void
     */
    facebookLogin() {
      /**
       * If the user is already login then logout
       */
      facebookConnectPlugin.logout();
      /**
       * Present the facebook auth modal
       */
      facebookConnectPlugin.login(
        [["public_profile", "user_friends", "email"]],
        data => {
          /**
           * Checks if the user is valid and loggen in
           */
          if (data.status === "connected") {
            facebookConnectPlugin.api(
              "/me?fields=id,address,birthday,email,first_name,last_name,picture.width(720).height(720).as(picture_large)",
              ["public_profile"],
              data => {
                /**
                 * On successfull login, store the user's data in the localStorage
                 */
                localStorage.setItem(
                  "currentUser",
                  JSON.stringify({
                    name: data.first_name + " " + data.last_name,
                    email: data.email
                  })
                );
                /**
                 * Enables the side menu
                 */
                this.$ionic.menuController.enable(true);
                /**
                 * Navigates to the login page
                 */
                this.$router.push("Login");
              },
              function(err) {
                console.log(err);
              }
            );
          }
        },
        function(err) {
          console.log(err);
        }
      );
    }
  }
};
</script>

<style>
.login-page {
  --background: #7044ff;
}
.logo-block {
  margin-top: 20%;
}
.logo {
  margin-left: 15px;
}
.title {
  color: white;
  font-size: 25px;
  font-weight: bolder;
  font-family: "Work Sans", sans-serif;
}
.sub-title {
  font-size: 20px;
  color: white;
  font-family: "Work Sans", sans-serif;
}
.social-logo {
  width: 32px;
  margin-right: 20px;
}
.buttons {
  font-size: 17px;
  font-family: "Work Sans", sans-serif;
  letter-spacing: -0.2px;
  text-transform: none;
}
</style>

