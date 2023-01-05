import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StoreProvider } from './storeContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StoreProvider>
  </React.StrictMode>
);
