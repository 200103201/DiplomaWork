import { defineStore } from 'pinia';
import { ref } from 'vue';
import ProductsModel from '@/api/models/ProductsModel.js';

export const useProductsStore = defineStore('products', () => {
  const products = ref([]);

  async function getProducts(params) {
    const response = await ProductsModel.getProducts(params);
    products.value = response.data;
  }

  return {
    products,
    getProducts
  };
});
