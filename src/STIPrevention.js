import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, IconButton, Container } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function STIPrevention({ setPage }) {
    const [selectedArticle, setSelectedArticle] = useState(null);

    const articles = [
        { title: "STI Prevention 101", 
        content: (
            <div>
                <h2>STI Prevention: A Brief Introduction</h2>
                <p><strong>1. Understand the Basics:</strong> STIs, or sexually transmitted infections, are diseases passed from one person to another through intimate physical contact and sexual activity. 
                Prevention is paramount to ensuring one's sexual health. </p>
                <h3>2. Safe Practices:</h3>
                <ul>
                    <li><strong>Barrier Methods:</strong> Using condoms (male or female) consistently and correctly is one of the most effective ways to prevent STIs.</li>
                    <li><strong>Know Your Status:</strong> Regular STI screenings can identify an infection early. Early detection often means easier treatment and less risk of passing it on.</li>
                </ul>
                <p><strong> 3. Limit Number of Partners: </strong> The more partners you have, the higher the risk. Knowing and discussing your partners' sexual health can decrease risks. </p>
                <p><strong>4. Vaccinate: </strong> There are vaccines available for certain STIs like HPV and Hepatitis B. Ensure you're up to date with vaccinations. </p>
                <p><strong> 5. Educate Yourself:</strong> Stay informed about the different types of STIs, symptoms, and ways they're transmitted. Knowledge is a powerful tool for prevention. </p>
                <p><strong> 6. Avoid Drug or Alcohol Abuse: </strong> Substance abuse can impair judgement and lead to risky sexual behavior. Stay clear-headed and make informed choices.</p>
                <p>In a world where STIs are still stigmatized, taking charge of your sexual health is a form of self-respect and respect for partners. Stay safe, stay informed.</p>
            </div>
        )
    },
        // ... other articles
    ];

    if (selectedArticle) {
        return (
            <Container style={{ paddingTop: '50px' }}>
                <Box display="flex" alignItems="center" marginBottom={4} justifyContent="flex-start">
                    <IconButton onClick={() => setSelectedArticle(null)}>
                        <ArrowBackIcon />
                    </IconButton>
                </Box>
                <Typography variant="h4" gutterBottom>
                    {selectedArticle.title}
                </Typography>
                <Typography variant="body1">
                    {selectedArticle.content}
                </Typography>
            </Container>
        );
    }

    return (
        <Container style={{ paddingTop: '50px', paddingBottom: '50px' }}>
            <Box display="flex" alignItems="center" marginBottom={4} justifyContent="flex-start">
                <IconButton onClick={() => setPage('dashboard')}>
                    <ArrowBackIcon />
                </IconButton>
            </Box>
            <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
                {articles.map((article, index) => (
                    <Card 
                        key={index} 
                        style={{ width: '300px', margin: '8px', height:'175px', cursor: 'pointer' }} 
                        onClick={() => setSelectedArticle(article)}
                    >
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                {article.title}
                            </Typography>
                            <Typography variant="body2">
                                {article.content}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Container>
    );
}

export default STIPrevention;
