import React from "react";
import './Uploadimage.css';

const ImgDashboard = (props) => {

    return(
        <div className = "picsection" >
            <div className = "column" >
            <img onClick = {props.funct} src = {props.pic} height="100" width="200"/>
            </div>
        </div>
    );
};
export default ImgDashboard;

