<script setup>
import { ref } from "vue";

let userName = ref("");
let password = ref("");
</script>

<template>
  <button class="btn btn-neutral btn-sm" onclick="my_modal_3.showModal()">Login</button>
  <dialog id="my_modal_3" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="absolute right-2 top-2">
          <font-awesome-icon :icon="['fas', 'circle-xmark']" size="xl" style="color: #f20202" />
        </button>

        <h1 class="text-xl font-bold leading-tight tracking-tight text-black font-JakartaSans text-center">
          Sign in to your account
        </h1>

        <div class="py-2">
          <label for="username" class="block mb-2 text-sm font-medium text-black font-JakartaSans">Username</label>
          <input
            type="email"
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
            type="password"
            name="password"
            id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="password"
            v-model="password"
          />
        </div>

        <div class="py-2">
          <button class="text-sm font-medium text-black font-JakartaSans">Forgot password?</button>
        </div>

        <div>
          <button
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
              >Sign up</a
            >
          </p>
        </div>
      </form>
    </div>
  </dialog>
</template>

<style scoped></style>
