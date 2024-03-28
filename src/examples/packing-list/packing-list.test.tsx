import { render as _render, screen, fireEvent, waitFor } from 'test/utilities';
import { PackingList } from '.';
import userEvent from '@testing-library/user-event';
import { createStore } from './store';
import { Provider } from 'react-redux';

const render = (ui: React.ReactElement) => {
  return _render(
    <Provider store={createStore()}>
      <PackingList />
    </Provider>,
  );
};

it('renders the Packing List application', () => {
  render(
    <Provider store={createStore()}>
      <PackingList />
    </Provider>,
  );
});

it('has the correct title', async () => {
  render(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', async () => {
  render(<PackingList />);
  screen.getByLabelText('New Item Name');
});

it('has a "Add New Item" button that is disabled when the input is empty', () => {
  render(<PackingList />);
  const newItemInput = screen.getByLabelText('New Item Name');
  const button = screen.getByRole('button', { name: /add new item/i });
  expect(newItemInput).toHaveValue('');
  expect(button).toBeDisabled();
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  const { user } = render(<PackingList />);
  const newItemInput = screen.getByLabelText('New Item Name');
  const button = screen.getByRole('button', { name: /add new item/i });
  await user.type(newItemInput, 'item 1');
  expect(button).toBeEnabled();
});

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  const { user } = render(<PackingList />);
  const newItemInput = screen.getByLabelText('New Item Name');
  const button = screen.getByRole('button', { name: /add new item/i });
  await user.type(newItemInput, 'item 1');
  await user.click(button);
  expect(screen.getByLabelText('item 1')).toBeInTheDocument();
  expect(screen.getByText('item 1')).not.toBeChecked();
});

it('adds a new item to the unpacked item list when the clicking "remove New Item"', async () => {
  const { user } = render(<PackingList />);
  const newItemInput = screen.getByLabelText('New Item Name');
  const button = screen.getByRole('button', { name: /add new item/i });
  await user.type(newItemInput, 'item 2');
  await user.click(button);

  expect(screen.getByLabelText('item 2')).toBeInTheDocument();
  expect(screen.getByText('item 2')).not.toBeChecked();

  const removeItem = screen.getByLabelText(/remove/i);

  await user.click(removeItem);

  await waitFor(() => expect(removeItem).not.toBeInTheDocument());
  1;
});
