import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';


export default function LessonCard({ lessonName, lessonDate }) {
  return (
    <Card
      sx={{ maxWidth: 345 }}
    >
      <CardMedia
        component="img"
        height="180"
        image="https://source.unsplash.com/random/?school#<%+new Date().getTime()%>"
        alt="school"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {lessonName}
        </Typography>
        <Typography>
          {lessonDate}
        </Typography>
      </CardContent>
    </Card>
  );
}



