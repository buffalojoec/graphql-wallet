import { createRpcGraphQL } from '@solana/rpc-graphql';
import { createSolanaRpc } from '@solana/web3.js';
import bodyParser from 'body-parser';
import express from 'express';

const PORT = process.env.SERVER_PORT || 3001;
const RPC_ENDPOINT = process.env.RPC_ENDPOINT || 'http://127.0.0.1:8899';

const app = express();
app.use(bodyParser.json());

const rpc = createSolanaRpc(RPC_ENDPOINT);
const rpcGraphQL = createRpcGraphQL(rpc);

app.post('/api/graphql', async (req, res, next) => {
    const { source, variableValues } = req.body;
    const response = await rpcGraphQL.query(source, variableValues);

    if (response.errors) {
        response.errors.forEach(e => console.error(e));
        next({ statusCode:500, message: 'Server Error'});
    }

    if (response.data) {
        res.send(JSON.stringify(response.data, (_, value) => {
            if (typeof value === 'bigint') {
                return { __bigint: value.toString() };
            }
            return value;
        }));
    }

    return;
});

type Error = {
    statusCode: number,
    message: string,
    __code: number
}

app.post('/api/getSignaturesForAddress', async(req, res, next) => {
    try{
        const { address } = req.body;

        let results = await rpc.getSignaturesForAddress(address).send();
        const signatures = results.map(result => result.signature );
        console.log(signatures)
        res.status(200).send(JSON.stringify(signatures));
    }catch(e:any){
        console.error(e)
        let error:Error = { statusCode: 500, message: e?.context?.__serverMessage, __code: e?.context?.__code };
        next(error);
    }
});

app.use(function(err:Error, _req:any, res:any, _next:any){
    res.status(err.statusCode).json({ err });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});