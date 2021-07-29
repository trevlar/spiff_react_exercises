import { useEffect, useReducer } from 'react';
import {
    PARTIAL_REQUEST,
    COMPLETE_REQUEST,
    PROGRESS_INCREMENT,
    START_REQUEST,
    STOP_REQUEST,
    FINISH_REQUEST,
    INCREMENT_PERCENT,
    HIDE_PROGRESS,
} from './constants';

const ACTIONS = {
    [START_REQUEST]: START_REQUEST,
    [STOP_REQUEST]: STOP_REQUEST,
    [FINISH_REQUEST]: FINISH_REQUEST,
    [INCREMENT_PERCENT]: INCREMENT_PERCENT,
    [HIDE_PROGRESS]: HIDE_PROGRESS,
}

const initialState = {
    maxPercent: COMPLETE_REQUEST,
    percent: 0,
    isLoading: false,
    showProgress: true,
};

function requestTimerReducer(state, action) {
    const {
        maxPercent,
        percent,
    } = state;
    let newPercent = (percent >= COMPLETE_REQUEST) ? 0 : percent;
    let isLoading = percent > 0 && percent < COMPLETE_REQUEST;

    switch (action.type) {
        case ACTIONS.START_REQUEST:
            return {
                ...state,
                maxPercent: PARTIAL_REQUEST,
                percent: newPercent,
                isLoading: true,
                showProgress: true,
            };

        case ACTIONS.FINISH_REQUEST:
            return {
                ...state,
                maxPercent: COMPLETE_REQUEST,
                percent: newPercent,
                isLoading: true,
                showProgress: true,
            };

        case ACTIONS.STOP_REQUEST:
            return {
                ...state,
                isLoading,
            };

        case ACTIONS.INCREMENT_PERCENT:

            let updatedPercent = (percent < maxPercent) ? percent + 0.01 : percent;
            return {
                ...state,
                percent: updatedPercent,
                isLoading,
            }

        case ACTIONS.HIDE_PROGRESS:
            return {
                ...state,
                showProgress: false,
                percent: 0,
            }

        default:
            throw new Error();
    }
}

let loadingInterval;
function useRequestTimer() {
    const [state, dispatch] = useReducer(requestTimerReducer, initialState);
    const {
        maxPercent,
        percent,
        isLoading,
        showProgress,
    } = state;

    useEffect(() => {
        if (percent >= maxPercent) {
            stopIntervalTimer();
        }
        if (percent >= COMPLETE_REQUEST) {
            setTimeout(() => dispatch({ type: ACTIONS.HIDE_PROGRESS, isHidden: true }), 3000);
        }
    }, [percent, maxPercent, isLoading])

    function startIntervalTimer() {
        if (loadingInterval) {
            stopIntervalTimer();
        }

        loadingInterval = setInterval(() => {
            dispatch({ type: ACTIONS.INCREMENT_PERCENT })
        }, PROGRESS_INCREMENT);
    }

    function stopIntervalTimer() {
        clearInterval(loadingInterval);
        dispatch({ type: ACTIONS.STOP_REQUEST });
    }

    function startRequest() {
        dispatch({ type: ACTIONS.START_REQUEST });
        startIntervalTimer();
    }

    function finishRequest() {
        dispatch({ type: ACTIONS.FINISH_REQUEST });
        startIntervalTimer();
    }

    return {
        showProgress,
        percent,
        startRequest,
        isLoading,
        finishRequest
    };
}

export default useRequestTimer;