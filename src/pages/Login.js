import React, { useContext, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { UserContext } from "../App";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
};

export default function Login() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const { setUser } = useContext(UserContext);

  const loginWithGoogle = (event, role) => {
    event.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((response) => {
        let userObj = {
          role: role,
          userId: response.user.uid,
          email: response.user.email,
        };
        console.log(userObj);
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userObj),
        })
          .then((apiResponse) => apiResponse.json())
          .then((data) => {
            response.user.getIdToken();
            setUser(data);
          })
          .catch(alert);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <form>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <Typography component="h1" variant="h5">
                LOGIN
              </Typography>
              <Button
                onClick={(e) => {
                  loginWithGoogle(e, "student");
                }}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Student Login
              </Button>
              <Button
                onClick={(e) => {
                  loginWithGoogle(e, "teacher");
                }}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Teacher Login
              </Button>
            </FormControl>
          </Box>
        </Container>
      </form>
    </>
  );
}
