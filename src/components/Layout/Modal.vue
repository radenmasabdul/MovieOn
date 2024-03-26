<script setup>
import Api from "../../utils";
import Swal from "sweetalert2";
import router from "../../routes";

import { ref } from "vue";

let dataLogin = ref([]);
let userName = ref("");
let password = ref("");

let token = localStorage.getItem("request_token");

let isHidePassword = ref(true);
let isModalOpen = ref(false);

const submitLogin = async () => {
  try {
    let payload = {
      username: userName.value,
      password: password.value,
      request_token: token,
    };

    const res = await Api.post(
      `${import.meta.env.VITE_REQUEST_TOKEN}/token/validate_with_login?api_key=${import.meta.env.VITE_TMDB_KEY}`,
      payload
    );

    dataLogin.value = res.data;

    localStorage.setItem("username", userName.value);

    setTimeout(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        router.push("/home");
      }, 1500);
    });

    closeModal();
  } catch (error) {
    console.error(error);
    Swal.fire({
      position: "center",
      icon: "error",
      title: "You must provide a username and password.",
    });
  }
};

const togglePasswordVisibility = () => {
  isHidePassword.value = !isHidePassword.value;
};

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  userName.value = "";
  password.value = "";
};
</script>

<template>
  <label @click="openModal" for="my-modal-3" type="button" class="btn btn-neutral btn-sm">Login</label>

  <div v-if="isModalOpen">
    <input type="checkbox" id="my-modal-3" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <button class="absolute right-2 top-2" @click="closeModal">
          <font-awesome-icon :icon="['fas', 'circle-xmark']" size="xl" style="color: #f20202" />
        </button>

        <h1 class="text-xl font-bold leading-tight tracking-tight text-black font-JakartaSans text-center">
          Sign in to your account
        </h1>

        <div class="py-2">
          <label for="username" class="block mb-2 text-sm font-medium text-black font-JakartaSans">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="username"
            v-model="userName"
          />
        </div>

        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-black font-JakartaSans">Password</label>
          <input
            :type="isHidePassword ? 'password' : 'text'"
            name="password"
            id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="password"
            v-model="password"
          />
          <div @click="togglePasswordVisibility" class="absolute right-9 flex items-center style-eyes cursor-pointer">
            <span>
              <font-awesome-icon v-if="isHidePassword" :icon="['fas', 'eye']" size="lg" style="color: #000000" />
              <font-awesome-icon v-else :icon="['fas', 'eye-slash']" size="lg" style="color: #000000" />
            </span>
          </div>
        </div>

        <div class="py-2">
          <a
            href="https://developer.themoviedb.org/docs/getting-started"
            target="_blank"
            class="text-sm font-medium text-black font-JakartaSans"
            >Forgot password?</a
          >
        </div>

        <div>
          <button
            @click.prevent="submitLogin()"
            type="submit"
            class="w-full text-white bg-black hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Sign in
          </button>
          <p class="text-sm font-light text-black py-2 font-JakartaSans">
            Dont have an account yet?
            <a
              href="https://developer.themoviedb.org/docs/getting-started"
              class="font-medium text-black hover:underline font-JakartaSans"
              target="_blank"
              >Sign up!</a
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.style-eyes {
  top: 25px;
  bottom: 0px;
}
</style>
