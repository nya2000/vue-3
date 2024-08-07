<template>
    <li class="border-[1px] flex flex-col items-center">
      <img :src="product.images[0]" class="w-[100px] h-[100px]" />
      <h3>{{ product.title }}</h3>
      <span>{{ product.price }}€</span>
      <span>Rating: {{ product.rating }}</span>
      <span>Brand: {{ product.brand }}</span>
      <span>Stock: {{ product.stock }}</span>
      <div class="flex items-center gap-[10px]">
        <select @change="setProductCountToAdd">
          <option v-for="option in optionsArray" :value="option">
            {{ option }}
          </option>
        </select>
        <button @click="addProductToBasket" class="border-[1px] p-1">Add</button>
      </div>
      <button>Remove</button>
    </li>
  </template>
  
  <script setup>
  import { useBasketStore } from '@/store/basket';
  import { ref, onMounted } from 'vue';
  
  const props = defineProps(['product']);
  
  const optionsArray = ref();
  const productCountToAdd = ref();
  const basketStore = useBasketStore();
  const { addProduct } = basketStore;
  
  onMounted(() => {
    const stockArr = createStockArry(props.product.stock);
  
    optionsArray.value = stockArr;
    productCountToAdd.value = stockArr.length ? stockArr[0] : 0;
  });
  
  function createStockArry(inStockCount) {
    const productArray = [];
  
    for (let i = 1; i <= inStockCount; i++) {
      productArray.push(i);
    }
  
    return productArray || [];
  }
  
  function setProductCountToAdd(e) {
    const value = Number(e.target.value);
    productCountToAdd.value = value;
  }
  
  function addProductToBasket() {
    if (!productCountToAdd.value) return;
  
    const newProduct = {
      product: props.product,
      amount: productCountToAdd.value,
    };
  
    addProduct(newProduct);
  }
  </script>
  