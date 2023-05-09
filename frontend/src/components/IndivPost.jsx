import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Chip from '@mui/material/Chip';
import thumbnail from '../assets/thumbnail.jpg';

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
        
          <Card sx={{display: 'flex', maxWidth: 525}}>
          <CardMedia
              component="img"
              sx={{ width: 100 }}
              image={thumbnail}
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
                  <Chip key={index} label={element} variant="outlined" sx={{ marginRight: '8px', marginTop: '8px'}}/> 
                ))}
              </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
  )
}

export default IndivPost