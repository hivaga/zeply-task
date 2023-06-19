import { render } from '@testing-library/react';

import AddressSearchRow, {AddressSearchRowProps, ISearchStatisticRow} from './address-search-row';

const row: ISearchStatisticRow = {
  count: 2,
  form: {
    type: 'address',
    hash: '12345'
  }
}

describe('AddressSearchRow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddressSearchRow data={row}/>);
    expect(baseElement).toBeTruthy();
  });
});
