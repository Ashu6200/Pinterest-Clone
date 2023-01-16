import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
import { PostContextProvider } from "./context/PostContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <PostContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </PostContextProvider>
    </ChatContextProvider>
  </AuthContextProvider>
);
