import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


import {AxiosErrorHandler} from '@util/index'
import { RootState } from "@store/index";


const actPlaceOrders = createAsyncThunk(
  "orders/actPlaceOrders", async(subtotal: number, thunkAPI) => {
    const {rejectWithValue, getState} = thunkAPI

    const {authRegisterSlice, CartSlice} = getState() as RootState

    const orderItems = CartSlice.prductInfo.map((el) => ({
      id: el.id,
      title: el.title,
      price: el.price,
      img: el.img,
      quantity: CartSlice.items[el.id],
    }));

    try {
      const res = await axios.post("/orders", {
        userId: authRegisterSlice.user?.id,
        items: orderItems,
        subtotal,
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  
  })


  export default actPlaceOrders