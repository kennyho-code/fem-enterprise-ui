import '@testing-library/jest-dom/extend-expect';
import {
  RenderOptions,
  render as renderComponent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement } from 'react';

export * from '@testing-library/react';

/**
 * For a complete example, see: test/utilities.ts
 */

export const render = (ui: ReactElement, options?: RenderOptions) => {
  return {
    ...renderComponent(ui, options),
    user: userEvent.setup(),
  };
};
