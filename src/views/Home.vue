<template>
  <div :class="[this.user === 'Tanner' ? 'containerTanner' : 'containerErin']">
    <div class="borderTanner"></div>
    <div
      :class="[this.user === 'Tanner' ? 'underlineTanner' : 'underlineErin']"
    >
      <Week
        v-bind="$props"
        @toggle-complete="toggleComplete"
        @update-weight="updateWeight"
        @add-lift="addLift"
        @add-day="addDay"
        @delete-lift="deleteLift"
        @delete-day="deleteDay"
        :week="week"
        :lifts="lifts"
        :lift="lift"
        :user="this.user"
      />
    </div>
  </div>
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
</template>

<script>
import Week from "../components/Week";
import { reactive, computed, onMounted } from "vue";
import {
  removeLift,
  getDay,
  updateLiftLifts,
  removeDay,
  getLifts,
  updateDay,
  createDay,
  createLift,
} from "@/fb";
import { useLoadWeek } from "@/fb";
export default {
  name: "Home",
  components: {
    Week,
  },
  data() {
    return {
      week: [],
      lifts: [],
      day: [],
      lift: {},
      weight: Number,
      user: "",
      dayComplete: Boolean,
    };
  },
  setup() {
    const weekTwo = useLoadWeek();

    console.log("week2", weekTwo);
    return { weekTwo };
  },
  methods: {
    async deleteLift(tempLift) {
      removeLift(tempLift);
    },
    async deleteDay(tempDay) {
      removeDay(tempDay);
    },

    async addDay(user, temp, event) {
      event.preventDefault();
      temp = temp + 1;
      var newDay = {
        baseId: "",
        complete: false,
        id: temp,
        text: "Day " + temp,
        user: user,
      };

      createDay(newDay).then(function (documentRef) {
        console.log(documentRef.id);
        newDay.baseId = documentRef.id;
        updateDay(documentRef.id, newDay);
      });
      console.log("addDay", newDay);
    },
    async addLift(user, reps, text, dayId, temp, event) {
      event.preventDefault();
      temp = temp + 1;
      var newLift = {
        baseId: "",
        complete: false,
        id: temp,
        parentId: dayId,
        reps: reps,
        text: text,
        user: user,
        weight: 0,
      };
      createLift(newLift).then(function (documentRef) {
        console.log("hy", documentRef.id);
        newLift.baseId = documentRef.id;
        updateLiftLifts(documentRef.id, newLift);
      });
      console.log("addLift", newLift);
    },
    async updateWeight(lift) {
      updateLiftLifts(lift.baseId, lift);
    },
    async toggleComplete(lift) {
      lift.complete = !lift.complete;
      updateLiftLifts(lift.baseId, lift);
      var isTrue = "";
      const liftTwo = await getLifts();
      liftTwo.forEach((tempLift) => {
        if (tempLift.parentId === lift.parentId) {
          if (tempLift.complete === true && isTrue !== false) {
            isTrue = true;
          } else {
            isTrue = false;
          }
        }
      });
      this.toggleCompleteDay(lift.parentId, isTrue);
    },
    async toggleCompleteDay(id, isTrue) {
      const day = await getDay(id);
      day.complete = isTrue;
      updateDay(id, day);
    },
  },
  async created() {
    this.user = this.$route.params.user;
    if (this.user === undefined) {
      this.$router.push("/");
    } else {
      console.log("lifts", this.lifts);
      this.week.forEach((day) => {
        var isTrue = "";
        this.lifts.forEach((tempLift) => {
          if (tempLift.parentId === day.id) {
            if (tempLift.complete === true && isTrue !== false) {
              isTrue = true;
            } else {
              isTrue = false;
            }
          }
        });
        this.toggleCompleteDay(day.id, isTrue);
      });
    }
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
.containerTanner {
  position: relative;
  margin: 300px auto 0;
  background: linear-gradient(0deg, rgb(36, 36, 36), #272727);
}
.containerTanner:before,
.containerTanner:after {
  content: "";
  display: block;
  position: absolute;
  left: -2px;
  top: -2px;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  background: linear-gradient(45deg, #ffe53b, #ff2525);
  background-size: 400%;
  z-index: -1;
  -webkit-animation-name: steam;
  -webkit-animation-duration: 20s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
}

@keyframes steam {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 500% 0;
  }
  100% {
    background-position: 0 0;
  }
}
.containerTanner:after {
  filter: blur(50px);
}
.containerTanner {
  max-width: 98%;
  margin: 30px auto;
  padding: 30px;
  border-radius: 5px;
  margin-top: 100px;
}

.containerErin {
  position: relative;
  margin: 300px auto 0;
  background: linear-gradient(0deg, rgb(36, 36, 36), #272727);
}

.containerErin:before,
.containerErin:after {
  content: "";
  position: absolute;

  display: block;
  left: -2px;
  top: -2px;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  background: linear-gradient(45deg, #ff2cdf, #0014ff);
  background-size: 400%;
  z-index: -1;

  -webkit-animation-name: steam;
  -webkit-animation-duration: 20s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
}
.containerErin:after {
  filter: blur(50px);
}
.containerErin {
  max-width: 98%;
  margin: 30px auto;
  padding: 30px;
  border-radius: 5px;
  margin-top: 100px;
}

.underlineTanner:after {
  content: "\00a0";
  background-image: radial-gradient(
    at 50% 0,
    #ffe53b 0%,
    #ff2525 50%,
    transparent 75%
  );
  background-size: 100% 2px;
  background-repeat: no-repeat;
  float: left;
  width: 100%;
}
.underlineErin:after {
  content: "\00a0";
  background-image: radial-gradient(
    at 50% 0,
    #ff2cdf 0%,
    #0014ff 50%,
    transparent 75%
  );
  background-size: 100% 2px;
  background-repeat: no-repeat;
  float: left;
  width: 100%;
}
</style>
