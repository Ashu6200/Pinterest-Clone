import React, { useState } from "react";
import { styled as s } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { AiOutlineCloudUpload } from "react-icons/ai";
import styled from "styled-components";
import { UserAuth } from "../context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreatePin() {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  let navigate = useNavigate();
  const { currentUser } = UserAuth();
  const [image, setImage] = useState("");
  const [imagePre, setImagePre] = useState(null);
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const imageCollectionRef = collection(db, "ImagePost");
  const createPin = async () => {
    if (image !== null) {
      const storageRef = ref(storage, `postimage/${image.name + v4()}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          // switch (snapshot.state) {
          //   case "paused":
          //     console.log("Upload is paused");
          //     break;
          //   case "running":
          //     console.log("Upload is running");
          //     break;
          // }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            addDoc(imageCollectionRef, {
              title: title,
              postText: postText,
              image: downloadURL,
              author: {
                id: currentUser.uid,
                name: currentUser.displayName,
                email: currentUser.email,
                userimg: currentUser.photoURL,
              },
            });
          });
          setOpen(false);
          toast.success("Post have been successfully Created");
          navigate("/");
        }
      );
    } else {
      return;
    }
  };
  const contentHandler = () => {
    if (imagePre !== null) {
      setImagePre(null);
    }
  };
  return (
    <div>
      <span variant="outlined" onClick={handleClickOpen}>
        Create Pin
      </span>
      <BootstrapDialog onClose={handleClose} open={open}>
        <Wrapper>
          <div className="createPin-container">
            <div className="createPin-container-left">
              <div className="container-left-box">
                <>
                  {imagePre !== null ? (
                    <>
                      <img
                        src={imagePre}
                        style={{
                          width: "90%",
                          height: "250px",
                          objectFit: "cover",
                          borderRadius: "10px",
                          marginTop: "10px",
                        }}
                        alt=""
                      />
                      <button onClick={contentHandler}>Remove</button>
                    </>
                  ) : (
                    <>
                      <label>
                        <div className="input-area">
                          <div className="input-area-box ">
                            <p className="input-area-box-p1 ">
                              <AiOutlineCloudUpload />
                            </p>
                            <p className="input-area-box-p2">
                              Drag or Drop or click to upload
                            </p>
                          </div>
                          <p>
                            Recommendation: Use high-quality JPG, JPEG, SVG,
                            PNG, GIF or TIFF less than 20MB
                          </p>
                        </div>
                        <input
                          type="file"
                          name="upload-image"
                          onChange={(event) => [
                            setImage(event.target.files[0]),
                            setImagePre(
                              URL.createObjectURL(event.target.files[0])
                            ),
                          ]}
                        />
                      </label>
                    </>
                  )}
                </>
              </div>
            </div>
            <div className="container-input-right">
              <div className="userInfo">
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <img
                    src={currentUser.photoURL}
                    className="w-10 h-10 rounded-full"
                    alt="user-profile"
                  />
                  <p className="font-bold">{currentUser.displayName}</p>
                </div>
                <button type="button" onClick={handleClose}>
                  Close
                </button>
              </div>
              <span>Add title of your Pin</span>
              <input
                style={{ height: "50px" }}
                type="text"
                placeholder="Add your title"
                className="input-area1"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
              <span>Add description of your Pin</span>
              <textarea
                style={{ resize: " none", height: "200px" }}
                type="text"
                placeholder="Tell everyone what your Pin is about"
                className="input-area2"
                onChange={(event) => {
                  setPostText(event.target.value);
                }}
              />
              <div className="create-button-section">
                <div className="createPin-button-div ">
                  <button type="button" onClick={createPin}>
                    Save Pin
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      </BootstrapDialog>
    </div>
  );
}
const BootstrapDialog = s(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: "100%",
    maxWidth: "auto",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    width: "900px",
    maxWidth: "100%",
    borderRadius: "30px",
    overFlowX: "hidden",
  },
}));
const Wrapper = styled.div`
  display: flex;
  margin-top: 1.25rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .createPin-container {
    display: flex;
    padding: 0.75rem;
    background-color: #ffffff;
    flex-direction: row;
    justify-content: center;
    width: 90%;
    height: 90%;
    /* overflow: hidden; */
    .createPin-container-left {
      display: flex;
      padding: 0.75rem;
      width: 40%;
      .container-left-box {
        display: flex;
        padding: 0.75rem;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 90%;
        border-width: 2px;
        border-color: #d1d5db;
        border-style: dotted;
        border-radius: 30px;
        background-color: #cfd2cf;
        button {
          margin-top: 20px;
          padding: 0.5rem;
          background-color: #ef4444;
          color: #ffffff;
          font-weight: 700;
          width: 7rem;
          border-radius: 9999px;
          outline: none;
          border: none;
          cursor: pointer;
        }
        label {
          .input-area {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 70%;
            .input-area-box {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              .input-area-box-p1 {
                font-size: 1.5rem;
                line-height: 2rem;
                font-weight: 700;
              }
              .input-area-box-p2 {
                font-size: 1.125rem;
                color: black;
                line-height: 1.75rem;
              }
            }
            p {
              font-size: 12px;
              text-align: center;
              font-weight: 700;
              color: black;
              margin-top: 8rem;
            }
          }
          input {
            width: 0;
            height: 0;
          }
        }
      }
    }
    .container-input-right {
      display: flex;
      margin-top: 1.25rem;
      flex-direction: column;
      flex: 1 1 0%;
      width: 100%;
      gap: 1.5rem;
      .userInfo {
        display: flex;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        background-color: #ffffff;
        align-items: center;
        border-radius: 0.5rem;
        justify-content: space-between;
        gap: 0.5rem;
        img {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          object-fit: cover;
        }
        p {
          font-weight: bold;
        }
        button {
          display: flex;
          left: 30px;
          padding: 0.5rem;
          background-color: #ef4444;
          color: #ffffff;
          font-weight: 700;
          width: auto;
          border-radius: 9999px;
          outline: none;
          border: none;
          cursor: pointer;
        }
      }
      span {
        color: #ef4444;
        font-size: 15px;
        font-weight: 700;
      }
      .input-area1 {
        padding: 0.5rem;
        font-family: Arial, Helvetica, sans-serif;
        line-height: 2rem;
        font-weight: 700;
        outline: none;
        border: none;
        border-radius: 20px;
        border-bottom-color: black;
        :focus {
          box-shadow: 0 0 5px #e51106;
          padding: 3px 0px 3px 3px;
          margin: 5px 1px 3px 0px;
          border: 1px solid #e51106;
        }
      }

      .input-area2 {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 700;
        width: 100%;
        padding: 0.5rem;
        font-size: 0.7rem;
        line-height: 1.5rem;
        background-color: #ffffff;
        outline: none;
        border-radius: 20px;
        border: none;
        :focus {
          box-shadow: 0 0 5px #e51106;
          padding: 3px 0px 3px 3px;
          margin: 5px 1px 3px 0px;
          border: 1px solid #e51106;
        }
      }
      .create-button-section {
        .createPin-button-div {
          display: flex;
          margin-top: 1.25rem;
          justify-content: flex-end;
          align-items: flex-end;
          button {
            padding: 0.5rem;
            background-color: #ef4444;
            color: #ffffff;
            font-weight: 700;
            width: 7rem;
            border-radius: 9999px;
            outline: none;
            border: none;
            cursor: pointer;
          }
        }
      }
    }
  }
`;
