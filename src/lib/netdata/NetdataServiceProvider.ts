import axios, {AxiosError, AxiosResponse, Method} from 'axios';
import {NodeDTO, ChartDTO, DataDTO, InstanceDTO} from '@/types/DTO/NetdataDtos';

export default class NetdataServiceProvider {
    private readonly netdataUrl: string;

    constructor() {
        if (!process.env.NEXT_PUBLIC_NETDATA_URL) {
            throw new Error('NETDATA_URL is not defined');
        }
        this.netdataUrl = process.env.NEXT_PUBLIC_NETDATA_URL;
    }

    /**
     * Fetches all node data from the Netdata master
     * @returns {NodeDTO} Node data (and what is really a promise)
     */
    async fetchNodesData(): Promise<NodeDTO> {
        const data = await this.fetchApiData('v2/nodes');
        return data.nodes[0];
    }

    /**
     * Fetches a specific chart from the Netdata master
     * @param {string} chartId The ID of the chart to fetch (i.e. netdata.server_cpu)
     * @returns {ChartDTO} Chart data for the requested id
     */
    async fetchChart(chartId: string): Promise<ChartDTO> {
        return this.fetchApiData('v1/chart', 'GET', { chart: chartId });
    }

    async fetchData(context: string, instance: string): Promise<DataDTO> {
        const currentTime = new Date().getTime();
        return this.fetchApiData('v2/data', 'GET', { contexts: context, instances: instance, timestamp: currentTime})
    }

    async fetchMinecraftServerProcess(): Promise<InstanceDTO | null> {
        const response = await this.fetchData('app.cpu_utilization', 'app.mc-server_cpu_utilization');

        for (const instance of response.summary.instances) {
            if (instance.id === 'app.mc-server_cpu_utilization') {
                return instance;
            }
        }
        return null;
    }

    /**
     * This is a generic method for fetching data from the Netdata API. 99% of requests will be GET requests.
     * Additionally, this method is NOT meant to be used outside of this class. Other methods should use this!
     * @param endpoint A string representing the desired endpoint to hit ([api version]/[endpoint])
     * @param method An Axios HTTP method (GET, POST, PUT, DELETE, etc.)
     * @param params Query parameters to send with the request
     * @param data Additional data to send with the request
     * @returns {Promise<T>} The data returned from the API
     */
    private async fetchApiData(
        endpoint: string,
        method: Method = 'GET',
        params?: Record<string, string | number>,
        data?: object
    ) {
        try {
            const response: AxiosResponse = await axios({
                url: `${this.netdataUrl}/${endpoint}`,
                method,
                params,
                data
            });
            console.log(response);
            return response.data;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (error.code === 'ERR_NETWORK') {
                    console.log("Network error (likely timeout!)");
                    return { health: { status: 'offline' }, nm: 'coltmini' };
                } else {
                    console.error('Axios error:', error);
                    return { health: { status: 'offline' }, nm: 'coltmini' };
                }
            } else {
                console.error('Error fetching data:', error);
                return { health: { status: 'offline' }, nm: 'coltmini' };
            }
        }
    }
}
