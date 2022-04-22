import { createRouter, createWebHistory } from "vue-router";
import ListView from "../views/ListView.vue";
import itemView from "../views/itemView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/list",
      name: "list",
      component: ListView,
    },
    {
      path: "/list/:id",
      name: "item",
      component: itemView,
      props: true
    },
    
  ],
});

export default router;
