import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { addMessage, clearMessages } from "../redux/chatSlice";
import { Link } from "react-router-dom";

const socket = io("https://chatappserver-1-lqhr.onrender.com");

function Chat() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const username = useSelector((state) => state.chat.username);
  const messagesEndRef = useRef(null);
  const [input, setInput] = useState("");

  useEffect(() => {
     const handleMessage = (msg) => {
      dispatch(addMessage(msg));
    };

    socket.on("chatMessage", handleMessage);

    return () => {
      socket.off("chatMessage", handleMessage);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const msg = { username, text: input, timestamp: new Date().toISOString() };
      socket.emit("chatMessage", msg);
      setInput("");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="h-screen p-4 md:p-10 flex justify-center bg-[url('https://storage.pixteller.com/designs/designs-images/2019-03-27/05/simple-background-backgrounds-passion-simple-1-5c9b95d2b9dfb.png')] bg-no-repeat bg-cover ">
      <div className="w-full max-w-xl flex flex-col bg-white rounded shadow-lg ">
        {/* Header */}
        <div className="border-b rounded border-black/25 shadow pb-3 pe-4 ">
          <div className="flex justify-between items-center pt-4">
            <div className="flex items-center gap-2 font-bold text-purple-900 " >
                <img
                  className="rounded-full w-12 h-12 h"
                  src="https://img.freepik.com/premium-vector/chat-logo-design_93835-108.jpg"
                  alt="Logo"
                />
              <Link to={'/'}>
                <span className="text-xl md:text-3xl">ChatZone</span>
              </Link>
            </div>
            <div className="flex items-center text-sm md:text-xl gap-2 text-purple-900 font-bold">
              <span className=" capitalize ">{username}</span>
              <img
                src="https://cdn-icons-png.flaticon.com/512/6681/6681204.png"
                alt="icon"
                className="w-6 h-6  md:w-8 md:h-8"
              />
              <Link to={"/"} className="hidden md:block">Logout</Link>
            </div>
          
          </div>
          <div className="">
            <button
              type="button"
              onClick={() => dispatch(clearMessages())}
              className="bg-red-600 text-white text-sm my-2 px-2 rounded-lg hover:bg-red-700 float-right"
            >
              Clear Chat
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 bg-slate-100">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col ${
                msg.username === username ? "items-end" : "items-start"
              }`}
            >
              <span className="text-xs text-gray-500 mb-1">
                {msg.username}{" "}
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <div
                className={`p-2 rounded-lg max-w-xs break-words ${
                  msg.username === username
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {/* for auto scrolling */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Box */}
        <form className="flex gap-2 py-4 px-2 rounded-b bg-slate-100" onSubmit={sendMessage}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 shadow rounded-lg p-2 bg-white outline-none focus:ring-2 focus:ring-blue-500 "
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
