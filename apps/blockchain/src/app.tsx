import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import styles from './app.module.scss';
import {environment} from "./environments/environment";
import HeaderMenu from "./features/main/components/header-menu/header-menu";
import MainPage from "./features/main/components/main-page/main-page";
import StatisticsPage from "./features/statistics/components/statistics-page/statistics-page";

import SubscriptionsPage from "./features/subscriptions/components/subscriptions-page/subscriptions-page";
import {AppStore} from "./shared/store/app.store";

/* eslint-disable-next-line */
export interface AppProps {}

const appStore = new AppStore(environment.api.baseUrl);
export const AppStoreContext = React.createContext<AppStore>(appStore);

export function App(props: AppProps) {
  return (
    <div>
      <Router>
        <AppStoreContext.Provider value={appStore}>
          <HeaderMenu/>
          <div className={styles.container}>
            <Routes>
              <Route path="/" Component={MainPage}/>
              <Route path="/subscriptions" Component={SubscriptionsPage}/>
              <Route path="/statistics" Component={StatisticsPage}/>
            </Routes>
          </div>
        </AppStoreContext.Provider>
      </Router>
    </div>
  );
}

export default App;
