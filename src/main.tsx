import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Toaster, ToasterComponent, ToasterProvider } from '@gravity-ui/uikit';

import ThemeWrapper from './components/theme-wrapper/theme-wrapper';
import App from './app';
import { store } from './store';

import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import './styles/index.css';

const toaster = new Toaster();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeWrapper>
        <ToasterProvider toaster={toaster}>
          <BrowserRouter>
            <App />
            <ToasterComponent />
          </BrowserRouter>
        </ToasterProvider>
      </ThemeWrapper>
    </Provider>
  </StrictMode>,
);

// eslint-disable-next-line import/prefer-default-export
export { toaster };
