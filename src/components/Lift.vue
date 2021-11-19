<template>
  <div
    @dblclick="$emit('toggle-complete', lift.id)"
    :class="[lift.complete ? 'complete' : '', 'lift']"
  >
    <h3>
      {{ lift.text }}
    </h3>
    <h3>
      {{ lift.reps }}
    </h3>
    <h3>Last week's weight = {{ lift.weight }}</h3>
    <h3 class="weightBtn">
      <form @submit="$emit('on-Submit', lift.id, weight, $event)">
        <div class="form-control">
          <label>This week's Weight</label>
          <input type="number" v-model="weight" name="weight" placeholder="" />
        </div>
        <input type="submit" value="Submit" class="submit" />
      </form>
    </h3>
  </div>
</template>

<script>
export default {
  name: "Lift",
  props: {
    lift: Object,
    weight: Number,
  },
  emits: ["toggle-complete", "toggleComplete", "update-weight"],
};
</script>

<style scope>
.lift {
  background: #f4f4f4;
  margin-bottom: 0px;
  margin-left: 40px;
  padding: 0px 20px;
  cursor: pointer;
  font-size: 16px;
}
.lift.complete {
  border-left: 5px solid green;
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
}
.form-control input {
  width: 30%;
  height: 30px;
  font-size: 16px;
}
.form-control label {
  font-size: 16px;
  margin-right: 10px;
}
.submit {
  width: 100%;
  margin: 0px;
  height: 30px;
}
</style>
