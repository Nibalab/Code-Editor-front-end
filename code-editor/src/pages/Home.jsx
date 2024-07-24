import React from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => {
    return (
        <div>
            {props.name ? 'Hi ' + props.name : 'You are not logged in'}
            <Link to={"/editor"}>Start Coding</Link>
        </div>
    );
};

export default Home;
