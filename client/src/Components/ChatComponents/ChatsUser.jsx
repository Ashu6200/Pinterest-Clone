import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { UserAuth } from "../../context/AuthContext";
import { UserChats } from "../../context/ChatContext";
import { db } from "../../firebase";

const ChatsUser = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = UserAuth();
  const { dispatch } = UserChats();
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);
  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  return (
    <Wapper>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div className="chatsUserList" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
            <img src={chat[1].userInfo.photoURL} alt="" className="chatsUserImg"/>
            <div className="chatsuserChatInfo">
              <span>{chat[1].userInfo.displayName}</span>
              <p style={{ fontSize: "12px", color: "gray" }}>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </Wapper>
  );
};

export default ChatsUser;

const Wapper = styled.div`
  align-items: center;
  justify-items: center;
  padding-left: 10px;
  .chatsUserList {
    cursor: pointer;
    display: flex;
    padding: 15px;
    display: flex;
    align-items: center;
    gap: 20px;
    color: black;
    :hover {
      background-color: #cfd2cf;
      border-radius: 20px;
    }
    .chatsUserImg {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
    }
    .chatsuserChatInfo {
      font-size: 15px;
      font-weight: 600;
    }
  }
`;
