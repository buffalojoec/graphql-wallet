import type { RpcGraphQL } from '@solana/rpc-graphql';

export async function gql(...params: Parameters<RpcGraphQL['query']>) {
    const [source, variableValues] = params;
    return await postRequest('/api/graphql', { source, variableValues });
}

export async function _fetch(url: string, body: object) {
    return await postRequest(url, body);
}

async function postRequest(url: string, body: object) {
    const res = await fetch(url, {
        body: JSON.stringify({
            ...body,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    });
    const text = await res.text();
    if (text === 'SERVER ERROR') {
        console.error('Server Error. Check Server logs');
        return;
    }
    return JSON.parse(text, (_, value) => {
        if (value && typeof value === 'object' && '__bigint' in value) {
            return BigInt(value['__bigint']);
        }
        return value;
    });
}
