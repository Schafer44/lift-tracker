<template>
  <table class="table">
    <td class="firstTd">
      <div
        @dblclick="$emit('toggle-complete')"
        :class="[lift.complete ? 'complete' : '', 'lift']"
      >
        <div class="liftContainer">
          <p>
            {{ lift.text }}
          </p>
          <p>
            {{ lift.reps }}
          </p>
          <p>Last week's weight = {{ lift.weight }}</p>
          <div class="weightBtn">
            <form @submit="$emit('on-Submit', lift, weight, $event)">
              <div class="form-control">
                <label>This week's Weight</label>
                <input
                  type="number"
                  v-model="weight"
                  name="weight"
                  placeholder=""
                />
              </div>
              <input type="submit" value="Submit" class="submit" />
            </form>
          </div>
        </div>
      </div>
    </td>

    <div v-if="this.editMode === true">
      <td class="secondTd">
        <form @submit="$emit('on-Submit-delete-lift', lift, $event)">
          <button type="submit" value="Delete" class="submitDelete">X</button>
        </form>
      </td>
    </div>
  </table>
</template>

<script>
export default {
  name: "Lift",
  props: {
    lift: Object,
    weight: Number,
    editMode: Boolean,
  },
  emits: [
    "toggle-complete",
    "toggleComplete",
    "update-weight",
    "on-Submit",
    "on-Submit-delete-lift",
  ],
};
</script>

<style scope>
.table {
  table-layout: auto;
  width: 100%;
}
.firstTd {
  width: 90%;
}
.secondTd {
  width: 10%;
}
.submitDelete {
  width: 10%;
  height: 40px;
}
.liftContainer {
  padding: 10px;
  margin: 5px;
}
.lift {
  background: rgb(22, 22, 22);
  color: rgb(255, 255, 255);
  margin-bottom: 0px;
  margin-left: 40px;
  margin-right: 5px;
  padding: 0px 20px;
  cursor: pointer;
  font-size: 16px;
  padding-bottom: 30px;
}
.lift.complete {
  border-left: 5px solid #ff2525;
}
.lift h3 {
  margin-top: 5px;
  font: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-control {
  height: 100%;
  width: 100%;
  display: flex;
  padding: 5px;
}
.form-control input {
  width: 30%;
  height: 30px;
  font-size: 16px;

  margin-top: 10px;
}
.form-control label {
  font-size: 16px;
  margin-right: 5px;
}
.submit {
  width: 100%;
  margin: 0px;
  height: 30px;
}
</style>
