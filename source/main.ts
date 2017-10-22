import { IO } from "./io";
import { SpecificationRule } from "./specification.rule";

const io = new IO();

const parameters = process.argv.slice(2);
const specificationPath = parameters[0];

io.loadSpecification(specificationPath)
    .then(specification => {
        return SpecificationRule().guard(specification)
            .then(() => console.log(JSON.stringify(specification, null, 4)))
    })
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
