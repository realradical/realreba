import { React } from "react";
import WithContext from '../hoc/Layout';

const UploadButton = () => {
    {this.props.context.state.currentUser}
    return (
        <div>
            <button> Upload </button>
        </div>
    );
};

export default  WithContext(UploadButton);