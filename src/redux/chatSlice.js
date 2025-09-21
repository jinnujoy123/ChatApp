import { createSlice } from "@reduxjs/toolkit";
const savedMessages = localStorage.getItem("chatMessages");

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    username: "",
    messages: savedMessages ? JSON.parse(savedMessages) : [],
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    addMessage: (state, action) => {
      const messageWithTime = {
        ...action.payload,
        timestamp: new Date().toISOString(), // timestamp 
      };

      state.messages.push(messageWithTime);
      localStorage.setItem("chatMessages", JSON.stringify(state.messages));
    },

    clearMessages: (state) => {
      state.messages = [];
      localStorage.removeItem("chatMessages");
    },
  },
});
export const { setUsername, addMessage, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
