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
        <h3 class="weightBtn">
          <form @submit="onSubmit(lift.id, $event)" class="update-weight">
            <div class="form-control">
              <label>Weight</label>
              <input
                type="number"
                v-model="weight"
                name="weight"
                placeholder=""
              />
            </div>
            <input type="submit" value="Submit" class="submit" />
          </form>
        </h3>
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
  methods: {
    onSubmit(id, e) {
      e.preventDefault();

      console.log("a", id);
      if (!this.weight) {
        alert("Please add a weight");
        return;
      }
      const updateWeight = {
        /*id: Math.floor(Math.random() * 100000),*/
        id: id,
        weight: this.weight,
      };
      console.log("rer", updateWeight);
      this.$emit("update-weight", updateWeight);

      this.weight = "";
    },
  },
  emits: [
    "toggle-complete",
    "toggle-complete-day",
    "toggleComplete",
    "update-weight",
  ],
};
</script>

<style scope>
.weightBtn {
  background: #f4f4f4;
  margin-left: 40px;
  padding: 0px 20px;
  cursor: pointer;
  font-size: 16px;
}
.lift.complete {
  border-left: 5px solid green;
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
