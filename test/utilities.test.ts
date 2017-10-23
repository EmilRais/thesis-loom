import * as chai from "chai";
const should = chai.should();

import { RequestHandler } from "express";
import * as mockito from "ts-mockito";

import { Operation, Specification } from "../source/specification.model";
import { Utilities } from "../source/utilities";

describe("Utilities", () => {
    let utilities: Utilities;

    beforeEach(() => {
        utilities = new Utilities();
    });

    describe("loadSpecification", () => {
        it("should fail if unable to load specification", () => {
            return utilities.loadSpecification("test/specifications/unknown-specification.json")
                .then(() => Promise.reject("Expected to fail"))
                .catch((error: Error) => {
                    error.message.should.include("no such file");
                });
        });

        it("should return the specification", () => {
            return utilities.loadSpecification("test/specifications/empty-specification.json")
                .then(specification => {
                    specification.should.deep.equal([{
                        method: "GET",
                        path: "/ping",
                        operations: []
                    }] as Specification);
                });
        });
    });

    describe("convertSpecificationToDesign", () => {
        it("should convert operations for each endpoint", () => {
            const specification: Specification = [
                {
                    method: "GET",
                    path: "/ping",
                    operations: [
                        { module: "some-module" } as Operation
                    ]
                }
            ];

            const utilitiesSpy = mockito.spy(utilities);

            const someOperation = function() {};
            mockito.when(utilitiesSpy.convertOperations("some-path", mockito.anything()))
                .thenReturn(Promise.resolve([someOperation]));

            return utilities.convertSpecificationToDesign("some-path", specification)
                .then(implementation => {
                    implementation.endpoints.should.deep.equal([
                        {
                            method: "GET",
                            path: "/ping",
                            operations: [someOperation]
                        }
                    ]);
                });
        });
    });

    describe("convertOperations", () => {
        it("should load and prepare operations", () => {
            const operations: Operation[] = [
                { module: "../modules/name", name: "Peter" } as Operation,
                { module: "../modules/age", age: 21 } as Operation
            ];

            return utilities.convertOperations("test/specifications/empty-specification.json", operations)
                .then((concreteOperations: RequestHandler[]) => {
                    concreteOperations.should.have.length(2);
                    concreteOperations[0](null, null, name => {
                        concreteOperations[1](null, null, age => {
                            name.should.equal("Peter");
                            age.should.equal(21);
                        });
                    });
                });
        });
    });
});
