import React, { useState } from 'react';
import { Box, IconButton, Container, Typography, TextField, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

import Message from './Message';
import './Chat.css';

const ChatInterface = ({ setPage }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = async () => {
        if (!input.trim()) return; // prevent sending empty messages
        
        // Add user's message to the chat
        setMessages(prev => [...prev, { type: 'user', content: input.trim() }]);

        // Fetch response from backend (assuming you've set up the /ask endpoint as described before)
        try {
            const { data } = await axios.post('http://localhost:3000/ask', {
            message: input,
            messages: messages
        });
        setMessages(data.messages);

        } catch (error) {
            console.error("Error asking ChatGPT:", error);
        }

        setInput('');
        
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    };

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', paddingTop: '50px' }}>
            <Box sx={{ marginLeft: '-500px' }}>
                <IconButton onClick={() => setPage('home')}>
                    <ArrowBackIcon />
                </IconButton>
            </Box>
            <Typography paddingBottom="15px">
                Chat Bot
            </Typography>
            <div className="chat-container">
                <div className="chat-box">
                    {messages.map((msg, idx) => (
                        <Message key={idx} type={msg.type} content={msg.content} />
                    ))}
                </div>
                <div className="chat-input-container">
                    <TextField
                        className="chat-input"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        fullWidth
                        variant="outlined"
                        placeholder="Type a message..."
                    />
                    <Button className="send-button" onClick={sendMessage} variant="contained" color="primary">Send</Button>
                </div>
            </div>
        </Container>
    );
}

export default ChatInterface;
