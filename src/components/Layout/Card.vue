<script setup>
import { usenowPlayingStore } from "../../utils/stores/nowPlaying";
import { usepopularStore } from "../../utils/stores/popular";
import { usetopRatedStore } from "../../utils/stores/topRated";
import { useupComingStore } from "../../utils/stores/upComing";

import { ref, onBeforeMount, computed } from "vue";

import Loading from "../Layout/Loading.vue";

const store = usenowPlayingStore();
const storePopular = usepopularStore();
const storeTopRated = usetopRatedStore();
const storeUpComing = useupComingStore();

const dataNowPlaying = computed(() => store.getnowPlaying);
const dataPopular = computed(() => storePopular.getdataPopular);
const dataTopRated = computed(() => storeTopRated.getTopRated);
const dataUpComing = computed(() => storeUpComing.getUpComing);

const props = defineProps({
  activeTab: String,
});

const isLoading = ref(true);

const fetchDataMovies = async () => {
  isLoading.value = true;
  await store.fetchNowPlaying();
  await storePopular.fetchDataPopular();
  await storeTopRated.fetchTopRated();
  await storeUpComing.fetchUpComing();
  isLoading.value = false;
};

onBeforeMount(() => {
  fetchDataMovies();
});

const getMoviePoster = (movie) => {
  return `https://image.tmdb.org/t/p/original${movie.poster_path}`;
};

const categoryMovies = [
  {
    id: 1,
    title: "Now Playing",
  },
  {
    id: 2,
    title: "Popular",
  },
  {
    id: 3,
    title: "Top Rated",
  },
  {
    id: 4,
    title: "Upcoming",
  },
];
</script>

<template>
  <div v-if="activeTab === 'Movies'">
    <div class="py-2" v-for="data in categoryMovies" :key="data.id">
      <div class="mx-2">
        <button class="text-white font-JakartaSans font-bold text-2xl">{{ data.title }}</button>
      </div>

      <div class="mx-4 card" v-if="data.title === 'Now Playing'">
        <div class="carousel carousel-center w-full p-4 space-x-4 bg-transparent rounded-box wrapper">
          <div class="carousel-item" v-for="(movie, index) in dataNowPlaying" :key="index">
            <div v-if="isLoading">
              <Loading />
            </div>

            <img v-else :src="getMoviePoster(movie)" :alt="movie.title" class="rounded-box w-96 cursor-pointer" />
          </div>
        </div>
      </div>

      <div class="mx-4 card" v-else-if="data.title === 'Popular'">
        <div class="carousel carousel-center w-full p-4 space-x-4 bg-transparent rounded-box wrapper">
          <div class="carousel-item" v-for="(movie, index) in dataPopular" :key="index">
            <div v-if="isLoading">
              <Loading />
            </div>

            <img v-else :src="getMoviePoster(movie)" :alt="movie.title" class="rounded-box w-96 cursor-pointer" />
          </div>
        </div>
      </div>

      <div class="mx-4 card" v-else-if="data.title === 'Top Rated'">
        <div class="carousel carousel-center w-full p-4 space-x-4 bg-transparent rounded-box wrapper">
          <div class="carousel-item" v-for="(movie, index) in dataTopRated" :key="index">
            <div v-if="isLoading">
              <Loading />
            </div>

            <img v-else :src="getMoviePoster(movie)" :alt="movie.title" class="rounded-box w-96 cursor-pointer" />
          </div>
        </div>
      </div>

      <div class="mx-4 card" v-else-if="data.title === 'Upcoming'">
        <div class="carousel carousel-center w-full p-4 space-x-4 bg-transparent rounded-box wrapper">
          <div class="carousel-item" v-for="(movie, index) in dataUpComing" :key="index">
            <div v-if="isLoading">
              <Loading />
            </div>

            <img v-else :src="getMoviePoster(movie)" :alt="movie.title" class="rounded-box w-96 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loader {
  width: 40px;
  aspect-ratio: 1;
  --c: linear-gradient(#000 0 0);
  --r1: radial-gradient(farthest-side at bottom, #000 93%, #0000);
  --r2: radial-gradient(farthest-side at top, #000 93%, #0000);
  background: var(--c), var(--r1), var(--r2), var(--c), var(--r1), var(--r2), var(--c), var(--r1), var(--r2);
  background-repeat: no-repeat;
  animation: l1 1s infinite alternate;
}
@keyframes l1 {
  0%,
  10% {
    background-size: 8px 0, 8px 4px, 8px 4px;
    background-position: 0 50%, 0 calc(50% - 2px), 0 calc(50% + 2px), 50% 50%, 50% calc(50% - 2px), 50% calc(50% + 2px),
      100% 50%, 100% calc(50% - 2px), 100% calc(50% + 2px);
  }
  90%,
  100% {
    background-size: 8px 100%, 8px 4px, 8px 4px;
    background-position: 0 50%, 0 -2px, 0 calc(100% + 2px), 50% 50%, 50% -2px, 50% calc(100% + 2px), 100% 50%, 100% -2px,
      100% calc(100% + 2px);
  }
}
</style>
