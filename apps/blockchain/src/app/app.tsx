// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import {Button} from "@mui/material";

export function App() {
  return (
    <div>
      <h1 className={styles.header}>Blockchain Application</h1>
      <Button variant={'outlined'}>Hello world</Button>
    </div>
  );
}

export default App;
