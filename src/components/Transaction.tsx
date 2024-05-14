import React, { useEffect, useState } from 'react';
import { gql } from '../fetch';
import type { Signature, Slot, Transaction, TransactionMessage } from '@solana/web3.js';

/**
 * Component GraphQL query.
 */

// Can add more fields based on requirement
const source = /* GraphQL */ `
    fragment TransactionMessageAccountKey on TransactionMessageAccountKey {
        pubkey 
        signer 
        source 
        writable
    }
    query testQuery($signature: Signature!) {
        transaction(signature: $signature) {
            blockTime
            message {
                accountKeys {
                    ...TransactionMessageAccountKey
                }
                addressTableLookups {
                    accountKey
                    readableIndexes
                    writableIndexes
                }
                header {
                    numReadonlySignedAccounts 
                    numReadonlyUnsignedAccounts 
                    numRequiredSignatures 
                }
                recentBlockhash
            }
            meta {
                fee
                err
                logMessages
                postBalances
                preBalances
            }
            signatures
            slot
            version
        }
    }
`;

/**
 * Component GraphQL data.
 */
type Data = {
    blockTime: string,
    // Should Include more type to display info 
    message: TransactionMessage,
    // Should have a TransactionMetadata type in sdk
    meta: {
        fee: { __bigint: string} | undefined,
        err: string | undefined,
        logMessages: string | undefined,
        postBalances: { __bigint: string} | undefined,
        preBalances: { __bigint: string} | undefined 
    }
    signatures: [Signature],
    slot: Slot,
    version: String
};

interface Props {
    signature: Signature 
}

export default function Transaction(props: Props) {
    const [data, setData] = useState<Data>();
    useEffect(() => {
        const fetchData = async() => {
            const { signature } = props;
            const { transaction } = (await gql(source, { signature })) as { transaction: Data };
            setData(transaction);
        };
        fetchData();
    },[]);
    return (
        <>
            {data && 
                <>
                    <h3>BlockTime: {data.blockTime.toString()}</h3>

                    <div>
                        <h3>Transaction Meta:</h3>
                        <h3>Error: {data.meta.err}</h3>
                        <h3>Fee: {data.meta.fee?.__bigint?.toString()}</h3>
                        <h3>Log Messages: {data.meta.logMessages}</h3>
                        <h3>Post Balances: {data.meta.postBalances?.__bigint?.toString()}</h3>
                        <h3>Pre Balances : {data.meta.preBalances?.__bigint?.toString()}</h3>
                    </div>

                    <div>
                        <h3>Signatues:</h3>
                        <h3> {data.signatures.map(signature => <p>{signature}</p>)}</h3>
                    </div>

                    <div>
                        <h3>Slot: {data.slot.toString()}</h3>
                    </div>
                </>
            }
        </>
    );
}