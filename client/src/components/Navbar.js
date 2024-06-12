import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="blue">
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo">MyApp</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/create">Create Post</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
