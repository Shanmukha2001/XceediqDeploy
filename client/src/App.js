import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import UpdatePost from './components/UpdatePost';

function App() {
    return (
        <Router>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create" element={<CreatePost />} />
                    <Route path="/update/:id" element={<UpdatePost />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;