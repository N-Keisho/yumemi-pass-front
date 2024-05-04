import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '@/app/component/base/Footer/Footer';

describe('Footer Component', () => {
    it('renders without crashing', () => {
        render(<Footer />);
    });

    it('renders the correct content', () => {
        render(<Footer />);
        expect(screen.getByText("Ⓒ N-Keisho All rights reserved.")).toBeInTheDocument();
    });
});