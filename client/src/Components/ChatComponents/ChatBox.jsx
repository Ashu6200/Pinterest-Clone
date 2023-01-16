import React from "react";
import { FaPhoneAlt, FaVideo } from "react-icons/fa";
import styled from "styled-components";
import bg from "../../assest/Logo.png";
import { UserChats } from "../../context/ChatContext";
import Messages from "./Messages";
import MsgInput from "./MsgInput";

const ChatBox = () => {
  const { data } = UserChats();
  return (
    <Wrapper
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "500px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        borderTopLeftRadius: "10px",
      }}
    >
      {data.user !== {} ? (
        <>
          <div className="Chatbox-chatInfo">
            <div className="Chatbox-chatUserInfo">
              <img
                src={data.user?.photoURL}
                alt={data.user?.displayName}
                className="Chatbox-chatUserImg"
              />
              <span
                style={{
                  fontSize: "25px",
                  fontFamily: "Arial",
                  color: "#e51106",
                  fontWeight: "600",
                }}
              >
                {data.user?.displayName}
              </span>
            </div>
            <div className="Chatbox-chatIcon">
              <div className="Chatbox-chatIconMore">
                <FaPhoneAlt width="80px" color="#e51106" />
              </div>
              <div style={{ borderLeft: "1px solid black" }}></div>
              <div className="Chatbox-chatIconMore">
                <FaVideo width="80px" color="#e51106" />
              </div>
            </div>
          </div>
          <Messages />
          <MsgInput />
        </>
      ) : (
        <h2> no user</h2>
      )}
    </Wrapper>
  );
};

export default ChatBox;

const Wrapper = styled.div`
  .Chatbox-chatInfo {
    height: 50px;
    color: White;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 25px;
    .Chatbox-chatUserInfo {
      display: flex;
      align-items: center;
      gap: 10px;
      .Chatbox-chatUserImg {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    .Chatbox-chatIcon {
      font-size: 25px;
      font-weight: 600;
      display: flex;
      gap: 5px;
      cursor: pointer;
      gap: 20px;
      .Chatbox-chatIconMore {
        :hover {
          background-color: white;
          color: #e51106;
          border-radius: 20px;
        }
      }
    }
  }
`;
