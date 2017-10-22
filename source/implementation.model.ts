import { ErrorRequestHandler, RequestHandler } from "express";

export type Implementation = Endpoint[];

export interface Endpoint {
    method: string;
    path: string;
    operations: Operation[];
}

export type Operation = RequestHandler | ErrorRequestHandler;
