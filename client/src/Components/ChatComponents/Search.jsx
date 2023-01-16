import React, { useState } from "react";
import styled from "styled-components";
import ChatsUser from "./ChatsUser";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = UserAuth();

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}
    setUser(null);
    setUsername("");
  };
  return (
    <Wrapper>
      <div className="Serach-area">
        <div>
          <input
            type="text"
            onKeyDown={handleKey}
            className="Search-field"
            placeholder="Search User"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        {err && <span>User not found!</span>}
        {user && (
          <div className="Search-userchat" onClick={handleSelect}>
            <img src={user.photoURL} alt="DP" className="Search-Img" />
            <div className="Search-userInfo">
              <span
                style={{
                  fontSize: "15px",
                }}
              >
                {user.displayName}
              </span>
            </div>
          </div>
        )}
      </div>
      <ChatsUser />
    </Wrapper>
  );
};

export default Search;
const Wrapper = styled.div`
  .Serach-area {
    padding-left: 10px;
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: white;
    .Search-field {
      border: 1px solid black;
      outline: none;
      font-weight: 600;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 12px;
      width: 98%;
      height: 32px;
      border-radius: 10px;
      outline: none;
    }
    .Search-userchat {
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
      .Search-Img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
      }
      .Search-userInfo {
        font-size: 14px;
        font-weight: 600;
      }
    }
  }
`;
