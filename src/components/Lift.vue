<template>
  <div
    @dblclick="$emit('toggle-complete', lift.id, lift.parentId)"
    :class="[lift.complete ? 'complete' : '', 'lift']"
  >
    <h3>
      {{ lift.text }}
      {{ lift.parentId }}
      <i
        @click="$emit('delete-lift', lift.id, lift.parentId)"
        class="fas fa-times"
        >X</i
      >
    </h3>
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
