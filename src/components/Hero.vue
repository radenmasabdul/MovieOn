<script setup>
import Api from "../utils/index.js";

import { onBeforeMount, ref } from "vue";

let dataNowPlaying = ref([]);
let posterImages = ref("");
let titleMovies = ref("");
let overviewMovies = ref("");
let currentIndex = ref(0);
let intervalId = ref(null);

const getNowPlaying = async () => {
  try {
    let payload = {
      api_key: import.meta.env.VITE_TMDB_KEY,
    };
    const res = await Api.get("/now_playing", {
      params: payload,
    });
    dataNowPlaying.value = res.data.results;

    dataNowPlaying.value.forEach((item) => {
      posterImages.value = item.poster_path;
      titleMovies.value = item.title;
      overviewMovies.value = item.overview;
    });

    if (dataNowPlaying.value.length > 0) {
      posterImages.value = `https://image.tmdb.org/t/p/w500${dataNowPlaying.value[0].poster_path}`;
    }

    intervalId.value = setInterval(changePoster, 5000);
  } catch (error) {
    console.error(error);
  }
};

const changePoster = () => {
  if (dataNowPlaying.value.length > 0) {
    currentIndex.value = (currentIndex.value + 1) % dataNowPlaying.value.length;
    posterImages.value = `https://image.tmdb.org/t/p/original${dataNowPlaying.value[currentIndex.value].poster_path}`;
    titleMovies.value = dataNowPlaying.value[currentIndex.value]?.title;
    overviewMovies.value = dataNowPlaying.value[currentIndex.value]?.overview;
  }
};

onBeforeMount(() => {
  getNowPlaying();
});
</script>

<template>
  <div class="navbar headers">
    <div class="navbar-start">
      <p class="text-2xl text-white font-JakartaSans font-extrabold">Movie On!</p>
    </div>
    <div class="navbar-end">
      <button class="btn btn-neutral btn-sm">Masuk</button>
    </div>
  </div>

  <div class="hero min-h-screen" :style="{ backgroundImage: `url(${posterImages})` }">
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-md">
        <h1 class="mb-5 text-5xl font-bold text-white font-JakartaSans">{{ titleMovies }}</h1>
        <p class="mb-5 text-white font-JakartaSans font-medium">{{ overviewMovies }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.headers {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.296);
  z-index: 1000;
}
</style>
../utils/index.js
