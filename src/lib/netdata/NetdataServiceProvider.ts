import axios, { AxiosResponse, Method } from 'axios';
import { NodeDTO, ChartDTO } from '@/types/DTO/NetdataDtos';

export default class NetdataServiceProvider {
    private readonly netdataUrl: string;

    constructor() {
        if (!process.env.NETDATA_URL) {
            throw new Error('NETDATA_URL is not defined');
        }
        this.netdataUrl = process.env.NETDATA_URL;
    }

    /**
     * Fetches all node data from the Netdata master
     * @returns {NodeDTO} Node data (and what is really a promise)
     */
    async fetchNodesData(): Promise<NodeDTO> {
        return this.fetchData('v2/nodes');
    }

    /**
     * Fetches a specific chart from the Netdata master
     * @param {string} chartId The ID of the chart to fetch (i.e. netdata.server_cpu)
     * @returns {ChartDTO} Chart data for the requested id
     */
    async fetchChart(chartId: string): Promise<ChartDTO> {
        return this.fetchData('v1/chart', 'GET', { chart: chartId });
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
    private async fetchData(
        endpoint: string,
        method: Method = 'GET',
        params?: Record<string, any>,
        data?: object
    ) {
        try {
            const response: AxiosResponse = await axios({
                url: `${this.netdataUrl}/${endpoint}`,
                method,
                params,
                data
            });
            return response.data;
        } catch (error) {
            console.error(error);
            return { message: 'Something went wrong!' };
        }
    }
}
