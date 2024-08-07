import { defineStore } from 'pinia';

export const useBasketStore = defineStore('basket', {
  state: () => ({ basketProducts: [] }),

  getters: {
    totalPrice: (state) => {
      return state.basketProducts.reduce((total, item) => {
        return total + (item.product.price * item.amount || 0);
      }, 0);
    },
    totalAmount: (state) => {
      return state.basketProducts.reduce((total, item) => {
        return total + (item.amount || 0);
      }, 0);
    },
    productAmount: (state) => {
      return (product) => {
        const res = state.basketProducts.find(
          (item) => item.product.title === product.title
        );

        if (res) {
          return res.amount;
        }
      };
    },
  },

  actions: {
    addProduct(newProduct) {
      const productExistInBasket = this.basketProducts.find(
        (item) => item.product.title === newProduct.product.title
      );

      if (productExistInBasket) {
        this.basketProducts = this.basketProducts.map((item) =>
          item.product.title === newProduct.product.title
            ? { ...item, amount: (item.amount += newProduct.amount) }
            : item
        );
      } else {
        this.basketProducts = [
          ...this.basketProducts,
          { product: newProduct.product, amount: newProduct.amount },
        ];
      }
    },
    updateProductAmount(product, amount) {
      const productExistInBasket = this.basketProducts.find(
        (item) => item.product.title === product.title
      );

      if (productExistInBasket) {
        this.basketProducts = this.basketProducts.map((item) =>
          item.product.title === product.title ? { ...item, amount } : item
        );
      }
    },
    removeProduct(product) {
      this.basketProducts = this.basketProducts.filter(
        (item) => item.product.title !== product.title
      );
    },
  },
});
