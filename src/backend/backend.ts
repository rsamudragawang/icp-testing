import express from 'express';
import { Server, ic, query } from 'azle';
import {
    HttpResponse,
    HttpTransformArgs,
} from 'azle/canisters/management';


export default Server(
    // Server section
    () => {
        const app = express();
        app.use(express.json());

        let notebook = {   
            '0': { 'description': 'this is first note', 'title': 'first note', 'created_at': new Date() },
        }


        app.get('/notes', (_req, res) => {
            res.json(notebook);
        });

        app.post('/create', (req, res) => {
            const note = { [req.body.name]: { description: req.body.description, title:req.body.title, created_at: new Date() } };
            notebook = { ...notebook, ...note };
            res.json({ status: 'Ok' });
        });

        app.get('/greet', (req, res) => {
            res.json({ greeting: `Hello, ${req.query.name}` });
        });

        app.get('/movie', async (req, res) => {
            ic.setOutgoingHttpOptions({
                maxResponseBytes: 20_000n,
                cycles: 500_000_000_000n, // HTTP outcalls cost cycles. Unused cycles are returned.
                transformMethodName: 'transform'
            });

            const response = await (await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=d8c375524b59e7a31fdedc44597ce2d4`)).json();
            res.json(response);
        });

        app.use(express.static('/dist'));
        return app.listen();
    },
    // Candid section
    {
        transform: query([HttpTransformArgs], HttpResponse, (args) => {
            return {
                ...args.response,
                headers: []
            };
        })
    }
);
