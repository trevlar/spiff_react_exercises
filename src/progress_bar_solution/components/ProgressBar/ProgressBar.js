import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ width, percent }) => {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
      setProgress(parseInt(percent * width));
    }, [percent, width]);

    return (
        <div className="progress-bar" style={{width: width}}>
                <div style={{width: `${progress}px`}} className="progress"/>
        </div>
    );
};

ProgressBar.propTypes = {
    percent: PropTypes.number.isRequired,
}

export default ProgressBar;
