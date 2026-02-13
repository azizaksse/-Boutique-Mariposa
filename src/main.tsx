import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async';
import { I18nProvider } from './lib/i18n';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ConvexClientProvider } from './ConvexClientProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ErrorBoundary>
            <HelmetProvider>
                <I18nProvider>
                    <ConvexClientProvider>
                        <App />
                    </ConvexClientProvider>
                </I18nProvider>
            </HelmetProvider>
        </ErrorBoundary>
    </React.StrictMode>,
)
