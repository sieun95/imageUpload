/* eslint-disable jsx-a11y/alt-text */
import React, { useContext } from "react";
import { ImageContext } from "../context/ImageContext";

const ImageList = () => {
  // const [images, setImages] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4000/images")
  //     .then((result) => setImages(result.data))
  //     .catch((err) => console.error(err));
  // }, []);
  const [images] = useContext(ImageContext);
  const imgList = images.map((image) => (
    <img
      key={image.key}
      style={{ width: "100%", height: "60%" }}
      src={`http://localhost:4000/uploads/${image.key}`}
    />
  ));
  return (
    <div>
      <h3>Image List</h3>
      {imgList}
    </div>
  );
};

export default ImageList;
