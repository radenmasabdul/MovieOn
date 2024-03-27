import { defineStore } from 'pinia';
import Api from "../index"

export const usenowPlayingStore = defineStore('nowPlaying', {
    state: () => ({
        dataNowPlaying: [],
        posterImages: '',
        titleMovies: '',
        overviewMovies: '',
        currentPage: 1,
        language: 'en-US',
        isLoading: false,
        isEndOfPage: false,
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
        async fetchNowPlaying() {
            try {
                let payload = {
                    api_key: import.meta.env.VITE_TMDB_KEY,
                    page: this.currentPage,
                    language: this.language
                };

                const res = await Api.get("/now_playing", {
                    params: payload,
                })

                if (res.data.results.length === 0) {
                    this.isEndOfPage = true;
                }

                this.dataNowPlaying = [...this.dataNowPlaying, ...res.data.results];

                if (res.data.results.length > 0) {
                    this.posterImages = `https://image.tmdb.org/t/p/original${res.data.results[0].poster_path}`;
                    this.titleMovies = res.data.results[0].title;
                    this.overviewMovies = res.data.results[0].overview;
                }
            }
            catch (error) {
                console.error(error)
            } finally {
                this.isLoading = false;
            }
        },
        async fetchNextPage() {

            if (this.isEndOfPage || this.isLoading) return;

            this.isLoading = true;

            this.currentPage++;

            await this.fetchNowPlaying();
        }
    },
});