import type { Address } from '@solana/web3.js';
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
    query MintAccount($address: Address!) {
        account(address: $address) {
            ... on MintAccount {
                decimals
                isInitialized
                mintAuthority {
                    address
                    lamports
                }
                supply
            }
        }
    }
`;

/**
 * Component GraphQL data.
 */
type Data = {
    decimals: bigint;
    isInitialized: boolean;
    mintAuthority: {
        address: Address;
    };
    supply: bigint;
};

export default function MintAccount(props: Props) {
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
                <p>Decimals: {data.decimals.toString()}</p>
                <p>Is Initialized: {data.isInitialized}</p>
                <p>Mint Authority: {data.mintAuthority.address}</p>
                <p>Supply: {data.supply.toString()}</p>
            </div>
        );
    }
    return (
        <div>
            <p>Loading...</p>
        </div>
    );
}
