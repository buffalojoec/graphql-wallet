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
    query SplTokenExtensionTokenGroup($address: Address!) {
        account(address: $address) {
            ... on MintAccount {
                extensions {
                    ... on SplTokenExtensionTokenGroup {
                        extension
                        maxSize
                        mint {
                            address
                        }
                        size
                        updateAuthority {
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
    extension: string;
    maxSize: bigint;
    mint: {
        address: Address;
    };
    size: bigint;
    updateAuthority: {
        address: Address;
    };
};

export default function SplTokenGroup(props: Props) {
    const [data, setData] = useState<Data>();

    useEffect(() => {
        const fetchData = async () => {
            const { address } = props;
            const response = await gql(source, { address });

            const extensionTokenMetadata = response.account.extensions.find(
                (extensions: Data) => extensions.extension === 'tokenGroup',
            );

            setData(extensionTokenMetadata);
        };
        fetchData();
    }, []);

    if (data) {
        return (
            <div>
                <p>Extension: {data.extension}</p>
                <p>Max size: {data.maxSize.toString()}</p>
                <p>Mint: {data.mint.address.toString()}</p>
                <p>Size: {data.size.toString()}</p>
                <p>Update authority: {data.updateAuthority.address.toString()}</p>
            </div>
        );
    }
    return (
        <div>
            <p>Loading...</p>
        </div>
    );
}
