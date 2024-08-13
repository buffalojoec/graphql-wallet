import type { Address, Epoch, Slot } from '@solana/web3.js';
import React from 'react';
import { useEffect, useState } from 'react';

import { gql } from '../../../fetch';

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
    query SysvarClockAccount($address: Address!) {
        account(address: $address) {
            ... on SysvarClockAccount {
                epoch
                epochStartTimestamp
                leaderScheduleEpoch
                slot
                unixTimestamp
            }
        }
    }
`;

/**
 * Component GraphQL data.
 */
type Data = {
    epoch: Epoch;
    epochStartTimestamp: bigint;
    leaderScheduleEpoch: Epoch;
    slot: Slot;
    unixTimestamp: bigint;
};

export default function SysvarClockAccount(props: Props) {
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
                <p>Epoch: {data.epoch.toString()}</p>
                <p>Epoch Start Timestamp: {data.epochStartTimestamp.toString()}</p>
                <p>Leader Schedule Epoch {data.leaderScheduleEpoch.toString()}</p>
                <p>Slot: {data.slot.toString()}</p>
                <p>Unix Timestamp: {data.unixTimestamp.toString()}</p>
            </div>
        );
    }
    return (
        <div>
            <p>Loading...</p>
        </div>
    );
}
