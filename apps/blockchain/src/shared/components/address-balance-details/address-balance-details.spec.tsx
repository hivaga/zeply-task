import { render } from '@testing-library/react';

import AddressBalanceDetails from './address-balance-details';

const addressDetails:any = {};
describe('AddressBalanceDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddressBalanceDetails data={addressDetails} />);
    expect(baseElement).toBeTruthy();
  });
});
