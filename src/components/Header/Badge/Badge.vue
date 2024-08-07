<template>
    <div class="relative cursor-pointer" @click="onClick">
      <img src="shopping-basket.svg" class="w-[50px] h-[50px]" />
      <div
        v-if="productsCount"
        class="absolute right-0 top-0 border-[1p] bg-white rounded-[23px] p-[5px] leading-normal"
      >
        {{ productsCount }}
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps(['productsCount', 'onClick']);
  </script>
  