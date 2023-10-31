// src/Settings.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Container, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Settings({ darkMode, toggleDarkMode, setPage }) {
    const { register, handleSubmit } = useForm();
    const [localDarkMode, setLocalDarkMode] = useState(darkMode);

    const onSubmit = (data) => {
        console.log(data);
        // Check if the dark mode value has changed
        if (localDarkMode !== darkMode) {
            toggleDarkMode();
        }
        // Here, handle other form submission tasks (e.g., update user data, etc.)
    };

    return (
        <Container style={{ paddingTop: '50px', paddingLeft: '225px', paddingRight: '225px', paddingBottom: '50px' }}>

            <form onSubmit={handleSubmit(onSubmit)}>

                <Box display="flex" alignItems="center" marginBottom={4} justifyContent="flex-start" marginLeft="-100px">
                    <IconButton onClick={() => setPage('home')}>
                        <ArrowBackIcon />
                    </IconButton>
                </Box>

                <Typography variant="h4" color="secondary" style={{ paddingBottom: 16 }}>
                        Settings
                </Typography>

                {/* Personal Information */}
                <Box mb={4} color="secondary">
                    <Typography variant="h6"  gutterBottom>
                        Personal Information
                    </Typography>
                    <TextField fullWidth label="Name" {...register("name")} margin="normal" />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="gender-label">Gender</InputLabel>
                        <Select labelId="gender-label" {...register("gender")}>
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField fullWidth label="Email Address" {...register("email")} type="email" margin="normal" />
                    <TextField fullWidth label="Password" {...register("password")} type="password" margin="normal" />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="location-label">Location</InputLabel>
                        <Select labelId="location-label" {...register("location")}>
                            {/* You can fetch and map a list of US counties here */}
                            <MenuItem value="County1">County1</MenuItem>
                            <MenuItem value="County2">County2</MenuItem>
                            {/* Add other counties... */}
                        </Select>
                    </FormControl>
                </Box>

                {/* Health Information */}
                <Box mb={4}>
                    <Typography variant="h6" gutterBottom>
                        Health Information
                    </Typography>
                    <TextField fullWidth label="Height" {...register("height")} margin="normal" />
                    <TextField fullWidth label="Weight" {...register("weight")} margin="normal" />
                    <TextField fullWidth label="Age" {...register("age")} type="number" margin="normal" />
                </Box>
        
                <Button variant="outlined" color="primary" type="submit">
                 Save Changes 
                </Button>
            </form>

            
        </Container>
    );
}

export default Settings;
