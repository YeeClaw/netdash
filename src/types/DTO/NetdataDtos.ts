export interface NodeDTO {
    mg: string;
    nd: string;
    nm: string;
    ni: number;
    v: string;
    labels: object;
    hw: object;
    os: object;
    state: string;
    health: {
        alerts: object;
        status: string;
    };
    capabilities: any[];
}

export interface ChartDTO {
    id: string;
    name: string;
    type: string;
    family: string;
    context: string;
    title: string;
    units: string;
    data_url: string;
    chart_type: string;
    duration: number;
    first_entry: number;
    last_entry: number;
    update_every: number;
    dimensions: object;
    chart_variables: object;
    green: number | null;
    red: number | null;
    alarms: object;
    chart_labels: object;
    functions: object;
}

export interface InstanceDTO {
    id: string;
    ni: object;
    ds: object;
    sts: {
        min: number;
        max: number;
        avg: number;
        con: number;
    };
}

export interface DataDTO {
    api: number;
    versions: object;
    summary: {
        nodes: object[];
        contexts: {
            id: string;
            is: object;
            ds: object;
            sts: {
                min: number;
                max: number;
                avg: number;
                con: number;
            }[];
        };
        instances: InstanceDTO[];
        dimensions: object[];
        labels: object[];
        alerts: never[]; // This might have something at some point
    }
}
