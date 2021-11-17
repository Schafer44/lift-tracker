<template>
  <div :key="day.id" v-for="day in week">
    <Day
      @toggle-complete-day="$emit('toggle-complete-day', day.id)"
      :day="day"
    />
    <div :key="lift.id" v-for="lift in JSON.parse(JSON.stringify(lifts))">
      <div
        v-if="
          day.id === JSON.parse(JSON.stringify(lifts[lift.id - 1].parentId))
        "
      >
        <Lift
          @toggle-complete="$emit('toggle-complete', lift.id)"
          :lift="lift"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Vue } from "vue";
import Day from "./Day";
import Lift from "./Lift";
export default {
  name: "Week",
  props: {
    week: Array,
    lifts: Array,
    lift: Object,
  },
  components: {
    Day,
    Lift,
  },
  emits: ["toggle-complete", "toggle-complete-day", "toggleComplete"],
};
</script>
