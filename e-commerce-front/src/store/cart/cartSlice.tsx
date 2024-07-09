import {createSlice} from "@reduxjs/toolkit";

import {TProduct} from "@customTypes/products";
import {TLoading} from "@customTypes/shared";
import {actGetProductsByItems} from "./actions";
import { IsAstring } from "@customTypes/guards";

interface cartProps {
    items: {
        [key: string]: number
    },
    prductInfo: TProduct[],
    loading: TLoading;
    error: null | string;
}

const initialState: cartProps = {
    items: {},
    prductInfo: [],
    loading: "idle",
    error: null
}

const CartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const id = action.payload
            if (state.items[id]) {
                state.items[id]++
            } else {
                state.items[id] = 1
            }
        },
        cartItemChangeQuantity: (state, action) => {
            state.items[action.payload.id] = action.payload.quantity
        },
        cartItemRemove: (state, action) => {
            delete state.items[action.payload]
            state.prductInfo = state.prductInfo.filter(item => item.id !== action.payload)
        },
        cartCleanup: state => {
            state.prductInfo=[]
        },
        clearCartAfterPlaceorder: state => {
            state.items = {}
            state.prductInfo = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(actGetProductsByItems.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetProductsByItems.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.prductInfo = action.payload
        });
        builder.addCase(actGetProductsByItems.rejected, (state: cartProps, action) => {
            state.loading = "failed";
            if (IsAstring(action.payload as string)) {
                state.error = action.payload as string;
            }
        });
    }
})

export const {addToCart, cartItemChangeQuantity,cartItemRemove, cartCleanup, clearCartAfterPlaceorder} = CartSlice.actions
export default CartSlice.reducer