import * as chai from "chai";
const should = chai.should();

import { IO } from "../source/io";

describe("IO", () => {
    let io: IO;

    beforeEach(() => {
        io = new IO();
    });

    describe("loadSpecification", () => {
        it("should fail if unable to load specification", () => {
            return io.loadSpecification("test/some-unknown-specification.json")
                .then(() => Promise.reject("Expected to fail"))
                .catch((error: Error) => {
                    error.message.should.include("no such file");
                });
        });

        it("should return the specification", () => {
            return io.loadSpecification("test/some-specification.json")
                .then(specification => {
                    specification.should.deep.equal([]);
                });
        });
    });
});
