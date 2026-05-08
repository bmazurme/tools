/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { Toaster, ToasterComponent, ToasterProvider } from '@gravity-ui/uikit';

import ErrorBoundaryWrapper from './components/error-boundary-wrapper';
import ThemeWrapper from './components/theme-wrapper/theme-wrapper';
import App from './app';

import { store } from './store';

import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import 'katex/dist/katex.min.css';
import './styles/index.css';

const toaster = new Toaster();

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Please check your HTML file.');
}

const root = createRoot(rootElement);

const AppWithProviders = () => (
  <BrowserRouter>
    <Provider store={store}>
      <ThemeWrapper>
        <ToasterProvider toaster={toaster}>
          <ErrorBoundaryWrapper>
            <App />
          </ErrorBoundaryWrapper>
          <ToasterComponent />
        </ToasterProvider>
      </ThemeWrapper>
    </Provider>
  </BrowserRouter>
);

if (import.meta.env.DEV) {
  root.render(
    <StrictMode>
      <AppWithProviders />
    </StrictMode>,
  );
} else {
  root.render(<AppWithProviders />);
}
