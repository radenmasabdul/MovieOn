import { createRouter, createWebHistory } from "vue-router";

import Index from "../pages/Index.vue";
import Home from "../pages/Home.vue"
import nowPlaying from "../pages/movies/nowPlaying.vue";
import popular from "../pages/movies/popular.vue";
import topRated from "../pages/movies/topRated.vue";
import upComing from "../pages/movies/upComing.vue";

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
        },
        {
            path: "/nowplaying",
            name: "nowplaying",
            component: nowPlaying,
            meta: {
                title: "Now Playing"
            },
        },
        {
            path: "/popular",
            name: "popular",
            component: popular,
            meta: {
                title: "Popular"
            },
        },
        {
            path: "/toprated",
            name: "toprated",
            component: topRated,
            meta: {
                title: "Top Rated"
            },
        },
        {
            path: "/upcoming",
            name: "upcoming",
            component: upComing,
            meta: {
                title: "Up Coming"
            },
        },
    ]
});

export default router;