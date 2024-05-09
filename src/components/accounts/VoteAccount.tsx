import type { RpcGraphQL } from '@solana/rpc-graphql';
import type { Address, Epoch, LamportsUnsafeBeyond2Pow53Minus1, Slot, UnixTimestamp } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import React from 'react';

/**
 * Component properties.
 */
interface Props {
    address: Address;
    rpcGraphQL: RpcGraphQL;
}

/**
 * Component GraphQL query.
 */
const source = /* GraphQL */ `
    query VoteAccount($address: Address!) {
        account(address: $address) {
            ... on VoteAccount {
                authorizedVoters {
                    authorizedVoter {
                        address
                    }
                    epoch
                }
                authorizedWithdrawer {
                    address
                }
                commission
                epochCredits {
                    credits
                    epoch
                    previousCredits
                }
                lastTimestamp {
                    slot
                    timestamp
                }
                node {
                    address
                }
                priorVoters
                rootSlot
                votes {
                    confirmationCount
                    slot
                }
            }
        }
    }
`;

/**
 * Component GraphQL data.
 */
type Data = {
    authorizedVoters: {
        authorizedVoter: {
            address: Address;
        };
        epoch: Epoch;
    }[];
    authorizedWithdrawer: {
        address: Address;
    };
    commission: LamportsUnsafeBeyond2Pow53Minus1;
    epochCredits: {
        credits: bigint;
        epoch: Epoch;
        previousCredits: bigint;
    }[];
    lastTimestamp: {
        slot: Slot;
        timestamp: UnixTimestamp;
    };
    node: {
        address: Address;
    };
};

export default function VoteAccount(props: Props) {
    const [data, setData] = useState<Data>();

    useEffect(() => {
        const fetchData = async () => {
            const { address, rpcGraphQL } = props;
            const response = await rpcGraphQL.query(source, { address });
            if (response.data?.account) {
                setData(response.data.account as Data);
            } else if (response.errors) {
                response.errors.forEach(e => console.error(e));
            } else {
                throw 'Unknown error occurred';
            }
        };
        fetchData();
    }, []);

    if (data) {
        return (
            <div>
                <p>Authorized Voters: {data.authorizedVoters.length}</p>
                <p>Authorized Withdrawer: {data.authorizedWithdrawer.address}</p>
                <p>Commission: {data.commission.toString()}</p>
                <p>Last Timestamp: {data.lastTimestamp.timestamp}</p>
                <p>Node: {data.node.address}</p>
            </div>
        );
    }
    return (
        <div>
            <p>Loading...</p>
        </div>
    );
}
