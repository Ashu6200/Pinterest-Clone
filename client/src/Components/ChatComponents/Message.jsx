import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { UserAuth } from "../../context/AuthContext";
const Message = ({ message }) => {
  const { currentUser } = UserAuth();
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <Wrapper>
      <div
        ref={ref}
        className="message-resever"
        style={{
          flexDirection:`${
            message.senderId === currentUser.uid && "row-reverse"
          }`
        }}
      >
        <div className="message-messageContentresever">
          <p
            className="message-presever"
            style={{
              backgroundColor: `${
                message.senderId === currentUser.uid && "#0f2d2e"
              }`,
              color: `${message.senderId === currentUser.uid && "white"}`,
              borderRadius: `${
                message.senderId === currentUser.uid && "15px 0px 15px 15px"
              }`,
            }}
          >
            {message.text}
          </p>
          {message.img && <img src={message.img} alt="" />}
        </div>
      </div>
    </Wrapper>
  );
};

export default Message;

const Wrapper = styled.div`
  .message-resever {
    display: flex;
    gap: 20px;
    margin-bottom: -30px;
    .message-messageContentresever {
      max-width: 80%;
      display: flex;
      flex-direction: column;
      gap: 10px;
      .message-presever {
        background-color: white;
        border: #cfd2cf solid 1px;
        padding: 10px 20px;
        border-radius: 0px 10px 10px 10px;
        max-width: max-content;
      }
      img {
        width: 50%;
      }
    }
  }
`;
