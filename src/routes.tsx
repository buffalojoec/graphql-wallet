import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AccountPage from './pages/AccountPage';
import ExplorerPage from './pages/ExplorerPage';
import HomePage from './pages/HomePage';
import TransactionPage from './pages/TransactionPage';

export default function WebAppRouter() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/accounts" element={<AccountPage />} />
            <Route path="/transaction" element={<TransactionPage />} />
            <Route path="/explorer" element={<ExplorerPage />} />
        </Routes>
    );
}
