import React, { useState } from "react";
import styled from "styled-components";
import { BsFillChatRightTextFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import ChatBox from "./ChatComponents/ChatBox";
import Search from "./ChatComponents/Search";
import FriendsUser from "./ChatComponents/FriendsUser";

const ChatSection = () => {
  const [open, setOpen] = useState("Chats");
  return (
    <Wrapper>
      <div className="chatSection-left">
        <div className="chatSection-sidebar">
          <BsFillChatRightTextFill
            color="#e51106"
            onClick={() => setOpen("Chats")}
            cursor="pointer"
          />
          <FaUserFriends
            color="#e51106"
            onClick={() => setOpen("Friends")}
            cursor="pointer"
          />
        </div>
        {open === "Chats" && (
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            <div className="chatSection-title">
              <h1 style={{ color: "#e51106" }}>Chats</h1>
            </div>
            <div className="chatSection-list">
              <Search />
            </div>
          </div>
        )}
        {open === "Friends" && (
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            <div className="chatSection-title">
              <h1 style={{ color: "#e51106" }}>Friends </h1>
            </div>
            <div className="chatSection-list">
              <FriendsUser />
            </div>
          </div>
        )}
      </div>
      <ChatBox />
    </Wrapper>
  );
};

export default ChatSection;

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  flex-direction: row;
  width: 100%;
  height: 89vh;
  padding: 0 -10px 0 -10px;
  .chatSection-left {
    width: 40%;
    display: flex;
    height: 100%;
    flex-direction: row;
    border-right: 1px solid #cfd2cf;
    .chatSection-sidebar {
      padding-top: 20px;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 15%;
      background-color: #cfd2cf;
      gap: 1.5rem;
      font-size: 20px;
      font-weight: bolder;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
    .chatSection-title {
      padding-left: 15px;
      position: sticky;
      background-color: white;
      top: 0;
      z-index: 1000;
    }
    .chatSection-list {
      width: 100%;
      overflow: scroll;
      ::-webkit-scrollbar {
        width: 0;
        background-color: transparent;
      }
      .chatSection-chatUser {
        align-items: center;
        justify-items: center;
        padding-left: 15px;
      }
    }
  }
  .chatSection-right {
    width: auto;
  }
`;
