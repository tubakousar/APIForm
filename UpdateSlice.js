import { api } from "./Apis";
import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";

// updata form user data

export const updateuserdata = createAsyncThunk(
    "update/updateuserdata",
    async payload => {
        const response = await api.apiupdateuserdata(payload);
        return response.data
        
    }
)

export const  UpdateSlice = createSlice({
    name:"update",
    initialState:{
        users : [],
        loading:"idle",
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        // post form user data
        builder
        .addCase(updateuserdata.pending ,(state)=>{
            if(state.loading === "idle"){
                state.loading = "pending"
                state.error = null
              }

        })
        .addCase(updateuserdata.fulfilled ,(state , action)=>{
            if(state.loading === "pending"){
              const index = state.users.findIndex(user =>user.id === action.payload.id)
              if(index !== -1){
                state.users[index] = action.payload;
              }
              state.loading = "idle"
            }
              
        })
        .addCase(updateuserdata.rejected,(state ,action)=>{
            if(state.loading === "pending"){
              state.error= action.error.message
              state.loading = "idle"
            }
              
        })
         
    }
})

export default  UpdateSlice.reducer;
