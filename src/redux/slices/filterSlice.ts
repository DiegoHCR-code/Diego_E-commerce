import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  categories: string[];
  selectedCategories: string[];
  priceRange: [number, number];
}

const initialFilter: FilterState = {
  categories: [],
  selectedCategories: [],
  priceRange: [0, 1000],
};

export const filterSlice = createSlice({
  name: "filters",
  initialState: initialFilter,
  reducers: {
    setCategories(state, action: PayloadAction<string[]>) {
      state.categories = action.payload;
    },
    toggleCategory(state, action: PayloadAction<string>) {
      const cat = action.payload;
      state.selectedCategories = state.selectedCategories.includes(cat)
        ? state.selectedCategories.filter(c => c !== cat)
        : [...state.selectedCategories, cat];
    },
    setPriceRange(state, action: PayloadAction<[number, number]>) {
      state.priceRange = action.payload;
    },
  },
});

export const { setCategories, toggleCategory, setPriceRange } = filterSlice.actions;
export default filterSlice.reducer;
