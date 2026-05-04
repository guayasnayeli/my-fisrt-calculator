import { useState } from 'react';
import PrimaryButton from '../shared/elements/PrimaryButton';

interface CalcProps {
  returnHome: () => void;
}

export default function KeypadCalc({ returnHome }: CalcProps) {
  const [display, setDisplay] = useState<string>('');

  const appendSymbol = (val: string) => setDisplay((prev) => prev + val);
  const resetDisplay = () => setDisplay('');
  const deleteLast = () => setDisplay((prev) => prev.slice(0, -1)); 

  // YOUR ORIGINAL LOGIC PRESERVED
  const computeResult = () => {
    try {
      const parts = display.split(/([+\-*/])/);
      let currentResult = Number(parts[0]);

      for (let i = 1; i < parts.length; i += 2) {
        const op = parts[i];
        const nextNum = Number(parts[i + 1]);

        if (op === '+') currentResult += nextNum;
        else if (op === '-') currentResult -= nextNum;
        else if (op === '*') currentResult *= nextNum;
        else if (op === '/') currentResult /= nextNum;
      }

      setDisplay(currentResult.toString());
    } catch {
      setDisplay('Error');
    }
  };

  const numberPad = ['7', '8', '9', '4', '5', '6', '1', '2', '3'];

  return (
    <div className="flex flex-col items-center mt-12">
      <h2 className="text-3xl font-extrabold mb-6 text-slate-800">Standard Calculator</h2>
      
      <div className="w-72 bg-slate-800 p-5 rounded-2xl shadow-2xl">
        <input 
          type="text" 
          value={display} 
          readOnly 
          className="w-full text-right mb-5 text-2xl p-4 bg-slate-100 text-slate-900 rounded-lg focus:outline-none font-mono"
        />
        
        
        <div className="grid grid-cols-4 gap-3">
          <button onClick={resetDisplay} className="col-span-2 p-4 bg-rose-500 text-white rounded-lg font-bold hover:bg-rose-600 transition">AC</button>
          <button onClick={deleteLast} className="p-4 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600 transition">DEL</button>
          <button onClick={() => appendSymbol('/')} className="p-4 bg-slate-600 text-white rounded-lg font-bold hover:bg-slate-500 transition">/</button>
          
          {/* Requirement: Array Map */}
          {numberPad.map((num) => (
            <button key={num} onClick={() => appendSymbol(num)} className="p-4 bg-slate-300 text-slate-900 rounded-lg font-bold hover:bg-white transition">
              {num}
            </button>
          ))}

          <button onClick={() => appendSymbol('*')} className="col-start-4 row-start-2 p-4 bg-slate-600 text-white rounded-lg font-bold hover:bg-slate-500 transition">*</button>
          <button onClick={() => appendSymbol('-')} className="col-start-4 row-start-3 p-4 bg-slate-600 text-white rounded-lg font-bold hover:bg-slate-500 transition">-</button>
          <button onClick={() => appendSymbol('+')} className="col-start-4 row-start-4 p-4 bg-slate-600 text-white rounded-lg font-bold hover:bg-slate-500 transition">+</button>
          
          <button onClick={() => appendSymbol('0')} className="col-span-2 p-4 bg-slate-300 text-slate-900 rounded-lg font-bold hover:bg-white transition">0</button>
          <button onClick={() => appendSymbol('.')} className="p-4 bg-slate-300 text-slate-900 rounded-lg font-bold hover:bg-white transition">.</button>
          <button onClick={computeResult} className="p-4 bg-emerald-500 text-white rounded-lg font-bold hover:bg-emerald-600 transition">=</button>
        </div>
      </div>
      
      <PrimaryButton onTrigger={returnHome} customClass="mt-10 bg-slate-600 hover:bg-slate-700">
        Return to Menu
      </PrimaryButton>
    </div>
  );
}