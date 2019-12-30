import React, {Component} from 'react';

import classes from "./Image.module.css";


class workItem extends Component {
    state = {
        loading: true
    };

    handleImageLoaded = () => {
        this.setState({ loading: false });
    };

    render(){
        let resultCss = this.props.legit ? `${classes["result"]} ${classes["legit"]}` :
            `${classes["result"]} ${classes["fake"]}`;
        return (
            <div className={classes.container}>
                <img
                    src={this.props.imglink}
                    className="img-fluid"
                    alt="Recent Work"
                    onLoad={this.handleImageLoaded}
                />
                {this.state.loading ? null :
                    <div className={resultCss}>
                        {this.props.legit ? 'LEGIT' : 'FAKE'}</div>}
            </div>
        );
    }
}

export default workItem;

