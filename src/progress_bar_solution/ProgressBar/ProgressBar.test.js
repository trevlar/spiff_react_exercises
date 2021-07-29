import React from 'react';
import {render} from '@testing-library/react'
import ProgressBar from './ProgressBar';

describe('ProgressBar', () => {
    it('renders properly with expected snapshot', () => {
        const progressBar = render(
            <ProgressBar percent={0} />
        );
        expect(progressBar).toMatchSnapshot()
    })
})
