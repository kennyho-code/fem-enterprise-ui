import { screen } from '@testing-library/react';
import { render } from 'test/utilities';
import userEvent from '@testing-library/user-event';
import Counter from '.';

test('it should render the component', () => {
  render(<Counter />);
});

test.skip('it should increment when the "Increment" button is pressed', async () => {
  const { user } = render(<Counter />);
  // render(<Counter />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('0');
  const button = screen.getByRole('button', { name: 'increment' });
  await user.click(button);
  expect(currentCount).toHaveTextContent('1');
});
