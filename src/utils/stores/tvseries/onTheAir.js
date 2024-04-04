import { defineStore } from 'pinia';
import ApiTvSeries from "../../indexTv"

export const useonTheAirStore = defineStore('onTheAir', {
    state: () => ({
        dataOnTheAir: [],
        posterImages: '',
        titleMovies: '',
        overviewMovies: '',
        currentPage: 1,
        language: 'en-US',
        isLoading: false,
        isEndOfPage: false,
        onTheAirDataFetched: false,
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
        getLanguage(state) {
            return state.language;
        },
        getIsLoading(state) {
            return state.isLoading;
        },
        getIsEndOfPage(state) {
            return state.isEndOfPage;
        }
    },
    actions: {
        async fetchDataOnTheAir() {
            if (!this.onTheAirDataFetched) {
                try {
                    let payload = {
                        api_key: import.meta.env.VITE_TMDB_KEY,
                        page: this.currentPage,
                        language: this.language
                    };

                    const res = await ApiTvSeries.get("/on_the_air", {
                        params: payload,
                    })

                    if (res.data.results.length === 0) {
                        this.isEndOfPage = true;
                    }

                    this.dataOnTheAir = [...this.dataOnTheAir, ...res.data.results];

                    if (res.data.results.length > 0) {
                        this.posterImages = `https://image.tmdb.org/t/p/original${res.data.results[0].poster_path}`;
                        this.titleMovies = res.data.results[0].title;
                        this.overviewMovies = res.data.results[0].overview;
                    }

                    this.onTheAirDataFetched = true;
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

            this.onTheAirDataFetched = false;

            await this.fetchDataOnTheAir();
        }
    },
});
