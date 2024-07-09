import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


import { RootState } from "@store/index";
import { TProduct } from "@customTypes/products"; 
import {AxiosErrorHandler} from '@util/index'

type TResponse = TProduct[];

export const actGetProductsByItems = createAsyncThunk(
  "cart/actGetProductsByItems",async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, getState, signal } = thunkAPI;
    const { CartSlice } = getState() as RootState;
    const itemsId = Object.keys(CartSlice.items);

    if (!itemsId.length) {
        return fulfillWithValue([]);
      }
  
    try {
        const concatenatedItemsId = itemsId.map((el) => `id=${el}`).join("&");
        const response = await axios.get<TResponse>(
          `/products?${concatenatedItemsId}`, {signal} // use signal if you open page and suddenly close it in half way prevent get data
        );
        return response.data;
      } catch (error) {
          return rejectWithValue(AxiosErrorHandler(error));
      }
    
  })

  