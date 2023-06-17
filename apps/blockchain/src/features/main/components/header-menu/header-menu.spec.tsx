import { render } from '@testing-library/react';

import HeaderMenu from './header-menu';

describe('HeaderMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HeaderMenu />);
    expect(baseElement).toBeTruthy();
  });
});
