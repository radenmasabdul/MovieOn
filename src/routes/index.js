import { createRouter, createWebHistory } from "vue-router";

import Index from "../pages/Index.vue";
import Home from "../pages/Home.vue"
import nowPlaying from "../pages/movies/nowPlaying.vue";
import popular from "../pages/movies/popular.vue";
import topRated from "../pages/movies/topRated.vue";
import upComing from "../pages/movies/upComing.vue";
import airingToday from "../pages/series/airingToday.vue";
import onTheAir from "../pages/series/onTheAir.vue";
import popularSeries from "../pages/series/popularSeries.vue";
import topRatedSeries from "../pages/series/topRatedSeries.vue";

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
        {
            path: "/airingtoday",
            name: "airingtoday",
            component: airingToday,
            meta: {
                title: "Airing Today"
            },
        },
        {
            path: "/ontheair",
            name: "ontheair",
            component: onTheAir,
            meta: {
                title: "On The Air"
            },
        },
        {
            path: "/popularseries",
            name: "popularseries",
            component: popularSeries,
            meta: {
                title: "Popular Series"
            },
        },
        {
            path: "/topratedseries",
            name: "topratedseries",
            component: topRatedSeries,
            meta: {
                title: "Top Rated Series"
            },
        },
    ]
});

export default router;