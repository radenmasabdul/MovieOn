<script setup></script>

<template>
  <div class="p-16 style bg-black">
    <div class="flex flex-wrap justify-between items-center gap-4 text-center">
      <div>
        <font-awesome-icon :icon="['fas', 'film']" class="text-white text-6xl" />
        <h1 class="text-white font-JakartaSans text-lg py-2">ORIGINAL</h1>
        <p class="text-white font-JakartaSans text-sm">Watch shows movies, drama, series originals and more</p>
      </div>
      <div>
        <font-awesome-icon :icon="['fas', 'desktop']" class="text-white text-6xl" />
        <h1 class="text-white font-JakartaSans text-lg py-2">ENTERTAINMENT</h1>
        <p class="text-white font-JakartaSans text-sm">Thousand of movies, series, documentary, and more.</p>
      </div>
      <div>
        <font-awesome-icon :icon="['fas', 'users']" class="text-white text-6xl" />
        <h1 class="text-white font-JakartaSans text-lg py-2">FAVORITES</h1>
        <p class="text-white font-JakartaSans text-sm">From Hollywood movies to Korean dramas, and more.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.style {
  position: relative;
}

.style::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgb(53, 4, 157) 49%, rgba(0, 0, 0, 1) 100%);
  z-index: 1;
}
</style>
