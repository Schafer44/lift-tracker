<template>
  <div :key="day.id" v-for="day in _Week">
    <Day
      v-bind="$props"
      @toggle-complete-day="$emit('toggle-complete-day', day.id)"
      :day="day"
      @toggle-is-hidden="toggleIsHidden"
    />
    <div>
      <div v-if="!isHidden">
        <div v-if="dayNum === day.id">
          <div v-for="lift in _Lifts" :key="lift">
            <div v-if="day.id === lift.parentId">
              <Lift
                @toggle-complete="$emit('toggle-complete', lift.id, lift)"
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
import { useLoadWeek, useLoadLifts } from "@/fb";
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
  setup() {
    const _Lifts = useLoadLifts();
    const _Week = useLoadWeek();
    return { _Lifts, _Week };
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
      console.log(this.isHidden);
    },
    onSubmit(tempLift, weight, e) {
      e.preventDefault();
      if (!weight) {
        alert("Please add a weight");
        return;
      }
      tempLift.weight = weight;
      const updateWeight = tempLift;
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
