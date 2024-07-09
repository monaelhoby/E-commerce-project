import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


import { TProduct } from "@customTypes/products";
import {AxiosErrorHandler} from '@util/index'

type TResponse = TProduct[];

const actGetProduct = createAsyncThunk(
  "Products/actGetProduct",
  async (prefix: any, thunkAPI: { rejectWithValue: any; }) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const response = await axios.get<TResponse>(
        `products?cat_prefix=${prefix}`,{signal}
      );
      return response.data;
    } catch (error: unknown) {
        return rejectWithValue(AxiosErrorHandler(error));
    }
  }
);

export default actGetProduct;