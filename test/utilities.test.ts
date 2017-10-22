import * as chai from "chai";
const should = chai.should();

import { Specification } from "../source/specification.model";
import { Utilities } from "../source/utilities";

describe("Utilities", () => {
    const utilities = new Utilities();

    describe("loadSpecification", () => {
        it("should fail if unable to load specification", () => {
            return utilities.loadSpecification("test/some-unknown-specification.json")
                .then(() => Promise.reject("Expected to fail"))
                .catch((error: Error) => {
                    error.message.should.include("no such file");
                });
        });

        it("should return the specification", () => {
            return utilities.loadSpecification("test/some-specification.json")
                .then(specification => {
                    specification.should.deep.equal([{
                        method: "GET",
                        path: "/ping",
                        operations: []
                    }] as Specification);
                });
        });
    });

    describe("convertSpecificationToImplementation", () => {
        it("should convert operations for each endpoint");
    });

    describe("convertOperations", () => {
        it("should load and prepare operations");
    });
});
