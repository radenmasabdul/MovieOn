<script setup>
const props = defineProps({
  activeTab: String,
});
</script>

<template>
  <div>
    <div class="card w-96 bg-base-100 shadow-xl" v-if="activeTab === 'Movies'">
      <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
      <div class="card-body">
        <h2 class="card-title">MOVIE!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
