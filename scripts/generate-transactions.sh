#!/bin/bash

rpc_endpoint=${1:-"http://127.0.0.1:8899"}

echo "Using RPC Endpoint: $rpc_endpoint"

solana airdrop --url $rpc_endpoint 10