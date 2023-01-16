import React, { useState } from "react";
import { BsFileEarmarkArrowUp } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { v4 as uuid } from "uuid";
import { UserAuth } from "../../context/AuthContext";
import { UserChats } from "../../context/ChatContext";

const MsgInput = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = UserAuth();
  const { data } = UserChats();

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, `chatimage/${img.name + uuid()}`);
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  return (
    <div
      className="MsgInput-input"
      style={{
        height: "70px",
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "10px",
      }}
    >
      <div
        className="MsgInput-send"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <div>
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label htmlFor="file">
            <BsFileEarmarkArrowUp
              width="80px"
              color="#e51106"
              style={{
                fontSize: "25px",
                justifyItems: "center",
                cursor: "pointer",
              }}
            />
          </label>
        </div>
        <textarea
          type="text"
          placeholder="Type something..."
          style={{
            width: "90%",
            outline: "none",
            height: "15px",
            border: "1px solid #e51106",
            padding: "12px",
            borderRadius: "30px",
          }}
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button
          type="button"
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: "#e51106",
            border: "none",
            outline: "none",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
          }}
          onClick={handleSend}
        >
          <AiOutlineSend
            color="white"
            width="30px"
            style={{
              fontSize: "25px",
              justifyItems: "center",
              cursor: "pointer",
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default MsgInput;
