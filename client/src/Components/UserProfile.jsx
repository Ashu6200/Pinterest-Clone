import { signOut } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { UserAuth } from "../context/AuthContext";
import { UserPosts } from "../context/PostContext";
import { auth, db } from "../firebase";
import AccountBlogDetails from "./AccountBlogDetails";
import AccountPinDetails from "./AccountPinDetails";

const UserProfile = () => {
  const navigate = useNavigate();
  const { currentUser } = UserAuth();
  const { imageLists, blogLists } = UserPosts();
  const [openPinBlog, setOpenPinBlog] = useState("Created Pins");
  const [user, setUser] = useState();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const userCollectionRef = doc(db, "users", id);
  useEffect(() => {
    getDoc(userCollectionRef).then((doc) => {
      setUser(doc.data());
    });
  }, [id]);
  const [savePin, setSavePin] = useState([]);
  const [saveBlog, setSaveBlog] = useState([]);

  const handleLogout = async () => {
    try {
      signOut(auth);
      toast.success("You have logged out");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "users", `{${id}}`), (doc) => {
      doc.exists() && setSavePin(doc.data()?.savedPost);
    });
    return () => {
      unSub();
    };
  }, [id]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "users", `{${id}}`), (doc) => {
      doc.exists() && setSaveBlog(doc.data()?.savedBlog);
    });
    return () => {
      unSub();
    };
  }, [id]);
  return (
    <Wrapper>
      <div className="upperuser">
        <div className="userProfil-container">
          <div className="userContainer">
            <div className="userInfo">
              <img src={user?.photoURL} alt="/" />
              <h1>{user?.displayName}</h1>
            </div>
            <div className="userFollowerInfo">
              <div className="followerInfo">
                <span>20 </span>
                <span>Friend</span>
              </div>
            </div>
            <div className="userButton">
              {currentUser && id === currentUser.uid ? (
                <>
                  <button
                    type="button"
                    className="userButton-button"
                    style={{ backgroundColor: "#cfd2cf", color: "black" }}
                  >
                    Edit Profile
                  </button>
                  <button
                    type="button"
                    className="userButton-button"
                    onClick={handleLogout}
                  >
                    LogOut
                  </button>
                </>
              ) : (
                <Link to="/chats">
                  <>
                    <button
                      type="button"
                      className="userButton-button"
                      style={{ backgroundColor: "#cfd2cf", color: "black" }}
                    >
                      Follow
                    </button>
                    <button type="button" className="userButton-button">
                      Message
                    </button>
                  </>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        <button type="button" onClick={() => setOpenPinBlog("Created Pins")}>
          Created Pins
        </button>
        <button type="button" onClick={() => setOpenPinBlog("Created Blogs")}>
          Created Blogs
        </button>
        <button type="button" onClick={() => setOpenPinBlog("Saved Pins")}>
          Saved Pins
        </button>
        <button type="button" onClick={() => setOpenPinBlog("Saved blogs")}>
          Saved Blogs
        </button>
      </div>
      <div className="bottomuser">
        {openPinBlog === "Created Pins" && (
          <div className="Masnorysection">
            {imageLists
              .filter((post) => id === post?.author?.id)
              .map((pins) =>
                pins?.author?.id === id ? (
                  <AccountPinDetails item={pins} key={pins.id} />
                ) : (
                  <h3>You haven't created a Post yet!</h3>
                )
              )}
          </div>
        )}
        {openPinBlog === "Created Blogs" && (
          <div className="Masnorysection">
            {blogLists
              .filter((post) => id === post?.author?.id)
              .map((blogs) =>
                blogs?.author?.id === id ? (
                  <AccountBlogDetails item={blogs} key={blogs.id} />
                ) : (
                  <h3>You haven't created a Blog yet!</h3>
                )
              )}
          </div>
        )}
        {openPinBlog === "Saved Pins" && (
          <div className="Masnorysection">
            {savePin && savePin.map((Pin) => <AccountPinDetails items={Pin} />)}
          </div>
        )}
        {openPinBlog === "Saved blogs" && (
          <div className="Masnorysection">
            {saveBlog &&
              saveBlog.map((blog) => <AccountBlogDetails items={blog} />)}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default UserProfile;

const Wrapper = styled.div`
  width: 100%;
  .upperuser {
    background-color: white;
    .userProfil-container {
      display: flex;
      justify-content: center;
      .userContainer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .userInfo {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          img {
            width: 170px;
            height: 170px;
            border-radius: 50%;
            object-fit: cover;
          }
          h1 {
            font-family: Arial, Helvetica, sans-serif;
          }
        }
        .userFollowerInfo {
          display: flex;
          flex-direction: row;
          padding-right: 10px;
          padding-left: 10px;
          justify-content: center;
          gap: 20px;
          .followerInfo {
            span {
              gap: 5px;
              font-weight: 700;
              color: gray;
            }
          }
        }
        .userButton {
          display: flex;
          justify-content: center;
          margin-top: 30px;
          gap: 60px;
          .userButton-button {
            margin :0 2px 0 0;
            width: auto;
            padding: 18px;
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
  .section {
    gap: 20px;
    margin-top: 20px;
    display: flex;
    padding-top: 20px;
    justify-content: center;
    align-items: center;
    font-family: Arial, Helvetica, sans-serif;
    button {
      font-size: 18px;
      width: auto;
      padding: 18px;
      border-radius: 20px;
      background-color: transparent;
      color: black;
      font-weight: bold;
      outline: none;
      border: none;
      cursor: pointer;
      text-align: center;
    }
  }

  .bottomuser {
    .Masnorysection {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 100%;
      overflow: hidden;
      overflow-y: scroll;
    }
  }
`;
