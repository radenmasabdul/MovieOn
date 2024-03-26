import { defineStore } from 'pinia';
import Api from "../index"

export const usepopularStore = defineStore('popular', {
    state: () => ({
        dataPopular: [],
        posterImages: '',
        titleMovies: '',
        overviewMovies: '',
        popularity: '',
        releaseDate: '',
    }),
    getters: {
        getdataPopular(state) {
            return state.dataPopular
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
        getPopularity(state) {
            return state.popularity
        },
        getReleaseDate(state) {
            return state.releaseDate
        },
    },
    actions: {
        async fetchDataPopular() {
            try {
                let payload = {
                    api_key: import.meta.env.VITE_TMDB_KEY,
                };

                const res = await Api.get("/popular", {
                    params: payload,
                });

                this.dataPopular = res.data.results;

                if (res.data.results.length > 0) {
                    this.posterImages = `https://image.tmdb.org/t/p/original${res.data.results[0].poster_path}`;
                    this.titleMovies = res.data.results[0].title;
                    this.overviewMovies = res.data.results[0].overview;
                    this.popularity = res.data.results[0].popularity;
                    this.releaseDate = res.data.results[0].release_date;
                }

            } catch (error) {
                console.error(error)
            }
        }
    },
});
