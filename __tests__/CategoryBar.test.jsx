import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import  CategoryBar from '@/app/component/ui/CategoryBar/CategoryBar';

describe('CategoryBar Component', () => {
    it('renders without crashing', () => {
        render(<CategoryBar />);
    });

    it('renders the correct content', () => {
        render(<CategoryBar />);
        expect(screen.getByText("総人口")).toBeInTheDocument();
        expect(screen.getByText("年少人口")).toBeInTheDocument();
        expect(screen.getByText("生産年齢人口")).toBeInTheDocument();
        expect(screen.getByText("老年人口")).toBeInTheDocument();
    });

});