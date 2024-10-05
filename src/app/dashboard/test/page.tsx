import { fetchNodeData } from '@/lib/netdata/api';

export default async function handler() {
    try {
        const data = await fetchNodeData();
        return [data];
    } catch (error: any) {
        console.error('Error fetching node data:', error);
        return { error: error.message };
    }
}