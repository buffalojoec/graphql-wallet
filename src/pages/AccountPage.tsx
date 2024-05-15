import React from 'react';
import Account from '../components/Account';
import { type Address } from '@solana/web3.js';

const SYSVAR_CLOCK_ACCOUNT_ADDRESS =
    'SysvarC1ock11111111111111111111111111111111' as Address<'SysvarC1ock11111111111111111111111111111111'>;
const SYSVAR_EPOCH_SCHEDULE_ADDRESS =
    'SysvarEpochSchedu1e111111111111111111111111' as Address<'SysvarEpochSchedu1e111111111111111111111111'>;
const SYSVAR_RENT_ADDRESS =
    'SysvarRent111111111111111111111111111111111' as Address<'SysvarRent111111111111111111111111111111111'>;
const SYSVAR_SLOT_HASHES_ADDRESS =
    'SysvarS1otHashes111111111111111111111111111' as Address<'SysvarS1otHashes111111111111111111111111111'>;
const ADDRESS_LOOKUP_TABLE_ACCOUNT_ADDRESS =
    '2JPQuT3dHtPjrdcbUQyrrT4XYRYaWpWfmAJ54SUapg6n' as Address<'2JPQuT3dHtPjrdcbUQyrrT4XYRYaWpWfmAJ54SUapg6n'>;
const NONCE_ACCOUNT_ADDRESS =
    'AiZExP8mK4RxDozh4r57knvqSZgkz86HrzPAMx61XMqU' as Address<'AiZExP8mK4RxDozh4r57knvqSZgkz86HrzPAMx61XMqU'>;
const TOKEN_2022_ACCOUNT_ADDRESS =
    'aUg6iJ3p43hTJsxHrQ1KfqMQYStoFvqcSJRcc51cYzK' as Address<'aUg6iJ3p43hTJsxHrQ1KfqMQYStoFvqcSJRcc51cYzK'>;
const TOKEN_2022_MINT_ADDRESS =
    '5gSwsLGzyCwgwPJSnxjsQCaFeE19ZFaibHMLky9TDFim' as Address<'5gSwsLGzyCwgwPJSnxjsQCaFeE19ZFaibHMLky9TDFim'>;
const SPL_TOKEN_ACCOUNT_ADDRESS =
    'AyGCwnwxQMCqaU4ixReHt8h5W4dwmxU7eM3BEQBdWVca' as Address<'AyGCwnwxQMCqaU4ixReHt8h5W4dwmxU7eM3BEQBdWVca'>;
const SPL_TOKEN_MINT_ADDRESS =
    'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr' as Address<'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr'>;
const STAKE_ACCOUNT_ADDRESS =
    'CSg2vQGbnwWdSyJpwK4i3qGfB6FebaV3xQTx4U1MbixN' as Address<'CSg2vQGbnwWdSyJpwK4i3qGfB6FebaV3xQTx4U1MbixN'>;
const VOTE_ACCOUNT_ADDRESS =
    '4QUZQ4c7bZuJ4o4L8tYAEGnePFV27SUFEVmC7BYfsXRp' as Address<'4QUZQ4c7bZuJ4o4L8tYAEGnePFV27SUFEVmC7BYfsXRp'>;

export default function AccountPage() {
    return (
        <>
            <body>
                <Account address={SYSVAR_CLOCK_ACCOUNT_ADDRESS} parsed="clock" />
                <Account address={SYSVAR_EPOCH_SCHEDULE_ADDRESS} parsed="epochSchedule" />
                <Account address={SYSVAR_RENT_ADDRESS} parsed="rent" />
                <Account address={SYSVAR_SLOT_HASHES_ADDRESS} parsed="slotHashes" />
                <Account address={ADDRESS_LOOKUP_TABLE_ACCOUNT_ADDRESS} parsed="lookupTable" />
                <Account address={NONCE_ACCOUNT_ADDRESS} parsed="nonce" />
                <Account address={TOKEN_2022_ACCOUNT_ADDRESS} parsed="tokenAccount" />
                <Account address={TOKEN_2022_MINT_ADDRESS} parsed="tokenMint" />
                <Account address={SPL_TOKEN_ACCOUNT_ADDRESS} parsed="tokenAccount" />
                <Account
                    address={SPL_TOKEN_MINT_ADDRESS}
                    // parsed="tokenMint"
                />
                <Account address={STAKE_ACCOUNT_ADDRESS} parsed="stake" />
                <Account address={VOTE_ACCOUNT_ADDRESS} parsed="vote" />
            </body>
        </>
    );
}
