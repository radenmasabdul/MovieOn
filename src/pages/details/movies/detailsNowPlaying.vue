<script setup>
import Navbar from "../../../components/Navbar.vue";
import Footer from "../../../components/Footer.vue";

import Api from "../../../utils";

import moment from "moment";

import { ref, onBeforeMount } from "vue";

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

    const res = await Api.get(`/${props.id}`, {
      params: payload,
    });

    dataMoviesDetails.value = res.data;

    backdropPath.value = res.data.backdrop_path;
    posterPath.value = res.data.poster_path;
    title.value = res.data.title;
    overview.value = res.data.overview;
    popularity.value = res.data.popularity;
    releaseDate.value = res.data.release_date;
    languageMovies.value = res.data.spoken_languages[0].name;
    homepage.value = res.data.homepage;
  } catch (error) {
    console.error(error);
  }
};

onBeforeMount(async () => {
  getDetailsMovies();
});

const formatDate = (value) => {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY");
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
              {{ languageMovies }}
            </span>
          </div>

          <div class="py-4">
            <a :href="homepage" target="_blank" type="button" class="btn btn-neutral btn-sm">
              <span
                ><font-awesome-icon :icon="['fas', 'play']" size="xl" style="color: #ffd43b" />
                Watch Now
              </span></a
            >
          </div>
        </div>
      </div>
    </div>
  </div>

  <Footer />
</template>

<style scoped></style>
