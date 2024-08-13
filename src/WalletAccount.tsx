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
    account: {
        address: Address;
        lamports: LamportsUnsafeBeyond2Pow53Minus1;
    };
};

type AddressAndSolBalance = {
    address: Address;
    solBalance: number;
};

function WalletAccount(props: Props) {
    const [data, setData] = useState<AddressAndSolBalance>();

    useEffect(() => {
        const fetchData = async () => {
            const { address } = props;
            const response = (await gql(source, { address })) as Data;
            if (response.account.lamports) {
                const address = response.account.address;
                const solBalance = Number(response.account.lamports / 1_000_000_000n);
                setData({
                    address,
                    solBalance,
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
