import { arrayUnion, deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";

const AccountBlogDetails = ({ item }) => {
  const { currentUser } = UserAuth();
  const [saved, setSaved] = useState(false);
  const deleteBlog = async () => {
    const postDoc = doc(db, "BlogsPost", item.id);
    await deleteDoc(postDoc);
    toast.success(`Blog deleted successfully`);
  };
  const saveBlog = async (id) => {
    try {
      setSaved(!saved);
      await updateDoc(doc(db, "users", `${currentUser.uid}`), {
        savedBlog: arrayUnion({
          [id]: {
           ...item,
          },
          // title: id?.title,
          // postText: id?.postText,
          // author: {
          //   id: id?.uid,
          //   name: id?.displayName,
          //   email: id?.email,
          //   userimg: id?.photoURL,
          // },
        }),
      });
      toast.success("Blog is Saved");
    } catch (error) {
      toast.error("Unable to save Blog");
    }
  };
  return (
    <Wrapper style={{ display: "flex" }}>
      <div className="Blog-conatiner">
        <div className="Blog-header">
          {currentUser && item.author.id === currentUser.uid && (
            <button
              type="button"
              className="Blog-button"
              style={{ backgroundColor: "#cfd2cf", color: "black" }}
              onClick={() => {
                deleteBlog(item.id);
              }}
            >
              Delete
            </button>
          )}
          {currentUser && item.author.id !== currentUser.uid && (
            <button
              type="button"
              className="Blog-button"
              onClick={() => {
                saveBlog(item.id);
              }}
            >
              {saved ? "save" : " unsave "}
            </button>
          )}
        </div>
        <div className="Blog-BlogInfo">
          <div>
            <h1>{item.title}</h1>
            <p>{item.postText}</p>
            <span>Upload By :-</span>
            <div className="Blog-userInfo">
              <Link
                to={`/userprofile/${item.author.id}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <div className="Blog-user">
                  <img src={item.author.userimg} alt="" />
                  <h2>{item.author.name}</h2>
                </div>
              </Link>
              {currentUser && item.author.id !== currentUser.uid && (
                <button type="button" className="Blog-user-button">
                  Follow
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default AccountBlogDetails;

const Wrapper = styled.div`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-bottom: 10px;
  .Blog-conatiner {
    background-color: black;
    border-radius: 32px;
    margin: auto;
    padding: 20px;
    color: white;
    width: 900px;
    height: auto;
    .Blog-header {
      display: flex;
      flex-direction: row-reverse;
      .Blog-button {
        gap: 20px;
        border-radius: 20px;
        width: 70px;
        padding: 10px;
        color: white;
        font-weight: bold;
        background-color: #e51106;
        outline: none;
        border: none;
        cursor: pointer;
      }
    }
    .Blog-BlogInfo {
      display: flex;
      .Blog-userInfo {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .Blog-user {
          display: flex;
          justify-items: flex-end;
          align-items: center;
          gap: 5px;
          img {
            width: 28px;
            height: 28px;
            border-radius: 50%;
          }
          h2 {
            font-family: Arial, Helvetica, sans-serif;
          }
        }
        .Blog-user-button {
          width: 70px;
          padding: 10px;
          border-radius: 20px;
          color: white;
          font-weight: bold;
          background-color: #e51106;
          outline: none;
          border: none;
          cursor: pointer;
          text-align: center;
        }
      }
    }
  }
`;
