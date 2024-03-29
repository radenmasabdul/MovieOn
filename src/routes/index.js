import { createRouter, createWebHistory } from "vue-router";

import Index from "../pages/Index.vue";
import Home from "../pages/Home.vue"

//list category movies
import nowPlaying from "../pages/movies/nowPlaying.vue";
import popular from "../pages/movies/popular.vue";
import topRated from "../pages/movies/topRated.vue";
import upComing from "../pages/movies/upComing.vue";

//list category tv series
import airingToday from "../pages/series/airingToday.vue";
import onTheAir from "../pages/series/onTheAir.vue";
import popularSeries from "../pages/series/popularSeries.vue";
import topRatedSeries from "../pages/series/topRatedSeries.vue";

//detail movies
import detailsNowPlaying from "../pages/details/movies/detailsNowPlaying.vue"
import detailsPopular from "../pages/details/movies/detailsPopular.vue"
import detailsTopRated from "../pages/details/movies/detailsTopRated.vue"
import detailsUpComing from "../pages/details/movies/detailsUpComing.vue"

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
        {
            path: "/movies/nowplaying/:title/:id",
            name: "detailsnowplaying",
            component: detailsNowPlaying,
            meta: {
                title: "Now Playing Movies"
            },
        },
        {
            path: "/movies/popular/:title/:id",
            name: "detailspopular",
            component: detailsPopular,
            meta: {
                title: "Popular Movies"
            },
        },
        {
            path: "/movies/toprated/:title/:id",
            name: "detailstoprated",
            component: detailsTopRated,
            meta: {
                title: "Top Rated Movies"
            },
        },
        {
            path: "/movies/upcoming/:title/:id",
            name: "detailsupcoming",
            component: detailsUpComing,
            meta: {
                title: "Up Coming Movies"
            },
        },
    ]
});

router.beforeEach((to, from, next) => {
    document.title = `MOVIE ON || ${to.meta.title}`;
    next();
});

export default router;