import React from 'react';
import CountUp from 'react-countup';

import HomeImg from '../../assets/images/test_Home.png';
import classes from './HomeContent.module.css';

const homeContent = () => {
    return (
        <div className={classes.HomeContent} style={{backgroundImage: "url(" + HomeImg + ")" }}>
            <CountUp
                className={classes.itemsSpan}
                start={10000}
                end={65139}
                duration={2}
                separator=","
                suffix=" Items Authenticated"
            />
            <CountUp
                className={classes.yearsSpan}
                start={0}
                end={35}
                duration={2}
                separator=","
                suffix=" Years Experience Combined"
            />
            <CountUp
                className={classes.responseSpan}
                start={168}
                end={24}
                duration={2}
                separator=","
                prefix="Response within "
                suffix=" Hours"
            />
        </div>
    );
};

export default homeContent;
