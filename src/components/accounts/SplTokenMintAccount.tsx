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
                extensions {
                    ... on SplTokenExtensionTokenMetadata {
                        additionalMetadata {
                            key
                            value
                        }
                        extension
                        mint {
                            address
                        }
                        name
                        symbol
                        updateAuthority {
                            address
                        }
                        uri
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
    decimals: bigint;
    isInitialized: boolean;
    mintAuthority: {
        address: Address;
    };
    supply: bigint;
    extensions: ExtensionData[];
};

/**
 * Component GraphQL data.
 */
type TokenMetadataData = {
    additionalMetadata: {
        key: string;
        value: string;
    };
    extension: string;
    mint: {
        address: Address;
    };
    name: string;
    symbol: string;
    updateAuthority: {
        address: Address;
    };
    uri: string;
};

type ExtensionData = TokenMetadataData;

export default function MintAccount(props: Props) {
    const [data, setData] = useState<Data>();
    const [tokenMetadataData, setTokenMetadataData] = useState<TokenMetadataData>();

    useEffect(() => {
        const fetchData = async () => {
            const { address } = props;
            const response = (await gql(source, { address })) as { account: Data };
            setData(response.account);

            const extensionTokenMetadata = response.account.extensions.find(
                (extensions: ExtensionData) => extensions.extension === 'tokenMetadata',
            );

            setTokenMetadataData(extensionTokenMetadata);
        };
        fetchData();
    }, []);

    if (data && tokenMetadataData) {
        return (
            <div>
                <p>Decimals: {data.decimals.toString()}</p>
                <p>Is Initialized: {data.isInitialized}</p>
                <p>Mint Authority: {data.mintAuthority.address}</p>
                <p>Supply: {data.supply.toString()}</p>

                <p>Extension: {tokenMetadataData.extension}</p>
                <p>Mint: {tokenMetadataData.mint.address.toString()}</p>
                <p>Name: {tokenMetadataData.name}</p>
                <p>Symbol: {tokenMetadataData.symbol}</p>
                <p>Update authority: {tokenMetadataData.updateAuthority.address.toString()}</p>
                <p>Uri: {tokenMetadataData.uri}</p>
            </div>
        );
    }
    return (
        <div>
            <p>Loading...</p>
        </div>
    );
}
