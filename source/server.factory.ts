import * as express from "express";

import { Implementation } from "./implementation.model";

export class ServerFactory {
    createServer(implementation: Implementation): express.Express {
        const server = express();

        implementation.forEach(endpoint => {
            switch ( endpoint.method ) {
                case "GET": return server.get(endpoint.path, endpoint.operations);
                case "POST": return server.post(endpoint.path, endpoint.operations);
                default: throw new Error(`Unrecognised method for endpoint ${endpoint.method} ${endpoint.path}`);
            }
        });

        return server;
    }
}
