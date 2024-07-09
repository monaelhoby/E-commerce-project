import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


import AxiosErrorHandler from "@util/isAxiosErrorHandler";


interface IformData {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

const authRegister = createAsyncThunk("register", async (formData: IformData, thunk) => {
    const {rejectWithValue} = thunk
    try {
        const res = await axios.post('/register', formData)
        return res.data
    } catch (error) {
        return rejectWithValue(AxiosErrorHandler(error));
    }
})


export default authRegister