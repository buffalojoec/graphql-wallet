import React, { useEffect, useState } from 'react';
import { _fetch, gql } from '../fetch';
import type { Address, Signature, Slot, TransactionMessage } from '@solana/web3.js';
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
    address: Address
}

export default function Transaction(props: Props) {
    const [data, setData] = useState<Array<Data>>();

    useEffect(() => {
        const fetchSignaturesAndLoadTransactions = async () => {
            const body = { address: props.address };
            let signatures = await _fetch('/api/getSignaturesForAddress',body) as Array<Signature>;

            const transactions:Array<Data> = [];
            signatures.forEach(async (signature) => {
                const response = (await gql(source, { signature:signature })) as { transaction: Data };
                console.log(response)
            })

            setData(transactions);
        };
        fetchSignaturesAndLoadTransactions();
    },[]);
    return (<></>);
}