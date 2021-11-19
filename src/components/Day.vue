<template>
  <div
    :class="[day.complete ? 'complete' : '', 'day']"
    @click="$emit('toggle-is-hidden', day.id)"
  >
    <h3>
      {{ day.text }}
    </h3>
  </div>
</template>

<script>
export default {
  name: "Day",
  props: {
    day: Object,
  },
  /*mounted() {
    if (this.day.dayId <= 1) this.fetchDay(this.day.dayId);
  },
  methods: {
    async fetchDay(dayId) {
      console.log("d", dayId);
      const res = fetch(`api/${dayId}`);
      const data = await res.json();
      console.log("od", data);
      this.lift = res;
      return data;
    },
  },*/
  emits: ["toggle-complete", "toggle-complete-day", "toggle-is-hidden"],
};
</script>

<style scope>
.fas {
  color: red;
}
.day {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
.day.complete {
  border-left: 5px solid green;
}
.day h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
