<template>
  <div :class="[this.user === 'Tanner' ? 'containerTanner' : 'containerErin']">
    <div
      :class="[this.user === 'Tanner' ? 'underlineTanner' : 'underlineErin']"
    >
      <Week
        v-bind="$props"
        @toggle-complete="toggleComplete"
        @update-weight="updateWeight"
        :week="week"
        :lifts="lifts"
        :lift="lift"
      />
    </div>
  </div>
</template>

<script>
import Week from "../components/Week";
import { reactive, computed, onMounted } from "vue";
import {
  useLoadLifts,
  getDay,
  updateLiftLifts,
  getLiftId,
  getLifts,
  updateDay,
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
.containerTanner {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  border-style: solid;
  border-width: 5px;
  border-image: linear-gradient(var(--angle), #ff2525, #ffe53b) 1;
  padding: 30px;
  border-radius: 5px;
  margin-top: 100px;
  animation: 5s rotate linear infinite;
}
.containerErin {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  border-style: solid;
  border-width: 5px;
  border-image: linear-gradient(var(--angle), #ff2cdf, #0014ff) 1;
  padding: 30px;
  border-radius: 5px;
  margin-top: 100px;
  animation: 5s rotate linear infinite;
}
@-webkit-keyframes rotate {
  to {
    --angle: 360deg;
  }
}
@property --angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
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
