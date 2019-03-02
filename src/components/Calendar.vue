<template>
  <div>
    <div class="navbar">
      <div class="navbar-content">
        <div class="logo">
          <span class="logo-regular">Calendar</span>
          <span class="logo-bold">Diary</span>
        </div>
        <div class="controls">
          <div class="year">
            <div @click="updateYear(-1)" class="year-nav-button"><</div>
            <div class="year-title">{{currentYearText}}</div>
            <div @click="updateYear(1)" class="year-nav-button">></div>
          </div>
          <div class="account">
            <i class="material-icons account-icon">account_circle</i>
          </div>
        </div>
      </div>
    </div>
    <div class="calendar-container">
      <div class="months-container">
        <div v-for="(month,monthIndex) in year" :key="monthIndex" class="month-container">
          <div class="month-title">{{months[monthIndex]}}</div>
          <div v-for="(week,weekIndex) in month" :key="weekIndex" class="week-container">
            <div
              @click="emitShowDialog(monthIndex, day)"
              v-for="(day,dayIndex) in week"
              :key="dayIndex"
              class="day-container"
            >{{day}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      now: moment(),
      currentYear: "2019",
      currentYearText: "",
      year: [],
      months: moment.months()
    };
  },
  methods: {
    emitShowDialog(monthIndex, dayIndex) {
      let yearText = moment(this.currentYear).format("YYYY");
      this.$emit("showDialog", yearText, this.months[monthIndex], dayIndex);
    },
    createCalendar() {
      this.months.forEach((monthName, index) => {
        let currentMonth = moment(this.currentYear).set("month", index);
        let blankDays = currentMonth.startOf("month").format("d");
        let daysInMonth = currentMonth.daysInMonth();
        let month = [];
        let row = [];
        for (let i = 1; i <= blankDays; i++) {
          row.push("");
        }
        for (let i = 1; i <= daysInMonth; i++) {
          row.push(i);
          if (row.length % 7 == 0 || i == daysInMonth) {
            month.push(row);
            row = [];
          }
        }
        this.year.push(month);
        month = [];
      });
    },
    updateYear(count) {
      this.currentYear = moment(this.currentYear).add("year", count);
      this.currentYearText = moment(this.currentYear).format("YYYY");
      this.year = [];
      this.createCalendar();
    }
  },
  created() {
    this.currentYear = moment(this.now);
    this.updateYear(0);
  }
};
</script>

<style>
.navbar {
  width: 100%;
  height: 60px;
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  background: white;
}
.navbar-content {
  width: 88%;
  margin: 0px auto;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  font-family: "Dancing Script", cursive;
}
.logo-regular {
  font-family: "Dancing Script", cursive;
  font-weight: 400;
  font-size: 32px;
  color: #e9a7a8;
}
.logo-bold {
  font-family: "Dancing Script", cursive;
  font-weight: 700;
  font-size: 32px;
  color: #e9888a;
}
.controls {
  display: flex;
  background: white;
  justify-content: space-between;
  align-items: center;
  font-weight: 100;
}
.year {
  display: flex;
  background: white;
  font-size: 24px;
}
.year-nav-button {
  cursor: pointer;
}
.account {
  display: flex;
  align-items: center;
  margin-left: 32px;
  color: #e9bbbc;
}
.account-icon {
  font-size: 32px !important;
  cursor: pointer;
}

/* CALENDAR */

.calendar-container {
  margin-top: 60px;
  width: 88%;
  margin: 60px auto;
}
.year-title {
  margin: 0px 24px;
  background: white;
  font-weight: 100;
}
.months-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.month-container {
  margin-top: 24px;
  margin: 12px;
}
.month-title {
  display: flex;
  font-size: 18px;
  font-weight: 900;
  text-transform: uppercase;
  margin-top: 24px;
  color: #fff6e9;
}
.week-container {
  display: flex;
}
.day-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  margin: 3px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  font-weight: 300;
  font-size: 14px;
  background: #fff6e9;
  color: #ef6faa;
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}
.colours {
  color: #e9c6c2;
  color: #ef6faa;
  color: #e9a7a8;
  color: #ea4796;
}
</style>
