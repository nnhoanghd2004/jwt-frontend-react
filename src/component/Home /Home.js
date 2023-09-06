import React from 'react';
import { Link } from 'react-router-dom';
function Home(props) {
    return (
        <div>
            <Link to="/login" className='btn btn-primary'>Login</Link>
        </div>
    );
}

export default Home;