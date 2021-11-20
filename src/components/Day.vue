<template>
  <div
    :class="[day.complete ? 'complete' : '', 'day']"
    @click="$emit('toggle-is-hidden', day.id)"
  >
    <h3>
      {{ day.text }}
    </h3>
  </div>
</template>

<script>
export default {
  name: "Day",
  props: {
    day: Object,
  },
  emits: ["toggle-complete", "toggle-complete-day", "toggle-is-hidden"],
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
