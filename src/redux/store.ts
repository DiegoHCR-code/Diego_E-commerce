import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';
import filterReducer from './slices/filterSlice';
import ordersReducer from './slices/ordersSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    user: userReducer,
    filters: filterReducer,
    orders: ordersReducer,

  },
});

store.subscribe(() => {
  const { cart } = store.getState();
  localStorage.setItem('cart', JSON.stringify(cart.items));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;