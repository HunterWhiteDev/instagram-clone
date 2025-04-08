import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { auth, db } from "./firebase";
import { Button, Input, Modal } from "@material-ui/core";
import ImageUpload from "./ImageUpload";

function App() {
  const [open, setOpen] = useState<boolean>(false);
  const [openSignIn, setOpenSignIn] = useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
        if (authUser.displayName) {
          //no update
        } else {
          return authUser.updateProfile({ displayName: username });
        }
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          })),
        );
      });
  }, []);

  const signUp = (event: React.FormEvent) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
  };

  const signIn = (event: React.FormEvent) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email as string, password as string)
      .catch((error) => alert(error.message));
    setOpenSignIn(false);
  };

  return (
    <div className="app">
      {/* @ts-ignore*/}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="app__modal">
          <div className="modal__content">
            <img
              className="app__headerImage"
              src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
            />
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="text"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={signUp}>Sign Up</Button>
          </div>
        </div>
      </Modal>
      {/* @ts-ignore*/}
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div className="app__modal">
          <div className="modal__content">
            <img
              className="app__headerImage"
              src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
            />
            <Input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="text"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={signIn}>Sign In</Button>
          </div>
        </div>
      </Modal>
      {/* Header */}
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />

        {user ? (
          <h3 className="app__welcomeText">Welcome, {user?.displayName}</h3>
        ) : (
          <h3 className="app__welcomeText">Welcome to Instagram</h3>
        )}

        {user ? (
          <Button onClick={() => auth.signOut()}>SIGN OUT</Button>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpen(true)}>SIGN UP</Button>
            <Button onClick={() => setOpenSignIn(true)}>SIGN IN</Button>
          </div>
        )}
      </div>
      <div className="app__posts">
        {posts.map(({ id, post }) => (
          <Post
            key={id}
            postId={id}
            username={post?.username}
            imageUrl={post?.imageUrl}
            caption={post?.caption}
            user={user}
          />
        ))}
      </div>

      {user?.displayName ? (
        <ImageUpload username={user?.displayName} />
      ) : (
        <div className="app__loginPrompt">
          <h3>You need to be logged in to make a post</h3>
        </div>
      )}
    </div>
  );
}

export default App;
