import { render } from '@testing-library/react';

import StatisticsPage from './statistics-page';

describe('StatisticsPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StatisticsPage />);
    expect(baseElement).toBeTruthy();
  });
});
