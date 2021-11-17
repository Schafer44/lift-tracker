<template>
  <div :key="day.id" v-for="day in week">
    <Day
      @toggle-complete-day="$emit('toggle-complete-day', day.id)"
      @toggle-complete="toggleComplete"
      :day="day"
      :lifts="lifts"
    />
  </div>
</template>

<script>
import { Vue } from "vue";
import Day from "./Day";
export default {
  name: "Week",
  props: {
    week: Array,
    lifts: Array,
  },
  components: {
    Day,
  },
  data() {
    return {
      bla: [],
      lift: Object,
    };
  },
  emits: ["toggle-complete", "toggle-complete-day", "toggleComplete"],
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
      this.lift = Object.assign({}, this.lift, {
        complete: data.complete,
      });
      console.log(this.lift);
      /*bla = this.lifts.map((lift) =>
        lift.id === id ? { ...lift, complete: data.complete } : lift
      );*/
    },
    async created() {
      this.lifts = await this.fetchLifts();
    },
    async fetchLift(id) {
      const res = await fetch(`api/lifts/${id}`);
      const tempData = await res.json();
      /*const res = await fetch(`api/week/${dayid}/${id}`); // this will need work
      const data = await res.json();*/
      return tempData;
    },
  },
};
</script>
