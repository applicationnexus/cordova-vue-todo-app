import Vue from 'vue';
import VueX from 'vuex';
import router from './router/index'

Vue.use(VueX);

export default new VueX.Store({
  state: {
    tasks: [],
    notes: [],
  },
  mutations: {
    addTask(state, taskToAdd) {
      console.log(taskToAdd);



      /**
       * Check if the task of the given date is already present
       */
      let exist = state.tasks.some(task => {
        return taskToAdd.date === task.date;
      });
      /**
       * If present then push task to it's todos array
       */
      if (exist) {
        state.tasks.map(task => {
          if (taskToAdd.date === task.date) {
            task.todos.push({
              name: taskToAdd.name,
              remainder: taskToAdd.remainder,
              time: taskToAdd.time,
              urgent: taskToAdd.isUrgent,
              remainderDate: taskToAdd.remainderDate,
              notes: taskToAdd.notes,
              completed: false,
            });
          }
        });
      } else {
        state.tasks.push({
          date: taskToAdd.date,
          todos: [{
            name: taskToAdd.name,
            remainder: taskToAdd.remainder,
            time: taskToAdd.time,
            urgent: taskToAdd.isUrgent,
            remainderDate: taskToAdd.remainderDate,
            notes: taskToAdd.notes,
            completed: false,
          }, ],
        });
      }
      localStorage.setItem('tasks', JSON.stringify(state));
      //this.commit('addRemainder', taskToAdd)
    },
    /**
     * @description Add the local notification remainder on the tasks
     * @param {*} state object
     * @param {*} task object
     */
    addRemainder(state, task) {
      if (task.remainder === true) {
        /**
         * Splits the time into array to get hours and minutes
         */
        let time = task.time.split(':');

        let date = new Date(parseInt(task.remainderDate, 10));
        cordova.plugins.notification.local.schedule({
          id: task.remainderTime,
          title: task.name,
          trigger: {
            at: new Date(date.getFullYear(), date.getMonth(), date.getDate(), time[0], time[1])
          }
        })
      }

    },
    getTodaysTask() {},
    /**
     *@description add note to the notes array
     */
    addNote(state, note) {
      console.log(state, note);
      let time = note.remainder.split(':');
      let date = new Date(note.remainderDate);

      state.notes.push({
        name: note.name,
        note: note.note,
        date: note.date,
        remainder: note.remainder,
      });

      cordova.plugins.notification.local.schedule({
        id: note.remainderDate,
        title: note.name,
        trigger: {
          at: new Date(date.getFullYear(), date.getMonth(), date.getDate(), time[0], time[1])
        }
      })
    },
    /**
     * @description Intialize the store variable with localstorage data
     */
    intializeStore(state, data) {
      if (localStorage.getItem('tasks')) {
        let data = JSON.parse(localStorage.getItem('tasks'));
        state.tasks = data.tasks;
        state.notes = data.notes;
      }
    },
    /***
     * @description Deletes the task from the store
     * @returns void
     */
    deleteTask(state, taskToRemove) {
      state.tasks.filter((task, index) => {
        /**
         * Matching the date of task to delete it from array
         */
        if (task.date === taskToRemove.date) {
          task.todos.filter((todo, index) => {
            if (todo.name === taskToRemove.name) {
              task.todos.splice(index, 1);
            }
          })
        }
        if (task.todos.length === 0) {
          state.tasks.splice(index, 1)
          // Cancel the local push notification of the task
          cordova.plugins.notification.local.cancel(1, taskToRemove.remainderId);
        }
      })

    },
    /**
     * @description Update the task status to completed to true/false
     * @param {*} state onject
     * @param {*} taskToUpdate object
     */
    updateTaskStatus(state, taskToUpdate) {
      state.tasks.filter((task, index) => {
        if (task.date === taskToUpdate.date) {
          task.todos.filter((todo) => {
            if (todo.name === taskToUpdate.name) {
              todo.completed = !taskToUpdate.status
            }
          })
        }
      })
    },
    /**
     * @description Update the task
     * @returns void
     */
    updateTask(state, data) {
      console.log(data);
      /**
       * Splits the time into array to get hours and minutes
       */
      let time = data.task.time.split(':');
      let date = new Date(parseInt(data.task.remainderDate))

      state.tasks.filter((task, index) => {
        if (task.date === data.taskToUpdate.date) {
          task.todos.filter((todo, index) => {
            if (todo.name === data.taskToUpdate.name) {
              task.todos.splice(index, 1);
              task.todos.push({
                name: data.task.name,
                remainder: data.task.remainder,
                time: data.task.time,
                urgent: data.task.isUrgent,
                remainderDate: data.task.remainderDate,
                notes: data.task.notes,
                completed: false,
              })
            }
          })
        }
        cordova.plugins.notification.local.cancel(1, data.taskToUpdate.remainderId);
        cordova.plugins.notification.local.schedule({
          id: data.task.remainderDate,
          title: data.task.name,
          trigger: {
            at: new Date(date.getFullYear(), date.getMonth(), date.getDate(), time[0], time[1])
          }
        })
        router.back();
      })
    },
    cleanStorage(state) {
      console.log("cleaning storage");
    },

  },
  getters: {
    // Returns the array of the tasks
    tasks: store => store.tasks,
    // Returns the array of notes
    notes: store => store.notes,
    // Returns the tasks based on date
    getTask: store => data => {
      let task = store.tasks.find(task => {
        return task.date = data.date
      });
      let todo = task.todos.find(todo => {
        return todo.name = data.name
      });
      return todo;
    },
    // Return the array of urgent tasks
    urgentTask: store => store.tasks.find(task => {
      return task.todos.find(todo => {
        console.log(todo);
        return todo.urgent === true;
      })
    })
  },
});
