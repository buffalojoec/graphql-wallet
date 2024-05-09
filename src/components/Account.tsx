import type { Address, Epoch, LamportsUnsafeBeyond2Pow53Minus1 } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import React from 'react';

import { gql } from '../fetch';
import AddressLookupTableAccount from './accounts/AddressLookupTableAccount';
import NonceAccount from './accounts/NonceAccount';
import TokenAccount from './accounts/SplTokenAccount';
import MintAccount from './accounts/SplTokenMintAccount';
import StakeAccount from './accounts/StakeAccount';
import VoteAccount from './accounts/VoteAccount';

/**
 * Component properties.
 */
interface Props {
    address: Address;
    parsed?: string;
}

/**
 * Component GraphQL query.
 */
const source = /* GraphQL */ `
    query Account($address: Address!) {
        account(address: $address) {
            address
            lamports
            ownerProgram {
                address
            }
            rentEpoch
            space
        }
    }
`;

/**
 * Component GraphQL data.
 */
type Data = {
    address: Address;
    lamports: LamportsUnsafeBeyond2Pow53Minus1;
    ownerProgram: {
        address: Address;
    };
    rentEpoch: Epoch;
    space: bigint;
};

export default function Account(props: Props) {
    const [data, setData] = useState<Data>();

    useEffect(() => {
        const fetchData = async () => {
            const { address } = props;
            const response = (await gql(source, { address })) as { account: Data };
            setData(response.account);
        };
        fetchData();
    }, []);

    const parsedAccountData = () => {
        switch (props.parsed) {
            case 'lookupTable':
                return <AddressLookupTableAccount address={props.address} />;
            case 'nonce':
                return <NonceAccount address={props.address} />;
            case 'tokenAccount':
                return <TokenAccount address={props.address} />;
            case 'tokenMint':
                return <MintAccount address={props.address} />;
            case 'stake':
                return <StakeAccount address={props.address} />;
            case 'vote':
                return <VoteAccount address={props.address} />;
            default:
                null;
        }
    };

    if (data != undefined) {
        return (
            <div>
                <p>Account: {data.address}</p>
                <p>Lamports: {data.lamports.toString()}</p>
                <p>Owner: {data.ownerProgram.address}</p>
                <p>Rent Epoch: {data.rentEpoch.toString()}</p>
                <p>Space: {data.space.toString()}</p>
                {parsedAccountData()}
            </div>
        );
    }
    return (
        <div>
            <p>Loading...</p>
        </div>
    );
}
