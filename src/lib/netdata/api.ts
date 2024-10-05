import axios from 'axios';

const netdataUrl = process.env.NETDATA_URL;
if (!netdataUrl) {
    throw new Error('NETDATA_URL is not defined');
}

export async function fetchNodeData() {
    try {
        const response = await axios.get(`${netdataUrl}/v2/nodes`) // Figure out types for this!
        return response.data;
    } catch (error) {
        console.error(error);
        return { message: 'Something went wrong' };
    }
}