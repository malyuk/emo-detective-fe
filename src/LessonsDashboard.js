import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }



// const cards = [1, 2, 3];
const theme = createTheme();

export default function Lessons() {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    if (lessonId) {
      fetch(``)
        .then((response) => response.json())
        .then((data) => {
          setLesson(data.);
        })
        .catch(console.error);
    }
  }, [lessonId]);



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Teacher Dashboard
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Some short description for this screen
            </Typography>

          </Container>
        </Box>

        {!}


        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                {/* <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    image="https://source.unsplash.com/random/?colors#<%+new Date().getTime()%>"
                    alt="colors"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading for the Lesson
                    </Typography>
                    <Typography>
                      Lesson date and time
                    </Typography>
                  </CardContent>
                </Card> */}
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>


      <Button
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Add Lesson
      </Button>
    </ThemeProvider>
  );
}