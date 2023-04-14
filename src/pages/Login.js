import React from "react";
// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// const firebaseConfig = {
//   apiKey: "",
//   authDomain: "t",
//   projectId: "",
//   storageBucket: "",
//   messagingSenderId: "",
//   appId: "",
// };

// const roles = [
//   {
//     value: "Student",
//     label: "Student",
//   },
//   {
//     value: "Teacher",
//     label: "Teacher",
//   },
// ];

export default function Login() {
  // const app = initializeApp(firebaseConfig);
  // const auth = getAuth(app);
  // const [name, setName] = useState("");
  // const [password, setPassword] = useState("");
  // const [role, setRole] = useState("");

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
                Login with Google
              </Button>
            </FormControl>
          </Box>
        </Container>
      </form>
    </>
  );
}
