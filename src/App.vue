<script setup>
import Api from "../src/utils/index.js";

import { usenowPlayingStore } from "./utils/stores/nowPlaying";
import { usepopularStore } from "./utils/stores/popular";
import { usetopRatedStore } from "./utils/stores/topRated";
import { useupComingStore } from "./utils/stores/upComing";

import { useairingTodayStore } from "./utils/stores/tvseries/airingToday";
import { useonTheAirStore } from "./utils/stores/tvseries/onTheAir";
import { usepopularTvStore } from "./utils/stores/tvseries/popularTv";
import { usetopRatedTvStore } from "./utils/stores/tvseries/topRatedTv";

import { ref, onBeforeMount } from "vue";

const store = usenowPlayingStore();
const storePopular = usepopularStore();
const storeTopRated = usetopRatedStore();
const storeUpComing = useupComingStore();

const storeAiringToday = useairingTodayStore();
const storeOnTheAir = useonTheAirStore();
const storeTvPopular = usepopularTvStore();
const storeTvRated = usetopRatedTvStore();

let dataToken = ref("");

const requestToken = async () => {
  try {
    const res = await Api.get(
      `${import.meta.env.VITE_REQUEST_TOKEN}/token/new?api_key=${import.meta.env.VITE_TMDB_KEY}`
    );

    const newToken = res.data.request_token;
    const expiresAtTimestamp = new Date(res.data.expires_at).getTime();
    const expiresAtHumanReadable = new Date(res.data.expires_at).toString();

    localStorage.setItem("request_token", newToken);
    localStorage.setItem("token_expiration_timestamp", expiresAtTimestamp.toString());
    localStorage.setItem("token_expiration_human_readable", expiresAtHumanReadable);

    dataToken.value = res.data.request_token;
  } catch (error) {
    console.error(error);
  }
};

const checkTokenValidity = async () => {
  const expirationTime = parseInt(localStorage.getItem("token_expiration_timestamp"));

  if (expirationTime) {
    const currentTime = new Date().getTime();
    if (currentTime > expirationTime) {
      await requestToken();
    } else {
      dataToken.value = localStorage.getItem("request_token");
    }
  } else {
    await requestToken();
  }
};

onBeforeMount(async () => {
  await checkTokenValidity();
  await store.fetchNowPlaying();
  await storePopular.fetchDataPopular();
  await storeTopRated.fetchTopRated();
  await storeUpComing.fetchUpComing();

  await storeAiringToday.fetchDataAiringToday();
  await storeOnTheAir.fetchDataOnTheAir();
  await storeTvPopular.fetchDataPopularTv();
  await storeTvRated.fetchDataTopRatedTv();
});
</script>

<template>
  <div>
    <router-view />
  </div>
</template>

<style scoped></style>
