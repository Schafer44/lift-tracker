<template>
  <!-- These if checks are a simple way to determine which user has been selected -->
  <!-- Not scalable in its current form  -->
  <div
    :class="[
      this.user === 'Tanner'
        ? 'containerTanner'
        : this.user === 'Erin'
        ? 'containerErin'
        : this.user === 'Kris'
        ? 'containerKris'
        : this.user === 'Abbie'
        ? 'containerAbbie'
        : 'containerAbbie',
    ]"
  >
    <div class="borderTanner"></div>
    <!-- These if checks are a simple way to determine which user has been selected -->
    <!-- Not scalable in its current form  -->
    <div
      :class="[
        this.user === 'Tanner'
          ? 'underlineTanner'
          : this.user === 'Erin'
          ? 'underlineErin'
          : this.user === 'Kris'
          ? 'underlineKris'
          : this.user === 'Abbie'
          ? 'underlineAbbie'
          : 'underlineAbbie',
      ]"
    >
      <!-- Passes all needed functions down to Week component -->
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

  /*
   * Function
   * used to load all needed data
   */
  setup() {
    const weekTwo = useLoadWeek();
    return { weekTwo };
  },
  methods: {
    /*
     * used to call removeLift from fb.js
     */
    async deleteLift(tempLift) {
      removeLift(tempLift);
    },
    /*
     * used to call removeDay from fb.js
     */
    async deleteDay(tempDay) {
      removeDay(tempDay);
    },

    /*
     * used to add a new day
     * 1). creates a newDay with all the needed data
     * 2). calls createDay from fb.js
     * 3). then updates Day object to include newly created day
     */
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
        newDay.baseId = documentRef.id;
        updateDay(documentRef.id, newDay);
      });
    },

    /*
     * used to add a new Lift
     * 1). creates a newLift with all the needed data
     * 2). calls createLift from fb.js
     * 3). then updates the Lifts object to include newly created Lift
     */
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

    /*
     * used to update lift's weight
     */
    async updateWeight(lift) {
      updateLiftLifts(lift.baseId, lift);
    },

    /*
     * used to update lift's complete status
     */
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

    /*
     * used to update day's complete status
     */
    async toggleCompleteDay(id, isTrue) {
      const day = await getDay(id);
      day.complete = isTrue;
      updateDay(id, day);
    },
  },

  /*
   * on change this method determines whether toggleCompleteDay needs to be called
   * if all lifts in a day are complete then toggleCompleteDay should be called
   */
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
  margin-left: 5px;
  padding-left: 0px;
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
  margin-left: 5px;
  padding-left: 0px;
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
  margin-left: 10px;
  padding-left: 0px;
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
  margin-left: 10px;
  padding-left: 0px;
}

.containerAbbie {
  position: relative;
  margin: 300px auto 0;
  background: linear-gradient(0deg, rgb(36, 36, 36), #272727);
}

.containerAbbie:before,
.containerAbbie:after {
  content: "";
  position: absolute;

  display: block;
  left: -2px;
  top: -2px;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  background: linear-gradient(45deg, #22cb2d, #0014ff);
  background-size: 400%;
  z-index: -1;

  -webkit-animation-name: steam;
  -webkit-animation-duration: 20s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
}
.containerAbbie:after {
  filter: blur(50px);
}
.containerAbbie {
  max-width: 98%;
  margin: 30px auto;
  padding: 30px;
  border-radius: 5px;
  margin-top: 100px;
  margin-left: 5px;
  padding-left: 0px;
}
.underlineAbbie:after {
  content: "\00a0";
  background-image: radial-gradient(
    at 50% 0,
    #22cb2d 0%,
    #0014ff 50%,
    transparent 75%
  );
  background-size: 100% 2px;
  background-repeat: no-repeat;
  float: left;
  width: 100%;
  margin-left: 10px;
  padding-left: 0px;
}

.containerKris {
  position: relative;
  margin: 300px auto 0;
  background: linear-gradient(0deg, rgb(36, 36, 36), #272727);
}

.containerKris:before,
.containerKris:after {
  content: "";
  position: absolute;

  display: block;
  left: -2px;
  top: -2px;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  background: linear-gradient(45deg, #c53a3a, #0014ff);
  background-size: 400%;
  z-index: -1;

  -webkit-animation-name: steam;
  -webkit-animation-duration: 20s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
}
.containerKris:after {
  filter: blur(50px);
}
.containerKris {
  max-width: 98%;
  margin: 30px auto;
  padding: 30px;
  border-radius: 5px;
  margin-top: 100px;
  margin-left: 5px;
  padding-left: 0px;
}
.underlineKris:after {
  content: "\00a0";
  background-image: radial-gradient(
    at 50% 0,
    #c53a3a 0%,
    #0014ff 50%,
    transparent 75%
  );
  background-size: 100% 2px;
  background-repeat: no-repeat;
  float: left;
  width: 100%;
  margin-left: 10px;
  padding-left: 0px;
}
</style>
