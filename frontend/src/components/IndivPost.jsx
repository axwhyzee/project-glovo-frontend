import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Chip from '@mui/material/Chip';

import Box from '@mui/material/Box'
/**
 * title
 * url
 * publisher
 * date
 * keywords
 */


function IndivPost({title, url, publisher, keywords, date, id}) {
  return (
      <Grid container spacing={1} >
        
          <Card sx={{display: 'flex', maxWidth: 500}}>
          <CardMedia
              component="img"
              sx={{ width: 100 }}
              image="https://i.natgeofe.com/n/665bbbca-1316-48b6-bce1-1ccb984a7546/0000014e-7468-d37e-a7de-ffe951310001_3x2.jpg"
              alt="green iguana"
            />
          <CardActionArea onClick = {() => window.open(`${url}`)}  >
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {title.length > 50 ? title.substring(0,50) + "...": title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Publisher: {publisher}
                </Typography>
                <p></p>
                <Typography variant="body2" color="text.primary">
                  Top Three Keywords:
                </Typography>
                {keywords.slice(0, 3).map((element, index) => (
                  <Chip key={index} label={element} variant="outlined" sx={{ marginRight: '8px' }}/> 
                ))}

                  
              </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
  )
}

export default IndivPost