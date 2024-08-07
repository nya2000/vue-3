<template>
    <header
      class="border-[1px] flex items-center justify-between py-2 px-4 sticky top-0 bg-black/10"
    >
      <slot name="logo"></slot>
      <Badge :productsCount="basketStore.totalAmount" :onClick="onBadgeClick" />
    </header>
  </template>
  
  <script setup>
  import { useBasketStore } from '@/store/basket';
  import Badge from './Badge/Badge.vue';
  import { storeToRefs } from 'pinia';
  
  const props = defineProps(['onBadgeClick']);
  
  const basketStore = useBasketStore();
  </script>
  