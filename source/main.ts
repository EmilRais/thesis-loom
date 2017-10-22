import { IO } from "./io";

const io = new IO();

const parameters = process.argv.slice(2);
const specificationPath = parameters[0];

io.loadSpecification(specificationPath)
    .then(console.log)
    .catch(console.error);
