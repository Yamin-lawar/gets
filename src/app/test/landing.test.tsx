import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../page';

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));


describe('Page', () => {
  it('renders a heading', () => {
    render(<Home />);

    // Use screen.getByText to query elements
    expect(screen.getByText('All GPTs')).toBeInTheDocument();
  });
});