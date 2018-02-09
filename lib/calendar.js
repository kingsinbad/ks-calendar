const moment = require('moment')

let calendar = {

  selectedDate: moment(),

  /**
   * Loads dates of entire month of the selected date
   * Days array will start on sunday
   * It includes the days of previous/upcoming month that is included in the week
   * @param {String/Date} date - Target date to load calendar
   * @return {Array} - [{ week: <week of the year>, days: [<moment object of the day>]}]
   * [calendar] - array is sorted from the first week to the last week of the months
   * [days] - array is sorted day of the week from Sunday to Saturday
   * [week] - week of the year
   * false <bool> - if date in empty or invalid
  **/
  load(date) {
    if (typeof(date) === 'undefined' || date === null) {
      return false
    }

    this.selectedDate = moment(date)
    if (!this.selectedDate.isValid()) {
      return false
    }

    const startWeek = this.selectedDate.clone().startOf('month').week()
    const endWeek = this.selectedDate.clone().endOf('month').week()
    let calendar = []

    if (endWeek === 1) {
      // custom mapping for december
      let weeks = [48,49,50,51,52]
      for (let week of weeks) {
        let days = this._getWeek(week)
        calendar.push({week, days})
      }
      calendar.push({
        week: 1,
        days: this._getFirstWeek()
      })

    } else {
      for (let week = startWeek; week<=endWeek; week++) {
        let days = this._getWeek(week)
        calendar.push({week, days})
      }
    }
    return calendar
  },

  /**
   * Get week of the year
   * @param  {Number} week Week of the year
   * @return {Array} [<moment-obj>] List of days in the week
  **/
  _getWeek(week) {
    return Array(7).fill(0).map((n, i) => this.selectedDate.clone().week(week).startOf('week').clone().add(n + i, 'day'))
  },


  _getFirstWeek() {
    return Array(7).fill(0).map((n, i) => this.selectedDate.clone().add(1, 'years').week(1).startOf('week').clone().add(n + i, 'day'))
  },


  nextMonth() {
    let nextMonth = this.selectedDate.clone().startOf('month').add(1, 'months')
    this.selectedDate = nextMonth
    return this.load(nextMonth.startOf('month'))
  },


  previousMonth() {
    let prevMonth = this.selectedDate.clone().startOf('month').subtract(1, 'months')
    this.selectedDate = prevMonth
    return this.load(prevMonth.startOf('month'))
  },


  nextYear() {
    let nextYearMonth = this.selectedDate.clone().startOf('year').add(1, 'years')
    this.selectedDate = nextYearMonth
    return this.load(nextYearMonth.startOf('month'))
  },



  previousYear() {
    let prevYearMonth = this.selectedDate.clone().startOf('year').subtract(1, 'years')
    this.selectedDate = prevYearMonth
    return this.load(prevYearMonth.startOf('month'))
  },



  /**
   * @param {String/Number} m - month [1-12]
  **/

  jumpToMonth(m) {
    let targetDate = moment(`${m} ${this.selectedDate.format('YYYY')}`, ['MM YYYY', 'M YYYY'])
    if (!targetDate.isValid()) {
      return false
    }
    return this.load(targetDate.startOf('month'))
  },


  /**
   * @param {String/Number} y year [YYYY]
   * @param {String/Number} m month [1-12] (default January)
  **/

  jumpToYear(y, m) {
    if (typeof(m) === 'undefined' || m === null) {
      m = 1
    }

    let targetDate = moment(`${m} ${y}`, ['MM YYYY', 'MM YY'])
    if (!targetDate.isValid()) {
      return false
    }

    return this.load(targetDate.startOf('month'))

  }

}

module.exports = calendar
