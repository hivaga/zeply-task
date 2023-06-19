import {render} from '@testing-library/react';
import React from "react";
import {BrowserRouter} from "react-router-dom";
import {AppStoreContext} from "../../../../app";
import {environment} from "../../../../environments/environment";
import {AppStore} from "../../../../shared/store/app.store";

import HeaderMenu from './header-menu';


describe('HeaderMenu', () => {

  it('should render successfully', () => {
    const appStore = new AppStore(environment.api.baseUrl);
    const {baseElement} = render(
      <AppStoreContext.Provider value={appStore}>
        <BrowserRouter>
          <HeaderMenu/>
        </BrowserRouter>
      </AppStoreContext.Provider>);
    expect(baseElement).toBeTruthy();
  });
});
