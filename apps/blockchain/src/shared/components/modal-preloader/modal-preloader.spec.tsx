import { render } from '@testing-library/react';

import ModalPreloader from './modal-preloader';

describe('ModalPreloader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ModalPreloader open={true} />);
    expect(baseElement).toBeTruthy();
  });
});
