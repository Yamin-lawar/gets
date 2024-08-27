import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../page';

describe('Page', () => {
  it('renders a heading', () => {
    render(<Home />);

    // Use screen.getByText to query elements
    expect(screen.getByText('All GPTs')).toBeInTheDocument();
  });
});