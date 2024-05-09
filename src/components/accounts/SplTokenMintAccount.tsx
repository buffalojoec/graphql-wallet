import type { RpcGraphQL } from '@solana/rpc-graphql';
import type { Address } from '@solana/web3.js';
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
