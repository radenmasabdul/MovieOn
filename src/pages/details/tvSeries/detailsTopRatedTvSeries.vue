<script setup>
import Footer from "../../../components/Footer.vue";
import Navbar from "../../../components/Navbar.vue";

import moment from "moment";
import Swal from "sweetalert2";

import ApiTvSeries from "../../../utils/indexTv";
import { usetopRatedTvStore } from "../../../utils/stores/tvseries/topRatedTv";

import { ref, onBeforeMount, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const storeTvRated = usetopRatedTvStore();
const dataTopRatedTv = computed(() => storeTvRated.getTopRatedTv);

const props = defineProps({
  title: String,
  id: String,
});

let dataMoviesDetails = ref([]);

let backdropPath = ref("");
let posterPath = ref("");
let title = ref("");
let overview = ref("");
let popularity = ref("");
let releaseDate = ref("");
let languageMovies = ref("");
let homepage = ref("");

const getDetailsMovies = async () => {
  try {
    let payload = {
      api_key: import.meta.env.VITE_TMDB_KEY,
      language: "en-US",
    };

    const res = await ApiTvSeries.get(`/${props.id}`, {
      params: payload,
    });

    dataMoviesDetails.value = res.data;

    backdropPath.value = res.data.backdrop_path;
    posterPath.value = res.data.poster_path;
    title.value = res.data.original_name;
    overview.value = res.data.overview;
    popularity.value = res.data.popularity;
    releaseDate.value = res.data.first_air_date;
    languageMovies.value = res.data.original_language;
    homepage.value = res.data.homepage;
  } catch (error) {
    console.error(error);
  }
};

onBeforeMount(async () => {
  const movieId = router.currentRoute.value.params.id;
  await getDetailsMovies(movieId);
});

const formatDate = (value) => {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY");
  }
};

const getMoviePoster = (movie) => {
  return `https://image.tmdb.org/t/p/original${movie.poster_path}`;
};

const filteredNowPlaying = computed(() => {
  return dataTopRatedTv.value.filter((movie) => movie.id !== parseInt(props.id));
});

const selectMovie = async (movie) => {
  try {
    let payload = {
      api_key: import.meta.env.VITE_TMDB_KEY,
      language: "en-US",
    };

    const res = await ApiTvSeries.get(`/${movie.id}`, {
      params: payload,
    });

    backdropPath.value = res.data.backdrop_path;
    posterPath.value = res.data.poster_path;
    title.value = res.data.original_name;
    overview.value = res.data.overview;
    popularity.value = res.data.popularity;
    releaseDate.value = res.data.first_air_date;
    languageMovies.value = res.data.original_language;
    homepage.value = res.data.homepage;

    router.push(`/series/toprated/${encodeURIComponent(movie.title)}/${movie.id}`);
  } catch (error) {
    console.error(error);
  }
};

const redirectToHomepage = () => {
  if (homepage.value) {
    window.open(homepage.value, "_blank");
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops... Something went wrong!",
      text: "Movie URL Not Available!",
    });
  }
};
</script>

<template>
  <Navbar />

  <div class="bg-black pt-20 pb-3">
    <div
      class="hero min-h-screen bg-base-200"
      :style="{ backgroundImage: 'url(' + 'https://image.tmdb.org/t/p/original' + backdropPath + ')' }"
    >
      <div class="hero-content flex-col lg:flex-row">
        <img :src="'https://image.tmdb.org/t/p/original' + posterPath" class="w-96 rounded-lg shadow-2xl" />
        <div>
          <h1 class="text-5xl font-bold text-white font-JakartaSans">{{ title }}</h1>
          <p class="py-6 text-white font-JakartaSans font-medium">
            {{ overview }}
          </p>

          <div class="flex flex-wrap gap-4 justify-start">
            <span class="text-white font-JakartaSans text-base">
              <font-awesome-icon :icon="['fas', 'star']" size="xl" style="color: #ffd43b" />
              {{ popularity }}
            </span>

            <span class="text-white font-JakartaSans text-base">
              <font-awesome-icon :icon="['fas', 'calendar']" size="xl" style="color: #ffd43b" />
              {{ formatDate(releaseDate) }}
            </span>

            <span class="text-white font-JakartaSans text-base">
              <font-awesome-icon :icon="['fas', 'language']" size="xl" style="color: #ffd43b" />
              {{ languageMovies.toUpperCase() }}
            </span>
          </div>

          <div class="flex flex-wrap gap-4 justify-start py-4">
            <button type="button" class="btn btn-neutral btn-sm" @click="redirectToHomepage">
              <span>
                <font-awesome-icon :icon="['fas', 'play']" size="xl" style="color: #ffd43b" />
                Watch Now
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="mx-4 card">
      <div class="py-2">
        <RouterLink to="/topratedseries">
          <p class="text-white font-JakartaSans font-bold text-2xl">View All Recommendation</p>
        </RouterLink>
      </div>
      <div class="carousel carousel-center w-full p-4 space-x-4 bg-transparent rounded-box wrapper">
        <div class="carousel-item" v-for="(movie, index) in filteredNowPlaying" :key="index">
          <template v-if="movie.selected">
            <RouterLink :to="`/series/toprated/${encodeURIComponent(movie.title)}/${movie.id}`">
              <img :src="getMoviePoster(movie)" :alt="movie.title" class="rounded-box w-96 cursor-pointer" />
            </RouterLink>
          </template>
          <template v-else>
            <img
              :src="getMoviePoster(movie)"
              :alt="movie.title"
              class="rounded-box w-96 cursor-pointer"
              @click="selectMovie(movie)"
            />
          </template>
        </div>
      </div>
    </div>
  </div>

  <Footer />
</template>

<style scoped></style>
