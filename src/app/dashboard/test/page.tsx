import NetdataServiceProvider from '@/lib/netdata/NetdataServiceProvider';

const netdataService: NetdataServiceProvider = new NetdataServiceProvider();

export default async function DashboardPage() {
    try {
        const serverCpu = await netdataService.fetchChart('netdata.server_cpu');
        const nodeData = await netdataService.fetchNodesData();
        
        console.log('Node data:', nodeData);
        console.log('Server CPU:', serverCpu);

        return(<>success</>)
    } catch (error: any) {
        console.error('Error fetching node data:', error);
        return(<>error</>)
    }
}
