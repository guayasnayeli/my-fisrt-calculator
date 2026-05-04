import { useState } from 'react';
import PrimaryButton from '../shared/elements/PrimaryButton';

interface AdderProps {
  returnHome: () => void;
}

export default function SimpleAdder({ returnHome }: AdderProps) {
  const [firstValue, setFirstValue] = useState<string>('');
  const [secondValue, setSecondValue] = useState<string>('');

  const executeCalculation = () => {
    alert('Result: ' + (Number(firstValue) + Number(secondValue)));
  };

  return (
    <div className="flex flex-col items-center p-10 bg-slate-50 rounded-2xl shadow-lg max-w-sm mx-auto mt-12 border border-slate-200">
      <h2 className="text-3xl font-extrabold mb-8 text-slate-800">Addition</h2>
      
      <div className="flex flex-col gap-5 w-full mb-8">
        <input 
          type="number"
          placeholder="First number"
          className="w-full border-2 border-slate-300 p-3 rounded-lg focus:border-indigo-500 outline-none"
          value={firstValue} 
          onChange={(e) => setFirstValue(e.target.value)} 
        />
        <input 
          type="number"
          placeholder="Second number"
          className="w-full border-2 border-slate-300 p-3 rounded-lg focus:border-indigo-500 outline-none"
          value={secondValue} 
          onChange={(e) => setSecondValue(e.target.value)} 
        />
      </div>

      <PrimaryButton onTrigger={executeCalculation} customClass="w-full mb-6 py-3">
        Calculate Sum
      </PrimaryButton>
      
      <div className="w-full border-t border-slate-300 my-4"></div>
      
      <PrimaryButton onTrigger={returnHome} customClass="w-full bg-slate-500 hover:bg-slate-600">
        Return to Menu
      </PrimaryButton>
    </div>
  );
}