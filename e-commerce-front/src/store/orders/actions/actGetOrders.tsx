import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


import {AxiosErrorHandler} from '@util/index'
import { RootState } from "@store/index";
import {TorderItem} from "@customTypes/orders.type"


type IResponse = TorderItem[]


const getOrders = createAsyncThunk("orders/getOrders", async(_, thunkAPI) => {

    const {rejectWithValue, getState, signal} = thunkAPI

    const {authRegisterSlice} = getState() as RootState

    try {
        const response = await axios.get<IResponse>(`/orders?userId=${authRegisterSlice.user?.id}`, {signal})
        return response.data
    } catch (error) {
        return rejectWithValue(AxiosErrorHandler(error));
      }
})

export default getOrders

