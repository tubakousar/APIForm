
import { api } from "./Apis";
import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";

// get form user data
export const getuserdata = createAsyncThunk(
    "get/getuserdata",
    async (payload) => {
        const response = await api.apigetuserdata(payload);
        return response.data;
        
    }
)

export const  GetSlice = createSlice({
    name:"get",
    initialState:{
        users : [],
        loading:"idle",
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        // post form user data
        builder
        .addCase(getuserdata.pending ,(state)=>{
            // state.loading === "idle"
                state.loading = "pending"
                state.error = null
              

        })
        .addCase(getuserdata.fulfilled ,(state , action)=>{
            // state.loading === "pending"
              state.users = action.payload
              state.loading = "idle"
            
              
        })
        .addCase(getuserdata.rejected,(state ,action)=>{
            // if(state.loading === "pending"){
              state.error= action.error.message
              state.loading = "idle"
            // }
              
        })
        
    }
})
export default GetSlice.reducer;

