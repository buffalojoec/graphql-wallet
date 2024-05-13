import React, { useEffect, useState } from 'react';
import { gql } from '../fetch';
import type { Signature } from '@solana/web3.js';
import {  } from '@solana/web3.js';

/**
 * Component GraphQL query.
 */
const source = /* GraphQL */ `
    query testQuery($signature: Signature!) {
        transaction(signature: $signature) {
            blockTime
            slot
        }
    }
`;

export default function Transaction() {
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            let signature = '67rSZV97NzE4B4ZeFqULqWZcNEV2KwNfDLMzecJmBheZ4sWhudqGAzypoBCKfeLkKtDQBGnkwgdrrFM8ZMaS3pkk' as Signature;
            const response = (await gql(source, { signature }));
            console.log(response)
            setData(response.account);
        };
        fetchData();
    },[]);
    return (<></>);
}