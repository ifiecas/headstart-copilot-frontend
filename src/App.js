// Updated App.js for Headstart Copilot (Azure Backend)

import React, { useState } from 'react';

export default function HeadstartCopilot() {
  const [role, setRole] = useState('Sales Executive');
  const [company, setCompany] = useState('Bean Cycle Collective');
  const [objective, setObjective] = useState('Explore upsell opportunities');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://headstart-copilot-api.azurewebsites.net/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role, company, objective })
      });
      const data = await res.json();
      setResponse(data.message);
    } catch (error) {
      setResponse('Something went wrong. Please try again.');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Headstart Copilot</h1>
      <div className="space-y-2">
        <input className="w-full p-2 border rounded" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role of meeting participant" />
        <input className="w-full p-2 border rounded" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company Name" />
        <input className="w-full p-2 border rounded" value={objective} onChange={(e) => setObjective(e.target.value)} placeholder="Meeting Objective" />
        <button onClick={handleSubmit} disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
          {loading ? 'Generating...' : 'Generate Prep Brief'}
        </button>
      </div>
      {response && (
        <div className="p-4 mt-4 bg-gray-100 border rounded">
          <h2 className="font-semibold">Copilot Response:</h2>
          <p className="whitespace-pre-line mt-2">{response}</p>
        </div>
      )}
    </div>
  );
}
