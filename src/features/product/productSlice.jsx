import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { fetchCount } from './counterAPI';
import { fetchAllProducts, fetchBrands, fetchCategories, fetchProductById, fetchProductsByFilters } from "./productAPI";

const initialState = {
  products: [],
  totalItems: 0,
  FilterProducts: [],
  status: "idle",
  brands:[],
  categories:[],
  selectedProduct:null
};

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async (amount) => {
    const response = await fetchAllProducts(amount);
    return response.data;
  }
);

export const fetchAllProductsByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
  "product/fetchProductsByFilters",
  async ({ filter,sort,pagination }) => {
    const response = await fetchProductsByFilters( filter,sort,pagination );
    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  "product/fetchBrands",
  async () => {
    const response = await fetchBrands();
    return response.data;
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  "product/fetchCategories",
  async () => {
    const response = await fetchCategories();
    return response.data;
  }
);



export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories= action.payload
      })
  
      .addCase(fetchAllProductsByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload
      })
  },
});

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const selectedProductById = (state) => state.product.selectedProduct;


export default productSlice.reducer;
