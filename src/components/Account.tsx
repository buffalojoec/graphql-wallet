import type { RpcGraphQL } from '@solana/rpc-graphql';
import type { Address, Epoch, LamportsUnsafeBeyond2Pow53Minus1 } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import React from 'react';

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
    rpcGraphQL: RpcGraphQL;
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

    const parsedAccountData = () => {
        switch (props.parsed) {
            case 'lookupTable':
                return <AddressLookupTableAccount address={props.address} rpcGraphQL={props.rpcGraphQL} />;
            case 'nonce':
                return <NonceAccount address={props.address} rpcGraphQL={props.rpcGraphQL} />;
            case 'tokenAccount':
                return <TokenAccount address={props.address} rpcGraphQL={props.rpcGraphQL} />;
            case 'tokenMint':
                return <MintAccount address={props.address} rpcGraphQL={props.rpcGraphQL} />;
            case 'stake':
                return <StakeAccount address={props.address} rpcGraphQL={props.rpcGraphQL} />;
            case 'vote':
                return <VoteAccount address={props.address} rpcGraphQL={props.rpcGraphQL} />;
            default:
                null;
        }
    };

    if (data) {
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
