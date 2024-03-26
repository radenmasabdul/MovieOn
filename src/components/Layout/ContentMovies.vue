<script setup>
import Tab from "./Tab.vue";
import Card from "./Card.vue";
</script>

<template>
  <div class="bg-black style">
    <Tab />
    <Card />
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
