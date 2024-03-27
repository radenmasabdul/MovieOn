<script setup>
import Swal from "sweetalert2";

import Api from "../utils/index";
import router from "../routes/index";

import { ref } from "vue";

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
</script>

<template>
  <div class="navbar headers bg-black">
    <div class="flex-1">
      <p class="text-2xl text-white font-JakartaSans font-extrabold">Movie On!</p>
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
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
</style>
