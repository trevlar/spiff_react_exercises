import React from 'react';
import './css/progress-bar.css'
import ProgressBar from './components/ProgressBar/ProgressBar';
import useProgressBar from './ProgressBarHook'

const ProgressBarSolution = () => {
    const {
        showProgressBar,
        percent,
        startRequest,
        isLoading,
        finishRequest
    } = useProgressBar();

    return (
        <>
            {showProgressBar && (
                <div className="progress-container">
                    <ProgressBar percent={percent} width={400} /> <span> {parseInt(percent * 100)}%</span>
                </div>
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