<template>
  <Week
    @toggle-complete="toggleComplete"
    @update-weight="updateWeight"
    :week="week"
    :lifts="lifts"
    :lift="lift"
  />
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
    };
  },
  methods: {
    async updateWeight(lift) {
      console.log(lift.id);
      const LiftToUpdate = await this.fetchLift(lift.id);
      const updLift = { ...LiftToUpdate, weight: lift.weight };
      var res = await fetch(`api/${this.user}/${lift.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
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
        },
        body: JSON.stringify(updLift),
      });

      const data = await res.json();

      console.log(data);
      this.lifts = this.lifts.map((lift) =>
        lift.id === id ? { ...lift, complete: data.complete } : lift
      );
      var isTrue = "";
      console.log(this.lifts);
      console.log(data.parentId);
      this.lifts.forEach((tempLift) => {
        if (tempLift.parentId === data.parentId) {
          if (tempLift.complete === true && isTrue !== false) {
            isTrue = true;
            console.log("t", isTrue);
          } else {
            isTrue = false;
            console.log("f", isTrue);
          }
        }
      });
      this.toggleCompleteDay(data.parentId, isTrue);
    },
    async fetchLift(id) {
      const res = await fetch(`api/${this.user}/${id}`);
      const tempData = await res.json();
      /*const res = await fetch(`api/week/${dayid}/${id}`); // this will need work
      const data = await res.json();*/
      return tempData;
    },
    async toggleCompleteDay(id, isTrue) {
      const DayToToggle = await this.fetchDay(id);
      const updDay = { ...DayToToggle, complete: isTrue };
      const res = await fetch(`api/week/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updDay),
      });
      const data = await res.json();
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
    }
  },
};
</script>
