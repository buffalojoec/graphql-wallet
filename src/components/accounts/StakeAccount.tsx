import type { Address, Epoch, LamportsUnsafeBeyond2Pow53Minus1, UnixTimestamp } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import React from 'react';

import { gql } from '../../fetch';

/**
 * Component properties.
 */
interface Props {
    address: Address;
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
            const { address } = props;
            const response = (await gql(source, { address })) as { account: Data };
            setData(response.account);
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
