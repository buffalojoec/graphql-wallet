import { Address, Signature } from '@solana/web3.js';
import React, { useEffect, useState } from 'react';

import Transaction from '../components/Transaction';
import { postRequest } from '../fetch';

const LOCAL_WALLET_ADDRESS =
    '4scaGGKPmGcWR3ZGgdFtEFrzHHN1n6qNWhx9W5QnWGiK' as Address<'4scaGGKPmGcWR3ZGgdFtEFrzHHN1n6qNWhx9W5QnWGiK'>;

export default function TransactionPage() {
    const [data, setData] = useState<Array<Signature>>();

    useEffect(() => {
        const fetchSignaturesForAddress = async () => {
            const body = { address: LOCAL_WALLET_ADDRESS };
            const signatures = (await postRequest('/api/getSignaturesForAddress', body)) as Array<Signature>;
            if (!signatures) {
                return setData([]);
            }

            setData(signatures);
        };
        fetchSignaturesForAddress();
    }, []);

    return (
        <>
            <h1> This is transaction page </h1>
            {data ? (
                data.length === 0 ? (
                    <h3>No Transactions Found</h3>
                ) : (
                    data.map(signature => <Transaction signature={signature} />)
                )
            ) : (
                <h1>Loading Transactions...</h1>
            )}
        </>
    );
}
