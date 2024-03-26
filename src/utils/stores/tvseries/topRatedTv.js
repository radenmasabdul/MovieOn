import { defineStore } from 'pinia';
import ApiTvSeries from "../../indexTv"

export const usetopRatedTvStore = defineStore('topRatedTv', {
    state: () => ({
        dataTopRatedTv: [],
        posterImages: '',
        titleMovies: '',
        overviewMovies: '',
    }),
    getters: {
        getTopRatedTv(state) {
            return state.dataTopRatedTv
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
        async fetchDataTopRatedTv() {
            try {
                let payload = {
                    api_key: import.meta.env.VITE_TMDB_KEY,
                };

                const res = await ApiTvSeries.get("/top_rated", {
                    params: payload,
                })

                this.dataTopRatedTv = res.data.results

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
