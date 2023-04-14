import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

// we'll need tpo add id, name inside lessoncard() ? 

export default function LessonCard() {
  return (
    <Card
      sx={{ maxWidth: 345 }}
    >
      <CardMedia
        component="img"
        height="180"
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
    </Card>

  );
}

