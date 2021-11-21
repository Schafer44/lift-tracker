<template>
  <div>
    <div class="form-control">
      <label>Pick a User</label>
      <router-link
        :to="{ name: 'Home', params: { user: 'Tanner' } }"
        class="link"
      >
        Tanner</router-link
      >
      <router-link
        :to="{ name: 'Home', params: { user: 'Erin' } }"
        class="link"
      >
        Erin</router-link
      >
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
<style>
.link {
  margin: 10px;
  color: white;
  text-decoration: none;
}
.link:hover {
  background: -webkit-linear-gradient(45deg, #ff2525, #ffe53b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 20px;
  margin-bottom: 0px;
}
label {
  margin: 10px;
  color: white;
}
</style>
