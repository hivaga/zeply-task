import {StrictMode} from 'react';
import React from 'react';
import {BrowserRouter as Router, Routes, Link, Route} from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import {environment} from "./environments/environment";
import HeaderMenu from "./features/main/components/header-menu/header-menu";
import MainPage from "./features/main/components/main-page/main-page";
import StatisticsPage from "./features/satatistics/components/statistics-page/statistics-page";
import SubscriptionsPage from "./features/subscriptions/components/subscriptions-page/subscriptions-page";
import {AppStore} from "./shared/store/app.store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <StrictMode>
    <App/>
  </StrictMode>
);


const appStore = new AppStore(environment.api.baseUrl);
export const AppStoreContext = React.createContext<AppStore>(appStore);

export function App() {
  return (
    <div>
      <Router>
        <AppStoreContext.Provider value={appStore}>
          <HeaderMenu/>
          <div>
            <Routes>
              <Route path="/" Component={MainPage}/>
              <Route path="/subscriptions" Component={SubscriptionsPage}/>
              <Route path="/statistics" Component={StatisticsPage}/>
            </Routes>
          </div>
        </AppStoreContext.Provider>
      </Router>
    </div>
  )
}
