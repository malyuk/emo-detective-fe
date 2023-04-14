import * as React from 'react';
import Button from '@mui/material/Button';
import LessonCard from './LessonCard';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react'

const theme = createTheme();

export default function Lessons() {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {

    fetch(`https://emo-detective-be.ue.r.appspot.com/lessons`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLessons(data);
      })
      .catch(console.error);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h2"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Teacher Dashboard
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Bring more focus instead of distraction to your classroom
            </Typography>

            <div>
              <Grid container spacing={4}>
                {lessons === null && <p> Loading...</p>}
                {lessons.length === 0 ? (
                  <div className="mt-5">
                    <h3>No lessons here</h3>
                    <Link to="/AddLesson">
                      <Button
                        variant="outlined"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Add Lesson
                      </Button>
                    </Link>
                  </div>
                ) : (
                  lessons.map((lesson) => {
                    return (<Grid item key={lesson.id} xs={12} sm={6} md={4} >
                      <LessonCard sx={{ height: '80%', display: 'flex', flexDirection: 'column' }}
                        lessonName={lesson.lessonName} lessonDate={lesson.lessonDate} />
                    </Grid>)
                  })
                )
                }
              </Grid>
            </div>

            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Link href="/AddLesson">
                <Button variant="outlined">Add Lesson</Button>
              </Link>
            </Stack>
          </Container>
        </Box>
      </main>
    </ThemeProvider >
  );
}

























