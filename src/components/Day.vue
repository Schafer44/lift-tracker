<template>
  <div
    @dblclick="$emit('toggle-complete-day', day.id)"
    :class="[day.complete ? 'complete' : '', 'day']"
  >
    <h3>
      {{ day.text }}
      <i @click="$emit('delete-day', day.id)" class="fas fa-times">X</i>
    </h3>
  </div>

  {{ log(day.id) }}
  <div :key="lift.id" v-for="lift in JSON.parse(JSON.stringify(lifts))">
    {{ log(day.id) }}
    {{ log(JSON.parse(JSON.stringify(lifts[lift.id - 1]))) }}
    <div
      v-if="day.id === JSON.parse(JSON.stringify(lifts[lift.id - 1].parentId))"
    >
      <Lift
        @toggle-complete="$emit('toggle-complete', lift.id, lift.parentId)"
        @delete-lift="$emit('delete-lift', lift.id, lift.parentId)"
        :lift="lift"
      />
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
  methods: {
    log(msg) {
      console.log(msg);
    },
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
    };
  },
  components: {
    Lift,
  },
  emits: [
    "delete-day",
    "toggle-complete",
    "toggle-complete-day",
    "delete-lift",
  ],
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
