<template>
    <ul class="flex items-start gap-[10px] flex-wrap">
      <ProductItem
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </ul>
  </template>
  
  <script setup>
  import ProductItem from './ProductItem/ProductItem.vue';
  
  const props = defineProps(['products']);
  </script>
  