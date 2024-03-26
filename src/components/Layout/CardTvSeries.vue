<script setup>
import { useairingTodayStore } from "../../utils/stores/tvseries/airingToday";
import { useonTheAirStore } from "../../utils/stores/tvseries/onTheAir";
import { usepopularTvStore } from "../../utils/stores/tvseries/popularTv";
import { usetopRatedTvStore } from "../../utils/stores/tvseries/topRatedTv";

import { onBeforeMount, computed } from "vue";

const store = useairingTodayStore();
const storeOnTheAir = useonTheAirStore();
const storePopular = usepopularTvStore();
const storeTvRated = usetopRatedTvStore();

const dataAiringToday = computed(() => store.getAiringToday);
const dataOnTheAir = computed(() => storeOnTheAir.getDataOnTheAir);
const dataPopularTv = computed(() => storePopular.getPopularTv);
const dataTopRatedTv = computed(() => storeTvRated.getTopRatedTv);

const props = defineProps({
  activeTabTv: String,
});

const fetchDataTvSeries = async () => {
  await store.fetchDataAiringToday();
  await storeOnTheAir.fetchDataOnTheAir();
  await storePopular.fetchDataPopularTv();
  await storeTvRated.fetchDataTopRatedTv();
};

onBeforeMount(() => {
  fetchDataTvSeries();
});

const getMoviePoster = (movie) => {
  return `https://image.tmdb.org/t/p/original${movie.poster_path}`;
};

const categoryTvSeries = [
  {
    id: 1,
    title: "Airing Today",
  },
  {
    id: 2,
    title: "On The Air",
  },
  {
    id: 3,
    title: "Popular",
  },
  {
    id: 4,
    title: "Top Rated",
  },
];
</script>

<template>
  <div v-if="activeTabTv === 'TV Series'">
    <div class="py-2" v-for="data in categoryTvSeries" :key="data.id">
      <div class="mx-2">
        <button class="text-white font-JakartaSans font-bold text-2xl">{{ data.title }}</button>
      </div>

      <div class="mx-4 card" v-if="data.title === 'Airing Today'">
        <div class="carousel carousel-center w-full p-4 space-x-4 bg-transparent rounded-box wrapper">
          <div class="carousel-item" v-for="(movie, index) in dataAiringToday" :key="index">
            <img :src="getMoviePoster(movie)" :alt="movie.title" class="rounded-box w-96 cursor-pointer" />
          </div>
        </div>
      </div>

      <div class="mx-4 card" v-else-if="data.title === 'On The Air'">
        <div class="carousel carousel-center w-full p-4 space-x-4 bg-transparent rounded-box wrapper">
          <div class="carousel-item" v-for="(movie, index) in dataOnTheAir" :key="index">
            <img :src="getMoviePoster(movie)" :alt="movie.title" class="rounded-box w-96 cursor-pointer" />
          </div>
        </div>
      </div>

      <div class="mx-4 card" v-else-if="data.title === 'Popular'">
        <div class="carousel carousel-center w-full p-4 space-x-4 bg-transparent rounded-box wrapper">
          <div class="carousel-item" v-for="(movie, index) in dataPopularTv" :key="index">
            <img :src="getMoviePoster(movie)" :alt="movie.title" class="rounded-box w-96 cursor-pointer" />
          </div>
        </div>
      </div>

      <div class="mx-4 card" v-else-if="data.title === 'Top Rated'">
        <div class="carousel carousel-center w-full p-4 space-x-4 bg-transparent rounded-box wrapper">
          <div class="carousel-item" v-for="(movie, index) in dataTopRatedTv" :key="index">
            <img :src="getMoviePoster(movie)" :alt="movie.title" class="rounded-box w-96 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
