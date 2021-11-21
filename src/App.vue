<template>
  <Header />
  <div class="container">
    <div>
      <router-view />
    </div>
  </div>
  <Footer />
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Header,
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
.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  border-style: solid;
  border-width: 5px;
  border-image: linear-gradient(45deg, #ff2525, #ffe53b) 1;
  padding: 30px;
  border-radius: 5px;
  margin-top: 100px;
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
