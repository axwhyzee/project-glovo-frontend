import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import {Box, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import Divider from '@mui/material/Divider';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
/**
 * title
 * url
 * publisher
 * date
 * keywords
 */


function IndivPost({title, url, publisher, keywords, date, id}) {
  const navigate = useNavigate()
  return (
      <Grid container spacing={1} >
          <Card sx={{ maxWidth: 345 }}>
          <CardActionArea onClick = {() => window.location.replace(`${url}`)}  >
            <CardMedia
              component="img"
              height="140"
              image="https://i.natgeofe.com/n/665bbbca-1316-48b6-bce1-1ccb984a7546/0000014e-7468-d37e-a7de-ffe951310001_3x2.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {publisher}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
  )
}

export default IndivPost