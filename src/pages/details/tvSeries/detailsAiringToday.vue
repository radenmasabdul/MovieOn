<script setup>
import Footer from "../../../components/Footer.vue";
import Navbar from "../../../components/Navbar.vue";

import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  title: String,
  id: String,
});

const getDataAiringToday = () => {
  return JSON.parse(router.currentRoute.value.query.dataAiringToday);
};

const dataAiringToday = getDataAiringToday();
</script>

<template>
  <Navbar />

  <div class="bg-black pt-20 pb-3">
    <div
      class="hero min-h-screen bg-base-200"
      :style="{ backgroundImage: 'url(' + 'https://image.tmdb.org/t/p/original' + dataAiringToday.backdrop_path + ')' }"
    >
      <div class="hero-content flex-col lg:flex-row">
        <img
          :src="'https://image.tmdb.org/t/p/original' + dataAiringToday.poster_path"
          class="w-96 rounded-lg shadow-2xl"
        />
        <div>
          <h1 class="text-5xl font-bold text-white font-JakartaSans">{{ dataAiringToday.original_name }}</h1>
          <p class="py-6 text-white font-JakartaSans font-medium">
            {{ dataAiringToday.overview }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <Footer />
</template>

<style scoped></style>
