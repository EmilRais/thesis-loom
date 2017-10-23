import { Server } from "http";

import { ServerFactory } from "./server.factory";
import { SpecificationRule } from "./specification.rule";
import { Utilities } from "./utilities";

const serverFactory = new ServerFactory();
const utilities = new Utilities();

const parameters = process.argv.slice(2);
const specificationPath = parameters[0];

if ( !specificationPath )
    throw new Error("Please specify path to the REST specification");

utilities.loadSpecification(specificationPath)
    .then(specification => SpecificationRule().guard(specification))
    .then(specification => utilities.convertSpecificationToDesign(specificationPath, specification))
    .then(implementation => serverFactory.createServer(implementation))
    .then(server => {
        server.listen(3000, function() {
            const port = (this as Server).address().port;
            console.log(`Listening on port ${port}`);
        });
    })
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
