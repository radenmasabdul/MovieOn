<script setup>
import { usenowPlayingStore } from "../../utils/stores/nowPlaying";

import { onBeforeMount, computed } from "vue";

const dataNowPlaying = computed(() => store.getnowPlaying);

const store = usenowPlayingStore();

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
        <h1 class="text-white font-JakartaSans font-bold text-2xl">Now Playing</h1>
      </div>

      <div class="flex flex-wrap justify-center items-center gap-4 py-2">
        <div v-for="(movie, index) in dataNowPlaying" :key="index" class="card w-96 bg-base-100 shadow-xl">
          <div class="card-body">
            <figure class="img"><img :src="getMoviePoster(movie)" :alt="movie.title" /></figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-body {
  padding: 2%;
}
.img {
  border-radius: 1%;
}
</style>
