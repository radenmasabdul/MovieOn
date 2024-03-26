import { defineStore } from 'pinia';
import ApiTvSeries from "../../indexTv"

export const useonTheAirStore = defineStore('onTheAir', {
    state: () => ({
        dataOnTheAir: [],
        posterImages: '',
        titleMovies: '',
        overviewMovies: '',
    }),
    getters: {
        getDataOnTheAir(state) {
            return state.dataOnTheAir
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
        async fetchDataOnTheAir() {
            try {
                let payload = {
                    api_key: import.meta.env.VITE_TMDB_KEY,
                };

                const res = await ApiTvSeries.get("/on_the_air", {
                    params: payload,
                })

                this.dataOnTheAir = res.data.results

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
