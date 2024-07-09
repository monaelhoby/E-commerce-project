import { createSlice } from "@reduxjs/toolkit";

import toggleLikeWishList from './actions'
import getWishlist from './actions/getWishlist'
import { TLoading } from "@customTypes/shared";
import { TProduct } from "@customTypes/products";
import { authLogout } from "@store/auth/authSlice";

interface initialStateProps {
    itemsId: number[],
    productFullInfo: TProduct[],
    error: null | string,
    loading: TLoading
}

const initialState: initialStateProps = {
    itemsId: [],
    productFullInfo: [],
    error: null,
    loading: 'idle'
}


const WishtListSlice = createSlice({
    name: 'WishList',
    initialState,
    reducers: {
      wishlistCleanup: (state) => {
        state.productFullInfo= []
      }
    },
    extraReducers: builder => {
        builder.addCase(toggleLikeWishList.pending, (state) => {
            state.error= null;
        })
        builder.addCase(toggleLikeWishList.fulfilled, (state, action) => {
            if(action.payload.type === "add"){
                state.itemsId.push(action.payload.id)
            }else{
                state.itemsId = state.itemsId.filter(ele => ele !== action.payload.id)
                state.productFullInfo = state.productFullInfo.filter(ele => ele.id !== action.payload.id)
            }
        })
        builder.addCase(toggleLikeWishList.rejected, (state, action) => {
            if(action.payload && typeof action.payload === "string"){
                state.error = action.payload
            }
        })
            //get wishList for user
        builder.addCase(getWishlist.pending, (state) => {
            state.loading= "pending";
            state.error= null;
        })
        builder.addCase(getWishlist.fulfilled, (state, action) => {
            state.loading= "succeeded";
            if (action.payload.dataType === "productsFullInfo") {
                state.productFullInfo = action.payload.data as TProduct[];
              } else if (action.payload.dataType === "productIds") {
                state.itemsId = action.payload.data as number[];
              }
        })
        builder.addCase(getWishlist.rejected, (state, action) => {
            state.loading= "failed";
            if(action.payload && typeof action.payload === "string"){
                state.error = action.payload
            }
        })

        // when logout reset
        builder.addCase(authLogout, state => {
            state.itemsId = []
            state.productFullInfo= []
        })
    }
})

export const {wishlistCleanup} = WishtListSlice.actions


export default WishtListSlice.reducer

