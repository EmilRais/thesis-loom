import { All, Array, MandatoryFields, Object, RecognisedFields, Required, String, Value } from "paradise";

export const OperationRule = () => All([
    Required(),
    Object(),
    MandatoryFields({
        module: [Required(), String()]
    })
]);

export const EndpointRule = () => All([
    Required(),
    Object(),
    RecognisedFields(["method", "path", "operations"]),
    MandatoryFields({
        method: [Required(), Value(["GET", "POST"])],
        path: [Required(), String()],
        operations: [Required(), Array([OperationRule()])]
    })
]);

export const SpecificationRule = () => All([
    Required(),
    Array([EndpointRule()])
]);
