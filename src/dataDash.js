import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, ButtonGroup, Container, IconButton, Select, MenuItem } from '@mui/material';  
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function DataDash( {setPage} ) {
    const [data, setData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // <-- 1. useState for selected year
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [showNotification, setShowNotification] = useState(false);


    useEffect(() => {
        axios.get('https://web-app-backend-c4x4.onrender.com/patients')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);
    

    const transformData = (data, year, month) => {
        const groupedData = {};

        const filteredData = data.filter(d => {
            const date = new Date(d.date);
            return ((d.symptoms && d.symptoms.length > 0) || d.STI) && 
            date.getFullYear() === year && 
            (month === null || date.getMonth() === month);
        });
    
        filteredData.forEach(patient => {
            const state = patient.state;
            const gender = patient.gender;
    
            if (!groupedData[state]) {
                groupedData[state] = { Total: 1, Male: 0, Female: 0, Other: 0 };
            } else {
                groupedData[state].Total += 1;
            }
    
            if(gender === 'Male') groupedData[state].Male += 1;
            else if(gender === 'Female') groupedData[state].Female += 1;
            else groupedData[state].Other += 1; // for other genders
        });
    
        return Object.keys(groupedData).map(state => ({
            name: state, 
            Total: groupedData[state].Total,
            Male: groupedData[state].Male,
            Female: groupedData[state].Female,
            Other: groupedData[state].Other
        }));
    }
    
    
    
    

    const chartData = transformData(data, selectedYear, selectedMonth);

    useEffect(() => {
        const stateExceedsThreshold = chartData.some(item => item.Total > 2);
        setShowNotification(stateExceedsThreshold);
    }, [chartData]);

    {showNotification && (
        <Box mt={2} style={{ backgroundColor: "#f8d7da", borderColor: "#f5c2c7", padding: "10px", borderRadius: "4px" }}>
            It looks like cases are rising! Please get tested if you were sexually active in the past 7 days.
        </Box>
    )}

    return (
        <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', paddingTop: '50px' }}> 
            <div style={{ textAlign: 'center', display: 'inline-block' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: "185px"}}>
                    <IconButton onClick={() => setPage('home')}>
                        <ArrowBackIcon />
                    </IconButton>
                    <h2 style={{ marginLeft: '10px' }}>Dashboard</h2>
                </div>

                {/* 3. Dropdown or buttons to select year */}
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <Button onClick={() => setSelectedYear(2021)}>2021</Button>
                    <Button onClick={() => setSelectedYear(2022)}>2022</Button>
                    <Button onClick={() => setSelectedYear(2023)}>2023</Button>
                </ButtonGroup>
                <div style={{ margin: '10px 0' }}>
                    <Select
                        value={selectedMonth}
                        onChange={(event) => setSelectedMonth(event.target.value)}
                        displayEmpty
                        style={{margin: '10px'}}
                        color="primary"
                        size="small"
                    >
                        <MenuItem value={null}>All Months</MenuItem>
                        <MenuItem value={0}>January</MenuItem>
                        <MenuItem value={1}>February</MenuItem>
                        <MenuItem value={2}>March</MenuItem>
                        <MenuItem value={3}>April</MenuItem>
                        <MenuItem value={4}>May</MenuItem>
                        <MenuItem value={5}>June</MenuItem>
                        <MenuItem value={6}>July</MenuItem>
                        <MenuItem value={7}>August</MenuItem>
                        <MenuItem value={8}>September</MenuItem>
                        <MenuItem value={9}>October</MenuItem>
                        <MenuItem value={10}>November</MenuItem>
                        <MenuItem value={11}>December</MenuItem>

                    </Select>
                </div>
                    <h3>Statewise Patient Data for {selectedYear}</h3>
                    <BarChart
                        width={600}
                        height={400}
                        layout="vertical"
                        data={chartData}
                        margin={{ top: 5, right: 30, left: -20, bottom: 15 }}
                        paddingBottom="50"
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={120} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Male" fill="#82ca9d" stackId="a" />
                        <Bar dataKey="Female" fill="#ffc658" stackId="a" />
                        <Bar dataKey="Other" fill="#8884d8" stackId="a" />
                    </BarChart>
            </div>

        </Container>
    );
}

export default DataDash;
