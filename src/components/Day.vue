<template>
  <div
    @dblclick="$emit('toggle-complete-day', day.id)"
    :class="[day.complete ? 'complete' : '', 'day']"
  >
    <h3>
      {{ day.text }}
    </h3>
  </div>
  <div :key="lift.id" v-for="lift in JSON.parse(JSON.stringify(lifts))">
    <div
      v-if="day.id === JSON.parse(JSON.stringify(lifts[lift.id - 1].parentId))"
    >
      <Lift @toggle-complete="$emit('toggle-complete', lift.id)" :lift="lift" />
    </div>
  </div>
</template>

<script>
import Lift from "./Lift";
export default {
  name: "Day",
  props: {
    day: Object,
    lifts: Array,
  },
  /*mounted() {
    if (this.day.dayId <= 1) this.fetchDay(this.day.dayId);
  },
  methods: {
    async fetchDay(dayId) {
      console.log("d", dayId);
      const res = fetch(`api/${dayId}`);
      const data = await res.json();
      console.log("od", data);
      this.lift = res;
      return data;
    },
  },*/
  data() {
    return {
      lift: [],
      lift: Object,
    };
  },
  components: {
    Lift,
  },
  emits: ["toggle-complete", "toggle-complete-day"],
};
</script>

<style scope>
.fas {
  color: red;
}
.day {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
.day.complete {
  border-left: 5px solid green;
}
.day h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
