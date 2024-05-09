import type { RpcGraphQL } from '@solana/rpc-graphql';
import type { Address, Blockhash, LamportsUnsafeBeyond2Pow53Minus1 } from '@solana/web3.js';
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
    query NonceAccount($address: Address!) {
        account(address: $address) {
            ... on NonceAccount {
                authority {
                    address
                }
                blockhash
                feeCalculator {
                    lamportsPerSignature
                }
            }
        }
    }
`;

/**
 * Component GraphQL data.
 */
type Data = {
    authority: {
        address: Address;
    };
    blockhash: Blockhash;
    feeCalculator: {
        lamportsPerSignature: LamportsUnsafeBeyond2Pow53Minus1;
    };
};

export default function NonceAccount(props: Props) {
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
                <p>Authority: {data.authority.address}</p>
                <p>Blockhash: {data.blockhash}</p>
                <p>Lamports Per Signature: {data.feeCalculator.lamportsPerSignature.toString()}</p>
            </div>
        );
    }
    return (
        <div>
            <p>Loading...</p>
        </div>
    );
}
