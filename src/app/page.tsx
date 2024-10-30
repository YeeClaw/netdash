import React from 'react';
import ServerStatus from './components/ServerStatus';

export default function Home() {
  return (
    <main className="home-container">
        <div className="w-3/12 h-32 bg-blue-900 mx-auto mt-4 content-center rounded-3xl">
            <h1 className="text-4xl text-center">Homelab Dashboard</h1>
        </div>
        <ServerStatus/>
    </main>
  );
}
