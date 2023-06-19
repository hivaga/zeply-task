import { render } from '@testing-library/react';

import SubscriptionsPage from './subscriptions-page';

describe('SubscriptionsPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SubscriptionsPage />);
    expect(baseElement).toBeTruthy();
  });
});
