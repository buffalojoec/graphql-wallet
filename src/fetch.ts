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

export async function _fetch(url:string, body: any){
    const res = await fetch(url, {
        body: JSON.stringify({
            ...body
        }),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    });

    const text = await res.text();
    let result = JSON.parse(text, (_, value) => {
        if (value && typeof value === 'object' && '__bigint' in value) {
            return BigInt(value['__bigint']);
        }
        return value;
    });
    if(!result.err || result?.err?.statusCode == 200){
        return result;
    }
    return [];
}