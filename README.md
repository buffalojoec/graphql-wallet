# GraphQL Wallet

With the new Web3.js 2.0 comes a brand-new client-side GraphQL resolver for the 
Solana JSON RPC.

[`@solana/rpc-graphql`](https://www.npmjs.com/package/@solana/rpc-graphql)

This GraphQL library:

- Allows developers to make requests to the Solana JSON RPC using GraphQL 
  queries.
- Provides a full type schema around Solana's `jsonParsed` type spec.
- Offers highly-optimized usage of RPC requests out of the box.
- Supports the Relay server specification, enabling Relay-native web
  applications.

Provided here for demonstration is a web application - a basic, read-only wallet 
and block explorer - that aims to showcase the GraphQL library's capabilities.

- [ ] Querying the Solana RPC with GraphQL
- [ ] Accounts:
  - [ ] Querying program accounts
  - [ ] Subslicing encoded account data
  - [ ] JSON-parsed types
  - [ ] Extending account types (IDL)
- [ ] Instructions:
  - [ ] Querying transactions
  - [ ] Querying blocks
  - [ ] JSON-parsed types
  - [ ] Extending instruction types (IDL)
- [ ] RPC request optimization:
  - [ ] Request coalescing
  - [ ] Nested queries
  - [ ] Response caching
- [ ] Relay:
  - [ ] `node` queries
  - [ ] Connections
