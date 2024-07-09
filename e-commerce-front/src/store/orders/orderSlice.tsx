import { IsAstring } from "@customTypes/guards";
import { TorderItem } from "@customTypes/orders.type";
import { TLoading } from "@customTypes/shared";
import { createSlice } from "@reduxjs/toolkit";
import getOrders from "./actions/actGetOrders";
import actPlaceOrders from "./actions/actPlaceOrder";

interface IinitialState {
   loading: TLoading,
   error: string | null,
   orderList: TorderItem[]
   
}

const initialState: IinitialState= {
    loading: 'idle',
   error: null,
   orderList: []
}

const OrderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers:{
      resetOrderStatus: state => {
        state.loading = 'idle'
        state.orderList = []
        state.error = null
      }
    },
    extraReducers: (builder) => {
        // place order
        builder.addCase(actPlaceOrders.pending, (state) => {
          state.loading = "pending";
          state.error = null;
        });
        builder.addCase(actPlaceOrders.fulfilled, (state) => {
          state.loading = "succeeded";
        });
        builder.addCase(actPlaceOrders.rejected, (state, action) => {
          state.loading = "failed";
          if (IsAstring(action.payload)) {
            state.error = action.payload;
          }
        });

        //getOrders
        builder.addCase(getOrders.pending, (state) => {
          state.loading = "pending";
          state.error = null;
        });
        builder.addCase(getOrders.fulfilled, (state, action) => {
          state.loading = "succeeded";
          state.orderList = action.payload
        });
        builder.addCase(getOrders.rejected, (state, action) => {
          state.loading = "failed";
          if (IsAstring(action.payload)) {
            state.error = action.payload;
          }
        });
    }
})

export const {resetOrderStatus} = OrderSlice.actions

export default OrderSlice.reducer