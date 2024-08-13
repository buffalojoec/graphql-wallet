import './App.css';

import type { Address } from '@solana/web3.js';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import NavBar from './NavBar';
import AccountsPage from './pages/AccountsPage';
import ExplorerPage from './pages/ExplorerPage';
import TransactionsPage from './pages/TransactionsPage';
import WalletAccount from './WalletAccount';

const WALLET_ADDRESS =
    'AzhPZKnLtBjZr7MQpBXyFB26UfxjoFZ4yCy5tKMp9KMN' as Address<'AzhPZKnLtBjZr7MQpBXyFB26UfxjoFZ4yCy5tKMp9KMN'>;

function App() {
    return (
        <div className="App">
            <header className="header">
                <div className="header-content">
                    <img src="solana-logo.png" alt="Solana Logo" className="header-logo" />
                    <img src="graphql-logo.png" alt="GraphQL Logo" className="header-logo" />
                    <h1 className="header-title">GraphQL Wallet</h1>
                </div>
                <div className="header-wallet-account">
                    <WalletAccount address={WALLET_ADDRESS} />
                </div>
            </header>
            <NavBar />
            <Routes>
                <Route path="/" element={<AccountsPage />} />
                <Route path="/accounts" element={<AccountsPage />} />
                <Route path="/transactions" element={<TransactionsPage />} />
                <Route path="/explorer" element={<ExplorerPage />} />
            </Routes>
        </div>
    );
}

export default App;
