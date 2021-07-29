import React from 'react';
import './progress-bar.css';
import PropTypes from 'prop-types';

const ProgressBar = ({ width, percent }) => {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        setProgress(parseInt(percent * width));
    }, [percent, width]);

    return (
        <div className="progress-container">
            <div className="progress-bar" style={{ width: width }}>
                <div style={{ width: `${progress}px` }} className="progress" />
            </div>
            <span> {parseInt(percent * 100)}%</span>
        </div>
    );
};

ProgressBar.propTypes = {
    percent: PropTypes.number.isRequired,
}

export default ProgressBar;
