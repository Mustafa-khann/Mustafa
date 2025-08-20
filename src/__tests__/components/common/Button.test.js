import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Button from '../../../components/common/Button';

describe('Button Component', () => {
  test('renders button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies custom className', () => {
    render(<Button className='custom-class'>Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass('common-button');
  });

  test('passes additional props', () => {
    render(
      <Button data-testid='test-button' disabled>
        Click me
      </Button>
    );
    const button = screen.getByTestId('test-button');
    expect(button).toBeDisabled();
  });
});
