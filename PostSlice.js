import { api } from "./Apis";
import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";

// post form user data
export const postuserdata = createAsyncThunk(
    "post/postuserdata",
    async (payload) => {
        const response = await api.apipostuserdata(payload);
        return response.data
        
    }
)

export const  PostSlice = createSlice({
    name:"post",
    initialState:{
        users : [],
        loading:"idle",
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        // post form user data
        builder
        .addCase(postuserdata.pending ,(state)=>{
            // state.loading === "idle"
                state.loading = "pending"
                state.error = null
              

        })
        .addCase(postuserdata.fulfilled ,(state , action)=>{
            // if(state.loading === "pending"){
              state.users.push(action.payload)
              state.loading = "idle"
            // }
              
        })
        .addCase(postuserdata.rejected,(state ,action)=>{
            // if(state.loading === "pending"){
              state.error= action.error.message
              state.loading = "idle"
            // }
              
        })
         
    }
})

export default  PostSlice.reducer;


