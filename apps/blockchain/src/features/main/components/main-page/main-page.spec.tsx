import {render} from '@testing-library/react';
import SearchPage from "../../../search/components/search-page/search-page";

import {MainPage} from './main-page';

describe('MainPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MainPage />);
    expect(baseElement).toBeTruthy();
  });

});
