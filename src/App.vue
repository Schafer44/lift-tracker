<template>
  <div class="page">
    <router-view />
  </div>
  <!--<Footer />-->
</template>

<script>
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Footer,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  background-color: rgb(36, 36, 36);
  font-family: "Poppins", sans-serif;
}
.page {
  height: 100%;
}
.btn {
  display: inline-block;
  background: #000;
  color: rgb(31, 31, 31);
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}
</style>
