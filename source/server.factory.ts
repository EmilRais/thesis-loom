import { json } from "body-parser";
import { Express } from "express";
import * as express from "express";

import { Design } from "./design.model";

export class ServerFactory {
    createServer(design: Design): Express {
        const server = express();

        server.use(json());

        design.endpoints.forEach(endpoint => {
            switch ( endpoint.method ) {
                case "GET": return server.get(endpoint.path, endpoint.operations);
                case "POST": return server.post(endpoint.path, endpoint.operations);
                default: throw new Error(`Unrecognised method for endpoint ${endpoint.method} ${endpoint.path}`);
            }
        });

        return server;
    }
}
