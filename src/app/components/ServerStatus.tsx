"use client";

import React, { useEffect, useState } from 'react';
import NetdataServiceProvider from "@/lib/netdata/NetdataServiceProvider";
import {NodeDTO} from "@/types/DTO/NetdataDtos";

export default function ServerStatus() {
    const [status, setStatus] = useState<'loading' | 'online' | 'offline'>('loading');
    const [nodeData, setNodeData] = useState<NodeDTO | null>(null);

    useEffect(() => {

        // Function to check the server status
        const checkServerStatus = async () => {
            setStatus('loading');
            const netdataService = new NetdataServiceProvider();
            try {
                const data = await netdataService.fetchNodesData();
                setNodeData(data);
                console.log(data)
                if (data.health.status === 'online') {
                    setStatus('online'); // Server is online
                } else {
                    setStatus('offline'); // Server is offline
                }
            } catch (error) {
                console.error('Error fetching server status:', error);
                setStatus('offline'); // Handle errors by setting to offline
            }
        };

        // Initial status check
        checkServerStatus();

        // Poll every 5 seconds
        // const intervalId = setInterval(checkServerStatus, 5000);
        // return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, []);

    return (
        <section>
            <div className="ml-24 w-56 h-24 bg-blue-900 rounded-xl text-center content-center">
                <h2 className="text-2xl">Server Status</h2>
                {status === 'loading' && <p><b>Loading</b>: ⚫</p>}
                {status === 'online' && <p><b>{nodeData?.nm}</b>: 🟢</p>}
                {status === 'offline' && <p><b>{nodeData?.nm}</b>: 🔴</p>}
            </div>
        </section>
    );
}
