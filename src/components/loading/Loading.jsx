import React from 'react';
import GearGeekLogo from '../../resources/images/geargeek-logo.png'

import './loading.scss'

const Loading = props => {
    return (
        <div className="spinner">
            <img src={GearGeekLogo} alt="igearlocker" />
        </div>
    );
};


export default Loading;