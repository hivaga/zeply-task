// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import {createTheme} from "@mui/material";
import {SearchForm} from "./search-form/search-form";

const theme = createTheme();
document.documentElement.style.setProperty('--primary-color', theme.palette.primary.main);
document.documentElement.style.setProperty('--secondary-color', theme.palette.secondary.main);
document.documentElement.style.setProperty('--error-color', theme.palette.error.main);

export function App() {
  return (
    <div>
      <h1 className={styles.header}>Blockchain Application</h1>
      <SearchForm />
    </div>
  );
}

export default App;
