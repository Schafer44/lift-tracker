<template>
  <div :key="day.id" v-for="day in week">
    <Day
      @toggle-complete-day="$emit('toggle-complete-day', day.id)"
      @delete-day="$emit('delete-day', day.id)"
      @toggle-complete="$emit('toggle-complete', lift.id, lift.parentId)"
      @delete-lift="$emit('delete-lift', lift.id, lift.parentId)"
      :day="day"
      :lifts="lifts"
    />
  </div>
  <!--<div :key="lift.id" v-for="lift in day">
    <Lift
      @toggle-complete="$emit('toggle-complete', lift.id)"
      @delete-lift="$emit('delete-lift', lift.id)"
      :lift="lift"
    />
  </div>-->
</template>

<script>
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
      lift: [],
    };
  },
  emits: [
    "delete-lift",
    "toggle-complete",
    "toggle-complete-day",
    "delete-day",
  ],
};
</script>
