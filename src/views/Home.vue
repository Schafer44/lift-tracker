<template>
  <AddDay v-show="showAddDay" @add-day="addDay" />
  <!--<Week
    @toggle-complete="toggleComplete"
    @delete-day="deleteDay"
    :week="week"
  />-->
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
    async toggleComplete(id, dayid) {
      const LiftToToggle = await this.fetchLift(id);
      const updLift = { ...LiftToToggle, complete: !LiftToToggle.complete };
      const res = await fetch(`api/week/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updLift),
      });
      const data = await res.json();
      this.day = this.day.map(
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
    async fetchDay(id) {
      const res = await fetch(`api/week/${id}`);
      const data = await res.json();
      return data;
    },
    async fetchLift(id) {
      const res = await fetch(`api/week/${id}/${id}`); // this will need work
      const data = await res.json();
      return data;
    },
  },
  async created() {
    this.week = await this.fetchWeek();
  },
};
</script>
