<script setup>
import Modal from "./Layout/Modal.vue";

import { usenowPlayingStore } from "../utils/stores/nowPlaying.js";

import { ref, onBeforeMount } from "vue";

const store = usenowPlayingStore();

let currentIndex = ref(0);
let intervalId = ref(null);

let isScrollNavbar = ref(false);
let isScrollText = ref(false);

const changePoster = () => {
  if (store.getnowPlaying.length > 0) {
    currentIndex.value = (currentIndex.value + 1) % store.getnowPlaying.length;
    const currentMovie = store.getnowPlaying[currentIndex.value];
    if (currentMovie && currentMovie.poster_path) {
      store.posterImages = `https://image.tmdb.org/t/p/original${currentMovie.poster_path}`;
      store.titleMovies = currentMovie.title;
      store.overviewMovies = currentMovie.overview;
    }
  }
};

const handleScroll = () => {
  const heroElement = document.querySelector(".hero");
  const navbar = document.querySelector(".navbar.headers");

  if (heroElement && navbar) {
    const heroHeight = heroElement.offsetHeight;
    const scrollTop = window.scrollY;

    if (scrollTop > heroHeight) {
      isScrollNavbar.value = true;
      isScrollText.value = true;
    } else {
      isScrollNavbar.value = false;
      isScrollText.value = false;
    }
  }
};

onBeforeMount(async () => {
  window.addEventListener("scroll", handleScroll);
  intervalId.value = setInterval(changePoster, 30000);
});
</script>

<template>
  <div class="navbar headers" :class="{ 'navbar-white': isScrollNavbar }">
    <div class="navbar-start">
      <p class="text-2xl text-white font-JakartaSans font-extrabold" :class="{ 'text-black': isScrollText }">
        Movie On!
      </p>
    </div>
    <div class="navbar-end">
      <Modal />
    </div>
  </div>

  <div class="hero min-h-screen" :style="{ backgroundImage: `url(${store.getPosterImages})` }">
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-md">
        <h1 class="mb-5 text-5xl font-bold text-white font-JakartaSans">{{ store.getTitleMovies }}</h1>
        <p class="mb-5 text-white font-JakartaSans font-medium">{{ store.getOverviewMovies }}</p>
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

.hero {
  transition: background-image 0.5s ease-in-out;
}

.navbar-white {
  background-color: white;
  transition: background-color 0.5s linear;
}

.text-black {
  color: black;
}
</style>
