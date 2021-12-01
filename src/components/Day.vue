<template>
  <table class="table">
    <td class="firstTd">
      <div
        :class="[day.complete ? 'complete' : '', 'day']"
        @click="$emit('toggle-is-hidden', day.id)"
      >
        <h3>
          {{ day.text }}
        </h3>
      </div>
    </td>
    <div v-if="this.editMode === true">
      <td class="secondTd">
        <form
          @submit="$emit('on-Submit-delete-day', day, $event)"
          class="formDelete"
        >
          <button type="submit" class="submitDelete">X</button>
        </form>
      </td>
    </div>
  </table>
</template>

<script>
export default {
  name: "Day",
  props: {
    day: Object,
    dayComplete: Boolean,
    editMode: Boolean,
  },
  emits: ["toggle-complete", "toggle-complete-day", "toggle-is-hidden"],
};
</script>

<style scope>
.table {
  width: 100%;
}
.firstTd {
  width: 90%;
}
.secondTd {
  width: 10%;
}
.fas {
  color: red;
}
.formDelete {
  margin-bottom: 27.5px;
  width: 100%;
  height: 100%;
  margin-left: 10px;
}
.submitDelete {
  display: inline;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(22, 22, 22);
  color: red;
}
.day {
  background: rgb(22, 22, 22);
  color: white;
  margin: 5px;
  padding: 15px 20px;
  cursor: pointer;
  width: 100%;
  margin-top: 0px;
}
.day.complete {
  border-left: 5px solid #ff2525;
  border-image: linear-gradient(black, white, black) 1;
}
.day h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
