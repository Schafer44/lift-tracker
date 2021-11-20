import { createRouter, createWebHistory } from "vue-router";
import About from "../views/About";
import Home from "../views/Home";
import GetUser from "../views/GetUser";
const routes = [
  {
    path: "/",
    name: "GetUser",
    component: GetUser,
  },
  {
    path: "/Home",
    name: "Home",
    component: Home,
    user: "",
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;
