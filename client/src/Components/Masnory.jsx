import React, { useEffect, useState } from "react";
import { Masonry } from "@mui/lab";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";

const Masnory = () => {
  const [imageLists, setImageLists] = useState([]);
  const imagesCollectionRef = collection(db, "ImagePost");
  useEffect(() => {
    const getImage = async () => {
      const data = await getDocs(query(imagesCollectionRef));
      setImageLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getImage();
  }, []);

  return (
    <Wrapper>
      <Masonry columns={5} spacing={2}>
        {imageLists &&
          imageLists.map((image) => (
            <div key={image.id}>
              <Link
                to={`/pindetails/${image.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <img
                  src={`${image.image}?w=162&auto=format`}
                  srcSet={`${image.image}?w=162&auto=format&dpr=2 2x`}
                  alt={image.title}
                  style={{
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    display: "block",
                    width: "100%",
                  }}
                />
              </Link>
              <div className="feed-pin-details">
                <Link
                  to={`/userprofile/${image.author.id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div className="feed-pin-details-left">
                    <img src={image.author.userimg} alt="/" />
                    <span>{image.author.name}</span>
                  </div>
                </Link>
              </div>
            </div>
          ))}
      </Masonry>
    </Wrapper>
  );
};

export default Masnory;

const Wrapper = styled.div`
  .feed-pin-details {
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .feed-pin-details-left {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    justify-items: center;
    gap: 5px;
    img {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .feed-button {
    border-radius: 20px;
    padding: 10px;
    color: white;
    font-weight: bold;
    background-color: #e51106;
    outline: none;
    border: none;
    cursor: pointer;
  }
`;
