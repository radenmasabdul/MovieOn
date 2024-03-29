<script setup>
import { usenowPlayingStore } from "../../utils/stores/nowPlaying";
import { usepopularStore } from "../../utils/stores/popular";
import { usetopRatedStore } from "../../utils/stores/topRated";
import { useupComingStore } from "../../utils/stores/upComing";

import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

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

const navigateTo = (title) => {
  if (title === "Now Playing") {
    router.push({ name: "nowplaying" });
  } else if (title === "Popular") {
    router.push({ name: "popular" });
  } else if (title === "Top Rated") {
    router.push({ name: "toprated" });
  } else if (title === "Upcoming") {
    router.push({ name: "upcoming" });
  }
};
</script>

<template>
  <div v-if="activeTab === 'Movies'">
    <div class="py-2" v-for="data in categoryMovies" :key="data.id">
      <div class="mx-2">
        <button class="text-white font-JakartaSans font-bold text-2xl" @click="navigateTo(data.title)">
          {{ data.title }}
        </button>
      </div>

      <div class="mx-4 card" v-if="data.title === 'Now Playing'">
        <div class="carousel carousel-center w-full p-4 space-x-4 bg-transparent rounded-box wrapper">
          <div class="carousel-item" v-for="(movie, index) in dataNowPlaying" :key="index">
            <RouterLink :to="`/movies/${encodeURIComponent(movie.title)}/${movie.id}`">
              <img :src="getMoviePoster(movie)" :alt="movie.title" class="rounded-box w-96 cursor-pointer" />
            </RouterLink>
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

      <div class="mx-4 card" v-else-if="data.title === 'Top Rated'">
        <div class="carousel carousel-center w-full p-4 space-x-4 bg-transparent rounded-box wrapper">
          <div class="carousel-item" v-for="(movie, index) in dataTopRated" :key="index">
            <img :src="getMoviePoster(movie)" :alt="movie.title" class="rounded-box w-96 cursor-pointer" />
          </div>
        </div>
      </div>

      <div class="mx-4 card" v-else-if="data.title === 'Upcoming'">
        <div class="carousel carousel-center w-full p-4 space-x-4 bg-transparent rounded-box wrapper">
          <div class="carousel-item" v-for="(movie, index) in dataUpComing" :key="index">
            <img :src="getMoviePoster(movie)" :alt="movie.title" class="rounded-box w-96 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
