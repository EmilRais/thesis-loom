import * as fs from "fs";
import { resolve as resolvePath } from "path";

import { Specification } from "./specification.model";

export class Utilities {
    loadSpecification(path: string): Promise<Specification> {
        return new Promise((resolve, reject) => {
            const absolutePath = resolvePath(path);
            fs.readFile(absolutePath, (error, data) => {
                if ( error ) return reject(error);

                const specification = JSON.parse(data.toString());
                resolve(specification);
            });
        });
    }
}
