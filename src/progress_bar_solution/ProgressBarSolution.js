import React from 'react';
import './progress-bar-solution.css'
import ProgressBar from './components/ProgressBar/ProgressBar';
import useRequestTimer from './RequestTimerHook'

const ProgressBarSolution = () => {
    const {
        showProgress,
        percent,
        startRequest,
        isLoading,
        finishRequest
    } = useRequestTimer();

    return (
        <>
            {showProgress && (
                <ProgressBar percent={percent} width={400} />
            )}
            <button className="btn btn-success" onClick={startRequest} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Start Request'}
            </button>
            <button className="btn btn-warning" onClick={finishRequest}>
                Finish Request
            </button>
        </>
    );
}

export default ProgressBarSolution;