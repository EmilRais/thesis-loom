import * as express from "express";

export type Implementation = Endpoint[];

export interface Endpoint {
    method: string;
    path: string;
    operations: Operation[];
}

export type Operation = express.RequestHandler | express.ErrorRequestHandler;
