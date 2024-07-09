import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { TCategory } from "@customTypes/category";
import {AxiosErrorHandler} from '@util/index'

type TResponse = TCategory[];

const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, thunkAPI: { rejectWithValue: any; }) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const response = await axios.get<TResponse>(
        "categories",{signal}
      );
      return response.data;
    } catch (error: unknown) {
        return rejectWithValue(AxiosErrorHandler(error));
    }
  }
);

export default actGetCategories;