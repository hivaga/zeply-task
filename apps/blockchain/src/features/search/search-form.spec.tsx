import { render } from '@testing-library/react';

import {SearchForm} from './search-form';

describe('SearchForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SearchForm />);
    expect(baseElement).toBeTruthy();
  });
});
