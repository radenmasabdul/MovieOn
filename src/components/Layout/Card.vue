<script setup>
import { usenowPlayingStore } from "../../utils/stores/nowPlaying";

import { onBeforeMount, computed } from "vue";

const store = usenowPlayingStore();

const dataNowPlaying = computed(() => store.getnowPlaying);

const props = defineProps({
  activeTab: String,
});

const fetchNowPlaying = async () => {
  await store.fetchNowPlaying();
};

onBeforeMount(() => {
  fetchNowPlaying();
});

const getMoviePoster = (movie) => {
  return `https://image.tmdb.org/t/p/original${movie.poster_path}`;
};
</script>

<template>
  <div v-if="activeTab === 'Movies'">
    <div class="py-2">
      <div class="mx-2">
        <button class="text-white font-JakartaSans font-bold text-2xl">Now Playing</button>
      </div>

      <div class="mx-4 card">
        <div class="carousel carousel-center w-full p-4 space-x-4 bg-transparent rounded-box wrapper">
          <div class="carousel-item" v-for="(movie, index) in dataNowPlaying" :key="index">
            <img :src="getMoviePoster(movie)" :alt="movie.title" class="rounded-box w-96 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
