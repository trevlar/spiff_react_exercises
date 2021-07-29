import React from 'react';
import {render} from '@testing-library/react'
import ProgressBarExercise from './ProgressBarExercise';

describe('ProgressBar', () => {
    it('renders properly with expected snapshot', () => {
        const progressBarExercise = render(<ProgressBarExercise />);
        expect(progressBarExercise).toMatchSnapshot()
    })
})
