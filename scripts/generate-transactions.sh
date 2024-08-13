#!/bin/bash
# Execute script from project root directory

echo "Generating transactions..."

rpc_endpoint=${1:-"http://127.0.0.1:8899"}
echo "Using RPC Endpoint: $rpc_endpoint"

# Load the wallet account from the fixtures.
fee_payer=$(solana config get | awk '/Keypair Path:/ {print $3}')
wallet_address=$(jq -r '.pubkey' fixtures/account.json)

# Function to create an SPL token and mint to the wallet address.
function create_and_mint_token() {
    local token_name=$1
    local token_symbol=$2
    local token_uri=$3
    local amount=$4

    # Create the token.
    spl_token=$(spl-token create-token \
        --url $rpc_endpoint \
        --enable-metadata \
        --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb \
        | awk '/Address:/ {print $2}'
    )

    # Initialize the token metadata.
    spl-token initialize-metadata \
        --url $rpc_endpoint \
        $spl_token \
        "$token_name" \
        "$token_symbol" \
        "$token_uri"

    # Create a token account for the wallet address.
    destination=$(spl-token create-account \
        --url $rpc_endpoint \
        $spl_token \
        --owner $wallet_address \
        --fee-payer $fee_payer \
        | awk '/Creating account/ {print $3}'
    )

    # Mint the token to the wallet address.
    spl-token mint --url $rpc_endpoint $spl_token $amount $destination
}

# Set up the fee payer (local keypair).
solana airdrop --url $rpc_endpoint 2

# Mint a few different tokens to the wallet address.
create_and_mint_token "GraphQL Token" "GQL" "https://gql.fake.url" 1000
create_and_mint_token "Relay Token" "RLAY" "https://relay.fake.url" 300

echo "Success!"
