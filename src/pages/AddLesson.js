import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function AddLesson() {
  const [dataTime, setDataTime] = useState("");
  const [name, setName] = useState("");
  const [studentsEmails, setStudentsEmails] = useState("");

  const createLesson = async () => {
    const payload = {
      name: name,
      dataTime: dataTime,
      studentsEmails: studentsEmails,
    };
    console.log(payload);
    // let result = null;
    // result = await fetch(`http://localhost/createUser`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(payload),
    // });
  };

  return (
    <>
      <form onSubmit={createLesson}>
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
                id="dataTime"
                label="Data/Time"
                name="dataTime"
                autoComplete="dataTime"
                autoFocus
                value={dataTime}
                onChange={(e) => setDataTime(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="studentsEmails"
                label="Students Emails"
                name="Students Emails"
                autoComplete="studentsEmails"
                autoFocus
                value={studentsEmails}
                onChange={(e) => setStudentsEmails(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create
              </Button>
            </FormControl>
          </Box>
        </Container>
      </form>
    </>
  );
}
