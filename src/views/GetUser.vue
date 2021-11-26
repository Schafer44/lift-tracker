<template>
  <div class="blank">
    <div class="container">
      <div class="underline">
        <div :class="[container ? 'complete' : '', 'day']">
          <div class="form-control">
            <router-link
              :to="{ name: 'Home', params: { user: 'Tanner' } }"
              class="form-control linkTanner"
            >
              Tanner</router-link
            >
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="underline">
        <div :class="[container ? 'complete' : '', 'day']">
          <div class="form-control">
            <router-link
              :to="{ name: 'Home', params: { user: 'Erin' } }"
              class="form-control linkErin"
            >
              Erin</router-link
            >
          </div>
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
  color: white;
  text-decoration: none;
}
.linkErin {
  color: white;
  text-decoration: none;
}
.linkTanner:hover {
  background: -webkit-linear-gradient(45deg, #ff2525, #ffe53b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.linkErin:hover {
  background: -webkit-linear-gradient(45deg, #ff2cdf, #0014ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
label {
  margin: 10px;
  color: white;
}

.container {
  position: relative;
  margin: 300px auto 0;
  background: linear-gradient(0deg, rgb(36, 36, 36), #272727);
}

.blank {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgb(36, 36, 36);
  opacity: 1;
  z-index: 0;
}
.container:before,
.container:after {
  content: "";
  position: absolute;
  left: -2px;
  top: -2px;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  background: linear-gradient(45deg, white, black);
  background-size: 400%;
  z-index: -1;
  -webkit-animation-name: steam;
  -webkit-animation-duration: 10s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
}

@keyframes steam {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.container:after {
  filter: blur(50px);
}
.container {
  max-width: 98%;
  margin: 30px auto;
  padding: 30px;
  border-radius: 5px;
  margin-top: 100px;
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
