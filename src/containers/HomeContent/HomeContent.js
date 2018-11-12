import React from 'react';
import HomeImg from '../../assets/images/test_Home.png';
import classes from './HomeContent.module.css';

const homeContent = () => {
    return (
        <div className={classes.HomeContent}>
            <img src={HomeImg} alt='Home Content'/>
        </div>
    );
};

export default homeContent;
