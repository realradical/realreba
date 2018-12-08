import React from "react";
import ImgDashboard from './imagedashboard.js';


const Uploadedwrapper = (props) => props.img.map (images => {

    return <ImgDashboard
    pic = {images}
    funct = {props.Click}/>
});


export default Uploadedwrapper;
