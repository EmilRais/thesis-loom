export interface Specification {
    location: string;
    endpoints: Endpoint[];
}

export interface Endpoint {
    method: string;
    path: string;
    operations: Operation[];
}

export interface Operation {
    module: string;
}
