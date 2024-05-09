import type { RpcGraphQL } from '@solana/rpc-graphql';

export async function gql(...params: Parameters<RpcGraphQL['query']>) {
    const [source, variableValues] = params;
    const res = await fetch('/api/graphql', {
        body: JSON.stringify({
            source,
            variableValues,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    });
    const text = await res.text();
    return JSON.parse(text, (_, value) => {
        if (value && typeof value === 'object' && '__bigint' in value) {
            return BigInt(value['__bigint']);
        }
        return value;
    });
}
