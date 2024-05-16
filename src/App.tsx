import './App.css';

import React from 'react';

import WebAppRouter from './routes';

function App() {
    return (
        <div className="App">
            <header>
                <h1>GraphQL Wallet</h1>
            </header>
            <WebAppRouter />
        </div>
    );
}

export default App;
