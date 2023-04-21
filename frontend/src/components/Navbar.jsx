import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from '@mui/material'
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {
    const navigate = useNavigate()
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
      };
    return (
        <AppBar position='static' style={{ background: '#83B8FF' }} >
            <Toolbar >
                <IconButton size='large' edge="start" color='inherit' aria-label='logo' onClick={() => navigate("/")}>
                    <AnalyticsIcon></AnalyticsIcon>
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Project Glovo
                </Typography>
                <Stack direction="row" spacing={1}>
                    <Button color='inherit' onClick={() => navigate("/about")} >About us</Button>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar