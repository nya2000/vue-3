<template>
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div
        class="z-[100] relative bg-white p-6 border-[2px] rounded-lg shadow-lg"
      >
        <slot></slot>
        <button
          @click="closeModal"
          class="border-[1px] absolute top-0 right-0 px-1 py-1"
        >
          X
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps(['isOpen', 'closeModal']);
  </script>
  