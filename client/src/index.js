import React, { useState } from 'react';
import REACTDOM from 'react-dom';

import './index.css';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';

import App from './App';

function Main() {
    const [darkMode, setDarkMode] = useState(true);
    const currentTheme = darkMode ? darkTheme : lightTheme;

    return (
        <ThemeProvider theme={currentTheme}>
            <App darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
        </ThemeProvider>
    );
}

// Adding a Google Font for aesthetics
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

REACTDOM.render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>,
    document.getElementById('root')
);
