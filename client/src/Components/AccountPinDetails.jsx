import { arrayUnion, deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";

const AccountPinDetails = ({ item }) => {
  const navigate = useNavigate();
  const { currentUser } = UserAuth();
  const [saved, setSaved] = useState(false);
  const imageCollectionRef = doc(db, "ImagePost", item.id);
  const savePost = async (id) => {
    try {
      setSaved(true);
      await updateDoc(doc(db, "users", `{${currentUser.uid}`), {
        savedPost: arrayUnion({
          [id]: {
            ...item,
          },
          // title: details?.title,
          // postText: details?.postText,
          // image: details?.image,
          // author: {
          //   id: details?.author?.uid,
          //   name: details?.author?.displayName,
          //   email: details?.author?.email,
          //   userimg: details?.author?.photoURL,
          // },
        }),
      });
      toast.success("Post is Saved");
    } catch (error) {
      toast.error("Unable to save Post");
    }
  };
  const deleteImage = async () => {
    const postDoc = imageCollectionRef;
    await deleteDoc(postDoc);
    navigate("/");
    toast.success(`Image deleted successfully`);
  };
  return (
    <Wrapper>
      <>
        <div className="pintdetails-conatiner">
          <div className="pindetails-left">
            <img src={item.image} alt="/" />
          </div>
          <div className="pindetails-right">
            <div className="pindetails-right-header">
              <div>
                {currentUser && item.author.id !== currentUser.uid && (
                  <button
                    type="button"
                    className="pindetils-right-button"
                    onClick={() => {
                      savePost(item.id);
                    }}
                  >
                    {saved !== false ? "Save" : "Unsave"}
                  </button>
                )}
                {currentUser && item.author.id === currentUser.uid && (
                  <button
                    type="button"
                    className="pindetils-right-button"
                    style={{ backgroundColor: "#cfd2cf", color: "black" }}
                    onClick={deleteImage}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
            <div className="pindetails-right-pinInfo">
              <div>
                <h1>{item.title}</h1>
                <p>{item.postText}</p>
                <span>Upload By :-</span>
                <div className="pindetails-right-userInfo">
                  <div className="pindetails-right-user">
                    <img src={item.author.userimg} alt="" />
                    <h2>{item.author.name}</h2>
                  </div>
                  {currentUser && item.author.id !== currentUser.uid && (
                    <button
                      type="button"
                      className="pindetails-right-user-button"
                    >
                      Follow
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Wrapper>
  );
};

export default AccountPinDetails;

const Wrapper = styled.div`
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
  margin-bottom: 10px;
  .pintdetails-conatiner {
    background-color: black;
    display: flex;
    flex-direction: row;
    border-radius: 32px;
    margin: auto;
    padding: 20px;
    color: white;
    width: 900px;
    height: auto;

    .pindetails-left {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50%;
      img {
        max-width: 100%;
        max-height: 100%;
        display: block;
        width: 30rem;
        border-bottom-right-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
        border-top-left-radius: 1.5rem;
        border-top-right-radius: 1.5rem;
      }
    }
    .pindetails-right {
      width: 50%;
      padding: 20px;
      .pindetails-right-header {
        display: flex;
        justify-content: space-between;
        .pindetails-right-header-icons {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pindetils-right-button {
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
      .pindetails-right-pinInfo {
        display: flex;
        .pindetails-right-userInfo {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .pindetails-right-user {
            display: flex;
            align-items: center;
            gap: 5px;
            img {
              width: 24px;
              height: 24px;
              border-radius: 50%;
            }
            h2 {
              font-family: Arial, Helvetica, sans-serif;
            }
          }
          .pindetails-right-user-button {
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
  }
  .more-pins-conatiner {
    h1 {
      text-align: center;
      margin-top: 50px;
      margin-bottom: 40px;
    }
  }
`;
