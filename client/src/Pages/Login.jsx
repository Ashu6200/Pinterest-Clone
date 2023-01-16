import React from "react";
import styled from "styled-components";
import logo from "../assest/Logo.png";
import img from "../assest/bg2.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("You have successfully Logged In");
      navigate("/");
    } catch (error) {
      toast.error("You have errored. Please try again");
      console.log(error);
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
              Welcome to <span>LetsShare</span> LogIn
            </p>
            <form className="formArea" onSubmit={handleSubmit}>
              <label className="arealabel">Email</label>
              <input
                className="area-input"
                required
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
                label="Password"
                placeholder="Enter your password"
                style={{
                  border: "none",
                  borderRadius: "20px",
                  outline: "none",
                  paddingLeft: "20px",
                }}
              />
              <button type="submit">Login</button>
            </form>
            <Link to="/register" className="link-login">
              "Don't have an account? Register"
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;

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
