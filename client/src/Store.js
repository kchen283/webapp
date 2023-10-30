import React, { useState } from 'react';
import { Box, Button, Container, Card, CardContent, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Store({ setPage }) {
    const [selectedTest, setSelectedTest] = useState(null);

    const tests = [
        { id: 1, name: 'Test A', description: 'STD Test', price: '$50' },
        { id: 2, name: 'Test B', description: 'STD Test', price: '$60' },
        // Add more tests...
    ];

    const handleOrder = (test, method) => {
        setSelectedTest(test);
        // Here, you can handle different logic based on whether the "Deliver" or "Pickup" button was clicked.
        console.log(`Ordered test ${test.name} for ${method}`);
    }

    return (
        <Container style={{ paddingTop: '50px', paddingLeft: '225px', paddingRight: '225px', paddingBottom: '50px' }}>

        <Box display="flex" alignItems="center" marginBottom={4} justifyContent="flex-start" marginLeft="-100px">
            <IconButton onClick={() => setPage('home')}>
                <ArrowBackIcon />
            </IconButton>
        </Box>

        <Box>
            <Typography variant="h4">Order Tests</Typography>
            {tests.map(test => (
                <Card key={test.id} style={{ margin: '20px' }} alignItems="right">
                    <CardContent>
                        <Typography variant="h6">{test.name}</Typography>
                        <Typography>{test.description}</Typography>
                        <Box display="flex" justifyContent="flex-end">
                                <Button color="secondary" onClick={() => handleOrder(test, 'Order')} style={{ marginRight: '8px' }}>Deliver</Button>
                                <Button color="secondary" onClick={() => handleOrder(test, 'Deliver')} style={{ marginRight: '8px' }}>PickUp</Button>
                            </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
        </Container>
    );
}

export default Store;
