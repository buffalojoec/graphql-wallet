import type { Signature, Slot, Transaction, TransactionMessage } from '@solana/web3.js';
import React, { useEffect, useState } from 'react';

import { gql } from '../fetch';

/**
 * Component GraphQL query.
 */

// Can add more fields based on requirement
const source = /* GraphQL */ `
    query testQuery($signature: Signature!) {
        transaction(signature: $signature) {
            blockTime
            message {
                accountKeys {
                    pubkey
                    signer
                    source
                    writable
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
    blockTime: string;
    // Should Include more type to display info
    message: TransactionMessage;
    // Should have a TransactionMetadata type in sdk
    meta: {
        err: string | undefined;
        fee: bigint;
        logMessages: string | undefined;
        postBalances: [bigint];
        preBalances: [bigint];
    };
    signatures: [Signature];
    slot: Slot;
    version: string;
};

interface Props {
    signature: Signature;
}

export default function Transaction(props: Props) {
    const [data, setData] = useState<Data>();
    useEffect(() => {
        const fetchData = async () => {
            const { signature } = props;
            const { transaction } = (await gql(source, { signature })) as { transaction: Data };
            setData(transaction);
        };
        fetchData();
    }, []);
    return (
        <>
            <p>Transaction with signatue: {props.signature}</p>
            {data && (
                <>
                    <p>BlockTime: {data.blockTime.toString()}</p>

                    {data.meta && (
                        <div>
                            <h3>Transaction Meta:</h3>
                            {data.meta.err && <p>Error: {data.meta.err}</p>}
                            {data.meta.fee !== null && <p>Fee: {data.meta.fee.toString()}</p>}
                            {data.meta.logMessages && <p>Log Messages: {data.meta.logMessages}</p>}
                            {data.meta.postBalances.length > 0 && (
                                <p>
                                    Post Balances:{' '}
                                    {data.meta.postBalances.map((balance, i) => (
                                        <span key={i}>{balance.toString()}, &nbsp;</span>
                                    ))}
                                </p>
                            )}
                            {data.meta.preBalances.length > 0 && (
                                <p>
                                    Pre Balances :{' '}
                                    {data.meta.preBalances.map((balance, i) => (
                                        <span key={i}>{balance.toString()}, &nbsp;</span>
                                    ))}
                                </p>
                            )}
                        </div>
                    )}

                    {data.signatures && (
                        <div>
                            <h3>Signatues:</h3>
                            <p>
                                {' '}
                                {data.signatures.map(signature => (
                                    <p>{signature}</p>
                                ))}
                            </p>
                        </div>
                    )}

                    {data.slot && (
                        <div>
                            <p>Slot: {data.slot.toString()}</p>
                        </div>
                    )}
                </>
            )}
        </>
    );
}
