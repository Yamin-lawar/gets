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


describe('Hpme page', () => {
  it('renders a heading', () => {
    render(<Home />);

    // Use screen.getByText to query elements
    expect(screen.getByText('All GPTs')).toBeInTheDocument();
  });

  it('Is there a card for chart available?', () => {
    render(<Home />);

    // Use screen.getByText to query elements
    expect(screen.getByText("Chart GPT")).toBeInTheDocument();
    expect(screen.getByAltText("Chart Icon")).toBeInTheDocument();
    expect(screen.getByText("Generate beautiful & meaningful charts from data & prompts only")).toBeInTheDocument();
  });
});