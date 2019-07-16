export default {
  /**
   * Array of months and week
   */
  data() {
    return {
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Sepetember', 'October', 'November', 'December'],
      weeks: ['Sunday', 'Mondday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    }
  },
  methods: {
    /**
     * @description Returns Todays Date in structurized format
     *  For ex. 12 January 2019
     * @returns string
     */
    getTodaysDate() {
      let day = new Date().getDay();
      let month = new Date().getMonth();
      let date = new Date().getDate()
      return date + ' ' + this.months[month] + ' ' + new Date().getFullYear();
    },
    /**
     * @description Convert ISO date format to structurized date format
     * For ex. "2019-07-16T07:11:32.326Z" to 16 July 2019
     * @param ISODate string
     * @returns String
     */
    getDate(ISODate) {
      let date = new Date(ISODate);
      let day = date.getMonth();
      let month = date.getMonth();
      return date.getDate() + ' ' + this.months[month] + ' ' + new Date().getFullYear();
    },
    /**
     * @description Return array of next 7 days into structerized format
     * @returns array
     */
    getWeekDates() {
      let dates = [];
      let todaysDate = new Date();
      for (let i = 0; i < 7; i++) {
        dates.push({
          date: new Date().setDate(todaysDate.getDate() + i),
          value: this.getDate(new Date().setDate(todaysDate.getDate() + i))
        });
      }
      return dates;
    }
  }
}
