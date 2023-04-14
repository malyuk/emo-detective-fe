import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";

const roles = [
  {
    value: "Student",
    label: "Student",
  },
  {
    value: "Teacher",
    label: "Teacher",
  },
];

export default function AddLesson() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [apiResponse, setApiResponse] = useState("");

  const handleSignup = async () => {
    const payload = {
      name: name,
      email: email,
      password: password,
      role: role,
    };
    console.log(payload);
    // let result = null;
    // try {
    //   result = await fetch(`http://localhost/createUser`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(payload),
    //   });
    // } catch (error) {
    //   setApiResponse(`Download error: ${error.message}`);
    // }
    // if (result) {
    //   const jsonData = await result.json();
    //   setApiResponse(jsonData);
    // }
  };

  return (
    <>
      <form onSubmit={handleSignup}>
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
                Add Lesson
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                select
                fullWidth
                name="role"
                label="Role"
                type="role"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                {roles.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </FormControl>
          </Box>
        </Container>
      </form>
    </>
  );
}
