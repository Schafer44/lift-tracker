<template>
  <div
    @dblclick="$emit('toggle-complete', lift.id)"
    :class="[lift.complete ? 'complete' : '', 'lift']"
  >
    <h3>
      {{ lift.text }}
      <i @click="$emit('delete-lift', lift.id)" class="fas fa-times"></i>
    </h3>
    <p>this is a lift</p>
  </div>
</template>

<script>
export default {
  name: "Lift",
  props: {
    lift: Object,
  },
};
</script>

<style scope>
.fas {
  color: red;
}
.lask {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
.lask.complete {
  border-left: 5px solid green;
}
.lift h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
