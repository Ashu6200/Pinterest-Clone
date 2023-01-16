import React from "react";
import { FaBell } from "react-icons/fa";
import { BsFillChatRightTextFill } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assest/Logo.png";
import CreatePin from "./CreatePin";
import CreateBlog from "./CreateBlog";
import { UserAuth } from "../context/AuthContext";
const Header = () => {
  const { currentUser } = UserAuth();
  return (
    <Wrapper>
      <div className="header-left">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <div className="header-left-bar">
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <span className="header-text">Pins</span>
          </Link>
          <Link to="/blog" style={{ textDecoration: "none", color: "black" }}>
            <span className="header-text">Blogs</span>
          </Link>
          <CreatePin />
          <CreateBlog />
        </div>
      </div>
      <div className="header-center">
        <div className="searchBar">
          <CiSearch />
        </div>
        <input type="text" placeholder="Seach..." />
      </div>
      <div className="header-right">
        <FaBell />
        <Link to="/chats" style={{ textDecoration: "none", color: "black" }}>
          <BsFillChatRightTextFill style={{ fontSize: "28px" }} />
        </Link>
        <Link
          to={`/userprofile/${currentUser.uid}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <img src={currentUser.photoURL} alt="/" />
        </Link>
      </div>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  height: 80px;
  width: 100vw;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  gap: 15px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.1);
  z-index: 1000;
  .header-left {
    display: flex;
    gap: 3px;
    font-size: 15px;
    font-weight: 700;
    font-family: Arial, Helvetica, sans-serif;
    padding-left: 20px;
    gap: 10px;
    img {
      width: 50px;
      justify-content: center;
      align-items: center;
      padding-right: 10px;
    }
    .header-left-bar {
      display: flex;
      gap: 15px;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      .header-text {
        & :hover {
          background-color: black;
          color: white;
        }
      }
    }
    span {
    }
  }
  .header-center {
    display: flex;
    align-items: center;
    width: 60%;
    input {
      background-color: #cfd2cf;
      border-radius: 0 40px 40px 0;
      display: flex;
      width: 100%;
      height: 50px;
      border: none;
      outline: none;
    }
    .searchBar {
      display: flex;
      background-color: #cfd2cf;
      height: 52px;
      align-items: center;
      justify-content: center;
      padding-left: 10px;
      padding-right: 10px;
      border-radius: 40px 0 0 40px;
      font-size: 25px;
      font-weight: 800;
    }
  }
  .header-right {
    font-size: 30px;
    font-weight: bolder;
    padding-left: 20px;
    padding-right: 20px;
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 25px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
`;
