import React, { useState } from "react";
import { storage, db } from "./firebase";
import firebase from "firebase";
import "./ImageUpload.css";
function ImageUpload({ username }) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCpation] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            setProgress(0);
            setCpation("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageupload__Container">
      <div className="imageupload">
        <progress
          className="imageupload__progress"
          value={progress}
          max="100"
        />
        <input
          type="text"
          onChange={(e) => setCpation(e.target.value)}
          placeholder="Enter a caption..."
        ></input>
        <input type="file" onChange={handleChange}></input>
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
}

export default ImageUpload;
