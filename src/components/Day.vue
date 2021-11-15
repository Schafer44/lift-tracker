<template>
  <div
    @dblclick="$emit('toggle-complete-day', day.id)"
    :class="[day.complete ? 'complete' : '', 'day']"
  >
    <h3>
      {{ day.text }}
      <i @click="$emit('delete-day', lift.id)" class="fas fa-times"></i>
    </h3>
    <p>this is a day</p>
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
import Lift from "./Lift";
export default {
  name: "Day",
  props: {
    day: Array,
  },
  components: {
    Lift,
  },
  emits: ["delete-lift", "toggle-complete"],
};
</script>
