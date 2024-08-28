# <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/1024px-GraphQL_Logo.svg.png?20161105194737" alt="graphql-icon" width="32" align="center"/> GraphQL Wallet

With the new Web3.js 2.0 comes a brand-new client-side GraphQL resolver for the
Solana JSON RPC.

[`@solana/rpc-graphql`](https://www.npmjs.com/package/@solana/rpc-graphql)

This GraphQL library:

-   Allows developers to make requests to the Solana JSON RPC using GraphQL
    queries.
-   Provides a full type schema around Solana's `jsonParsed` type spec.
-   Offers highly-optimized usage of RPC requests out of the box.
-   Supports the Relay server specification, enabling Relay-native web
    applications.

Provided here for demonstration is a web application - a basic, read-only wallet
and block explorer - that aims to showcase the GraphQL library's capabilities.

## Running the Demo

**Requirements:**

-   NodeJS 20
-   NPM
-   PNPM
-   Rust
-   Shank CLI: `cargo-install shank-cli`
-   Solana 1.18: `sh -c "$(curl -sSfL https://release.solana.com/v1.18.12/install)"`

Install the application's dependencies.

```
pnpm install
```

In a separate terminal, start a local test validator.
Note the provided `pnpm` command will start the local validator with all of the
necessary account fixtures and the BPF program.

```
pnpm run test-validator
```

Run the script to generate a bunch of transactions.
`LOCAL_VALIDATOR_RPC_ENDPOINT` will default to `http://127.0.0.1:8899` if not
provided.

```
pnpm run generate-transactions <LOCAL_VALIDATOR_RPC_ENDPOINT>
```

Launch the application.
Note you can define an `RPC_ENDPOINT` variable in a `.env` file in the root of
the repository if you wish to use a custom endpoint. This value will default to
`http://127.0.0.1:8899` if not provided.

```
pnpm start
```
