import * as chai from "chai";
const should = chai.should();

import { EndpointRule, OperationRule, SpecificationRule } from "../source/specification.rule";

describe("SpecificationRule", () => {
    it("should fail if endpoints are missing", () => {
        return SpecificationRule().guard({ endpoints: null })
            .then(() => Promise.reject("Should have failed"))
            .catch(error => {
                error.should.deep.equal(['"$.endpoints" was missing']);
            });
    });

    it("should fail if endpoints are not an array", () => {
        return SpecificationRule().guard({ endpoints: 42 })
            .then(() => Promise.reject("Should have failed"))
            .catch(error => {
                error.should.deep.equal(['"$.endpoints" was not an array']);
            });
    });

    it("should fail if endpoints is not an array of endpoints", () => {
        return SpecificationRule().guard({ endpoints: [null] })
            .then(() => Promise.reject("Should have failed"))
            .catch(error => {
                error.should.deep.equal(['"$.endpoints[0]" was missing']);
            });
    });

    it("should succeed if an array of endpoints", () => {
        return SpecificationRule().guard({
            endpoints: [{
                method: "GET",
                path: "/ping",
                operations: []
            }]
        });
    });
});

describe("EndpointRule", () => {
    it("should fail if missing", () => {
        return EndpointRule().guard(null)
            .then(() => Promise.reject("Should have failed"))
            .catch(error => {
                error.should.deep.equal(['"$" was missing']);
            });
    });

    it("should fail if not an object", () => {
        return EndpointRule().guard(42)
            .then(() => Promise.reject("Should have failed"))
            .catch(error => {
                error.should.deep.equal(['"$" was not an object']);
            });
    });

    it("should fail if contains unrecognised fields", () => {
        return EndpointRule()
            .guard({
                method: "GET",
                path: "/ping",
                operations: [],
                unknownField: 42
            })
            .then(() => Promise.reject("Should have failed"))
            .catch(error => {
                error.should.deep.equal(['"$" has unrecognised field "unknownField"']);
            });
    });

    it("should fail if method is missing", () => {
        return EndpointRule()
            .guard({
                method: null,
                path: "/ping",
                operations: []
            })
            .then(() => Promise.reject("Should have failed"))
            .catch(error => {
                error.should.deep.equal(['"$.method" was missing']);
            });
    });

    it("should fail if method is not valid", () => {
        return EndpointRule()
            .guard({
                method: 42,
                path: "/ping",
                operations: []
            })
            .then(() => Promise.reject("Should have failed"))
            .catch(error => {
                error.should.deep.equal(['"$.method" was 42 but should be GET | POST']);
            });
    });

    it("should fail if path is missing", () => {
        return EndpointRule()
            .guard({
                method: "GET",
                path: null,
                operations: []
            })
            .then(() => Promise.reject("Should have failed"))
            .catch(error => {
                error.should.deep.equal(['"$.path" was missing']);
            });
    });

    it("should fail if path is not a string", () => {
        return EndpointRule()
            .guard({
                method: "GET",
                path: 42,
                operations: []
            })
            .then(() => Promise.reject("Should have failed"))
            .catch(error => {
                error.should.deep.equal(['"$.path" was not a string']);
            });
    });

    it("should fail if operations is missing", () => {
        return EndpointRule()
            .guard({
                method: "GET",
                path: "/ping"
            })
            .then(() => Promise.reject("Should have failed"))
            .catch(error => {
                error.should.deep.equal(['"$.operations" was missing']);
            });
    });

    it("should fail if operations is not an array", () => {
        return EndpointRule()
            .guard({
                method: "GET",
                path: "/ping",
                operations: 42
            })
            .then(() => Promise.reject("Should have failed"))
            .catch(error => {
                error.should.deep.equal(['"$.operations" was not an array']);
            });
    });

    it("should fail if operations is not an array of operations", () => {
        return EndpointRule()
            .guard({
                method: "GET",
                path: "/ping",
                operations: [null]
            })
            .then(() => Promise.reject("Should have failed"))
            .catch(error => {
                error.should.deep.equal(['"$.operations[0]" was missing']);
            });
    });

    it("should succeed if valid endpoint", () => {
        return EndpointRule()
            .guard({
                method: "GET",
                path: "/ping",
                operations: [{ module: "modules/some-module" }]
            });
    });
});

describe("OperationRule", () => {
    it("should fail if missing", () => {
        return OperationRule().guard(null)
            .then(() => Promise.reject("Should have failed"))
            .catch(error => {
                error.should.deep.equal(['"$" was missing']);
            });
    });

    it("should fail if not an object", () => {
        return OperationRule().guard(42)
            .then(() => Promise.reject("Should have failed"))
            .catch(error => {
                error.should.deep.equal(['"$" was not an object']);
            });
    });

    it("should fail if module is missing", () => {
        return OperationRule().guard({})
            .then(() => Promise.reject("Should have failed"))
            .catch(error => {
                error.should.deep.equal(['"$.module" was missing']);
            });
    });

    it("should fail if module is not a string", () => {
        return OperationRule().guard({ module: 42 })
            .then(() => Promise.reject("Should have failed"))
            .catch(error => {
                error.should.deep.equal(['"$.module" was not a string']);
            });
    });

    it("should succeed if a valid operation", () => {
        return OperationRule().guard({ module: "modules/some-module" });
    });
});
