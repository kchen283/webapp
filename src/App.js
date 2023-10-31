import Home from './Home';
import Login from './Login';
import Checkin from'./Checkin';

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";



function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/checkin" element={<Checkin/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
