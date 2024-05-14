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
            <p>Transaction with signatue: {props.signature}</p>
            {data && 
                <>
                    <p>BlockTime: {data.blockTime.toString()}</p>

                    <div>
                        <h3>Transaction Meta:</h3>
                        <p>Error: {data.meta.err}</p>
                        <p>Fee: {data.meta.fee?.__bigint?.toString()}</p>
                        <p>Log Messages: {data.meta.logMessages}</p>
                        <p>Post Balances: {data.meta.postBalances?.__bigint?.toString()}</p>
                        <p>Pre Balances : {data.meta.preBalances?.__bigint?.toString()}</p>
                    </div>

                    <div>
                        <h3>Signatues:</h3>
                        <p> {data.signatures.map(signature => <p>{signature}</p>)}</p>
                    </div>

                    <div>
                        <p>Slot: {data.slot.toString()}</p>
                    </div>
                </>
            }
        </>
    );
}