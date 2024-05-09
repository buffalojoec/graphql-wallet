import './App.css';

import { type Address } from '@solana/web3.js';
import React from 'react';

import Account from './components/Account';

const ADDRESS_LOOKUP_TABLE_ACCOUNT_ADDRESS =
    '2JPQuT3dHtPjrdcbUQyrrT4XYRYaWpWfmAJ54SUapg6n' as Address<'2JPQuT3dHtPjrdcbUQyrrT4XYRYaWpWfmAJ54SUapg6n'>;
const NONCE_ACCOUNT_ADDRESS =
    'AiZExP8mK4RxDozh4r57knvqSZgkz86HrzPAMx61XMqU' as Address<'AiZExP8mK4RxDozh4r57knvqSZgkz86HrzPAMx61XMqU'>;
const TOKEN_2022_ACCOUNT_ADDRESS =
    'aUg6iJ3p43hTJsxHrQ1KfqMQYStoFvqcSJRcc51cYzK' as Address<'aUg6iJ3p43hTJsxHrQ1KfqMQYStoFvqcSJRcc51cYzK'>;
const TOKEN_2022_MINT_ADDRESS =
    '5gSwsLGzyCwgwPJSnxjsQCaFeE19ZFaibHMLky9TDFim' as Address<'5gSwsLGzyCwgwPJSnxjsQCaFeE19ZFaibHMLky9TDFim'>;
const SPL_TOKEN_ACCOUNT_ADDRESS =
    'AyGCwnwxQMCqaU4ixReHt8h5W4dwmxU7eM3BEQBdWVca' as Address<'AyGCwnwxQMCqaU4ixReHt8h5W4dwmxU7eM3BEQBdWVca'>;
const SPL_TOKEN_MINT_ADDRESS =
    'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr' as Address<'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr'>;
const STAKE_ACCOUNT_ADDRESS =
    'CSg2vQGbnwWdSyJpwK4i3qGfB6FebaV3xQTx4U1MbixN' as Address<'CSg2vQGbnwWdSyJpwK4i3qGfB6FebaV3xQTx4U1MbixN'>;
const VOTE_ACCOUNT_ADDRESS =
    '4QUZQ4c7bZuJ4o4L8tYAEGnePFV27SUFEVmC7BYfsXRp' as Address<'4QUZQ4c7bZuJ4o4L8tYAEGnePFV27SUFEVmC7BYfsXRp'>;

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>Accounts</p>
            </header>
            <body>
                <Account address={ADDRESS_LOOKUP_TABLE_ACCOUNT_ADDRESS} parsed="lookupTable" />
                <Account address={NONCE_ACCOUNT_ADDRESS} parsed="nonce" />
                <Account
                    address={TOKEN_2022_ACCOUNT_ADDRESS}
                    // parsed="tokenAccount"
                />
                <Account
                    address={TOKEN_2022_MINT_ADDRESS}
                    // parsed="tokenMint"
                />
                <Account address={SPL_TOKEN_ACCOUNT_ADDRESS} parsed="tokenAccount" />
                <Account address={SPL_TOKEN_MINT_ADDRESS} parsed="tokenMint" />
                <Account address={STAKE_ACCOUNT_ADDRESS} parsed="stake" />
                <Account address={VOTE_ACCOUNT_ADDRESS} parsed="vote" />
            </body>
        </div>
    );
}

export default App;
