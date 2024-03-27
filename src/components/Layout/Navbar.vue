<script setup>
import Swal from "sweetalert2";
import moment from "moment";

import Api from "../../utils/index";
import router from "../../routes";

import { usepopularStore } from "../../utils/stores/popular.js";
import { ref, onBeforeMount, computed } from "vue";

const store = usepopularStore();

const dataPopular = computed(() => store.getdataPopular);
const posterImages = computed(() => store.getPosterImages);
const titleMovies = computed(() => store.getTitleMovies);
const overviewMovies = computed(() => store.getOverviewMovies);
const popularity = computed(() => store.getPopularity);
const releaseDate = computed(() => store.getReleaseDate);

let currentIndex = ref(0);
let intervalId = ref(null);

let isScrollNavbar = ref(false);
let isScrollText = ref(false);

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

const fetchPopularMovies = async () => {
  await store.fetchDataPopular();
};

onBeforeMount(async () => {
  await checkTokenValidity();
  fetchPopularMovies();
  window.addEventListener("scroll", handleScroll);

  intervalId.value = setInterval(changePoster, 5000);
});

const Logout = async () => {
  try {
    localStorage.removeItem("token_expiration_timestamp");
    localStorage.removeItem("token_expiration_human_readable");
    localStorage.removeItem("request_token");
    localStorage.removeItem("username");

    setTimeout(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Logout Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      checkTokenValidity();

      setTimeout(() => {
        router.push("/");
      }, 1500);
    });
  } catch (error) {
    console.error(error);
  }
};

const changePoster = () => {
  currentIndex.value = (currentIndex.value + 1) % dataPopular.value.length;
  store.posterImages = `https://image.tmdb.org/t/p/original${dataPopular.value[currentIndex.value].poster_path}`;
  store.titleMovies = dataPopular.value[currentIndex.value].title;
  store.overviewMovies = dataPopular.value[currentIndex.value].overview;
  store.popularity = dataPopular.value[currentIndex.value].popularity;
  store.releaseDate = dataPopular.value[currentIndex.value].release_date;
};

const handleScroll = () => {
  const heroElement = document.querySelector(".hero");
  const navbar = document.querySelector(".navbar.headers");

  if (heroElement && navbar) {
    const heroHeight = heroElement.offsetHeight;
    const scrollTop = window.scrollY;

    if (scrollTop > heroHeight) {
      isScrollNavbar.value = true;
      isScrollText.value = true;
    } else {
      isScrollNavbar.value = false;
      isScrollText.value = false;
    }
  }
};

const formatDate = (value) => {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY");
  }
};
</script>

<template>
  <div class="navbar headers" :class="{ 'navbar-white': isScrollNavbar }">
    <div class="flex-1">
      <p class="text-2xl text-white font-JakartaSans font-extrabold" :class="{ 'text-black': isScrollText }">
        Movie On!
      </p>
    </div>
    <div class="flex-none gap-2">
      <div class="form-control">
        <input
          type="text"
          class="bg-transparent border-2 border-white text-white font-JakartaSans text-sm rounded-lg input-primary input-bordered w-24 md:w-auto focus:ring-blue-700 block p-2.5"
        />
      </div>
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
        <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
          <li>
            <button class="justify-between">Profile</button>
          </li>
          <li><button>Settings</button></li>
          <li><button @click.prevent="Logout()">Logout</button></li>
        </ul>
      </div>
    </div>
  </div>

  <div class="hero min-h-screen" :style="{ backgroundImage: `url(${posterImages})` }">
    <div class="flex flex-wrap mx-4">
      <div>
        <h1 class="mb-5 text-7xl font-bold text-white font-JakartaSans">{{ titleMovies }}</h1>
        <p class="mb-5 text-lg text-white font-JakartaSans font-medium">{{ overviewMovies }}</p>
      </div>
      <div class="flex flex-wrap gap-4 justify-start">
        <span class="text-white font-JakartaSans text-base">
          <font-awesome-icon :icon="['fas', 'star']" size="xl" style="color: #ffd43b" />
          {{ popularity }}
        </span>

        <span class="text-white font-JakartaSans text-base">
          <font-awesome-icon :icon="['fas', 'calendar']" size="xl" style="color: #ffd43b" />
          {{ formatDate(releaseDate) }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.headers {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.296);
  z-index: 1000;
}

.hero {
  transition: background-image 0.5s ease-in-out;
}

.navbar-white {
  background-color: white;
  transition: background-color 0.5s linear;
}

.text-black {
  color: black;
}
</style>
