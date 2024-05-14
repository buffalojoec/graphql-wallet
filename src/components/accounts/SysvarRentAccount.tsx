import type { Address, LamportsUnsafeBeyond2Pow53Minus1 } from '@solana/web3.js';
import React from 'react';
import { useEffect, useState } from 'react';

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
    query SysvarRentAccount($address: Address!) {
        account(address: $address) {
            ... on SysvarRentAccount {
                burnPercent
                exemptionThreshold
                lamportsPerByteYear
            }
        }
    }
`;

/**
 * Component GraphQL data.
 */
type Data = {
    burnPercent: number;
    exemptionThreshold: number;
    lamportsPerByteYear: LamportsUnsafeBeyond2Pow53Minus1;
};

export default function SysvarRentAccount(props: Props) {
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
                <p>Burn Percent: {data.burnPercent}</p>
                <p>Exemption Threshold: {data.exemptionThreshold}</p>
                <p>Lamports Per Byte Year: {data.lamportsPerByteYear.toString()}</p>
            </div>
        );
    }
    return (
        <div>
            <p>Loading...</p>
        </div>
    );
}
