import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Chip from '@mui/material/Chip';
import CNBC from '../assets/logos/CNBC.png';
import ST from '../assets/logos/ST.png';
import YAHOO from '../assets/logos/YAHOO.png';


const mappings = {
  'Straits_Times': ST,
  'CNBC': CNBC,
  'Yahoo': YAHOO
}
function IndivPost({title, url, publisher, keywords, date, id, selectNode}) {
  return (
      <Grid container spacing={1} paddingTop={1}>
          <Card 
            sx={{
              width: 525,
              backgroundColor: '#333',
              borderRadius: 4
          }}>
            <CardActionArea onClick = {() => window.open(`${url}`)}  >
              <CardContent 
                sx={{
                  display: 'flex', 
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingBottom: 0
              }}>
                <CardMedia
                  component="img"
                  sx={{ maxWidth: 50, maxHeight: 50 }}
                  image={mappings[publisher]}
                  alt={publisher}
                />
                <Typography 
                  sx={{
                    color: '#F3F3F3',
                    padding: '5px 0 5px 20px'
                  }} 
                  variant="h8" 
                  component="div" 
                >
                  {title.length > 150 ? title.substring(0, 150) + "...": title}
                </Typography>
              </CardContent>
            </CardActionArea>
          <CardContent sx={{paddingTop: 0}}>
            {keywords.map((element, index) => (
              <Chip 
                key={index} 
                label={element} 
                variant="outlined" 
                sx={{ 
                  color: '#AAA',
                  marginRight: '8px', 
                  marginTop: '8px',
                  fontSize: '8.5px',
                  height: '24px'
                }}
                onClick={()=>selectNode(element)}
              /> 
            ))}
          </CardContent>
        </Card>
      </Grid>
  )
}

export default IndivPost