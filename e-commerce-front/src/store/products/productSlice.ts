import { createSlice } from "@reduxjs/toolkit";


import ProductAction from './actions/index'
import {TLoading} from '@customTypes/shared'
import { TProduct } from "@customTypes/products";



    interface ICategoriesState {
        records: TProduct[],
        loading: TLoading,
        error: string | null
    }
    
    const initialState : ICategoriesState ={ 
        records: [],
        loading: 'idle',
        error: null
    }
    
    
    const GetProductByPrefixSlice=  createSlice({
        name: 'products',
        initialState,
        reducers: {
          productCleanup: (state) => {
            state.records= []
          }
        },
        extraReducers: (builder: any) => {
            builder.addCase(ProductAction.pending, (state: any) => {
                state.loading = "pending";
                state.error = null;
              });
              builder.addCase(ProductAction.fulfilled, (state: any, action: any) => {
                state.loading = "succeeded";
                state.records = action.payload;
              });
              builder.addCase(ProductAction.rejected, (state: any, action: any) => {
                state.loading = "failed";
                if (action.payload && typeof action.payload === "string") {
                  state.error = action.payload;
                }
            });
        }
    })
    
    export const {productCleanup} = GetProductByPrefixSlice.actions
    export default GetProductByPrefixSlice.reducer


