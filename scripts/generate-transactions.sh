#!/bin/bash

rpc_endpoint=${1:-"http://127.0.0.1:8899"}

# Execute script from project root directory
mkdir mock-keypairs
echo "Using RPC Endpoint: $rpc_endpoint"

solana airdrop --url $rpc_endpoint 10

mock_keypair_file="mock-keypairs/mock-keypair.json"
mock_mint_keypair_file="mock-keypairs/mock-mint-keypair.json"

solana-keygen new --force --no-bip39-passphrase -o $mock_keypair_file
solana transfer --allow-unfunded-recipient --url $rpc_endpoint $mock_keypair_file 1

solana-keygen new --force --no-bip39-passphrase -o $mock_mint_keypair_file
spl_token=$(spl-token create-token $mock_mint_keypair_file --url $rpc_endpoint | awk '{print $3}')
spl_account_1=$(spl-token create-account $spl_token --url $rpc_endpoint | awk '{print $3}')
spl-token mint $spl_token 100 --url $rpc_endpoint