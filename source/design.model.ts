import { ErrorRequestHandler, RequestHandler } from "express";

export interface Design {
    endpoints: Endpoint[];
}

export interface Endpoint {
    method: string;
    path: string;
    operations: Operation[];
}

export type Operation = RequestHandler | ErrorRequestHandler;
