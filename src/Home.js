import React, { useState, useEffect } from 'react';

import Settings from './Settings';
import Store from './Store';
import STIPrevention from './STIPrevention';
import Checkin from './Checkin';
import Chat from './chat/Chat';
import DataDash from './dataDash';


import Button from '@mui/material/Button';
import { Box, Typography, Container } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';

function Home() {
    const [darkMode, setDarkMode] = useState(false);
    //const [authenticated, setAuthenticated] = useState(false);  // State for user authentication


    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    const currentTheme = darkMode ? darkTheme : lightTheme;
    const [page, setPage] = useState('dashboard');

    useEffect(() => {
        // Update the body's background color based on the theme
        document.body.style.backgroundColor = currentTheme.palette.background.default;
    }, [currentTheme]);


    if (page === 'settings') {
        return (
            <ThemeProvider theme={currentTheme}>
                <Settings darkMode={darkMode} toggleDarkMode={toggleDarkMode} setPage={setPage} />
            </ThemeProvider>
        );
    }
    
    if (page === 'DataDash') {
        return (
            <ThemeProvider theme={currentTheme}>
                <DataDash setPage={setPage} />
            </ThemeProvider>
        );
    }

    if (page === 'stiPrevention') {
        return (
            <ThemeProvider theme={currentTheme}>
                <STIPrevention setPage={setPage} />
            </ThemeProvider>
        );
    }

    if (page === 'store') {
        return (
            <Store setPage={setPage} />
        );
    }

    if (page === 'Checkin') {
        return (
            <Checkin setPage={setPage} />
        );
    }

    if (page === 'Chat') {
        return (
            <Chat setPage={setPage} />
        );
    }

    return (
        <ThemeProvider theme={currentTheme}>

        <Container style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: currentTheme.palette.background.default  }}>
           
            <Box textAlign="center" mb={4}>
                <Typography variant="h2" color="primary" gutterBottom>
                    Hi User,
                </Typography>
                <Typography variant="h4">
                    What do you want to do today?
                </Typography>
            </Box>
            <Box textAlign="center">
                <Button variant="outlined" color="primary" style={{ margin: '0 10px' }} onClick={() => setPage('Checkin')}>Check-In</Button>
                <Button variant="outlined" color="primary" style={{ margin: '0 10px' }} onClick={() =>  window.open('https://takemehome.org/how-it-works', '_blank')}>Order Tests</Button>
                <Button variant="outlined" color="primary" style={{ margin: '0 10px' }} onClick={() => setPage('Chat')}>Get Help/Medical Advice</Button>
                <Button variant="outlined" color="primary" style={{ margin: '0 10px' }} onClick={() => setPage('DataDash')}>View STI Dashboards</Button>
                <Button variant="outlined" color="primary" style={{ margin: '0 10px' }} onClick={()=> setPage('stiPrevention')}>Learn about STI Prevention</Button>
                <Button variant="outlined" color="primary" style={{ margin: '0 10px' }} onClick={() => setPage('settings')}>Settings</Button>
                
            </Box>
        </Container>
        </ThemeProvider>

    );
}

export default Home;
