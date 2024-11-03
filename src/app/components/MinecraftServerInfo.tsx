"use client";

import React, {useEffect, useState} from "react";
import NetdataServiceProvider from "@/lib/netdata/NetdataServiceProvider";
import {InstanceDTO} from "@/types/DTO/NetdataDtos";

export default function MinecraftServerInfo() {
    const [instanceData, setInstanceData] = useState<InstanceDTO | null>(null);
    const [status, setStatus] = useState<'loading' | 'online' | 'offline'>('loading');
    let AVERAGE_CPU: number;
    if (instanceData) {
        AVERAGE_CPU = Math.round(instanceData.sts.avg * 100) / 100;
    } else {
        AVERAGE_CPU = -1;
    }

    useEffect(() => {
        const pollServer = async () => {
            setStatus('loading');
            const netdataService = new NetdataServiceProvider();
            try {
                const instance = await netdataService.fetchMinecraftServerProcess();
                console.log(instance); // for debugging
                if (instance && instance.sts.con > 0) {
                    setStatus('online');
                    setInstanceData(instance);
                } else {
                    setStatus('offline');
                }
            } catch (error) {
                console.error('Error fetching Minecraft server status:', error);
                setStatus('offline');
            }
        }

        pollServer().then(r => console.log(r)); // for debugging

        const intervalId = setInterval(pollServer, 5000);
        return () => clearInterval(intervalId);
    }, []);

    return (
      <div className="mt-12 ml-24 w-72 h-36 bg-blue-900 rounded-xl text-center content-center">
          <h2 className="text-2xl">Minecraft Server Info</h2>
          {status === 'loading' && <p><b>Status</b>: ⚫</p>}
          {status === 'online' && <p><b>Status</b>: 🟢</p>}
          {status === 'offline' && <p><b>Status</b>: 🔴</p>}
          <p>AVG CPU Usage: {AVERAGE_CPU}</p>
      </div>
    );
}
