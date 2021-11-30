<template>
  <div :key="day.id" v-for="day in Week">
    <div v-if="day.user === this.user" :set="(tempDay = day.id)">
      <Day
        v-bind="$props"
        @toggle-complete-day="$emit('toggle-complete-day', day.id)"
        :day="day"
        @toggle-is-hidden="toggleIsHidden"
        @on-Submit-delete-day="onSubmitDeleteDay"
      />
      <div>
        <div v-if="!isHidden">
          <div v-if="dayNum === day.id">
            <div v-for="lift in Lifts" :key="lift">
              <div v-if="day.baseId === lift.parentId" :set="(temp = lift.id)">
                <Lift
                  @toggle-complete="$emit('toggle-complete', lift)"
                  :lift="lift"
                  @on-Submit="onSubmit"
                  @on-Submit-delete-lift="onSubmitDeleteLift"
                />
              </div>
            </div>
            <form
              @submit="
                $emit(
                  'add-lift',
                  this.user,
                  reps,
                  text,
                  day.baseId,
                  temp,
                  $event
                )
              "
            >
              <div class="form-control">
                <label>Add Lift</label>
                <label>Lift Name</label>
                <input
                  type="string"
                  v-model="text"
                  name="text"
                  placeholder=""
                />
                <label>Rep Amount</label>
                <input
                  type="string"
                  v-model="reps"
                  name="reps"
                  placeholder=""
                />
              </div>
              <input type="submit" value="Add Lift" class="submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <form @submit="$emit('add-day', this.user, tempDay, $event)">
    <div class="form-control">
      <label>Add Day</label>
    </div>
    <input type="submit" value="Add Day" class="submit" />
  </form>
</template>

<script>
import { useLoadWeek, useLoadLifts, createLift } from "@/fb";
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
    const Lifts = useLoadLifts();
    const Week = useLoadWeek();
    return { Lifts, Week };
  },
  props: {
    week: Array,
    lifts: Array,

    user: String,
    lift: Object,
    user: String,
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
    onSubmitDeleteLift(tempLift, e) {
      e.preventDefault();
      const ans = confirm("Are you sure you want to delete this?");
      if (ans === true) {
        this.$emit("delete-lift", tempLift);
      }
    },
    onSubmitDeleteDay(tempDay, e) {
      e.preventDefault();
      const ans = confirm("Are you sure you want to delete this?");
      if (ans === true) {
        this.$emit("delete-day", tempDay);
      }
    },
    confirm() {
      <Confirm />;
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
    "add-lift",
    "add-day",
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
