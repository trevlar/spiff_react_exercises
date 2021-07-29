import React from 'react';
import {render} from '@testing-library/react'
import ProgressBarExercise from './ProgressBarExercise';

describe('ProgressBar', () => {
    it('renders properly with expected snapshot', () => {
        const progressBarExercise = render((
            <ProgressBarExercise solution={<div />} specsUrl="test.com" title="Progress Bar Exercise Test"/>
        ));
        expect(progressBarExercise).toMatchSnapshot()
    })
})
