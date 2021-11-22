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
  methods: {
    async updateWeight(lift) {
      const LiftToUpdate = await this.fetchLift(lift.id);
      const updLift = { ...LiftToUpdate, weight: lift.weight };
      var res = await fetch(`api/${this.user}/${lift.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(updLift),
      });

      const data = await res.json();
      this.lifts = this.lifts.map((liftTwo) =>
        liftTwo.id === lift.id ? { ...liftTwo, weight: data.weight } : liftTwo
      );
    },
    async toggleComplete(id) {
      const LiftToToggle = await this.fetchLift(id);
      const updLift = { ...LiftToToggle, complete: !LiftToToggle.complete };
      var res = await fetch(`api/${this.user}/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(updLift),
      });

      const data = await res.json();
      this.lifts = this.lifts.map((lift) =>
        lift.id === id ? { ...lift, complete: data.complete } : lift
      );
      var isTrue = "";
      this.lifts.forEach((tempLift) => {
        if (tempLift.parentId === data.parentId) {
          if (tempLift.complete === true && isTrue !== false) {
            isTrue = true;
          } else {
            isTrue = false;
          }
        }
      });
      this.toggleCompleteDay(data.parentId, isTrue);
    },
    async fetchLift(id) {
      const res = await fetch(`api/${this.user}/${id}`);
      const tempData = await res.json();
      return tempData;
    },
    async toggleCompleteDay(id, isTrue) {
      const DayToToggle = await this.fetchDay(id);
      const updDay = { ...DayToToggle, complete: isTrue };
      this.week = this.week.map((day) =>
        day.id === id ? { ...day, complete: isTrue } : day
      );
    },
    async fetchWeek() {
      const res = await fetch("api/week");
      const data = await res.json();
      return data;
    },
    async fetchLifts() {
      const res = await fetch(`api/${this.user}`);
      const data = await res.json();
      return data;
    },
    async fetchDay(id) {
      const res = await fetch(`api/week/${id}`);
      const data = await res.json();
      return data;
    },
  },
  async created() {
    this.user = this.$route.params.user;
    if (this.user === undefined) {
      this.$router.push("/");
    } else {
      this.week = await this.fetchWeek();
      this.lifts = await this.fetchLifts();
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
@keyframes rotate {
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
