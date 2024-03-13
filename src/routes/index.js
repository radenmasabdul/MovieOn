import { createRouter, createWebHistory } from "vue-router";

import Index from "../pages/Index.vue";
import Home from "../pages/Home.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASEURL),
    routes: [
        {
            path: "/",
            name: "index",
            component: Index,
            meta: {
                title: "Welcome"
            },
        },
        {
            path: "/home",
            name: "home",
            component: Home,
            meta: {
                title: "Home"
            },
        }
    ]
});

export default router;