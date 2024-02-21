<script setup>
const breakPointNavbarStyle = "bg-base-100 p-2 sm:p-2 md:p-4 lg:p-4 xl:p-5 2xl:p-7";
const breakPointSelectStyle =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1";
</script>

<template>
  <div :class="breakPointNavbarStyle">
    <div class="flex justify-between items-center">
      <div>
        <p class="text-2xl">Movie On!</p>
      </div>

      <div class="flex items-center gap-2">
        <select :class="breakPointSelectStyle">
          <option disabled selected>Select language</option>
          <option>Bahasa Indonesia</option>
          <option>English</option>
        </select>
        <button class="btn btn-neutral btn-sm">Masuk</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
