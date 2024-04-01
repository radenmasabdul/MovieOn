<script setup>
import Navbar from "../../../components/Navbar.vue";
import Footer from "../../../components/Footer.vue";

import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  title: String,
  id: String,
});

const getDataUpComing = () => {
  return JSON.parse(router.currentRoute.value.query.dataUpComing);
};

const dataUpComing = getDataUpComing();
</script>

<template>
  <Navbar />

  <div class="bg-black pt-20 pb-3">
    <div
      class="hero min-h-screen bg-base-200"
      :style="{ backgroundImage: 'url(' + 'https://image.tmdb.org/t/p/original' + dataUpComing.backdrop_path + ')' }"
    >
      <div class="hero-content flex-col lg:flex-row">
        <img
          :src="'https://image.tmdb.org/t/p/original' + dataUpComing.poster_path"
          class="w-96 rounded-lg shadow-2xl"
        />
        <div>
          <h1 class="text-5xl font-bold text-white font-JakartaSans">{{ dataUpComing.title }}</h1>
          <p class="py-6 text-white font-JakartaSans font-medium">
            {{ dataUpComing.overview }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <Footer />
</template>

<style scoped></style>
