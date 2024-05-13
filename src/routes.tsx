import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TransactionPage from './pages/TransactionPage';
import ExplorerPage from './pages/ExplorerPage';
import AccountPage from './pages/AccountPage';
import HomePage from './pages/HomePage';

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