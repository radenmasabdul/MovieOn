import { defineStore } from 'pinia';
import Api from "../index"

export const usenowPlayingStore = defineStore('nowPlaying', {
    state: () => ({
        dataNowPlaying: [],
        posterImages: '',
        titleMovies: '',
        overviewMovies: ''
    }),
    getters: {
        getnowPlaying(state) {
            return state.dataNowPlaying
        },
        getPosterImages(state) {
            return state.posterImages
        },
        getTitleMovies(state) {
            return state.titleMovies
        },
        getOverviewMovies(state) {
            return state.overviewMovies
        },
    },
    actions: {
        async fetchNowPlaying() {
            try {
                let payload = {
                    api_key: import.meta.env.VITE_TMDB_KEY,
                };

                const res = await Api.get("/now_playing", {
                    params: payload,
                })

                this.dataNowPlaying = res.data.results

                if (res.data.results.length > 0) {
                    this.posterImages = `https://image.tmdb.org/t/p/original${res.data.results[0].poster_path}`;
                    this.titleMovies = res.data.results[0].title;
                    this.overviewMovies = res.data.results[0].overview;
                }
            }
            catch (error) {
                console.error(error)
            }
        }
    },
});