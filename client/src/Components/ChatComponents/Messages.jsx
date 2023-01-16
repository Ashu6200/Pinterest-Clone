import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { UserChats } from "../../context/ChatContext";
import { db } from "../../firebase";

import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = UserChats();
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <Wrapper>
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </Wrapper>
  );
};

export default Messages;

const Wrapper = styled.div`
  padding: 10px;
  height: calc(96.2% - 170px);
  overflow: scroll;
  ::-webkit-scrollbar {
    width: 0;
    background-color: transparent;
  }
`;
