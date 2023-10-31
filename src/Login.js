import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Box, Typography, Paper } from '@mui/material';



function Login(props) {
    const history=useNavigate();

    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');

    const handleSubmitWithErrorHandling = async (event) => {
        event.preventDefault();
        const loginFailed = await handleSubmit(); // Assuming handleSubmit returns a boolean indicating success/failure

        if (loginFailed) {
            setError('Invalid password or email');
        } else {
            setError(''); // Reset the error if there's a successful login
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const endpoint = isSignup ? 'http://localhost:3000/signup' : 'http://localhost:3000/login';
        console.log("Form submitted");
        history('/home'); // Replace '/main' with the actual route to your main page

        try {
            const response = await axios.post(endpoint, formData);
            if (response.data.token) {
                // Store the token in local storage or session storage
                localStorage.setItem('authToken', response.data.token);

                if (isSignup) {
                    setTimeout(() => {
                        // Redirect or show some success message
                        props.onSuccess();
                    }, 2000); // Wait for 2 seconds before redirecting or hiding the login/signup form
                } else {
                    // If it's login, do as usual
                    history('/home'); // Replace '/main' with the actual route to your main page
                    props.onSuccess();
                }
            }
        } catch (error) {
            console.error("Error during auth:", error.response.data.message);
        }
    };

    const handleContinueAsGuest = () => {
        history('/home');  // Navigate to the home/main page
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100vh"
            >
                
                <Paper elevation={3} style={{ padding: '20px', borderRadius: '8px' }}>
                    <Typography component="h1" variant="h5">
                        {isSignup ? 'Sign Up' : 'Login'}
                    </Typography>
                    <Box component="form" mt={2} onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                         {error && (
                            <Typography variant="body2" color="error" style={{ textAlign: 'center', marginTop: '10px' }}>
                                {error}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{ marginTop: '16px' }}
                        >
                            {isSignup ? 'Sign Up' : 'Login'}
                        </Button>
   
                        <Button 
                            color="secondary"
                            fullWidth
                            style={{ marginTop: '10px' }}
                            onClick={() => setIsSignup(prev => !prev)}
                        >
                            {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
                        </Button>
                        
                    </Box>    
                </Paper>
            </Box>
        </Container>
        );
    }
export default Login;
