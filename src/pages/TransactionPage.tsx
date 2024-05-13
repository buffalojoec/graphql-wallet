import React from 'react';
import Transaction from '../components/Transaction';
import { Address } from '@solana/web3.js';

// Below address is based on local machine. Need to update it dynamically.
const LOCAL_WALLET_ADDRESS = 
    'C1jTLcGBRcKm5XdH34ES9aL7PyJJKqXMeEjy46CJgoXp' as Address<'C1jTLcGBRcKm5XdH34ES9aL7PyJJKqXMeEjy46CJgoXp'>;  

export default function TransactionPage() {
    return (
        <>
            <h1>This is transaction page</h1>
            <Transaction address={LOCAL_WALLET_ADDRESS}/>
        </>
    )
}