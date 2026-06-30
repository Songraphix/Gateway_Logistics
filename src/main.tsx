import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { LanguageProvider } from './LanguageContext';
import { DataProvider } from './DataContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </LanguageProvider>
  </StrictMode>,
);
