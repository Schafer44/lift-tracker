<template>
  <div
    @dblclick="$emit('toggle-complete', lift.id)"
    :class="[lift.complete ? 'complete' : '', 'lift']"
  >
    <h3>
      {{ lift.text }}
    </h3>
  </div>
</template>

<script>
export default {
  name: "Lift",
  props: {
    lift: Object,
  },
  emits: ["toggle-complete", "toggleComplete"],
};
</script>

<style scope>
.lift {
  background: #f4f4f4;
  margin: 5px;
  margin-left: 40px;
  padding: 10px 20px;
  cursor: pointer;
}
.lift.complete {
  border-left: 5px solid green;
}
.lift h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
