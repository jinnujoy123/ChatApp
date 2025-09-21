import { configureStore } from "@reduxjs/toolkit";
import chatReducer from './chatSlice'
const chatStore=configureStore({
    reducer:{
       chat:chatReducer
    }
})
export default chatStore