<template>
  <div class="p-3">
    <h3 class="text-lg font-semibold mb-2">Filter by category</h3>
    <div class="flex items-center gap-2">
      <label
        v-for="(category, index) in categories"
        :key="index"
        class="flex items-center"
      >
        <input
          type="checkbox"
          :value="category"
          class="h-[20px] w-[20px]"
          v-model="selectedCategories"
        />
        <span class="ml-2">{{ category }}</span>
      </label>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const emit = defineEmits(['onChange']);
const props = defineProps(['categories']);
const selectedCategories = ref([]);

const router = useRouter();
const route = useRoute();

function updateSelectedCategoriesFromQuery() {
  const queryCategories = route.query.categories;
  if (queryCategories) {
    const arrayQueryCategories = queryCategories.split(',');
    arrayQueryCategories.forEach((category) => {
      if (props.categories.includes(category)) {
        selectedCategories.value = [...selectedCategories.value, category];
      }
    });
  }
}

function updateCategoriesQuery() {
  const updatedQuery = { ...route.query };

  if (selectedCategories.value.length) {
    updatedQuery.categories = selectedCategories.value.join(',');
  } else {
    delete updatedQuery.categories;
  }

  router.push({ query: updatedQuery });
}

onMounted(() => {
  updateSelectedCategoriesFromQuery();
  updateCategoriesQuery();
});

watch(selectedCategories, () => {
  updateCategoriesQuery();
  filterProducts();
});

function filterProducts() {
  emit('onChange', selectedCategories.value);
}
</script>
