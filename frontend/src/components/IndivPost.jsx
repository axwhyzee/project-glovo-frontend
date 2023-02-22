import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import {Box } from '@mui/material';
/**
 * title
 * url
 * publisher
 * date
 * keywords
 */


function IndivPost({title, url, publisher, keywords, date, id}) {
  return (
    <Card sx={{ 
        width: "50%", 
        height: "60%", 
        margin: 1, 
        padding:1, 
        display: "flex", 
        flexDirection:"column", 
        boxShadow:"5px 5px 10px #ccc" 
    }}>
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          R
        </Avatar>
      }
    //   action={
    //     <IconButton aria-label="settings">
    //       {<EditLocationAltIcon />}
    //     </IconButton>
    //   }
      title={title}
      header = {title}
      subheader={date }
    />
    {/**Bascially, if we are note passing in a static image, we need to change image="" to src="" */}
    {/* <img
      height="194"
      src={image}
      alt={title}
    /> */}
    <CardContent>
      <Typography paddingBottom={1} variant="h6" color="text.secondary">
        {title}
      </Typography>
      <hr />
      <Box paddingTop={1} display="flex">
        <Typography width="170px" fontWeight={"bold"} variant="caption">
            {publisher}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {keywords}
        </Typography>
      </Box>
    </CardContent>
    </Card>
  )
}

export default IndivPost