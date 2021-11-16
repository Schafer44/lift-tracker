<template>
  <AddDay v-show="showAddDay" @add-day="addDay" />
  <Week
    @toggle-complete-day="toggleCompleteDay"
    @delete-day="deleteDay"
    @toggle-complete="toggleComplete"
    @delete-lift="deleteLift"
    :week="week"
    :lifts="lifts"
  />
</template>

<script>
import Week from "../components/Week";
import AddLift from "../components/AddLift";
import AddDay from "../components/AddDay";
export default {
  name: "Home",
  props: {
    showAddLift: Boolean,
    showAddDay: Boolean,
  },
  components: {
    Week,
    AddLift,
    AddDay,
  },
  data() {
    return {
      week: [],
      lifts: [],
    };
  },
  methods: {
    async addDay(day) {
      const res = await fetch("api/week", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(day),
      });
      const data = await res.json();
      this.week = [...this.week, data];
    },
    async deleteDay(id) {
      if (confirm("Are you sure?")) {
        const res = await fetch(`api/week/${id}`, {
          method: "DELETE",
        });
        res.status === 200
          ? (this.week = this.week.filter((day) => day.id !== id))
          : alert("Error deleting day");
      }
    },
    async addLift(lift, dayid) {
      const res = await fetch(`api/week/${dayid}/${id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(lift),
      });
      const data = await res.json();
      this.week = [...this.week, data];
    },
    async deleteLift(id, dayid) {
      if (confirm("Are you sure?")) {
        const res = await fetch(`api/week/${dayid}/${id}`, {
          method: "DELETE",
        });
        res.status === 200
          ? (this.week.day = this.week.day.filter((lift) => lift.id !== id))
          : alert("Error deleting lift");
      }
    },
    async toggleComplete(id, parentId) {
      console.log(parentId);
      console.log(id);
      id = 1;
      parentId = 1;
      console.log(parentId);
      console.log(id);
      const LiftToToggle = await this.fetchLift(id, parentId);
      const updLift = { ...LiftToToggle, complete: !LiftToToggle.complete };
      var string = `api/week/${parentId}/`;
      var res = await fetch(string + id, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updLift),
      });
      const data = await res.json();
      this.week[parentId].day = this.week[parentId].day.map(
        (lift) => (lift.id === id ? { ...lift, complete: data.complete } : lift) // will tak more work
      );
    },
    async toggleCompleteDay(id) {
      const DayToToggle = await this.fetchDay(id);
      const updDay = { ...DayToToggle, complete: !DayToToggle.complete };
      const res = await fetch(`api/week/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updDay),
      });
      const data = await res.json();
      this.week = this.week.map((day) =>
        day.id === id ? { ...day, complete: data.complete } : day
      );
    },
    async fetchWeek() {
      const res = await fetch("api/week");
      const data = await res.json();
      return data;
    },
    async fetchLifts() {
      const res = await fetch("api/lifts");
      const data = await res.json();
      return data;
    },
    async fetchDay(id) {
      console.log(id);
      const res = await fetch(`api/week/${id}`);
      const data = await res.json();
      console.log(data);
      return data;
    },
    async fetchLift(id, dayid) {
      const res = await fetch(`api/${dayid}/${id}`);
      const tempData = await res.json();
      const currentDay = tempData.day[id];
      console.log(currentDay);
      /*const res = await fetch(`api/week/${dayid}/${id}`); // this will need work
      const data = await res.json();*/
      return currentDay;
    },
  },
  async created() {
    this.week = await this.fetchWeek();
    this.lifts = await this.fetchLifts();
  },
};
</script>
