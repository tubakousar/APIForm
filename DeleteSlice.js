import { api } from "./Apis";
import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";



export const deleteuserdata = createAsyncThunk(
    "delete/deleteuserdata",
    async (payload) => {
         await api.apideleteuserdata(payload);
        return payload
        
    }
)


export const  DeleteSlice = createSlice({
    name:"delete",
    initialState:{
        users : [],
        loading:"idle",
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        // post form user data
        builder
        .addCase(deleteuserdata.pending ,(state)=>{
            if(state.loading === "idle"){
                state.loading = "pending"
                state.error = null
              }

        })
        .addCase(deleteuserdata.fulfilled ,(state , action)=>{
            if(state.loading === "pending"){
                state.users = state.users.filter(user =>user.id !== action.payload.id)
                
                state.loading = "idle"
              }
              
        })
        .addCase(deleteuserdata.rejected,(state ,action)=>{
            if(state.loading === "pending"){
              state.error= action.error.message
              state.loading = "idle"
            }
              
        })
         
    }
})

export default DeleteSlice.reducer