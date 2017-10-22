export type Specification = Endpoint[];

export interface Endpoint {
    method: string;
    path: string;
    operations: Operation[];
}

export interface Operation {
    module: string;
}
