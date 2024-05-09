import type { Address, Slot } from '@solana/web3.js';
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
    query AddressLookupTableAccount($address: Address!) {
        account(address: $address) {
            ... on LookupTableAccount {
                addresses
                authority {
                    address
                }
                deactivationSlot
                lastExtendedSlot
                lastExtendedSlotStartIndex
            }
        }
    }
`;

/**
 * Component GraphQL data.
 */
type Data = {
    addresses: Address[];
    authority: {
        address: Address;
    };
    deactivationSlot: Slot;
    lastExtendedSlot: Slot;
    lastExtendedSlotStartIndex: bigint;
};

export default function AddressLookupTableAccount(props: Props) {
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
                <p>Addresses: {data.addresses.length}</p>
                <p>Authority: {data.authority.address}</p>
                <p>Deactivation Slot: {data.deactivationSlot.toString()}</p>
                <p>Last Extended Slot: {data.lastExtendedSlot.toString()}</p>
                <p>Last Extended Slot Start Index: {data.lastExtendedSlotStartIndex.toString()}</p>
            </div>
        );
    }
    return (
        <div>
            <p>Loading...</p>
        </div>
    );
}
