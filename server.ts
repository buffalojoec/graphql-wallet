import { createRpcGraphQL } from '@solana/rpc-graphql';
import { createSolanaRpc } from '@solana/web3.js';
import bodyParser from 'body-parser';
import express from 'express';

const PORT = process.env.SERVER_PORT || 3001;
const RPC_ENDPOINT = process.env.RPC_ENDPOINT || 'http://127.0.0.1:8899';
const SERVER_ERROR = 'SERVER ERROR';

const app = express();
app.use(bodyParser.json());

const rpc = createSolanaRpc(RPC_ENDPOINT);
const rpcGraphQL = createRpcGraphQL(rpc);

app.post('/api/graphql', async (req, res) => {
    const { source, variableValues } = req.body;
    const response = await rpcGraphQL.query(source, variableValues);

    if (response.errors) {
        response.errors.forEach(e => console.error(e));
        res.status(500).send(SERVER_ERROR);
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

app.post('/api/getSignaturesForAddress', async(req, res) => {
    try{
        const { address } = req.body;

        let results = await rpc.getSignaturesForAddress(address).send();
        const signatures = results.map(result => result.signature );
        res.status(200).send(JSON.stringify(signatures));
    }catch(e){
        console.error(e)
        res.status(500).send(SERVER_ERROR);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});