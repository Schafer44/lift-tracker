<template>
  <div :key="day.id" v-for="day in week">
    <Day
      v-bind="$props"
      @toggle-complete-day="$emit('toggle-complete-day', day.id)"
      :day="day"
      @toggle-is-hidden="toggleIsHidden"
    />
    <div>
      <div v-if="!isHidden">
        <div v-if="dayNum === day.id">
          <div :key="lift.id" v-for="lift in JSON.parse(JSON.stringify(lifts))">
            <div
              v-if="
                day.id ===
                JSON.parse(JSON.stringify(lifts[lift.id - 1].parentId))
              "
            >
              <Lift
                @toggle-complete="$emit('toggle-complete', lift.id)"
                :lift="lift"
                @on-Submit="onSubmit"
              />
            </div>
          </div>
        </div>
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
  data() {
    return {
      isHidden: true,
      dayNum: "",
    };
  },
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
    toggleIsHidden(dayId) {
      this.isHidden = !this.isHidden;
      this.dayNum = dayId;
    },
    onSubmit(id, weight, e) {
      e.preventDefault();
      if (!weight) {
        alert("Please add a weight");
        return;
      }
      const updateWeight = {
        /*id: Math.floor(Math.random() * 100000),*/
        id: id,
        weight: weight,
      };
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
  color: rgb(255, 255, 255);
  margin-left: -5px;
  padding: 0px 0px;
  cursor: pointer;
  font-size: 16px;
}
.lift.complete {
  border-image: linear-gradient(black, rgb(255, 255, 255), black) 1;
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
