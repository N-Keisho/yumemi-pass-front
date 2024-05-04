import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '@/app/component/base/Header/Header';

describe('Header Component', () => {
    it('renders without crashing', () => {
        render(<Header />);
    });

    it('renders the correct content', () => {
        render(<Header />);
        expect(screen.getByText("都道府県別の総人口推移グラフ")).toBeInTheDocument();
    });
});