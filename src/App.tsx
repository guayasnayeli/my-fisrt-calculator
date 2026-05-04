import { useState } from 'react';
import Dashboard from './views/Dashboard';
import SimpleAdder from './views/SimpleAdder';
import KeypadCalc from './views/KeypadCalc';
import DisneyExplorer from './views/DisneyExplorer';

export default function App() {
  // Requirement: Hooks
  const [activeScreen, setActiveScreen] = useState<string>('dashboard');

  return (
    // Global container avoiding empty <> when classes are needed
    <main className="min-h-screen bg-slate-100 text-slate-800 font-sans p-5">
      
      {activeScreen === 'dashboard' && <Dashboard navigate={setActiveScreen}/>}
      {activeScreen === 'math' && <SimpleAdder returnHome={() => setActiveScreen('dashboard')} />}
      {activeScreen === 'calc' && <KeypadCalc returnHome={() => setActiveScreen('dashboard')} />}
      {activeScreen === 'disney' && <DisneyExplorer returnHome={() => setActiveScreen('dashboard')} />}
    </main>
  );
}