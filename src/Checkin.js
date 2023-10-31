import React, { useState } from 'react';
import { Box, Button, Container, Card, CardContent, IconButton, Typography, Select, MenuItem, Checkbox, FormControlLabel, SvgIcon } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';


function Checkin({ setPage }) {
    const [feeling, setFeeling] = useState('');
    const [activity, setActivity] = useState('');
    const [state, setState] = useState('');
    const [gender, setGender] = useState('');
    const [STI, setSTI] = useState('');

    const US_STATES = [
        "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
        "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
        "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
        "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
        "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
    ];

    const [symptom, setSymptom] = useState({
        'Abnormal Discharge': false,
        'Blisters/Sores': false,
        'Bleeding': false,
        'Lower abdominal pain/pain during urination': false,
        'Nausea/Vomiting/Fever': false
    });

    const symptomValues = {
        'Abnormal Discharge': 5,
        'Blisters/Sores': 5,
        'Bleeding': 5,
        'Lower abdominal pain/pain during urination': 5,
        'Nausea/Vomiting/Fever': 3
    };

    const selectedSymptoms = Object.keys(symptom).filter(key => symptom[key]);

    const handleSymptomChange = (event) => {
        setSymptom({ ...symptom, [event.target.name]: event.target.checked });
    };

    const renderCheckedIcon = () => (
        <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            height="1em"
            width="1em"
            >
            <path
                fill="grey"
                d="M14 0H2C.9 0 0 .9 0 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zM7 12.414L3.293 8.707l1.414-1.414L7 9.586l4.793-4.793 1.414 1.414L7 12.414z"
            />
            </svg>
    );

    const renderUncheckedIcon = () => (
        <svg
        viewBox="0 0 16 16"
        fill="currentColor"
        height="1em"
        width="1em"
      >
        <path
          fill="currentColor"
          d="M14 0H2C.9 0 0 .9 0 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zm0 14H2V2h12v12z"
        />
      </svg>
    );

    const handleSubmit = async () => {
        try {
            const response = await axios.post('https://web-app-backend-c4x4.onrender.com/checkin', {
                state: state,
                date: new Date(), // assuming you want to save the current date
                feeling: feeling,
                activity: activity,
                symptom: selectedSymptoms,
                STI: STI
            });

            if (response.status === 200) {
                alert('Data saved successfully!');
            } else {
                alert('Error saving data');
            }

            const combinedValue = Object.keys(symptom)
            .filter(key => symptom[key]) // Filter for only the checked symptoms
            .reduce((acc, key) => acc + symptomValues[key], 0); // Sum up their values
    
            if (combinedValue >= 15) {
                alert("You may have an STD. Please get tested right away!");
            }
    

        } catch (error) {
            console.error('There was an error saving the data:', error);
            alert('Error saving data. Please try again later.');
        }
    };

    return (
        <Container style={{ paddingTop: '100px', paddingLeft: '225px', paddingRight: '225px', paddingBottom: '50px' }}>
            
            <Box display="flex" alignItems="center" marginBottom={4} justifyContent="flex-start" marginLeft="-100px">
                <IconButton onClick={() => setPage('home')}>
                    <ArrowBackIcon />
                </IconButton>
            </Box>

            <Box>
                <Typography variant="h4">Check-in</Typography>
                <Card style={{ margin: '20px' }}>
                    <CardContent>
                        <Typography variant="h6" align='center' paddingBottom='15px'>Today's Date</Typography>
                        <Box display="flex" justifyContent="center">
                            <Calendar />
                        </Box>
                    </CardContent>
                </Card>


                <Card style={{ margin: '20px' }}>
                    <CardContent>
                        <Typography variant="h6">Which state are you from?</Typography>
                        <Select
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            fullWidth
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {US_STATES.map((stateCode) => (
                                <MenuItem key={stateCode} value={stateCode}>
                                    {stateCode}
                                </MenuItem>
                            ))}
                        </Select>
                    </CardContent>
                </Card>


                <Card style={{ margin: '20px' }}>
                    <CardContent>
                        <Typography variant="h6">What is your sex?</Typography>
                        <Select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            fullWidth
                        >
                            <MenuItem value="">
                                <em>Not Applicable</em>
                            </MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Male">Male</MenuItem>
                        </Select>
                    </CardContent>
                </Card>

                <Card style={{ margin: '20px' }}>
                    <CardContent>
                        <Typography variant="h6">How are you feeling today?</Typography>
                        <Select
                            value={feeling}
                            onChange={(e) => setFeeling(e.target.value)}
                            fullWidth
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="great">Great</MenuItem>
                            <MenuItem value="good">Good</MenuItem>
                            <MenuItem value="okay">Okay</MenuItem>
                            <MenuItem value="notGood">Not Good</MenuItem>
                            <MenuItem value="bad">Bad</MenuItem>
                        </Select>
                    </CardContent>
                </Card>

                <Card style={{ margin: '20px' }}>
                    <CardContent>
                        <Typography variant="h6">Did you participate in any sexual activities over the past 7 days?</Typography>
                        <Select
                            value={activity}
                            onChange={(e) => setActivity(e.target.value)}
                            fullWidth
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="yes">Yes</MenuItem>
                            <MenuItem value="no">No</MenuItem>
                        </Select>
                    </CardContent>
                </Card>

                <Card style={{ margin: '20px' }}>
                    <CardContent>
                        <Typography variant="h6">Have you tested positive for a STI over the past 7 days?</Typography>
                        <Select
                            value={STI}
                            onChange={(e) => setSTI(e.target.value)}
                            fullWidth
                        >
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                        </Select>
                    </CardContent>
                </Card>

                <Card style={{ margin: '20px' }}>
                    <CardContent>
                        <Typography variant="h6">Are you feeling any symptoms?</Typography>
                        {Object.keys(symptom).map((key) => (
                            <FormControlLabel
                                key={key}
                                control={
                                    <Checkbox
                                        checked={symptom[key]}
                                        onChange={handleSymptomChange}
                                        name={key}
                                        checkedIcon={renderCheckedIcon()}
                                        icon={renderUncheckedIcon()}
                                    />
                                }
                                label={key}
                            />
                        ))}
                    </CardContent>
                </Card>
            </Box>

            <Box style={{ marginTop: '20px' }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
            </Button>
        </Box>
        </Container>
    );
}

export default Checkin;
