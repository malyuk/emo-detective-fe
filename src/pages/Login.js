import React, { useContext } from "react";
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
  apiKey: "AIzaSyDQLs0SdLx1FzA6yCruDoQBs1pzi9N0YAQ",
  authDomain: "emo-detective-be.firebaseapp.com",
  projectId: "emo-detective-be",
  storageBucket: "emo-detective-be.appspot.com",
  messagingSenderId: "600385549714",
  appId: "1:600385549714:web:9eef38621b28cea505fd4b",
};

export default function Login() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const { setUser } = useContext(UserContext);
  // const [role, setRole] = useState("");

  const loginWithGoogle = (event) => {
    event.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((response) => {
        let userObj = {
          role: "teacher",
          userId: response.user.uid,
        };
        console.log(userObj);
        fetch(`https://emo-detective-be.ue.r.appspot.com/users`, {
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
                // onClick={loginWithGoogle}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Student Login
              </Button>
              <Button
                onClick={loginWithGoogle}
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
