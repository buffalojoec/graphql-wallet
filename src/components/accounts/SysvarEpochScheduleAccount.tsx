import type { Address, Epoch, Slot } from '@solana/web3.js';
import React from 'react';
import { useEffect, useState } from 'react';

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
    query SysvarEpochScheduleAccount($address: Address!) {
        account(address: $address) {
            ... on SysvarEpochScheduleAccount {
                firstNormalEpoch
                firstNormalSlot
                leaderScheduleSlotOffset
                slotsPerEpoch
                warmup
            }
        }
    }
`;

/**
 * Component GraphQL data.
 */
type Data = {
    firstNormalEpoch: Epoch;
    firstNormalSlot: Slot;
    leaderScheduleSlotOffset: bigint;
    slotsPerEpoch: bigint;
    warmup: boolean;
};

export default function SysvarEpochScheduleAccount(props: Props) {
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
                <p>First Normal Epoch: {data.firstNormalEpoch.toString()}</p>
                <p>First Normal Slot: {data.firstNormalSlot.toString()}</p>
                <p>Leader Schedule Slot Offset {data.leaderScheduleSlotOffset.toString()}</p>
                <p>Slots Per Epoch: {data.slotsPerEpoch.toString()}</p>
                <p>Warmup: {data.warmup}</p>
            </div>
        );
    }
    return (
        <div>
            <p>Loading...</p>
        </div>
    );
}
