<template>
  <div class="container">
    <div>
      <div class="form-control">
        <label>Pick a User</label>
        <router-link :to="{ name: 'Home', params: { user: 'Tanner' } }">
          Tanner</router-link
        >
        <router-link :to="{ name: 'Home', params: { user: 'Erin' } }">
          Erin</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import Home from "../views/Home";
export default {
  name: "GetUser",
  components: {
    Home,
  },
};
</script>
