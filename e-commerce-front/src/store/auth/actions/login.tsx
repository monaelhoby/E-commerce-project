import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


import AxiosErrorHandler from "@util/isAxiosErrorHandler";


interface IformData {
    email: string,
    password: string
}

interface Iresponse {
    accessToken : string,
    user: {
        id: string,
        firstName: string,
        lastName: string,
        email: string
    }
}

const AuthLoginAction = createAsyncThunk("login", async (formData: IformData, thunk) => {
    const {rejectWithValue} = thunk
    try {
        const response = await axios.post<Iresponse>('/login', formData)
        return response.data
    } catch (error) {
        return rejectWithValue(AxiosErrorHandler(error));
    }
})

export default AuthLoginAction