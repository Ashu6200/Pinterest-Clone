import React, { useState } from "react";
import logo from "../assest/Logo.png";
import img from "../assest/bg2.png";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const date = new Date().getTime();
      const storageRef = ref(storage, `userPicture/${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
              friendlist: [],
              savedPost: [],
              savedBlog: [],
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            toast.success("User added Successfully");
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
            toast.error("user not added ");
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <img src={img} alt="/" className="bgImage" />
      <div style={{ position: "absolute", display: "flex" }}>
        <div className="auth-left">
          <img src={logo} alt="#" />
          <div className="auth-title">
            <h1>LetsShare</h1>
            <span>Explore the ideas throughout the world</span>
          </div>
        </div>
        <div className="auth-right">
          <p>
            Social media is not a media. The key is to listen, engage, and build
            relationships.
            <br />
          </p>
          <div>
            <p>
              Welcome to <span>LetsShare</span> Register
            </p>
            <form className="formArea" onSubmit={handleSubmit}>
              <label className="arealabel">Display Name</label>
              <input
                className="area-input"
                required
                label="Name"
                type="text"
                placeholder="Enter your Name"
                style={{
                  border: "none",
                  borderRadius: "20px",
                  outline: "none",
                  paddingLeft: "20px",
                }}
              />
              <label className="arealabel">Email</label>
              <input
                className="area-input"
                required
                type="text"
                label="Email"
                placeholder="Enter your Email"
                style={{
                  border: "none",
                  borderRadius: "20px",
                  outline: "none",
                  paddingLeft: "20px",
                }}
              />
              <label className="arealabel">Password</label>
              <input
                className="area-input"
                required
                type="password"
                label="Password"
                placeholder="Enter your password"
                style={{
                  border: "none",
                  borderRadius: "20px",
                  outline: "none",
                  paddingLeft: "20px",
                }}
              />
              <label className="arealabel">Add Avatar</label>
              <input type="file" className="area-input" />
              <button type="submit">Register</button>
              {loading && "Uploading and compressing the image please wait..."}
              {err && <span>Something went wrong</span>}
            </form>
            <Link to="/login" className="link-login">
              "Already have an account? Login"
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Register;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  .bgImage {
    position: relative;
    width: 100vw;
    height: 100vh;
  }
  .auth-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 20px;
    img {
      width: 20rem;
    }
    .auth-title {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      span {
        font-weight: 700;
      }
    }
  }
  .auth-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    align-items: center;
    gap: 20px;
    padding-left: 40px;
    p {
      width: 400px;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 20px;
      font-weight: 700;
    }
    div {
      p {
        font-weight: 700;
        span {
          color: #e51106;
        }
      }
      .formArea {
        display: flex;
        padding-top: 30px;
        flex-direction: column;
        .arealabel {
          display: flex;
          align-items: flex-start;
          padding-left: 10px;
        }
        .area-input {
          height: 30px;
          margin-bottom: 25px;
          outline: none;
          align-items: center;
          justify-items: center;
        }
        button {
          background-color: #e51106;
          font-weight: 600;
          padding: 10px;
          height: 40px;
          border-radius: 20px;
          color: white;
          outline: none;
          border: none;
          cursor: pointer;
        }
      }
      .link-login {
        text-decoration: none;
        color: black;
        margin-top: 10px;
      }
    }
  }
`;
