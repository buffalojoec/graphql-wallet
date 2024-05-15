import type { Address } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import React from 'react';

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
    query SplTokenExtensionTokenMetadata($address: Address!) {
        account(address: $address) {
            ... on MintAccount {
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

export default function SplTokenMetadata(props: Props) {
    const [data, setData] = useState<Data>();

    useEffect(() => {
        const fetchData = async () => {
            const { address } = props;
            const response = await gql(source, { address });

            const extensionTokenMetadata = response.account.extensions.find(
                (extensions: Data) => extensions.extension === 'tokenMetadata',
            );

            setData(extensionTokenMetadata);
        };
        fetchData();
    }, []);

    if (data) {
        return (
            <div>
                <p>Extension: {data.extension}</p>
                <p>Mint: {data.mint.address.toString()}</p>
                <p>Name: {data.name}</p>
                <p>Symbol: {data.symbol}</p>
                <p>Update authority: {data.updateAuthority.address.toString()}</p>
                <p>Uri: {data.uri}</p>
            </div>
        );
    }
    return (
        <div>
            <p>Loading...</p>
        </div>
    );
}
