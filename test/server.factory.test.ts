import * as chai from "chai";
const should = chai.should();

import { RequestHandler } from "express";
import { Server } from "http";
import * as agent from "superagent";

import { Implementation } from "../source/implementation.model";
import { ServerFactory } from "../source/server.factory";

describe("ServerFactory", () => {
    const serverFactory = new ServerFactory();

    describe("createServer", () => {
        it("should fail if unknown method", () => {
            const implementation: Implementation = [
                {
                    method: "get",
                    path: "/ping",
                    operations: []
                }
            ];

            try {
                serverFactory.createServer(implementation);
                throw new Error("Was supposed to fail");
            } catch (error) {
                error.message.should.equal("Unrecognised method for endpoint get /ping");
            }
        });

        it("should create endpoints that perform operations", () => {
            const implementation: Implementation = [
                {
                    method: "GET",
                    path: "/ping",
                    operations: [
                        function(request, response, next) {
                            response.locals.value = "some-value";
                            next();
                        },
                        function(request, response, next) {
                            response.status(200).end(response.locals.value);
                        }
                    ] as RequestHandler[]
                }
            ];

            return new Promise((resolve, reject) => {
                serverFactory.createServer(implementation).listen(3030, function() {
                    const runningServer: Server = this;
                    agent.get("localhost:3030/ping")
                        .catch(error => error.response)
                        .then(response => {
                            runningServer.close();
                            response.status.should.equal(200);
                            response.text.should.equal("some-value");
                            resolve();
                        })
                        .catch(reject);
                });
            });
        });

        it("should create endpoints that are only available at specified method and path", () => {
            const implementation: Implementation = [
                {
                    method: "GET",
                    path: "/ping",
                    operations: [
                        function(request, response, next) {
                            response.locals.value = "some-value";
                            next();
                        },
                        function(request, response, next) {
                            response.status(200).end(response.locals.value);
                        }
                    ] as RequestHandler[]
                }
            ];

            return new Promise((resolve, reject) => {
                serverFactory.createServer(implementation).listen(3030, function() {
                    const runningServer: Server = this;
                    agent.post("localhost:3030/ping")
                        .catch(error => error.response)
                        .then(response => {
                            runningServer.close();
                            response.status.should.equal(404);
                            response.text.should.include("Cannot POST /ping");
                            resolve();
                        })
                        .catch(reject);
                });
            });
        });
    });
});
