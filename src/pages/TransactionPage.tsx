import React, { useState, useEffect } from 'react';
import Transaction from '../components/Transaction';
import { Address, Signature, signature } from '@solana/web3.js';
import { _fetch } from '../fetch';

const LOCAL_WALLET_ADDRESS = 
    'E4EKsiSoB2WZDMvm1jmcogf2gkFQZDAFsBiiGsCCYAkD' as Address<'E4EKsiSoB2WZDMvm1jmcogf2gkFQZDAFsBiiGsCCYAkD'>;  

export default function TransactionPage() {
    const [data, setData] = useState<Array<Signature>>();

    useEffect(() => {
        const fetchSignaturesForAddress = async () => {
            const body = { address: LOCAL_WALLET_ADDRESS };
            let signatures = await _fetch('/api/getSignaturesForAddress',body) as Array<Signature>;

            // Display on UI that no transactions are found for this address
            setData(signatures)
        };
        fetchSignaturesForAddress();
    },[]);

    return (
        <>
            <h1> This is transaction page </h1>
                {data 
                 ? (data.length === 0 
                    ? <h3>No Transactions Found</h3> 
                    : data.map(signature => <Transaction signature={signature}/>) )
                 : <h1>Loading Transactions...</h1>
                }
        </>
    )
}