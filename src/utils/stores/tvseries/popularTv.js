import { defineStore } from 'pinia';
import ApiTvSeries from "../../indexTv"

export const usepopularTvStore = defineStore('popularTv', {
    state: () => ({
        dataPopularTv: [],
        posterImages: '',
        titleMovies: '',
        overviewMovies: '',
    }),
    getters: {
        getPopularTv(state) {
            return state.dataPopularTv
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
        async fetchDataPopularTv() {
            try {
                let payload = {
                    api_key: import.meta.env.VITE_TMDB_KEY,
                };

                const res = await ApiTvSeries.get("/popular", {
                    params: payload,
                })

                this.dataPopularTv = res.data.results

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
