import type { Address, Slot } from '@solana/web3.js';
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
    query SysvarSlotHashesAccount($address: Address!) {
        account(address: $address) {
            ... on SysvarSlotHashesAccount {
                entries {
                    hash
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
    entries: SlotHashEntry[];
};

type SlotHashEntry = {
    hash: String;
    slot: Slot;
};

export default function SysvarSlotHashesAccount(props: Props) {
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
                <p>First Hash: {data.entries[0].hash}</p>
                <p>First Slot: {data.entries[0].slot.toString()}</p>
            </div>
        );
    }
    return (
        <div>
            <p>Loading...</p>
        </div>
    );
}
