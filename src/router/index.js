import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Notes from '../views/Notes.vue'
import Login from '../views/Login.vue'
import EditTask from '../views/EditTask.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    // Default route navigates to the login page
    {
      path: '/',
      redirect: '/login'
    },
    // Navigates to the login page on any invalid route
    {
      path: '*',
      redirect: '/login'
    },
    // Route to the notes page
    // Had requiresAuth to validate user
    {
      path: '/notes',
      name: 'Notes',
      component: Notes,
      meta: {
        requiresAuth: true
      }
    },
    // Route to edit-task page
    // Had requiresAuth to validate user
    {
      path: '/edit-task',
      name: "EditTask",
      component: EditTask,
      meta: {
        requiresAuth: true
      }
    },
    // Route to task page
    // Had requiresAuth to validate user
    {
      path: '/task',
      name: "Task",
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    // Routes to login page
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    // Logout route nvaigates to the login page
    {
      path: '/logout',
      redirect: '/login'
    }
  ],
})

router.beforeEach((to, from, next) => {
  /**
   * Check if the current route is redirected from logout route then clear the storage i.e logout user
   */
  if (to.redirectedFrom === '/logout') {
    localStorage.removeItem('currentUser');
  }
  /**
   * Check If the current user token is set in the localstorage
   */
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  /**
   * Checks if the current route requires auth
   */
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  /**
   * If current route requires auth and user token is not set in the localstorage then redirect the rouite to login page
   */
  if (requiresAuth && !currentUser) next('login');
  /**
   * If the user is logged in then redirects the user to task page
   **/
  else if (!requiresAuth && currentUser) next('task');

  else next();
})

export default router;
