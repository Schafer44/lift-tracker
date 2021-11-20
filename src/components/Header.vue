<template>
  <div class="nav">
    <router-link to="/">GetUser</router-link> |
    <router-link to="/about">About</router-link>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
.nav {
  position: absolute;
  top: 0;
  height: 60px;
  width: 100%;
  background: #f4f4f4;
  padding: 0px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
