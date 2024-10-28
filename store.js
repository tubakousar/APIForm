import { configureStore } from "@reduxjs/toolkit";

import Getreducer from "./GetSlice";
import Postreducer from "./PostSlice";
import Updatereducer from "./UpdateSlice";
import Deletereducer from "./DeleteSlice"


export const store = configureStore({
    reducer:{
        get:Getreducer,
        post:Postreducer,
        update:Updatereducer,
        delete: Deletereducer,
    }
        
        
})

// ,







