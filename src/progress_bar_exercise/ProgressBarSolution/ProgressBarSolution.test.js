import React from 'react';
import {render} from '@testing-library/react'
import ProgressBarSolution from './ProgressBarSolution';

describe('ProgressBarSolution', () => {
    it('renders properly with expected snapshot', () => {
        const progressBarSolution = render((
            <ProgressBarSolution />
        ));
        expect(progressBarSolution).toMatchSnapshot()
    })
})
