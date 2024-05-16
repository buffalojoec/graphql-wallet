import type { RpcGraphQL } from '@solana/rpc-graphql';

export async function gql(...params: Parameters<RpcGraphQL['query']>) {
    const [source, variableValues] = params;
    return await postRequest('/api/graphql', { source, variableValues });
}

export async function postRequest(endpoint: string, body: object) {
    const res = await fetch(endpoint, {
        body: JSON.stringify({
            ...body,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    });
    if (res.status !== 200) {
        console.error('Server Error. Check Server logs');
        return;
    }
    const text = await res.text();
    return JSON.parse(text, (_, value) => {
        if (value && typeof value === 'object' && '__bigint' in value) {
            return BigInt(value['__bigint']);
        }
        return value;
    });
}
