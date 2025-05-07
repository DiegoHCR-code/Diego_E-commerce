import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  createdAt: string;
}

interface OrdersState {
  items: Order[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: OrdersState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchOrdersByUser = createAsyncThunk<Order[], string>(
  'orders/fetchOrdersByUser',
  async (userId) => {
    const response = await api.get<Order[]>(`/orders?userId=${userId}`);
    return response.data;
  }
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersByUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrdersByUser.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchOrdersByUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load orders';
      });
  },
});

export default ordersSlice.reducer;