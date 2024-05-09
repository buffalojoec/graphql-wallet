import type { RpcGraphQL } from '@solana/rpc-graphql';
import type { Address, Epoch, LamportsUnsafeBeyond2Pow53Minus1, UnixTimestamp } from '@solana/web3.js';
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
    query StakeAccount($address: Address!) {
        account(address: $address) {
            ... on StakeAccount {
                meta {
                    authorized {
                        staker {
                            address
                        }
                        withdrawer {
                            address
                        }
                    }
                    lockup {
                        custodian {
                            address
                        }
                        epoch
                        unixTimestamp
                    }
                    rentExemptReserve
                }
                stake {
                    creditsObserved
                    delegation {
                        activationEpoch
                        deactivationEpoch
                        stake
                        voter {
                            address
                        }
                    }
                }
            }
        }
    }
`;

/**
 * Component GraphQL data.
 */
type Data = {
    meta: {
        authorized: {
            staker: {
                address: Address;
            };
            withdrawer: {
                address: Address;
            };
        };
        lockup: {
            custodian: {
                address: Address;
            };
            epoch: Epoch;
            unixTimestamp: UnixTimestamp;
        };
        rentExemptReserve: LamportsUnsafeBeyond2Pow53Minus1;
    };
    stake: {
        creditsObserved: bigint;
        delegation: {
            activationEpoch: Epoch;
            deactivationEpoch: Epoch;
            stake: LamportsUnsafeBeyond2Pow53Minus1;
            voter: {
                address: Address;
            };
        };
    };
};

export default function StakeAccount(props: Props) {
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
                <p>Authorized Staker: {data.meta.authorized.staker.address}</p>
                <p>Authorized Withdrawer: {data.meta.authorized.withdrawer.address}</p>
                <p>Lockup Custodian: {data.meta.lockup.custodian.address}</p>
                <p>Credits Observed: {data.stake.creditsObserved.toString()}</p>
            </div>
        );
    }
    return (
        <div>
            <p>Loading...</p>
        </div>
    );
}
