import React, { useState, useEffect } from 'react';
import Transaction from '../components/Transaction';
import { Address, Signature, signature } from '@solana/web3.js';
import { _fetch } from '../fetch';

const LOCAL_WALLET_ADDRESS = 
    '91RzsA7P8hYDqswUqapHWLSjGiMCFdT3kkoGkcpWZerW' as Address<'91RzsA7P8hYDqswUqapHWLSjGiMCFdT3kkoGkcpWZerW'>;  

export default function TransactionPage() {
    const [data, setData] = useState<Array<Signature>>(['fdasfsf' as Signature]);

    useEffect(() => {
        const fetchSignaturesForAddress = async () => {
            const body = { address: LOCAL_WALLET_ADDRESS };
            let signatures = await _fetch('/api/getSignaturesForAddress',body) as Array<Signature>;

            // Display on UI that no transactions are found for this address
            if(signatures){
                setData(signatures)
            }
        };
        fetchSignaturesForAddress();
    },[]);

    if(data != undefined){
        return (
            <>
                <h1>This is transaction page</h1>
                {data.map(signature => <Transaction signature={signature}/>)}
            </>
        )
    }

    return (
        <><h1>Loading...</h1></>
    )
}