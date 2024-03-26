import { defineStore } from 'pinia';
import Api from "../index"

export const useupComingStore = defineStore('upComing', {
    state: () => ({
        dataUpComing: [],
        posterImages: '',
        titleMovies: '',
        overviewMovies: ''
    }),
    getters: {
        getUpComing(state) {
            return state.dataUpComing
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
        async fetchUpComing() {
            try {
                let payload = {
                    api_key: import.meta.env.VITE_TMDB_KEY,
                };

                const res = await Api.get("/upcoming", {
                    params: payload,
                })

                this.dataUpComing = res.data.results

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
