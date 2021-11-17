<template>
  <Week
    @toggle-complete-day="toggleCompleteDay"
    @toggle-complete="toggleComplete"
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
    };
  },
  methods: {
    async toggleComplete(id) {
      const LiftToToggle = await this.fetchLift(id);
      const updLift = { ...LiftToToggle, complete: !LiftToToggle.complete };
      var res = await fetch(`api/lifts/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updLift),
      });

      const data = await res.json();
      this.lifts = this.lifts.map((lift) =>
        lift.id === id ? { ...lift, complete: data.complete } : lift
      );
      /*bla = this.lifts.map((lift) =>
        lift.id === id ? { ...lift, complete: data.complete } : lift
      );*/
    },
    async fetchLift(id) {
      const res = await fetch(`api/lifts/${id}`);
      const tempData = await res.json();
      /*const res = await fetch(`api/week/${dayid}/${id}`); // this will need work
      const data = await res.json();*/
      return tempData;
    },
    async toggleCompleteDay(id) {
      const DayToToggle = await this.fetchDay(id);
      const updDay = { ...DayToToggle, complete: !DayToToggle.complete };
      const res = await fetch(`api/week/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updDay),
      });
      const data = await res.json();
      this.week = this.week.map((day) =>
        day.id === id ? { ...day, complete: data.complete } : day
      );
    },
    async fetchWeek() {
      const res = await fetch("api/week");
      const data = await res.json();
      return data;
    },
    async fetchLifts() {
      const res = await fetch("api/lifts");
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
    this.week = await this.fetchWeek();
    this.lifts = await this.fetchLifts();
  },
};
</script>
