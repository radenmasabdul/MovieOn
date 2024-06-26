<script setup>
import { useairingTodayStore } from "../../utils/stores/tvseries/airingToday";
import { useonTheAirStore } from "../../utils/stores/tvseries/onTheAir";
import { usepopularTvStore } from "../../utils/stores/tvseries/popularTv";
import { usetopRatedTvStore } from "../../utils/stores/tvseries/topRatedTv";

import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

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

const navigateTo = (title) => {
  if (title === "Airing Today") {
    router.push({ name: "airingtoday" });
  } else if (title === "On The Air") {
    router.push({ name: "ontheair" });
  } else if (title === "Popular") {
    router.push({ name: "popularseries" });
  } else if (title === "Top Rated") {
    router.push({ name: "topratedseries" });
  }
};
</script>

<template>
  <div v-if="activeTabTv === 'TV Series'">
    <div class="py-2" v-for="data in categoryTvSeries" :key="data.id">
      <div class="mx-2">
        <button class="text-white font-JakartaSans font-bold text-2xl" @click="navigateTo(data.title)">
          <span
            >View All
            {{ data.title }}
          </span>
        </button>
      </div>

      <div class="mx-4 card" v-if="data.title === 'Airing Today'">
        <div class="carousel carousel-center w-full p-4 space-x-4 bg-transparent rounded-box wrapper">
          <div class="carousel-item" v-for="(movie, index) in dataAiringToday" :key="index">
            <RouterLink :to="`/series/airingtoday/${encodeURIComponent(movie.original_name)}/${movie.id}`">
              <img :src="getMoviePoster(movie)" :alt="movie.original_name" class="rounded-box w-96 cursor-pointer" />
            </RouterLink>
          </div>
        </div>
      </div>

      <div class="mx-4 card" v-else-if="data.title === 'On The Air'">
        <div class="carousel carousel-center w-full p-4 space-x-4 bg-transparent rounded-box wrapper">
          <div class="carousel-item" v-for="(movie, index) in dataOnTheAir" :key="index">
            <RouterLink :to="`/series/ontheair/${encodeURIComponent(movie.original_name)}/${movie.id}`">
              <img :src="getMoviePoster(movie)" :alt="movie.original_name" class="rounded-box w-96 cursor-pointer" />
            </RouterLink>
          </div>
        </div>
      </div>

      <div class="mx-4 card" v-else-if="data.title === 'Popular'">
        <div class="carousel carousel-center w-full p-4 space-x-4 bg-transparent rounded-box wrapper">
          <div class="carousel-item" v-for="(movie, index) in dataPopularTv" :key="index">
            <RouterLink :to="`/series/popular/${encodeURIComponent(movie.original_name)}/${movie.id}`">
              <img :src="getMoviePoster(movie)" :alt="movie.original_name" class="rounded-box w-96 cursor-pointer" />
            </RouterLink>
          </div>
        </div>
      </div>

      <div class="mx-4 card" v-else-if="data.title === 'Top Rated'">
        <div class="carousel carousel-center w-full p-4 space-x-4 bg-transparent rounded-box wrapper">
          <div class="carousel-item" v-for="(movie, index) in dataTopRatedTv" :key="index">
            <RouterLink :to="`/series/toprated/${encodeURIComponent(movie.original_name)}/${movie.id}`">
              <img :src="getMoviePoster(movie)" :alt="movie.original_name" class="rounded-box w-96 cursor-pointer" />
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
