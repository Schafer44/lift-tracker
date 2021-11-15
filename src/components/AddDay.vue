<template>
  <p></p>
  <form @submit="onSubmit" class="add-form">
    <div class="form-control">
      <label>Day</label>
      <input type="text" v-model="text" name="text" placeholder="Add Day" />
    </div>
    <input type="submit" value="Save Day" class="btn btn-block" />
  </form>
</template>

<script>
export default {
  name: "AddDay",
  data() {
    return {
      text: "",
      complete: false,
      day: [],
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      if (!this.text) {
        alert("Please add a name");
        return;
      }
      const newDay = {
        /*id: Math.floor(Math.random() * 100000),*/
        text: this.text,
        complete: this.complete,
        day: this.day,
      };
      this.$emit("add-day", newDay);

      this.text = "";
      this.complete = false;
      this.day = [];
    },
  },
};
</script>

<style scoped>
.add-form {
  margin-bottom: 40px;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-control-check label {
  flex: 1;
}
.form-control-check input {
  flex: 2;
  height: 20px;
}
</style>
