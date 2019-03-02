<template>
  <v-app class="app-container">
    <v-dialog v-model="isDialog" max-width="80%">
      <div class="dialog-container">
        <div class="dialog-header">
          <div class="date-title">{{date}}</div>
          <div class="dialog-controls">
            <div @click="closeDialog" class="button cancel">CANCEL</div>
            <div @click="saveEntry" class="button save">SAVE</div>
          </div>
        </div>
        <div class="dialog-entry">
          <textarea v-model="text" class="text-area" ref="textarea"></textarea>
        </div>
      </div>
    </v-dialog>
    <Navbar/>
    <Calendar @showDialog="showDialog"/>
  </v-app>
</template>

<script>
import Calendar from "./components/Calendar";
import db from "./firebase.js";
export default {
  name: "App",
  components: {
    Calendar
  },
  data() {
    return {
      isDialog: false,
      date: "",
      id: "",
      text: ""
    };
  },
  methods: {
    showDialog(yearText, month, dayIndex) {
      this.id = "";
      this.text = "";
      let dayString = String(dayIndex);
      if (dayString.length != 0) {
        this.isDialog = true;
        this.date = dayString + " " + month + " " + yearText;
      }
      db.collection("diary")
        .where("date", "==", this.date)
        .onSnapshot(docsList => {
          docsList.forEach(doc => {
            this.id = doc.id;
            this.text = doc.data().text;
          });
        });
    },
    closeDialog() {
      this.isDialog = false;
    },
    saveEntry() {
      if (this.id) {
        db.collection("diary")
          .doc(this.id)
          .set({
            text: this.text,
            date: this.date
          });
      } else {
        db.collection("diary").add({
          text: this.text,
          date: this.date
        });
      }
      this.isDialog = false;
    }
  },
  updated() {
    this.$refs.textarea.focus();
  }
};
</script>

<style>
.colours {
  color: #d2e7ff;
  color: #e3f0ff;
  color: #fffef9;
  color: #ffefd7;
  color: #fff6e9;
}

* {
  padding: 0px;
  margin: 0px;
  font-family: "Roboto";
  font-weight: 300;
}

.app-container {
  background: linear-gradient(
    0deg,
    rgba(239, 111, 170, 0.7) 0%,
    rgba(233, 198, 194, 1) 100%
  ) !important;
}
.dialog-container {
  height: 80vh;
  background: #fff6e9;
  display: flex;
  flex-direction: column;
  padding: 32px;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  height: 32px;
  margin-bottom: 64px;
}

.date-title {
  font-size: 24px;
}

.dialog-controls {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-around;
  width: 160px;
}

.button {
  display: flex;
  height: 32px;
  align-items: center;
  justify-content: center;
  width: 64px;
  cursor: pointer;
  font-weight: 300;
  font-size: 14px;
  background: #ffefd7;
  color: #ef6faa;
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}

.text-area {
  width: 80%;
  height: 400px;
  color: black;
  font-size: 24px;
  border: none;
  outline: none;
}

.cancel {
  color: #626262;
  width: 76px;
}
</style>
