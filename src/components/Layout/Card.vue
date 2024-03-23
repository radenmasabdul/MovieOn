<script setup>
import { usenowPlayingStore } from "../../utils/stores/nowPlaying";
import { usepopularStore } from "../../utils/stores/popular";

import { onBeforeMount, computed } from "vue";

const store = usenowPlayingStore();
const storePopular = usepopularStore();

const dataNowPlaying = computed(() => store.getnowPlaying);
const dataPopular = computed(() => storePopular.getdataPopular);

const props = defineProps({
  activeTab: String,
});

const fetchDataMovies = async () => {
  await store.fetchNowPlaying();
  await storePopular.fetchDataPopular();
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
            <img :src="getMoviePoster(movie)" :alt="movie.title" class="rounded-box w-96 cursor-pointer" />
          </div>
        </div>
      </div>

      <div class="mx-4 card" v-else-if="data.title === 'Popular'">
        <div class="carousel carousel-center w-full p-4 space-x-4 bg-transparent rounded-box wrapper">
          <div class="carousel-item" v-for="(movie, index) in dataPopular" :key="index">
            <img :src="getMoviePoster(movie)" :alt="movie.title" class="rounded-box w-96 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
