import { defineStore } from 'pinia';
import ApiTvSeries from "../../indexTv"

export const useairingTodayStore = defineStore('airingToday', {
    state: () => ({
        dataAiringToday: [],
        posterImages: '',
        titleMovies: '',
        overviewMovies: '',
    }),
    getters: {
        getAiringToday(state) {
            return state.dataAiringToday
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
        async fetchDataAiringToday() {
            try {
                let payload = {
                    api_key: import.meta.env.VITE_TMDB_KEY,
                };

                const res = await ApiTvSeries.get("/airing_today", {
                    params: payload,
                })

                this.dataAiringToday = res.data.results

                if (res.data.results.length > 0) {
                    this.posterImages = `https://image.tmdb.org/t/p/original${res.data.results[0].poster_path}`;
                    this.titleMovies = res.data.results[0].original_name;
                    this.overviewMovies = res.data.results[0].overview;
                }
            }
            catch (error) {
                console.error(error)
            }
        }
    },
});
