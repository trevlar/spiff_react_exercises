import { useEffect, useReducer } from 'react';
import {
    PARTIAL_REQUEST,
    COMPLETE_REQUEST,
    PROGRESS_INCREMENT,
    START_REQUEST,
    STOP_REQUEST,
    FINISH_REQUEST,
    INCREMENT_PERCENT,
    TOGGLE_PROGESS_BAR,
} from './constants';

const ACTIONS = {
    [START_REQUEST]: START_REQUEST,
    [STOP_REQUEST]: STOP_REQUEST,
    [FINISH_REQUEST]: FINISH_REQUEST,
    [INCREMENT_PERCENT]: INCREMENT_PERCENT,
    [TOGGLE_PROGESS_BAR]: TOGGLE_PROGESS_BAR,
}

export const initialState = {
    maxPercent: COMPLETE_REQUEST,
    percent: 0,
    isLoading: false,
    showProgressBar: true,
};

function progressBarReducer(state, action) {
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
                showProgressBar: true,
            };

        case ACTIONS.FINISH_REQUEST:
            return {
                ...state,
                maxPercent: COMPLETE_REQUEST,
                percent: newPercent,
                isLoading: true,
                showProgressBar: true,
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

        case ACTIONS.TOGGLE_PROGESS_BAR:
            const showProgressBar = percent >= COMPLETE_REQUEST ? false : true
            return {
                ...state,
                showProgressBar,
            }

        default:
            throw new Error();
    }
}

let loadingInterval;
function useProgressBar() {
    const [state, dispatch] = useReducer(progressBarReducer, initialState);
    const {
        maxPercent,
        percent,
        isLoading,
        showProgressBar,
    } = state;

    useEffect(() => {
        if (percent >= maxPercent) {
            stopInterval();
        }
        if (percent >= COMPLETE_REQUEST) {
            setTimeout(() => dispatch({ type: ACTIONS.TOGGLE_PROGESS_BAR, isHidden: true }), 3000);
        }
    }, [percent, maxPercent, isLoading])

    function startInterval() {
        if (loadingInterval) {
            stopInterval();
        }

        loadingInterval = setInterval(() => {
            dispatch({ type: ACTIONS.INCREMENT_PERCENT })
        }, PROGRESS_INCREMENT);
    }

    function stopInterval() {
        clearInterval(loadingInterval);
        dispatch({ type: ACTIONS.STOP_REQUEST });
    }

    function startRequest() {
        dispatch({ type: ACTIONS.START_REQUEST });
        startInterval();
    }

    function finishRequest() {
        dispatch({ type: ACTIONS.FINISH_REQUEST });
        startInterval();
    }

    return {
        showProgressBar,
        percent,
        startRequest,
        isLoading,
        finishRequest
    };
}

export default useProgressBar;