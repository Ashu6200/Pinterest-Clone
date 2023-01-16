import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
const Blog = () => {
  const { currentUser } = UserAuth();
  const [blogLists, setBlogLists] = useState([]);
  const blogCollectionRef = collection(db, "BlogsPost");
  const deleteBlog = async (id) => {
    const postDoc = doc(db, "BlogsPost", id);
    await deleteDoc(postDoc);
    toast.success(`Blog deleted successfully`);
    window.location.reload();
  };
  useEffect(() => {
    const getBlog = async () => {
      const data = await getDocs(query(blogCollectionRef));
      setBlogLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getBlog();
  }, [deleteBlog]);
  const [saved, setSaved] = useState(false);
  const profileRef = doc(db, "users", currentUser.uid);
  const saveBlog = async (id) => {
    try {
      setSaved(!saved);
      await updateDoc(profileRef, {
        savedBlog: arrayUnion("greater_virginia"),
      });
      toast.success("Blog is Saved");
    } catch (error) {
      toast.error("Unable to save Blog");
    }
  };

  return (
    <Wrapper style={{ display: "flex" }}>
      {blogLists &&
        blogLists.map((blog) => {
          return (
            <div className="Blog-container" key={blog.id}>
              <div className="Blog-header">
                {currentUser && blog.author.id === currentUser.uid && (
                  <button
                    className="Blog-button"
                    style={{ backgroundColor: "#cfd2cf", color: "black" }}
                    onClick={() => {
                      deleteBlog(blog.id);
                    }}
                  >
                    Delete
                  </button>
                )}
                {currentUser && blog.author.id !== currentUser.uid && (
                  <button
                    className="Blog-button"
                    onClick={() => {
                      saveBlog(blog.id);
                    }}
                  >
                    {saved ? "save" : " unsaved "}
                  </button>
                )}
              </div>
              <div className="Blog-BlogInfo">
                <div>
                  <h1>{blog.title}</h1>
                  <p>{blog.postText}</p>
                  <span>Upload By :-</span>
                  <div className="Blog-userInfo">
                    <Link
                      to={`/userprofile/${blog.author.id}`}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <div className="Blog-user">
                        <img src={blog.author.userimg} alt="" />
                        <h2>{blog.author.name}</h2>
                      </div>
                    </Link>
                    {currentUser && blog.author.id !== currentUser.uid && (
                      <button className="Blog-user-button">Follow</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </Wrapper>
  );
};

export default Blog;

const Wrapper = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 30px;
  .Blog-container {
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
            object-fit: cover;
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
