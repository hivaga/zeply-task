import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import MainPage from "./features/main/components/main-page/main-page";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <MainPage />
  </StrictMode>
);
