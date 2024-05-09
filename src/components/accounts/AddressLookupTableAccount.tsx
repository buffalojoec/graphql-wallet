import type { RpcGraphQL } from '@solana/rpc-graphql';
import type { Address, Slot } from '@solana/web3.js';
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
                <p>Addresses: {data.addresses}</p>
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
