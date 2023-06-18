// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {createTheme} from "@mui/material";
import React from "react";
import {environment} from "../../../../environments/environment";
import {AppStore} from "../../../../shared/store/app.store";
import {SearchPage} from "../../../search/components/search-page/search-page";
import HeaderMenu from "../header-menu/header-menu";
import styles from './main-page.module.scss';

const theme = createTheme();
document.documentElement.style.setProperty('--primary-color', theme.palette.primary.main);
document.documentElement.style.setProperty('--secondary-color', theme.palette.secondary.main);
document.documentElement.style.setProperty('--error-color', theme.palette.error.main);

const appStore = new AppStore(environment.api.baseUrl);
export const AppStoreContext = React.createContext<AppStore>(appStore);


export function MainPage() {
  return (
    <AppStoreContext.Provider value={appStore}>
      <HeaderMenu/>
      <div className={styles.container}>
        <div className={styles.items}>
          <SearchPage/>
        </div>
      </div>
    </AppStoreContext.Provider>
  );
}

export default MainPage;
