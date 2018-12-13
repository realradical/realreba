import { React } from "react";
import WithContext from '../hoc/Layout';

const UploadButton = () => {
    return (
        <div>
            <button> Upload </button>
        </div>
    );
};

export default  WithContext(UploadButton);