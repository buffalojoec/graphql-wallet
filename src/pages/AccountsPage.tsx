import './AccountsPage.css';

import type { Address } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import React from 'react';

import { gql } from '../fetch';

/**
 * Component properties.
 */
interface Props {
    walletAddress: Address;
}

/**
 * Component GraphQL query.
 */
const source = /* GraphQL */ `
    query AccountsPage($walletAddress: String!) {
        # Token-2022 token accounts
        tokens: programAccounts(
            programAddress: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
            commitment: null
            dataSizeFilters: [
                {
                    dataSize: 170 # Token account with immutable owner extension (165 + 1 + 2 + 2)
                }
            ]
            memcmpFilters: [
                {
                    bytes: $walletAddress # Wallet address (owner)
                    encoding: BASE_58 # Base58-encoded address
                    offset: 32 # Offset 32 for owner
                }
            ]
        ) {
            ... on TokenAccount {
                mint {
                    # Query the mint info as well
                    address
                    ... on MintAccount {
                        extensions {
                            ... on SplTokenExtensionTokenMetadata {
                                name
                                symbol
                            }
                        }
                    }
                }
                tokenAmount {
                    uiAmount
                }
            }
        }
    }
`;

/**
 * Component GraphQL data.
 */
type Data = {
    tokens: {
        amount: bigint;
        mintAddress: Address;
        name: string;
        symbol: string;
    }[];
};

function parseTokenMetadataExtension(extensions: object[]) {
    for (const extension of extensions) {
        if ('name' in extension && 'symbol' in extension) {
            return [extension.name, extension.symbol];
        }
    }
    return [null, null];
}

function TokenComponent(props: Data['tokens'][number]) {
    return (
        <div>
            <p>Mint address: {props.mintAddress}</p>
            <p>Name: {props.name}</p>
            <p>Symbol: {props.symbol}</p>
            <p>Amount: {props.amount.toString()}</p>
        </div>
    );
}

function AccountsPage(props: Props) {
    const [data, setData] = useState<Data>();

    useEffect(() => {
        const fetchData = async () => {
            const { walletAddress } = props;
            const response = await gql(source, { walletAddress });
            const tokens = response.tokens.map(
                (token: {
                    mint: { address: Address; extensions: { extension: string; name: string; symbol: string }[] };
                    tokenAmount: { uiAmount: bigint };
                }) => {
                    const amount = token.tokenAmount.uiAmount;
                    const mintAddress = token.mint.address;
                    const [name, symbol] = parseTokenMetadataExtension(token.mint.extensions);
                    return { amount, mintAddress, name, symbol };
                },
            );
            setData({ tokens });
        };
        fetchData();
    }, []);

    return (
        <div className="accounts-page">
            <h3>Tokens</h3>
            {data?.tokens.map((token: Data['tokens'][number], i: React.Key | null | undefined) => (
                <TokenComponent
                    key={i}
                    mintAddress={token.mintAddress}
                    name={token.name}
                    symbol={token.symbol}
                    amount={token.amount}
                />
            ))}
            <h3>Stake</h3>
            <h3>Castle Raid!</h3>
        </div>
    );
}

export default AccountsPage;
