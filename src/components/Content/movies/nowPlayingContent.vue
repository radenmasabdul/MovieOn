<script setup>
import { usenowPlayingStore } from "../../../utils/stores/nowPlaying";
import Loading from "../../Layout/Loading.vue";

import { ref, onBeforeMount, computed } from "vue";

const store = usenowPlayingStore();

const dataNowPlaying = computed(() => store.getnowPlaying);
const isLoading = store.getIsLoading;

const itsLoading = ref(false);

onBeforeMount(async () => {
  itsLoading.value = true;
  await store.fetchNowPlaying();
  itsLoading.value = false;
  window.addEventListener("scroll", handleScroll);
});

const getMoviePoster = (movie) => {
  return `https://image.tmdb.org/t/p/original${movie.poster_path}`;
};

const handleScroll = () => {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.body.scrollHeight;

  const remainingDistance = documentHeight - (scrollY + windowHeight);

  if (remainingDistance <= windowHeight) {
    loadNextPage();
  }
};

const loadNextPage = async () => {
  try {
    await store.fetchNextPage();
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="bg-black py-20">
    <h1 class="text-white text-2xl font-JakartaSans font-bold text-center">Now Playing List</h1>

    <div class="style py-4">
      <div class="flex flex-wrap justify-center items-center gap-4">
        <div class="card w-96 bg-base-100 shadow-xl" v-for="(movie, index) in dataNowPlaying" :key="index">
          <div v-if="itsLoading">
            <Loading />
          </div>

          <img v-else :src="getMoviePoster(movie)" :alt="movie.title" class="cursor-pointer" />
        </div>
      </div>

      <div v-if="isLoading">
        <Loading />
      </div>
    </div>
  </div>
</template>

<style scoped>
.style {
  position: relative;
}

.style::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgb(53, 4, 157) 49%, rgba(0, 0, 0, 1) 100%);
  z-index: 1;
}

@media (max-width: 640px) {
  .card {
    width: calc(50% - 2rem);
  }
}
</style>