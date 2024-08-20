<template>
  <div>
    <Header :onBadgeClick="onBadgeClick">
      <template v-slot:logo
        ><a href="/"><img src="logo.svg" class="w-[50px] h-[50px]" /></a
      ></template>
    </Header>

    <CategoryFilter
      v-if="productsCategories"
      :categories="productsCategories"
      @onChange="filterProducts"
    />
    <ProductList :products="filteredProducts || mockProducts" />

    <Modal :isOpen="isOpenModal" :closeModal="closeModal">
      <template #default>
        <ul class="flex items-start gap-[10px] flex-wrap">
          <BasketProductItem
            v-for="item in basketProducts"
            :key="item.product.id"
            :product="item.product"
          />
        </ul>
        <span v-if="basketStore.totalAmount"
          >Total Price: {{ basketStore.totalPrice.toFixed(2) }}</span
        >
        <span v-else>Basket is empty</span>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import CategoryFilter from './components/CategoryFilter.vue';
import Header from './components/Header/Header.vue';
import Modal from './components/Modal/Modal.vue';
import BasketProductItem from './components/ProductList/ProductItem/BasketProductItem.vue';
import ProductList from './components/ProductList/ProductList.vue';
import { useBasketStore } from './store/basket';

const mockProducts = ref([]);
const productsCategories = ref(null);
const filteredProducts = ref(null);

const isOpenModal = ref(false);

const basketStore = useBasketStore();

const { basketProducts } = storeToRefs(basketStore);

onMounted(() => {
  fetchProducts();
});

watch(mockProducts, (newVal) => {
  if (newVal) {
    productsCategories.value = getProductsCategories(newVal);
  }
});

function filterProducts(selectedFilters) {
  const emptyFilterOptions = !selectedFilters.length;
  if (emptyFilterOptions) {
    filteredProducts.value = null;
  } else {
    const filtered = mockProducts.value.filter((product) =>
      selectedFilters.includes(product.category)
    );
    filteredProducts.value = filtered;
  }
}

function getProductsCategories(products) {
  const productsCategories = products.map((product) => product.category);
  const uniqueCategories = [...new Set(productsCategories)];
  return uniqueCategories;
}

async function fetchProducts() {
  const mockApi = 'https://dummyjson.com/products?limit=50';

  const res = await fetch(mockApi);
  const data = await res.json();

  mockProducts.value = data.products;
}

function onBadgeClick() {
  isOpenModal.value = true;
}

function closeModal() {
  isOpenModal.value = false;
}
</script>
