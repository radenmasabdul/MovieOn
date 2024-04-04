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
        currentPage: 1,
        language: 'en-US',
        isLoading: false,
        isEndOfPage: false,
        nowPopularDataFetched: false,
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
        getLanguage(state) {
            return state.language;
        },
        getIsLoading(state) {
            return state.isLoading;
        },
        getIsEndOfPage(state) {
            return state.isEndOfPage;
        },
    },
    actions: {
        async fetchDataPopular() {
            if (!this.nowPopularDataFetched) {
                try {
                    let payload = {
                        api_key: import.meta.env.VITE_TMDB_KEY,
                        page: this.currentPage,
                        language: this.language
                    };

                    const res = await Api.get("/popular", {
                        params: payload,
                    })

                    if (res.data.results.length === 0) {
                        this.isEndOfPage = true;
                    }

                    this.dataPopular = [...this.dataPopular, ...res.data.results];

                    if (res.data.results.length > 0) {
                        this.posterImages = `https://image.tmdb.org/t/p/original${res.data.results[0].poster_path}`;
                        this.titleMovies = res.data.results[0].title;
                        this.overviewMovies = res.data.results[0].overview;
                        this.popularity = res.data.results[0].popularity;
                        this.releaseDate = res.data.results[0].release_date;
                    }

                    this.nowPopularDataFetched = true;
                }
                catch (error) {
                    console.error(error)
                } finally {
                    this.isLoading = false;
                }
            }
        },
        async fetchNextPage() {
            if (this.isEndOfPage || this.isLoading) return;

            this.isLoading = true;

            this.currentPage++;

            this.nowPopularDataFetched = false;

            await this.fetchDataPopular();
        }
    },
});
