<template>
  <div class="container">
    <div class="underline">
      <div :class="[container ? 'complete' : '', 'day']">
        <div class="form-control">
          <label>Pick a User</label>
          <router-link
            :to="{ name: 'Home', params: { user: 'Tanner' } }"
            class="linkTanner"
          >
            Tanner</router-link
          >
          <router-link
            :to="{ name: 'Home', params: { user: 'Erin' } }"
            class="linkErin"
          >
            Erin</router-link
          >
        </div>
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
  props: {
    user: String,
  },
};
</script>
<style>
.linkTanner {
  margin: 10px;
  color: white;
  text-decoration: none;
}
.linkErin {
  margin: 10px;
  color: white;
  text-decoration: none;
}
.linkTanner:hover {
  background: -webkit-linear-gradient(45deg, #ff2525, #ffe53b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 20px;
  margin-bottom: 0px;
}
.linkErin:hover {
  background: -webkit-linear-gradient(45deg, #ff2cdf, #0014ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 20px;
  margin-bottom: 0px;
}
label {
  margin: 10px;
  color: white;
}

.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  border-style: solid;
  border-width: 5px;
  border-image: linear-gradient(var(--angle), white, black) 1;
  padding: 30px;
  border-radius: 5px;
  margin-top: 100px;
  animation: 5s rotate linear infinite;
}
@keyframes rotate {
  to {
    --angle: 360deg;
  }
}
@property --angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

.underline:after {
  content: "\00a0";
  background-image: radial-gradient(
    at 50% 0,
    white 0%,
    black 50%,
    transparent 75%
  );
  background-size: 100% 2px;
  background-repeat: no-repeat;
  float: left;
  width: 100%;
}
</style>
