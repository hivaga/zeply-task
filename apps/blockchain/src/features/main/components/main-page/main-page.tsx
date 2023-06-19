import {createTheme} from "@mui/material";
import React from "react";
import {SearchPage} from "../../../search/components/search-page/search-page";
import styles from './main-page.module.scss';

const theme = createTheme();
document.documentElement.style.setProperty('--primary-color', theme.palette.primary.main);
document.documentElement.style.setProperty('--secondary-color', theme.palette.secondary.main);
document.documentElement.style.setProperty('--error-color', theme.palette.error.main);


export function MainPage() {
  return (
    <div className={styles.items}>
      <SearchPage/>
    </div>
  );
}

export default MainPage;
