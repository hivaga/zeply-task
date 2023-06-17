import {render} from '@testing-library/react';

import {MainPage} from './main-page';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MainPage />);
    expect(baseElement).toBeTruthy();
  });

  it('should have a correct header string', () => {
    const { getByText } = render(<MainPage />);
    expect(getByText(/Blockchain/gi)).toBeTruthy();
  });
});
