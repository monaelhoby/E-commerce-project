
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { TProduct } from "@customTypes/products";
import {AxiosErrorHandler} from '@util/index'
import { RootState } from "@store/index";

type TDataType = "productsFullInfo" | "productIds";
type TResponse = TProduct[]

const getWishlist = createAsyncThunk("wishList/getList", async(dataType: TDataType, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;
    const {authRegisterSlice} = getState() as RootState
    try {
        const userWishlist = await axios.get<{productId: number}[]>(`/wishlist?userId=${authRegisterSlice?.user?.id}`, {signal})
        if(!userWishlist.data.length){
          return { data: [], dataType: "empty" };
        }

      if (dataType === "productIds") {
        const concatenatedItemsId = userWishlist.data.map((el) => el.productId);
        return { data: concatenatedItemsId, dataType: "productIds" };
      } else {
        const concatenatedItemsId = userWishlist.data
          .map((el) => `id=${el.productId}`)
          .join("&");

        const response = await axios.get<TResponse>(
          `/products?${concatenatedItemsId}`
        );
        return { data: response.data, dataType: "productsFullInfo" };
      }

    } catch (error) {
            return rejectWithValue(AxiosErrorHandler(error));
    }
})

export default getWishlist