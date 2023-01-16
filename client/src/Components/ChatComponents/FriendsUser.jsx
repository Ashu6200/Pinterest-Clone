import React from "react";
import styled from "styled-components";
import { friendList } from "../../assest/data";

const FriendsUser = () => {
  return (
    <Wrapper>
      {friendList.map((Friends, index) => (
        <div className="chatSection-chatUserList" key={index}>
          <img
            src={Friends.displayPicture}
            alt=""
            className="chatSection-chatUserImg"
          />
          <div className="chatSection-userChatInfo">
            <span style={{ fontSize: "15px" }}>{Friends.name}</span>
            <p style={{ fontSize: "12px", color: "gray" }}>
              Your Friend {Friends.name}
            </p>
          </div>
        </div>
      ))}
    </Wrapper>
  );
};

export default FriendsUser;
const Wrapper = styled.div`
  padding-left: 15px;
  .chatSection-chatUserList {
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
    .chatSection-chatUserImg {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
    }
    .chatSection-userChatInfo {
      font-size: 14px;
      font-weight: 600;
    }
  }
`;
