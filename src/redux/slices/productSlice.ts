// src/redux/slices/productSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

interface ProductState {
  items: Product[];
}

const initialState: ProductState = {
  items: [
    {
      id: 1,
      title: "Camiseta Estilosa",
      description: "Camiseta 100% algodão, super confortável.",
      price: 79.9,
      image: "/images/camiseta.jpg",
    },
    {
      id: 2,
      title: "Tênis Esportivo",
      description: "Perfeito para corridas e treinos.",
      price: 249.9,
      image: "/images/tenis.jpg",
    },
  ],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.items.push(action.payload);
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeProduct(state, action: PayloadAction<number>) {
      state.items = state.items.filter(p => p.id !== action.payload);
    },
    setProducts(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
    },
  },
});

export const { addProduct, updateProduct, removeProduct, setProducts } = productSlice.actions;
export default productSlice.reducer;
