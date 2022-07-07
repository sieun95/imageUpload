import React from "react";
import ImageList from "../components/ImageList";
import UploadForm from "../components/UploadForm";

const MainPage = () => {
  return (
    <div>
      <h2>Photograph</h2>
      <UploadForm />
      <ImageList />
    </div>
  );
};

export default MainPage;
