/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '.';

describe('<Button />', () => {
  it('should render the button with text "Load more"', () => {
    render(<Button text="load more" />);

    expect.assertions(1);
    const button = screen.getByRole('button', { name: /load more/i });

    expect(button).toHaveAttribute('class', 'button');
    // espero que esse botão esteja no documento
  });
  it('should call function on button click"', () => {
    //deve chamar a função ao clicar no botão.
    const fn = jest.fn();
    render(<Button text="load more" event={fn} />);
    const button = screen.getByRole('button', { name: /load more/i });

    userEvent.click(button);
    expect(fn).toHaveBeenCalledTimes(1);
  });
  it('should be disabled when disabled is true"', () => {
    // deve ser desabilitado quando o desabilited for true
    render(<Button text="load more" disabled={true} />);
    const button = screen.getByRole('button', { name: /load more/i });
    expect(button).toBeDisabled();
  });
  it('should be enabled when disabled is false"', () => {
    // deve ser habilitado quando o disabled for false
    render(<Button text="load more" disabled={false} />);
    const button = screen.getByRole('button', { name: /load more/i });
    expect(button).toBeEnabled();
  });
  it('should match snapshot', () => {
    const fn = jest.fn();
    const { container } = render(<Button text="load more" disabled={false} event={fn} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
