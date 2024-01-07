import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Basic Elements Tests', () => {
  test('renders required elements', () => {
    render(<App />);
    const h1Text = screen.getByRole('heading', { name: /ai, read it!/i });
    expect(h1Text.tagName).toBe('H1');

    const buttonText = screen.getByRole('button', { name: /ai, read it!/i });
    expect(buttonText.tagName).toBe('BUTTON');

    const pText = screen.getByText(/ai, read it!/i, { selector: 'p' });
    expect(pText.tagName).toBe('P');

    const allInstances = screen.getAllByText(/ai, read it!/i);
    expect(allInstances.length).toBe(3);
  });
});

describe('Text Area Tests', () => {
  test('renders text area', () => {
    render(<App />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
  });

  test('allows user to enter text', () => {
    render(<App />);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Testing text area' } });
    expect(textarea.value).toBe('Testing text area');
  });
});

describe('Text Area and Button Tests', () => {
  test('button is disabled when text is too short', () => {
    render(<App />);
    const textarea = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /ai, read it!/i });

    fireEvent.change(textarea, { target: { value: 'Te' } }); // Assuming minimum length is 3
    expect(button).toBeDisabled();
  });

  test('button is disabled when text is too long', () => {
    render(<App />);
    const textarea = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /ai, read it!/i });

    fireEvent.change(textarea, { target: { value: 'This text is too long'.repeat(500) } }); // Assuming a certain max length 4000
    expect(button).toBeDisabled();
  });

  test('button is enabled when text is within acceptable range', () => {
    render(<App />);
    const textarea = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /ai, read it!/i });

    fireEvent.change(textarea, { target: { value: 'Valid text' } });
    expect(button).not.toBeDisabled();
  });
});
