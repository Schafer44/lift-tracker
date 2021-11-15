<template>
  <div :key="day.id" v-for="day in week">
    <Day
      @toggle-complete="$emit('toggle-complete-day', lift.id, day.id)"
      @delete-lift="$emit('delete-lift-day', lift.id, day.id)"
      :day="day"
    />
  </div>
  <div :key="lift.id" v-for="lift in day">
    <Lift
      @toggle-complete="$emit('toggle-complete', lift.id)"
      @delete-lift="$emit('delete-lift', lift.id)"
      :lift="lift"
    />
  </div>
</template>

<script>
import Day from "./Day";
export default {
  name: "Week",
  props: {
    week: Array,
  },
  components: {
    Day,
  },
  emits: [
    "delete-lift",
    "toggle-complete",
    "toggle-complete-day",
    "delete-day",
  ],
};
</script>
