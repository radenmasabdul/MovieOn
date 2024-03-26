<script setup>
import Modal from "./Layout/Modal.vue";

import { usenowPlayingStore } from "../utils/stores/nowPlaying.js";

import { ref, onBeforeMount, computed } from "vue";

const store = usenowPlayingStore();

const dataNowPlaying = computed(() => store.getnowPlaying);
const posterImages = computed(() => store.getPosterImages);
const titleMovies = computed(() => store.getTitleMovies);
const overviewMovies = computed(() => store.getOverviewMovies);

let currentIndex = ref(0);
let intervalId = ref(null);

let isScrollNavbar = ref(false);
let isScrollText = ref(false);

const fetchNowPlaying = async () => {
  await store.fetchNowPlaying();
};

onBeforeMount(() => {
  fetchNowPlaying();
  window.addEventListener("scroll", handleScroll);

  intervalId.value = setInterval(changePoster, 5000);
});

const changePoster = () => {
  currentIndex.value = (currentIndex.value + 1) % dataNowPlaying.value.length;
  store.posterImages = `https://image.tmdb.org/t/p/original${dataNowPlaying.value[currentIndex.value].poster_path}`;
  store.titleMovies = dataNowPlaying.value[currentIndex.value].title;
  store.overviewMovies = dataNowPlaying.value[currentIndex.value].overview;
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
