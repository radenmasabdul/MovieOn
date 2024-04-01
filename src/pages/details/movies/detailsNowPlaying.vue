<script setup>
import Navbar from "../../../components/Navbar.vue";
import Paralax from "../../../components/Paralax.vue";
import Footer from "../../../components/Footer.vue";

const props = defineProps({
  title: String,
  id: String,
});
</script>

<template>
  <Navbar />
  <Paralax />
  <Footer />
</template>

<style scoped></style>
