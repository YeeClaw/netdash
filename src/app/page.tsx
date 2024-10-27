import React from 'react';
import ServerStatus from './components/ServerStatus';

export default function Home() {
  return (
    <main className="home-container">
        <h1 className="text-4xl">Homelab Dashboard Test</h1>
        <ServerStatus />
    </main>
  );
}
