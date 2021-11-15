<template>
  <div :key="day.id" v-for="day in week">
    <Day
      @toggle-complete="$emit('toggle-complete', day.id)"
      @delete-lift="$emit('delete-lift', day.id)"
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
