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
/**
 * title
 * url
 * publisher
 * date
 * keywords
 */


function IndivPost({title, url, publisher, keywords, date, id}) {
  return (
    <Paper
    variant="outlined"
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: "100%",
        width: "100%",
        flexGrow: 1,
      
      }}
    >
      <Grid container spacing={1} >
        {/* <Grid item>
          <ButtonBase sx={{ width: 64, height: 64 }} >
            <img alt="small-box" src={"sth"} />
          </ButtonBase>
        </Grid> */}
        <Grid item xs={12}md={12} container >
          <Grid item ms container direction="column">
            <Grid item xs={12} md ={12}>
              <Typography gutterBottom variant="subtitle1" component="div">
                
              </Typography>
              <Typography sx={{width: "100%"}} component="legend">{title} {publisher}</Typography>
              
              <Typography sx={{ fontWeight: 'bold' }} variant="body1" gutterBottom>
                {url}
              </Typography>
              <Typography variant="body1" color="text.secondary">
              {/* <LocationOnIcon />{posts.location} {posts.days}  */}
              </Typography>
              <Typography variant="body1" color="text.primary">
              {date}
              </Typography>
              <Divider></Divider>
              <Typography variant="body1" color="text.secondary">
              keywords: {keywords}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        
      </Grid>
    </Paper>
  )
}

export default IndivPost