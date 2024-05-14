import React, { useEffect, useState } from 'react';
import { gql } from '../fetch';
import type { Signature, Slot, TransactionMessage } from '@solana/web3.js';
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

/**
 * Component GraphQL data.
 */
type Data = {
    blockTime: bigint,
    message: TransactionMessage,
    signatures: [Signature],
    slot: Slot,
    version: String
};

interface Props {
    signature: Signature 
}

export default function Transaction(props: Props) {
    const [data, setData] = useState<Array<Data>>();
    useEffect(() => {
        const fetchData = async() => {
            const { signature } = props;
            const response = (await gql(source, { signature })) as { transaction: Data };
            console.log(response)
        };
        fetchData();
    },[]);
    return (
        <>
        </>
    );
}