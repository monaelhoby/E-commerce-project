import { createSlice } from "@reduxjs/toolkit";


import CategoryAction from './actions/index'
import {TLoading} from '@customTypes/shared'
import { TCategory } from "@customTypes/category";


interface ICategoriesState {
    records: TCategory[],
    loading: TLoading,
    error: string | null
}

const initialState : ICategoriesState ={ 
    records: [],
    loading: 'idle',
    error: null
}


const CategoriesSlice=  createSlice({
    name: 'categories',
    initialState,
    reducers: {
      categoryCleanup: (state) => {
        state.records= []
      }},
    extraReducers: (builder: any) => {
        builder.addCase(CategoryAction.pending, (state: any) => {
            state.loading = "pending";
            state.error = null;
          });
          builder.addCase(CategoryAction.fulfilled, (state: any, action: any) => {
            state.loading = "succeeded";
            state.records = action.payload;
          });
          builder.addCase(CategoryAction.rejected, (state: any, action: any) => {
            state.loading = "failed";
            if (action.payload && typeof action.payload === "string") {
              state.error = action.payload;
            }
        });
    }
})


export const {categoryCleanup} = CategoriesSlice.actions

export default CategoriesSlice.reducer