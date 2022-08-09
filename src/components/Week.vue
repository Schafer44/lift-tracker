<template>
  <div :key="day.id" v-for="day in Week">
    <div v-if="day.user === this.user" :set="(tempDay = day.id)">
      <Day
        :editMode="editMode"
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
                  :editMode="editMode"
                  @toggle-complete="$emit('toggle-complete', lift)"
                  :lift="lift"
                  @on-Submit="onSubmit"
                  @on-Submit-delete-lift="onSubmitDeleteLift"
                />
              </div>
            </div>
            <div v-if="this.editMode === true">
              <form
                class="addLift"
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
                <table>
                  <tr class="trWek">
                    <td class="tdWek">Add Lift</td>
                  </tr>
                  <tr class="trWek">
                    <td class="tdWek">
                      Lift Name
                      <input
                        type="string"
                        v-model="text"
                        name="text"
                        placeholder=""
                      />
                    </td>
                  </tr>
                  <tr class="trWek">
                    <td class="tdWek">
                      Rep Amount
                      <input
                        type="string"
                        v-model="reps"
                        name="reps"
                        placeholder=""
                      />
                    </td>
                  </tr>
                  <input type="submit" value="Add Lift" class="submit" />
                </table>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="this.editMode === true">
    <div class="test">
      <form
        @submit="$emit('add-day', this.user, tempDay, $event)"
        class="addDay"
      >
        <div class="form-control">
          <label>Add Day</label>
        </div>
        <input type="submit" value="Add Day" class="submit" />
      </form>
    </div>
  </div>
  <button @click="allowEdit" class="addDay">Edit</button>
</template>

<script>
import reactive from "vue";
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
      editMode: false,
    };
  },

  /*
   * on setup loads Lifts and Week
   */
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
    /*
     * Toggles edit mode
     */
    allowEdit(e) {
      e.preventDefault();
      this.editMode = !this.editMode;
      console.log(this.editMode);
    },
    /*
     * Toggles isHidden
     */
    toggleIsHidden(dayId) {
      this.isHidden = !this.isHidden;
      this.dayNum = dayId;
      console.log(this.isHidden);
    },

    /*
     * Makes sure you want to a lift
     */
    onSubmitDeleteLift(tempLift, e) {
      e.preventDefault();
      const ans = confirm("Are you sure you want to delete this?");
      if (ans === true) {
        this.$emit("delete-lift", tempLift);
      }
    },
    /*
     * Makes sure you want to a day
     */
    onSubmitDeleteDay(tempDay, e) {
      e.preventDefault();
      const ans = confirm("Are you sure you want to delete this?");
      if (ans === true) {
        this.$emit("delete-day", tempDay);
      }
    },

    /*
     * Makes sure that a weight has been added to a lift before update
     */
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
.test {
  margin-right: 15px;
}
.trWek {
  width: 100%;
}
.tdWek {
  width: 10%;
  justify-content: center;
  text-align: center;
}
.addLift {
  background: rgb(22, 22, 22);
  color: rgb(255, 255, 255);
  margin-bottom: 10px;
  margin-left: 40px;
  margin-right: 5px;
  padding: 0px 20px;
  cursor: pointer;
  font-size: 16px;
  padding-bottom: 30px;
  padding-top: 30px;
}
.addDay {
  background: rgb(22, 22, 22);
  color: rgb(255, 255, 255);
  margin-bottom: 10px;
  margin-left: 7px;
  margin-right: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  padding-bottom: 10px;
  padding-top: 10px;
  width: calc(100% + 10px);
}
.form-control-add-lift {
  height: 100%;
  width: 100%;
  display: flex;
}
.form-control-add-lift input {
  height: 30px;
  margin-top: 10px;
}
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
