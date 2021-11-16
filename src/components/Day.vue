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
  <div :key="lift.id" v-for="lift in day.day">
    <Lift
      @toggle-complete="$emit('toggle-complete', lift.id, lift.parentId)"
      @delete-lift="$emit('delete-lift', lift.id, lift.parentId)"
      :lift="lift"
    />
  </div>
</template>

<script>
import Lift from "./Lift";
export default {
  name: "Day",
  props: {
    day: Object,
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
