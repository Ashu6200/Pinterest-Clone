import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineDownload } from "react-icons/ai";
import Masnory from "./Masnory";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const PinDetail = () => {
  const navigate = useNavigate();
  const { currentUser } = UserAuth();
  const location = useLocation();
  const idPost = location.pathname.split("/")[2];
  const [details, setDetails] = useState([]);
  const deleteImage = async () => {
    const postDoc = doc(db, "ImagePost", idPost);
    await deleteDoc(postDoc);
    toast.success(`Image deleted successfully`);
    navigate("/");
  };
  useEffect(() => {
    const unsub = async () => {
      await getDoc(doc(db, "ImagePost", idPost)).then((doc) => {
        doc.exists() && setDetails(doc.data());
      });
    };
    unsub();
  }, [idPost]);
  const [saved, setSaved] = useState(false);
  const savePost = async () => {
    try {
      setSaved(true);
      await updateDoc(doc(db, "users", `{${currentUser.uid}`), {
        savedPost: arrayUnion({
          title: idPost?.title,
          postText: details?.postText,
          image: details?.image,
          author: {
            id: details?.author?.uid,
            name: details?.author?.displayName,
            email: details?.author?.email,
            userimg: details?.author?.photoURL,
          },
        }),
      });
      toast.success("Post is Saved");
    } catch (error) {
      toast.error("Unable to save Post");
    }
  };
  const friendHandler = async (id) => {
    try {
      const profile = await getDoc(db, "users", id);
      await updateDoc(doc(db, "users", `{${currentUser.uid}`), {
        friendlist: arrayUnion({
          uid: id,
          displayName: profile.displayName,
          email: profile.email,
          photoURL: profile.photoURL,
        }),
      });
      toast.success("Sucessfully Followed");
    } catch (error) {
      toast.error("error: ");
    }
  };

  return (
    <Wrapper>
      <div className="pintdetails-conatiner">
        <div className="pindetails-left">
          <img src={details?.image} alt="/" />
        </div>
        <div className="pindetails-right">
          <div className="pindetails-right-header">
            <div className="pindetails-right-header-icons">
              <AiOutlineDownload />
              <span> Download</span>
            </div>
            <div>
              {currentUser && details?.author?.id !== currentUser.uid && (
                <button
                  type="button"
                  className="pindetils-right-button"
                  onClick={savePost}
                >
                  {saved !== false ? "Save" : "Unsave"}
                </button>
              )}
              {currentUser && details?.author?.id === currentUser.uid && (
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
              <h1>{details?.title}</h1>
              <p>{details?.postText}</p>
              <span>Upload By :-</span>
              <div className="pindetails-right-userInfo">
                <Link
                  to={`/userprofile/${details?.author?.id}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <div className="pindetails-right-user">
                    <img src={details?.author?.userimg} alt="" />
                    <h2>{details?.author?.name}</h2>
                  </div>
                </Link>
                {currentUser && details?.author?.id !== currentUser.uid && (
                  <button
                    type="button"
                    className="pindetails-right-user-button"
                    onClick={() => friendHandler(details?.author?.id)}
                  >
                    Follow
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="more-pins-conatiner">
        <h1>More like this</h1>
        <Masnory />
      </div>
    </Wrapper>
  );
};

export default PinDetail;

const Wrapper = styled.div`
  align-items: center;
  justify-content: center;
  width: 100%;
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
