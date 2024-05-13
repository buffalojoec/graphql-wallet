import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TransactionPage from './components/pages/TransactionPage';
import ExplorerPage from './components/pages/ExplorerPage';
import AccountPage from './components/pages/AccountPage';
import HomePage from './components/pages/HomePage';

export default function WebAppRouter() {
    return(
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/accounts" element={<AccountPage/>} />
            <Route path="/transaction" element={<TransactionPage/>} />
            <Route path="/explorer" element={<ExplorerPage/>} />
        </Routes>
    )
};