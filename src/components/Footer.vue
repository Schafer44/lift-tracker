<template>
  <div class="nav">
    <router-link to="/" class="link">Home</router-link> |
    <router-link to="/about" class="link">About</router-link>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from "vue";
export default {
  name: "Footer",
};
</script>

<style scoped>
.nav {
  position: fixed;
  bottom: 0;
  height: 60px;
  width: 100%;
  background: rgb(22, 22, 22);
  padding: 0px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
}
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
}
</style>
