import * as fs from "fs";
import { dirname, resolve as resolvePath } from "path";

import { Design, Operation } from "./design.model";
import { Endpoint, Operation as AbstractOperation, Specification } from "./specification.model";

interface Module {
    prepareOperation(operation: AbstractOperation): Promise<Operation>;
}
type ModuleConstructor = (operation: AbstractOperation) => Promise<Operation>;

export class Utilities {
    loadSpecification(path: string): Promise<Specification> {
        return new Promise((resolve, reject) => {
            const absolutePath = resolvePath(path);
            fs.readFile(absolutePath, (error, data) => {
                if ( error ) return reject(error);

                const endpoints = JSON.parse(data.toString()) as Endpoint[];
                resolve({ location: path, endpoints: endpoints });
            });
        });
    }

    convertSpecificationToDesign(specification: Specification): Promise<Design> {
        return Promise.all(specification.endpoints.map(endpoint => {
            return this.prepareOperations(specification.location, endpoint.operations)
                .then(operations => {
                    return {
                        method: endpoint.method,
                        path: endpoint.path,
                        operations: operations
                    };
                });
        }))
            .then(endpoints => ({ endpoints: endpoints }));
    }

    prepareOperations(path: string, operations: AbstractOperation[]): Promise<Operation[]> {
        return Promise.all(operations.map(operation => {
            const context = dirname(path);
            const modulePath = resolvePath(context, operation.module);
            const module = require(modulePath) as Module;
            return module.prepareOperation(operation);
        }));
    }
}
