#!/bin/bash

rpc_endpoint=${1:-"http://127.0.0.1:8899"}

echo "Using RPC Endpoint: $rpc_endpoint"

solana airdrop --url $rpc_endpoint 10

solana transfer CSg2vQGbnwWdSyJpwK4i3qGfB6FebaV3xQTx4U1MbixN 1 --allow-unfunded-recipient --url $rpc_endpoint

spl_token=$(spl-token create-token --url $rpc_endpoint | awk '{print $3}')
spl_account_1=$(spl-token create-account $spl_token --url $rpc_endpoint | awk '{print $3}')
spl-token mint $spl_token 100 --url $rpc_endpoint