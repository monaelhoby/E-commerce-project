import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axios from "axios";



const toggleLikeWishList = createAsyncThunk("wishList/toggle", async(id: number, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;

    const {authRegisterSlice} = getState() as RootState
    try {
        const isProductExist = await axios.get(`/wishlist?userId=${authRegisterSlice?.user?.id}&productId=${id}`)
        if(isProductExist.data.length > 0 ){
            await axios.delete(`/wishlist/${isProductExist.data[0].id}`);
            return {type:'remove', id}
        }else{
            await axios.post('/wishlist', {userId: authRegisterSlice?.user?.id, productId: id})
            return {type:'add', id}
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.response?.data.message || error.message);
          } else {
            return rejectWithValue("An unexpected error");
          }
    }
})

export default toggleLikeWishList 