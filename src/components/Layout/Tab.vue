<script setup>
import Card from "./Card.vue";
import CardTvSeries from "./CardTvSeries.vue";

import { ref, computed } from "vue";

const activeTab = ref("Movies");

const changeTab = (tabName) => {
  activeTab.value = tabName;
};

const activeTabTv = computed(() => (activeTab.value === "Movies" ? "" : "TV Series"));
</script>

<template>
  <div role="tablist" class="tabs tabs-bordered">
    <a
      role="tab"
      class="tab font-JakartaSans text-base"
      @click="changeTab('Movies')"
      :class="{
        active: activeTab === 'Movies',
        'text-blue-600': activeTab === 'Movies',
        'text-white': activeTab !== 'Movies',
      }"
      >Movies</a
    >
    <a
      role="tab"
      class="tab font-JakartaSans text-base"
      @click="changeTab('TV Series')"
      :class="{
        active: activeTab === 'TV Series',
        'text-blue-600': activeTab === 'TV Series',
        'text-white': activeTab !== 'TV Series',
      }"
      >TV Series</a
    >
  </div>

  <Card v-if="activeTab === 'Movies'" :activeTab="activeTab" />
  <CardTvSeries v-if="activeTab === 'TV Series'" :activeTabTv="activeTabTv" />
</template>

<style scoped></style>
