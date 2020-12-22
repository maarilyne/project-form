import React, {useState} from 'react';

const InvalidInput: React.FC<{name: string, errorMsg?: string}> =
    ({name, errorMsg}: {name: string, errorMsg?: string}): JSX.Element => {

    if (!errorMsg) {
        errorMsg = `This field isn't valid. Please re-enter your ${name}`;
    }
    return (
        <span className='err_msg' >{errorMsg}</span>
    );
};

export default InvalidInput;
