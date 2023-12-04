import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import Providers from "./Providers";

import './index.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primereact/resources/primereact.css";
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
        <Providers>
            <App/>
        </Providers>
);