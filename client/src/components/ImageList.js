import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ImageContext } from "../context/ImageContext";
import "./ImageList.css";

const ImageList = () => {
  const { images, myImages, isPublic, setIsPublic } = useContext(ImageContext);
  const [me] = useContext(AuthContext);
  const imgList = (isPublic ? images : myImages).map((image) => (
    <Link key={image.key} to={`/images/${image._id}`}>
      <img
        alt=""
        key={image.key}
        src={`http://localhost:4000/uploads/${image.key}`}
      />
    </Link>
  ));
  return (
    <div>
      <h3 style={{ display: "inline-block", marginRight: 10 }}>
        Image List ({isPublic ? "공개" : "개인사진"} 사진)
      </h3>
      <button onClick={() => setIsPublic(!isPublic)}>
        {(isPublic ? "개인사진 " : "공개 ") + "사진 보기"}
      </button>
      <div className="image-list-container">{imgList}</div>
    </div>
  );
};

export default ImageList;
