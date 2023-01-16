import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Header from "./Components/Header";
import Blog from "./Components/Blog";
import ChatSection from "./Components/ChatSection";
import PinDetail from "./Components/PinDetail";
import UserProfile from "./Components/UserProfile";
import Feed from "./Components/Feed";
import styled from "styled-components";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserAuth } from "./context/AuthContext";
import ProtectedAuth from "./Components/ProtectedAuth";


function App() {
  const { currentUser } = UserAuth();
  return (
    <>
      <ToastContainer position="top-center" limit={0} />
      <BrowserRouter>
        <Wrapper>
          {
            currentUser ? (
              <div className="upper">
                <Header />
              </div>
            ) : (
              null
            )
          }
          <div className="bottom">
            <Routes>
              <Route path="/" element={
                <ProtectedAuth>
                  <Feed />
                </ProtectedAuth>
              } />
              <Route path="/blog" element={
                <ProtectedAuth>
                  <Blog />
                </ProtectedAuth>
              } />
              <Route path="/chats" element={
                <ProtectedAuth>
                  <ChatSection />
                </ProtectedAuth>
              } />
              <Route path="/pindetails/:id" element={
                <ProtectedAuth>
                  <PinDetail />
                </ProtectedAuth>
              } />
              <Route path="/userprofile/:id" element={
                <ProtectedAuth>
                  <UserProfile />
                </ProtectedAuth>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </Wrapper>
      </BrowserRouter>
    </>
  );
}

export default App;
const Wrapper = styled.div`
 .upper{
  padding-bottom: 85px;
 }
 .bottom{
  padding: 0 5px 0 5px;
 }
`;
