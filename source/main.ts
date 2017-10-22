import { SpecificationRule } from "./specification.rule";
import { Utilities } from "./utilities";

const utilities = new Utilities();

const parameters = process.argv.slice(2);
const specificationPath = parameters[0];

utilities.loadSpecification(specificationPath)
    .then(specification => SpecificationRule().guard(specification))
    .then(specification => console.log(JSON.stringify(specification, null, 4)))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
