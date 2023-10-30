import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#6200ea'
        },
    },
    typography: {
        fontFamily: "'Poppins', sans-serif"
    }
});

const darkTheme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#ffffff'
        },
        background: {
            default: '#121212',  // This sets the default background color
        },
        text: {
            default: '#ffffff',  // This sets the primary text color to white
        }
    },
    typography: {
        fontFamily: "'Poppins', sans-serif",
        
    }
});


export { lightTheme, darkTheme };
