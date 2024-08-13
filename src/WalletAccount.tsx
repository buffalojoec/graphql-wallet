import './WalletAccount.css';

import type { Address, LamportsUnsafeBeyond2Pow53Minus1 } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import React from 'react';

import { gql } from './fetch';

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
    query WalletAccount($address: Address!) {
        account(address: $address) {
            address
            lamports
        }
    }
`;

/**
 * Component GraphQL data.
 */
type Data = {
    address: Address;
    lamports: LamportsUnsafeBeyond2Pow53Minus1;
};

type DatawithSolBalance = {
    address: Address;
    solBalance: number;
};

function WalletAccount(props: Props) {
    const [data, setData] = useState<DatawithSolBalance>();

    useEffect(() => {
        const fetchData = async () => {
            const { address } = props;
            const response = (await gql(source, { address })) as { account: Data };
            if (response.account.lamports) {
                const solBalance = Number(response.account.lamports / 1_000_000_000n);
                setData({
                    solBalance,
                    ...response.account,
                });
            }
        };
        fetchData();
    }, []);

    return (
        <div className="wallet-account">
            {data ? (
                <div className="wallet-account-meta">
                    <p className="wallet-account-address">{data.address}</p>
                    <p className="wallet-account-sol-balance">{data.solBalance} SOL</p>
                </div>
            ) : (
                <p className="wallet-account-not-connected">Not connected</p>
            )}
        </div>
    );
}

export default WalletAccount;
