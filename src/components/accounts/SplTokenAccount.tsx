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
    query TokenAccount($address: Address!) {
        account(address: $address) {
            ... on TokenAccount {
                isNative
                mint {
                    address
                }
                owner {
                    address
                }
                state
                tokenAmount {
                    amount
                }
            }
        }
    }
`;

/**
 * Component GraphQL data.
 */
type Data = {
    isNative: boolean;
    mint: {
        address: Address;
    };
    owner: {
        address: Address;
    };
    state: string;
    tokenAmount: {
        amount: bigint;
        decimals: bigint;
        uiAmount: string;
        uiAmountString: string;
    };
};

export default function TokenAccount(props: Props) {
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
                <p>Is Native: {data.isNative}</p>
                <p>Mint: {data.mint.address}</p>
                <p>Owner: {data.owner.address}</p>
                <p>State: {data.state}</p>
                <p>Amount: {data.tokenAmount.amount.toString()}</p>
            </div>
        );
    }
    return (
        <div>
            <p>Loading...</p>
        </div>
    );
}
